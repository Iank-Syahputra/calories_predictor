from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional
import joblib
import numpy as np
import pandas as pd
import os

app = FastAPI(
    title="Calories Burned Prediction API",
    description="API untuk prediksi kalori terbakar menggunakan model Random Forest",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Untuk development, bisa dibatasi nanti
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model dan scaler
MODEL_PATH = os.path.join(os.path.dirname(__file__), "ml_models", "best_model_random_forest.joblib")
SCALER_PATH = os.path.join(os.path.dirname(__file__), "ml_models", "scaler.joblib")

try:
    model = joblib.load(MODEL_PATH)
    scaler = joblib.load(SCALER_PATH)
    print("✓ Model dan scaler berhasil dimuat")
except Exception as e:
    print(f"✗ Error loading model: {e}")
    raise

# Pydantic schema untuk request body
class PredictionRequest(BaseModel):
    gender: str = Field(..., description="Jenis kelamin: 'male' atau 'female'")
    age: int = Field(..., ge=1, le=120, description="Umur dalam tahun")
    height_cm: float = Field(..., ge=50, le=250, description="Tinggi badan dalam cm")
    weight_kg: float = Field(..., ge=2, le=300, description="Berat badan dalam kg")
    duration_min: float = Field(..., gt=0, le=600, description="Durasi olahraga dalam menit")
    heart_rate: float = Field(..., ge=40, le=220, description="Detak jantung dalam bpm")
    body_temp_c: float = Field(..., ge=35.0, le=42.0, description="Suhu tubuh dalam °C")

class PredictionResponse(BaseModel):
    status: str
    calories_predicted: float
    message: str
    input_data: dict

@app.get("/")
async def root():
    return {
        "message": "Calories Burned Prediction API v1.0",
        "model": "Random Forest Regression",
        "status": "active"
    }

@app.post("/predict", response_model=PredictionResponse)
async def predict(request: PredictionRequest):
    try:
        # Preprocessing
        # Encode gender: male=1, female=0
        gender_encoded = 1 if request.gender.lower() == 'male' else 0
        
        # Siapkan fitur untuk prediksi menggunakan DataFrame
        features_df = pd.DataFrame({
            'Gender': [gender_encoded],
            'Age': [request.age],
            'Height': [request.height_cm],
            'Weight': [request.weight_kg],
            'Duration': [request.duration_min],
            'Heart_Rate': [request.heart_rate],
            'Body_Temp': [request.body_temp_c]
        })
        
        # Scaling fitur
        features_scaled = scaler.transform(features_df)
        
        # Prediksi
        calories = model.predict(features_scaled)[0]
        
        # Pastikan tidak negatif
        calories = max(0.0, calories)
        
        return PredictionResponse(
            status="success",
            calories_predicted=round(float(calories), 2),
            message="Prediksi berhasil!",
            input_data={
                "gender": request.gender,
                "age": request.age,
                "height_cm": request.height_cm,
                "weight_kg": request.weight_kg,
                "duration_min": request.duration_min,
                "heart_rate": request.heart_rate,
                "body_temp_c": request.body_temp_c
            }
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error saat prediksi: {str(e)}")

@app.get("/health")
async def health_check():
    return {"status": "healthy", "model_loaded": model is not None}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
