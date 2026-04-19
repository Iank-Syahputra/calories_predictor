# 🔥 Calories Burned Prediction - Versi 1.0

Aplikasi web sederhana untuk prediksi kalori terbakar menggunakan Machine Learning (Random Forest).

## 📋 Fitur

- ✅ Prediksi kalori terbakar berdasarkan data user dan aktivitas fisik
- ✅ Model: Random Forest Regression (R² = 0.967)
- ✅ API dengan FastAPI
- ✅ Frontend HTML sederhana
- ✅ Tanpa database (data tidak disimpan)

## 🏗️ Struktur Project

```
calories/
├── backend/
│   ├── main.py                 # FastAPI application
│   ├── requirements.txt        # Python dependencies
│   └── ml_models/
│       ├── best_model_random_forest.joblib  # Model ML
│       └── scaler.joblib                    # Scaler untuk preprocessing
│
├── frontend/
│   └── index.html              # Halaman web sederhana
│
├── calories_predict.ipynb      # Notebook asli (training model)
└── README_V1.md                # File ini
```

## 🚀 Cara Menjalankan

### Step 1: Export Model dari Notebook

Pertama, kita perlu export model dari notebook ke folder backend:

1. Buka `calories_predict.ipynb` di Jupyter
2. Jalankan semua cell sampai bagian "11. Saving Best Model"
3. File `best_model_random_forest.joblib` dan `scaler.joblib` akan terbuat
4. Copy kedua file tersebut ke folder `backend/ml_models/`

**ATAU** jalankan script export ini:

```bash
# Di root folder project
python export_model.py
```

### Step 2: Setup Backend

```bash
# Masuk ke folder backend
cd backend

# Buat virtual environment (opsional tapi recommended)
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Linux/Mac

# Install dependencies
pip install -r requirements.txt

# Jalankan API server
uvicorn main:app --reload --port 8000
```

Server akan berjalan di: `http://localhost:8000`

API Docs tersedia di: `http://localhost:8000/docs`

### Step 3: Buka Frontend

Buka file `frontend/index.html` di browser:

```bash
# Cara 1: Double-click file index.html
# Cara 2: Pakai Python simple server
cd frontend
python -m http.server 3000
```

Lalu buka: `http://localhost:3000`

## 📡 API Endpoints

### POST `/predict`

Prediksi kalori terbakar.

**Request Body:**
```json
{
  "gender": "male",
  "age": 25,
  "height_cm": 175.0,
  "weight_kg": 70.0,
  "duration_min": 45.0,
  "heart_rate": 140.0,
  "body_temp_c": 38.5
}
```

**Response:**
```json
{
  "status": "success",
  "calories_predicted": 387.45,
  "message": "Prediksi berhasil!",
  "input_data": { ... }
}
```

### GET `/`

Info API.

### GET `/health`

Health check endpoint.

## 📊 Input Features

| Fitur | Tipe | Range | Keterangan |
|-------|------|-------|------------|
| Gender | string | male/female | Jenis kelamin |
| Age | int | 1-120 | Umur (tahun) |
| Height | float | 50-250 | Tinggi badan (cm) |
| Weight | float | 2-300 | Berat badan (kg) |
| Duration | float | 1-600 | Durasi olahraga (menit) |
| Heart Rate | float | 40-220 | Detak jantung (bpm) |
| Body Temp | float | 35-42 | Suhu tubuh (°C) |

## 🎯 Model Performance

- **Model:** Random Forest Regression
- **R² Score:** 0.967
- **Dataset:** 15,000 records dari Kaggle
- **Features:** 6 input features + Gender

## 🛠️ Tech Stack

- **Backend:** FastAPI (Python)
- **ML Library:** scikit-learn
- **Frontend:** HTML + CSS + JavaScript (vanilla)
- **Model:** Random Forest

## 📝 Catatan

- Ini adalah **Versi 1.0** untuk uji inference
- Tidak ada database atau autentikasi user
- Data input tidak disimpan
- Untuk versi selanjutnya bisa ditambahkan:
  - Database untuk menyimpan history prediksi
  - User authentication
  - Dashboard analytics
  - Deploy ke cloud

## 🐛 Troubleshooting

### Error: "Model not found"
- Pastikan file `.joblib` sudah ada di `backend/ml_models/`
- Jalankan notebook untuk export model

### CORS Error di Browser
- Pastikan backend sudah running di port 8000
- Check console browser untuk error detail

### Module not found
- Pastikan sudah `pip install -r requirements.txt`
- Virtual environment sudah aktif

## 👨‍💻 Development

Untuk development:

```bash
# Backend
cd backend
uvicorn main:app --reload --port 8000

# Frontend (opsional, bisa langsung buka file HTML)
cd frontend
python -m http.server 3000
```

## 📄 License

Educational purpose only.

---

**Versi:** 1.0  
**Last Updated:** April 2026
