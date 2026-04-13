# 🔥 Calories Burned Prediction

A machine learning project to predict calories burned during physical activity based on user profile and exercise data.

## Features

- **Input Features:** Age, Height, Weight, Duration, Heart Rate, Body Temperature
- **Target Variable:** Calories burned
- **Dataset:** 15,000 records from Kaggle (`kushagrakinjawadekar/calories-burned-predicition`)

## Models

| Model | Description |
|-------|-------------|
| Linear Regression | Baseline model |
| Ridge Regression | Regularized linear model |
| Random Forest Regression | Ensemble model |

## Methodology

1. Data collection from Kaggle
2. Exploratory Data Analysis (EDA)
3. Data preprocessing & feature engineering
4. Data splitting (70:30, 80:20, 90:10 scenarios)
5. 10-Fold Cross-Validation
6. Hyperparameter tuning (GridSearchCV / RandomizedSearchCV)
7. Model evaluation (MSE, RMSE, MAE, R²)
8. Best model selection for deployment

## Installation

```bash
# Create virtual environment (optional)
python -m venv myvenv
myvenv\Scripts\activate  # Windows

# Install dependencies
pip install -r requirements.txt
```

## Usage

Open and run `calories_predict.ipynb` in Jupyter Notebook or Jupyter Lab:

```bash
jupyter notebook calories_predict.ipynb
```

## Project Structure

```
calories/
├── calories_predict.ipynb  # Main notebook
├── requirements.txt        # Python dependencies
├── myvenv/                 # Virtual environment
└── README.md               # Project documentation
```

## Requirements

- Python 3.8+
- See `requirements.txt` for library versions

## License

This project is for educational purposes.
