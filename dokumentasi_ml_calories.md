# Dokumentasi Proyek Prediksi Kalori Terbakar

## Overview Proyek

Proyek ini bertujuan untuk membangun model Machine Learning yang dapat memprediksi jumlah kalori yang terbakar selama aktivitas fisik berdasarkan karakteristik individu dan parameter aktivitas. Notebook ini mengimplementasikan pendekatan sistematis mulai dari pengumpulan data hingga deployment model.

## Tujuan Utama Proyek

Membangun model machine learning untuk memprediksi jumlah kalori yang terbakar selama aktivitas fisik secara akurat dengan menggunakan dataset dari Kaggle yang berisi data exercise dan kalori pengguna.

## Model yang Digunakan

| Model | Tipe | Alasan Penggunaan |
|-------|------|-------------------|
| Linear Regression | Baseline | Model paling sederhana sebagai pembanding |
| Ridge Regression | Regularized Linear | Mencegah overfitting dengan L2 regularization |
| Random Forest | Ensemble | Menghandle non-linearitas dan feature importance |

## Fitur Input dan Target

### Fitur Input (X)
- **Gender** (Jenis Kelamin): male/female
- **Age** (Usia): dalam tahun
- **Height** (Tinggi Badan): dalam cm
- **Weight** (Berat Badan): dalam kg
- **Duration** (Durasi Olahraga): dalam menit
- **Heart_Rate** (Detak Jantung): dalam bpm
- **Body_Temp** (Suhu Tubuh): dalam °C

### Target Variable (y)
- **Calories** (Kalori Terbakar): dalam kkal

---

# Skema Alur Proses ML

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           1. DATA COLLECTION                                │
│  Mengunduh dataset dari Kaggle (kushagrakinjawadekar/calories-burned-      │
│  predicition) yang terdiri dari 2 file:                                    │
│  - calories.csv (15000 baris, 2 kolom)                                    │
│  - exercise.csv (15000 baris, 8 kolom)                                    │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                        2. LOAD & MERGE DATA                                │
│  - Load kedua file CSV                                                     │
│  - Merge berdasarkan User_ID dengan inner join                              │
│  - Hasil: 15000 baris, 9 kolom                                            │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                        3. DATA PREPROCESSING                               │
│  ├── 3.1 Cek Duplikat → Tidak ada data duplikat                           │
│  ├── 3.2 EDA Awal → Info dataset, missing values check                     │
│  ├── 3.3 Statistik Deskriptif → Mean, median, std, min, max              │
│  ├── 3.4 Visualisasi Distribusi → Histogram setiap fitur                  │
│  ├── 3.5 Deteksi Outlier → Boxplot analysis                                │
│  ├── 3.6 Analisis Korelasi → Pearson correlation dengan target           │
│  └── 3.7 Pairplot → Hubungan pairwise antar fitur                         │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                        4. FEATURE ENGINEERING                             │
│  ├── Drop User_ID (identifier, tidak relevan untuk prediksi)              │
│  ├── Label Encoding Gender: male=0, female=1                              │
│  ├── Outlier Handling: Winsorizing dengan batas medis/fisiologis          │
│  │   - Age: [1, 120] tahun                                                 │
│  │   - Height: [50, 250] cm                                               │
│  │   - Weight: [2, 300] kg                                                │
│  │   - Duration: [1, 600] menit                                           │
│  │   - Heart_Rate: [40, 220] bpm                                          │
│  │   - Body_Temp: [35.0, 42.0] °C                                         │
│  │   - Calories: [0, 10000] kkal                                          │
│  └── Feature Scaling: StandardScaler (mean=0, std=1)                     │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                        5. DATA SPLITTING                                   │
│  3 Skenario:                                                               │
│  - 70:30 (10500 train, 4500 test)                                         │
│  - 80:20 (12000 train, 3000 test)                                         │
│  - 90:10 (13500 train, 1500 test)                                         │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                        6. MODEL TRAINING                                  │
│  ├── Definisikan 3 model:                                                  │
│  │   - Linear Regression                                                   │
│  │   - Ridge Regression (dengan GridSearchCV untuk alpha)                 │
│  │   - Random Forest (dengan RandomizedSearchCV untuk hyperparameters)    │
│  └── 10-Fold Cross-Validation pada semua data                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                        7. HYPERPARAMETER TUNING                          │
│  ├── Ridge: GridSearchCV dengan alpha = [0.001, 0.01, 0.1, 1, 10, 100]  │
│  │   → Best alpha: 0.1                                                    │
│  └── Random Forest: RandomizedSearchCV (50 iterasi)                       │
│      - n_estimators: [50, 100, 200]                                        │
│      - max_depth: [5, 10, 15, 20, None]                                    │
│      - min_samples_split: [2, 5, 10]                                      │
│      - min_samples_leaf: [1, 2, 4]                                       │
│      → Best: n_estimators=200, max_depth=20, min_samples_split=2         │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                        8. MODEL EVALUATION                                 │
│  Evaluasi pada 3 skenario split dengan metrik:                           │
│  - MSE (Mean Squared Error)                                               │
│  - RMSE (Root Mean Squared Error)                                         │
│  - MAE (Mean Absolute Error)                                              │
│  - R² (Coefficient of Determination)                                      │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                        9. MODEL SELECTION                                   │
│  Berdasarkan hasil evaluasi, dipilih:                                     │
│  - Model: Random Forest                                                   │
│  - Skenario: 90:10                                                         │
│  - R² Score: 0.9984                                                        │
│  - MSE: 6.48, RMSE: 2.55, MAE: 1.60                                       │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                        10. MODEL DEPLOYMENT                                │
│  - Training model final dengan semua data                                 │
│  - Save model: best_model_random_forest.joblib                             │
│  - Save scaler: scaler.joblib                                              │
│  - Contoh penggunaan untuk prediksi                                       │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

# Penjelasan Detail Setiap Tahap

## 1. Import Libraries

### Library yang Digunakan:

| Library | Fungsi | Alasan Penggunaan |
|---------|--------|-------------------|
| `pandas` | Data manipulation | Membaca, memanipulasi dataframe |
| `numpy` | Numerical operations | Komputasi array dan matematika |
| `matplotlib.pyplot` | Visualisasi dasar | Membuat plot dan chart |
| `seaborn` | Visualisasi tingkat lanjut | Plot statistik yang lebih menarik |
| `kagglehub` | Download dataset | Mengunduh data dari Kaggle |
| `sklearn` | ML tools | Preprocessing, modeling, evaluasi |
| `joblib` | Model persistence | Menyimpan model ke file |
| `warnings` | Error handling | Menghindari warning yang tidak penting |

### Alasan Penggunaan:
- pandas dan numpy adalah standar industri untuk data manipulation
- matplotlib dan seaborn menyediakan visualisasi yang informatif
- kagglehub memudahkan download dataset dari Kaggle tanpa perlu manual download
- sklearn menyediakan semua tools ML yang diperlukan (preprocessing, modeling, evaluasi)
- joblib lebih efisien untuk menyimpan model sklearn dibandingkan pickle

---

## 2. Data Collection

### Sumber Dataset:
- **Dataset**: `kushagrakinjawadekar/calories-burned-predicition`
- **Platform**: Kaggle
- **Total Records**: 15,000

### Struktur Dataset:
- **calories.csv**: Berisi User_ID dan Calories (target)
- **exercise.csv**: Berisi informasi exercise dan profil pengguna

### Alasan Penggunaan:
- Dataset dari Kaggle sudah terstruktur dan terverifikasi
- Kombinasi dua file memberikan informasi lengkap untuk modeling
- Jumlah data 15,000 cukup besar untuk training yang baik

---

## 3. Load dan Merge Dataset

### Proses:
1. Load `calories.csv` → Shape: (15000, 2)
2. Load `exercise.csv` → Shape: (15000, 8)
3. Merge berdasarkan `User_ID` dengan `how='inner'`
4. Hasil merge → Shape: (15000, 9)

### Kolom Hasil Merge:
- User_ID, Calories, Gender, Age, Height, Weight, Duration, Heart_Rate, Body_Temp

### Alasan Penggunaan:
- Merge menggunakan User_ID sebagai key karena kedua dataset memiliki hubungan one-to-one
- Inner join memastikan hanya record yang匹配 saja yang diambil

---

## 4. Eksplorasi Data Analysis (EDA)

### 4.1 Inspeksi Awal Data

**Hasil:**
- 15,000 baris, 9 kolom
- Tidak ada missing values pada semua kolom
- Tipe data: float64 (6), int64 (2), object (1)

**Alasan Penggunaan:**
- Memeriksa missing values penting untuk menentukan perlu tidaknya handling missing data
- Memahami tipe data membantu dalam pemilihan teknik preprocessing

---

### 4.2 Statistik Deskriptif

**Fitur Numerik:**
| Fitur | Mean | Std | Min | Max |
|-------|------|-----|-----|-----|
| Age | 42.79 | 20.24 | 15 | 79 |
| Height | 174.47 | 10.65 | 150 | 198 |
| Weight | 74.97 | 15.35 | 40 | 120 |
| Duration | 15.53 | 9.73 | 1 | 30 |
| Heart_Rate | 95.52 | 16.08 | 60 | 140 |
| Body_Temp | 40.03 | 1.18 | 36.2 | 41.5 |
| Calories | 107.70 | 67.24 | 0 | 450 |

**Fitur Kategorik:**
- Gender: 2 nilai unik (male: 7553, female: 7447)

**Alasan Penggunaan:**
- Statistik deskriptif membantu memahami distribusi data
- Mengidentifikasi rentang nilai yang tidak masuk akal
- Memahami keseimbangan data kategorik

---

### 4.3 Visualisasi Distribusi (Histogram)

**Tujuan:**
- Melihat distribusi setiap fitur numerik
- Identifikasi skewness (kiri/kanan)
- Deteksi outlier secara visual

**Fitur yang divisualisasikan:**
- Age, Height, Weight, Duration, Heart_Rate, Body_Temp, Calories

**Alasan Penggunaan:**
- Histogram menunjukkan bentuk distribusi data
- Menambahkan garis mean (merah) dan median (hijau) membantu memahami central tendency
- Distribusi yang sangat skew mungkin memerlukan transformasi

---

### 4.4 Deteksi Outlier (Boxplot)

**Tujuan:**
- Identifikasi outlier dengan visual
- Memahami variabilitas data

**Alasan Penggunaan:**
- Boxplot memberikan visualisasi jelas tentang outliers (titik di luar whisker)
- Membantu memutuskan apakah outlier perlu ditangani
- Pada notebook ini, outlier ditangani dengan winsorizing menggunakan batas medis

---

### 4.5 Analisis Korelasi Pearson

**Korelasi dengan Calories (Target):**

| Fitur | Korelasi | Interpretasi |
|-------|----------|---------------|
| Duration | 0.9554 | Sangat kuat (+) |
| Heart_Rate | 0.8979 | Sangat kuat (+) |
| Body_Temp | 0.8246 | Kuat (+) |
| Age | 0.1544 | Lemah (+) |
| Weight | 0.0355 | Sangat lemah (+) |
| Height | 0.0175 | Sangat lemah (+) |
| User_ID | -0.0017 | Tidak berkorelasi |

**Alasan Penggunaan:**
- Korelasi tinggi menunjukkan fitur tersebut sangat berpengaruh terhadap target
- Duration, Heart_Rate, dan Body_Temp adalah predictor utama
- User_ID tidak berkorelasi karena hanya identifier
- Korelasi antar fitur (multikolinearitas) penting untuk model linear

**Heatmap Korelasi:**
- Menunjukkan korelasi antar semua fitur numerik
- Berguna untuk mendeteksi multikolinearitas
- Tidak ada korelasi tinggi antar fitur (>0.7) yang signifikan

---

### 4.6 Pairplot

**Tujuan:**
- Visualisasi scatter plot pairwise
- Melihat hubungan non-linear antar fitur

**Alasan Penggunaan:**
- Melihat pola yang tidak tertangkap korelasi linear
- Membantu dalam pemilihan model (linear vs non-linear)
- Diagonal menunjukkan distribusi setiap fitur (KDE)

---

### 4.7 Kesimpulan EDA

1. **Missing Values**: Dataset lengkap tanpa missing values
2. **Outlier**: Boxplot menunjukkan adanya outlier pada beberapa fitur
3. **Korelasi**: Duration, Heart_Rate, dan Body_Temp adalah predictor utama
4. **User_ID**: Akan dihapus karena hanya identifier
5. **Gender**: Memerlukan encoding karena variabel kategorik

---

## 5. Data Preprocessing

### 5.1 Drop Fitur Tidak Relevan

**Proses:**
```python
df_clean = df.drop('User_ID', axis=1)
```

**Alasan:**
- User_ID hanya identifier unik tanpa nilai prediktif
- Menghapus fitur yang tidak relevan mengurangi noise dan kompleksitas model
- Shape berubah dari (15000, 9) ke (15000, 8)

---

### 5.2 Encoding Variabel Kategorik

**Proses:**
```python
df_clean['Gender'] = df_clean['Gender'].map({'male': 0, 'female': 1})
```

**Hasil:**
- Sebelum: ['male', 'female']
- Sesudah: [0, 1]

**Alasan:**
- Machine learning memerlukan input numerik
- Label encoding dipilih karena hanya ada 2 kategori (biner)
- Alternatif lain: One-Hot Encoding (tidak diperlukan untuk 2 kategori)

---

### 5.3 Penanganan Outlier (Winsorizing)

**Batas Medis/Fisiologis yang Digunakan:**

| Fitur | Batas Bawah | Batas Atas | Referensi |
|-------|-------------|------------|-----------|
| Age | 1 | 120 | Rentang usia manusia |
| Height | 50 | 250 | Bayi baru lahir - manusia tertinggi |
| Weight | 2 | 300 | Bayi - berat maksimum tercatat |
| Duration | 1 | 600 | 1 menit - 10 jam (ultra-endurance) |
| Heart_Rate | 40 | 220 | Atlet istirahat - HR maks teoritis |
| Body_Temp | 35.0 | 42.0 | Hipotermia - hiperpireksia |
| Calories | 0 | 10000 | Min - aktivitas ekstrem |

**Metode: Winsorizing (Capping)**
- Nilai di bawah batas bawah → diganti dengan batas bawah
- Nilai di atas batas atas → diganti dengan batas atas

**Alasan Penggunaan:**
- **Mengapa bukan IQR?**: Metode IQR dapat menghasilkan batas tidak realistis (usia negatif, kalori negatif)
- **Mengapa Winsorizing?**: Mempertahankan ukuran dataset sambil memastikan data dalam rentang biologis
- **Mengapa Batas Medis?**: Berdasarkan referensi fisiologi manusia yang masuk akal

**Hasil:**
- Tidak ada outlier ditemukan dalam dataset (semua nilai sudah dalam rentang medis)
- Winsorizing tetap dilakukan sebagai langkah preprocess yang robust

---

### 5.4 Pemisahan Fitur dan Target

**Proses:**
```python
X = df_clean.drop('Calories', axis=1)
y = df_clean['Calories']
```

**Hasil:**
- X: Shape (15000, 7) - 7 fitur
- y: Shape (15000,) - target

**Fitur (X):** Gender, Age, Height, Weight, Duration, Heart_Rate, Body_Temp

**Alasan:**
- Pemisahan fitur dan target adalah langkah fundamental dalam ML
- X adalah variabel independen (predictor)
- y adalah variabel dependen (target yang akan diprediksi)

---

### 5.5 Feature Scaling (StandardScaler)

**Proses:**
```python
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)
```

**Hasil:**
- Sebelum: Fitur dengan skala berbeda (Age: 15-79, Duration: 1-30, dll)
- Sesudah: Semua fitur memiliki mean=0 dan std=1

**Alasan Penggunaan:**

1. **Untuk Linear/Ridge Regression:**
   - Koefisien model sensitif terhadap skala fitur
   - Fitur dengan skala besar dapat mendominasi
   - Standardization memastikan semua fitur berkontribusi seimbang

2. **Untuk Random Forest:**
   - Tree-based models tidak sensitif terhadap scaling
   - Tetapi tetap dilakukan untuk konsistensi

3. **Metode yang Dipilih: StandardScaler (Z-score normalization)**
   - Rumus: z = (x - mean) / std
   - Menghasilkan distribusi dengan mean=0, std=1
   - Tidak mengubah bentuk distribusi (berbeda dengan MinMax)

---

## 6. Data Splitting Experiments

### 3 Skenario yang Diuji:

| Skenario | Training | Testing | Alasan |
|----------|----------|---------|--------|
| 70:30 | 10,500 (70%) | 4,500 (30%) | Lebih banyak data untuk testing |
| 80:20 | 12,000 (80%) | 3,000 (20%) | Standar umum |
| 90:10 | 13,500 (90%) | 1,500 (10%) | Lebih banyak data untuk training |

**Alasan Penggunaan:**
- Membandingkan performa dengan berbagai ukuran train/test
- Mendeteksi apakah model sensitif terhadap ukuran data
- random_state=42 untuk reproducibility

**Kenapa Tidak Hanya Satu Skenario?**
- Jumlah data yang berbeda dapat menghasilkan performa berbeda
- Membantu memilih split ratio optimal
- Menghindari overfitting/underfitting akibat split yang tidak tepat

---

## 7. Model Training dengan 10-Fold Cross-Validation

### 7.1 Definisi Model

**Model yang Digunakan:**

1. **Linear Regression**
   - Bentuk: y = β₀ + β₁x₁ + β₂x₂ + ... + βₙxₙ
   - Sederhana, cepat, interpretable
   - Cocok sebagai baseline

2. **Ridge Regression**
   - Bentuk: y = β₀ + β₁x₁ + ... + βₙxₙ + α(Σβᵢ²)
   - Menambahkan L2 regularization
   - Mencegah overfitting pada fitur yang saling berkorelasi

3. **Random Forest Regression**
   - Ensemble dari multiple decision trees
   - Menghandle non-linearitas dengan baik
   - Resistant terhadap overfitting

**Alasan Penggunaan:**
- Linear dan Ridge untuk menangkap hubungan linear
- Random Forest untuk menangkap hubungan non-linear dan kompleks
- Ketiga model memberikan variasi yang baik untuk perbandingan

---

### 7.2 10-Fold Cross-Validation

**Proses:**
1. Data dibagi menjadi 10 fold (bagian)
2. Pada setiap iterasi: 9 fold untuk training, 1 fold untuk validation
3. Ulangi 10 kali (setiap fold menjadi validation once)
4. Rata-rata skor dari 10 iterasi sebagai performa final

**Hasil 10-Fold CV:**

| Model | Mean R² | Std Dev |
|-------|---------|---------|
| Linear Regression | 0.9671 | ±0.0011 |
| Ridge Regression | 0.9671 | ±0.0011 |
| Random Forest | 0.9981 | ±0.0003 |

**Alasan Penggunaan:**

1. **Menghindari Overfitting:**
   - Validasi pada multiple folds memberikan estimasi yang lebih reliable
   - Mengurangi variasi dalam оценка model

2. **Menggunakan Data Secara Efisien:**
   - Setiap data point digunakan untuk training 9 kali dan validation 1 kali
   - Lebih efisien dibandingkan single train-test split

3. **Std Dev Rendah = Konsisten:**
   - Random Forest menunjukkan std dev sangat rendah (±0.0003)
   - Menunjukkan performa stabil di semua fold

---

## 8. Hyperparameter Tuning

### 8.1 Ridge Regression - GridSearchCV

**Parameter yang Dituning: `alpha` (regularization strength)**

**Grid yang Diuji:** [0.001, 0.01, 0.1, 1, 10, 100, 1000]

**Hasil:**
- Best Alpha: 0.1
- Best R² Score: 0.9672

**Visualisasi:**
- Plot menunjukkan hubungan antara alpha dan R² score
- Alpha 0.1 memberikan performa terbaik

**Alasan Penggunaan:**
- GridSearchCV mencoba semua kombinasi parameter secara sistematis
- alpha mengontrol kekuatan regularization:
  - α kecil → regularization lemah (mendekati Linear Regression)
  - α besar → regularization kuat (koefisien mendekati 0)
- Nilai 0.1 menunjukkan regularization ringan sudah cukup

---

### 8.2 Random Forest - RandomizedSearchCV

**Parameter yang Dituning:**

| Parameter | Nilai yang Diuji |
|-----------|-----------------|
| n_estimators | [50, 100, 200] |
| max_depth | [5, 10, 15, 20, None] |
| min_samples_split | [2, 5, 10] |
| min_samples_leaf | [1, 2, 4] |

**Konfigurasi:**
- n_iter: 50 (jumlah kombinasi yang diuji)
- cv: 10-fold
- Metrik: R²

**Hasil:**
- Best Parameters: `n_estimators=200, max_depth=20, min_samples_split=2, min_samples_leaf=1`
- Best R² Score: 0.9981

**Alasan Penggunaan:**

1. **Mengapa RandomizedSearchCV?**
   - Kombinasi parameter lebih banyak (3×5×3×3 = 135 kombinasi)
   - RandomizedSearch lebih efisien untuk ruang parameter besar
   - 50 iterasi sudah cukup untuk menemukan kombinasi optimal

2. **Penjelasan Parameter:**
   - `n_estimators=200`: Jumlah trees (semakin banyak, semakin stabil tapi lebih lambat)
   - `max_depth=20`: Kedalaman maksimum tree (mencegah overfitting)
   - `min_samples_split=2`: Minimum sample untuk split (semakin kecil, lebih detail)
   - `min_samples_leaf=1`: Minimum sample di leaf node

**Feature Importance dari Random Forest:**

| Fitur | Importance |
|-------|------------|
| Duration | Tertinggi |
| Body_Temp | Tinggi |
| Heart_Rate | Tinggi |
| Age | Sedang |
| Weight | Rendah |
| Height | Rendah |
| Gender | Rendah |

**Interpretasi:**
- Duration, Body_Temp, dan Heart_Rate adalah fitur paling penting
- Konsisten dengan analisis korelasi sebelumnya

---

## 9. Evaluasi Model pada 3 Skenario

### Metrik Evaluasi:

1. **MSE (Mean Squared Error)**
   - Rata-rata kuadrat selisih prediksi dan aktual
   - Mengukur besaran error
   - Tidak sensitif terhadap arah error

2. **RMSE (Root Mean Squared Error)**
   - Akar kuadrat dari MSE
   - Sama skala dengan target (lebih interpretable)

3. **MAE (Mean Absolute Error)**
   - Rata-rata nilai absolut error
   - Lebih robust terhadap outlier dibandingkan MSE

4. **R² (Coefficient of Determination)**
   - Proporsi varians yang dijelaskan oleh model
   - Nilai 1 = perfect, 0 = hanya menggunakan mean
   - Interpretasi: 0.9984 = model menjelaskan 99.84% varians

### Hasil Evaluasi (Test Set):

**Skenario 70:30:**
| Model | MSE | RMSE | MAE | R² |
|-------|-----|------|-----|-----|
| Linear Regression | 132.92 | 11.53 | 8.45 | 0.9663 |
| Ridge Regression | 132.92 | 11.53 | 8.45 | 0.9663 |
| Random Forest | 8.42 | 2.90 | 1.81 | 0.9979 |

**Skenario 80:20:**
| Model | MSE | RMSE | MAE | R² |
|-------|-----|------|-----|-----|
| Linear Regression | 132.00 | 11.49 | 8.44 | 0.9673 |
| Ridge Regression | 132.00 | 11.49 | 8.44 | 0.9673 |
| Random Forest | 6.99 | 2.64 | 1.69 | 0.9983 |

**Skenario 90:10:**
| Model | MSE | RMSE | MAE | R² |
|-------|-----|------|-----|-----|
| Linear Regression | 129.59 | 11.38 | 8.24 | 0.9670 |
| Ridge Regression | 129.60 | 11.38 | 8.24 | 0.9670 |
| Random Forest | 6.48 | 2.55 | 1.60 | 0.9984 |

---

## 10. Pemilihan Model Terbaik

### Kriteria Pemilihan:
- **R² Score tertinggi** (menjelaskan varians paling banyak)
- **MSE/RMSE/MAE terendah** (error terkecil)
- **Konsistensi** antar skenario split

### Model Terpilih:

| Aspek | Nilai |
|-------|-------|
| **Model** | Random Forest |
| **Skenario Split** | 90:10 |
| **R² Score** | 0.9984 |
| **MSE** | 6.48 |
| **RMSE** | 2.55 |
| **MAE** | 1.60 |

### Alasan Pemilihan:

1. **Performa Tertinggi:**
   - R² 0.9984 berarti model menjelaskan 99.84% varians dalam data
   - RMSE 2.55 kkal - error sangat kecil untuk prediksi kalori

2. **Random Forest > Linear/Ridge:**
   - Random Forest menangkap hubungan non-linear yang tidak bisa ditangkap model linear
   - Feature importance menunjukkan Duration, Body_Temp, Heart_Rate sangat penting

3. **Skenario 90:10:**
   - Memberikan performa tertinggi
   - Dengan 13,500 data training, model memiliki cukup data untuk belajar dengan baik

4. **Gap Train-Test:**
   - Train R²: 0.9997, Test R²: 0.9984
   - Gap sangat kecil (~0.13%) menunjukkan tidak ada overfitting

---

## 11. Model Deployment

### Model yang Disimpan:
1. **best_model_random_forest.joblib** - Model Random Forest yang sudah dituning
2. **scaler.joblib** - StandardScaler untuk transformasi data baru

### Cara Penggunaan:

```python
# Load model dan scaler
loaded_model = joblib.load('best_model_random_forest.joblib')
loaded_scaler = joblib.load('scaler.joblib')

# Data baru untuk prediksi
new_data = pd.DataFrame({
    'Gender': [0],
    'Age': [30],
    'Height': [175],
    'Weight': [75],
    'Duration': [45],
    'Heart_Rate': [140],
    'Body_Temp': [37.5]
})

# Scaling data baru
new_data_scaled = loaded_scaler.transform(new_data)

# Prediksi
prediction = loaded_model.predict(new_data_scaled)
# Hasil: ~242.79 kkal
```

### Catatan Penting:
- Data baru harus melalui proses scaling yang sama
- Input harus dalam format yang sama dengan training data
- Gender: 0 = male, 1 = female

---

## 12. Kesimpulan dan Rekomendasi

### Ringkasan Proyek:

1. **Dataset**: 15,000 records dengan 7 fitur untuk prediksi kalori
2. **Preprocessing**: Drop User_ID, encoding gender, winsorizing outlier, standardisasi
3. **3 Model**: Linear Regression, Ridge Regression, Random Forest
4. **3 Skenario Split**: 70:30, 80:20, 90:10
5. **Cross-Validation**: 10-fold CV untuk evaluasi yang reliable
6. **Hyperparameter Tuning**: GridSearchCV (Ridge), RandomizedSearchCV (Random Forest)

### Model Terbaik:
- **Random Forest** dengan skenario **90:10**
- **R² Score: 0.9984** (menjelaskan 99.84% varians)
- **RMSE: 2.55 kkal** (error sangat kecil)

### Rekomendasi untuk Produksi:

1. **Gunakan model Random Forest** yang sudah disimpan
2. **Pastikan preprocessing yang sama** untuk data baru:
   - Label encoding untuk Gender
   - StandardScaler untuk semua fitur
3. **Monitor performa secara berkala** dengan data baru
4. **Pertimbangkan retraining** jika:
   - Performa menurun signifikan
   - Ada perubahan signifikan dalam distribusi data
   - Setelah periode waktu tertentu (misal: 6 bulan)

### Kelebihan Model:
- Akurasi sangat tinggi (R² > 0.99)
- Error relatif kecil (RMSE ~2.5 kkal)
- Tidak overfitting (gap train-test sangat kecil)
- Feature importance konsisten dengan domain knowledge

### Keterbatasan:
- Hanya untuk prediksi kalori based on exercise parameters
- Tidak mempertimbangkan faktor lain (jenis olahraga spesifik, intensitas, dll)
- Model black-box (tidak mudah diinterpretasi seperti linear regression)

---

## Lampiran: Struktur File

```
calories/
├── calories_predict.ipynb     # Notebook utama
├── best_model_random_forest.joblib  # Model untuk deploy
├── scaler.joblib              # Scaler untuk preprocessing
└── README.md                  # Dokumentasi (jika ada)
```

---

**Catatan**: Dokumentasi ini dibuat berdasarkan analisis kritis terhadap notebook `calories_predict.ipynb`. Semua penjelasan didasarkan pada praktik machine learning terbaik dan alasan ilmiah yang mendukung setiap keputusan.