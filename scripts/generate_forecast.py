import pandas as pd
import numpy as np
from math import sin, pi
import os

# --- Load and preprocess data ---
DATASET_PATH = os.path.join(os.path.dirname(__file__), '../public/Bangalore_Weather_Dataset.csv')
OUTPUT_PATH = os.path.join(os.path.dirname(__file__), '../public/bangalore_forecast.json')

df = pd.read_csv(DATASET_PATH)

df['Formatted Date'] = pd.to_datetime(df['Formatted Date'], utc=True)
df = df.sort_values('Formatted Date').reset_index(drop=True)
df['Year'] = df['Formatted Date'].dt.year
df['Month'] = df['Formatted Date'].dt.month
df['Day'] = df['Formatted Date'].dt.day
df['Hour'] = df['Formatted Date'].dt.hour
df['DayOfWeek'] = df['Formatted Date'].dt.dayofweek
df.ffill(inplace=True)
df.dropna(inplace=True)

df['Precip Type'] = df['Precip Type'].astype('category').cat.codes
df['Summary'] = df['Summary'].astype('category').cat.codes

def estimate_rain_chance(row):
    if row['Humidity'] > 0.75 and row['Cloud Cover'] > 0.6:
        return np.random.uniform(60, 100)
    elif row['Humidity'] > 0.65 and row['Cloud Cover'] > 0.5:
        return np.random.uniform(30, 60)
    elif row['Cloud Cover'] > 0.4 and row['Humidity'] > 0.5:
        return np.random.uniform(10, 30)
    else:
        return np.random.uniform(0, 10)
df['Rain_Prob'] = df.apply(estimate_rain_chance, axis=1)

# --- Lag features ---
for lag in range(1, 7):
    df[f'Temp_lag{lag}'] = df['Temperature (C)'].shift(lag)
    df[f'Humidity_lag{lag}'] = df['Humidity'].shift(lag)
    df[f'Pressure_lag{lag}'] = df['Pressure (millibars)'].shift(lag)
    df[f'Cloud_lag{lag}'] = df['Cloud Cover'].shift(lag)
df.dropna(inplace=True)

lag_cols = []
for col in ['Temp', 'Humidity', 'Pressure', 'Cloud']:
    lag_cols += [f'{col}_lag{i}' for i in range(1, 7)]
feature_cols = lag_cols + ['Hour', 'DayOfWeek', 'Month']

X = df[feature_cols].values
y_dict = {
    'Temperature (C)': df['Temperature (C)'].values,
    'Humidity': df['Humidity'].values,
    'Pressure (millibars)': df['Pressure (millibars)'].values,
    'Cloud Cover': df['Cloud Cover'].values,
    'Precip Type': df['Precip Type'].values,
    'Summary': df['Summary'].values,
    'Rain_Prob': df['Rain_Prob'].values
}

# --- Model classes (as in your notebook) ---
class DecisionStump:
    def __init__(self):
        self.feature_index = None
        self.threshold = None
        self.left_value = None
        self.right_value = None
    def fit(self, X, y):
        m, n = X.shape
        min_error = float('inf')
        for feature in range(n):
            values = X[:, feature]
            thresholds = np.percentile(values, [20, 40, 60, 80])
            for t in np.unique(thresholds):
                left_mask = values <= t
                right_mask = ~left_mask
                if not np.any(left_mask) or not np.any(right_mask):
                    continue
                left_val = np.mean(y[left_mask])
                right_val = np.mean(y[right_mask])
                pred = np.where(left_mask, left_val, right_val)
                error = np.mean((y - pred) ** 2)
                if error < min_error:
                    self.feature_index = feature
                    self.threshold = t
                    self.left_value = left_val
                    self.right_value = right_val
                    min_error = error
    def predict(self, X):
        col = X[:, self.feature_index]
        return np.where(col <= self.threshold, self.left_value, self.right_value)

class CustomEnsembleRegressor:
    def __init__(self, n_estimators=3):
        self.n_estimators = n_estimators
        self.models = []
        self.alphas = []
    def fit(self, X, y):
        m = X.shape[0]
        weights = np.ones(m) / m
        for _ in range(self.n_estimators):
            if np.any(np.isnan(weights)) or np.sum(weights) == 0:
                weights = np.ones(m) / m
            indices = np.random.choice(m, m, p=weights)
            X_sample, y_sample = X[indices], y[indices]
            stump = DecisionStump()
            stump.fit(X_sample, y_sample)
            pred = stump.predict(X)
            error = np.sum(weights * ((y - pred) ** 2))
            error = max(error, 1e-6)
            alpha = 1 / error
            influence = np.clip(alpha * ((y - pred) ** 2), 0, 10)
            weights *= np.exp(influence)
            weights /= np.sum(weights)
            self.models.append(stump)
            self.alphas.append(alpha)
    def predict(self, X):
        total = np.zeros(X.shape[0])
        for model, alpha in zip(self.models, self.alphas):
            total += alpha * model.predict(X)
        return total / np.sum(self.alphas)

class DecisionStumpClassifier:
    def __init__(self):
        self.feature_index = None
        self.threshold = None
        self.left_class = None
        self.right_class = None
        self.classes_ = []
    def fit(self, X, y):
        m, n = X.shape
        self.classes_ = list(np.unique(y))
        min_error = float('inf')
        for feature in range(n):
            values = X[:, feature]
            thresholds = np.percentile(values, [25, 50, 75])
            for t in np.unique(thresholds):
                left_mask = values <= t
                right_mask = ~left_mask
                if not np.any(left_mask) or not np.any(right_mask):
                    continue
                left = np.bincount(y[left_mask], minlength=len(self.classes_)).argmax()
                right = np.bincount(y[right_mask], minlength=len(self.classes_)).argmax()
                pred = np.where(left_mask, left, right)
                error = np.mean(pred != y)
                if error < min_error:
                    self.feature_index = feature
                    self.threshold = t
                    self.left_class = left
                    self.right_class = right
                    min_error = error
    def predict(self, X):
        col = X[:, self.feature_index]
        return np.where(col <= self.threshold, self.left_class, self.right_class)

class CustomEnsembleClassifier:
    def __init__(self, n_estimators=3):
        self.n_estimators = n_estimators
        self.models = []
        self.alphas = []
    def fit(self, X, y):
        m = X.shape[0]
        weights = np.ones(m) / m
        for _ in range(self.n_estimators):
            if np.any(np.isnan(weights)) or np.sum(weights) == 0:
                weights = np.ones(m) / m
            indices = np.random.choice(m, m, p=weights)
            X_sample, y_sample = X[indices], y[indices]
            stump = DecisionStumpClassifier()
            stump.fit(X_sample, y_sample)
            pred = stump.predict(X)
            error = np.sum(weights * (pred != y))
            error = max(error, 1e-6)
            alpha = 0.5 * np.log((1 - error) / error)
            weights *= np.exp(-alpha * (2 * (pred == y) - 1))
            weights /= np.sum(weights)
            self.models.append(stump)
            self.alphas.append(alpha)
    def predict(self, X):
        classes = list(set(np.concatenate([model.classes_ for model in self.models])))
        scores = np.zeros((X.shape[0], len(classes)))
        class_to_index = {c: i for i, c in enumerate(classes)}
        for model, alpha in zip(self.models, self.alphas):
            preds = model.predict(X)
            for i, p in enumerate(preds):
                scores[i, class_to_index[p]] += alpha
        return np.array([classes[i] for i in np.argmax(scores, axis=1)])

# --- Train models ---
reg_targets = ['Temperature (C)', 'Humidity', 'Pressure (millibars)', 'Cloud Cover', 'Rain_Prob']
reg_models = {}
clf_targets = ['Precip Type', 'Summary']
clf_models = {}

for key in reg_targets:
    model = CustomEnsembleRegressor(n_estimators=3)
    model.fit(X, y_dict[key])
    reg_models[key] = model

for key in clf_targets:
    model = CustomEnsembleClassifier(n_estimators=3)
    model.fit(X, y_dict[key].astype(int))
    clf_models[key] = model

# --- Forecast generation ---
def seasonal_adjustment(dt):
    doy = dt.timetuple().tm_yday
    return {
        'temp_adj': 4 * sin(2 * pi * doy / 365),
        'humidity_adj': 0.1 * sin(2 * pi * doy / 365 + pi / 2),
        'pressure_adj': 4 * sin(2 * pi * doy / 365 + pi),
        'cloud_adj': 0.2 * sin(2 * pi * doy / 365 + pi / 4)
    }
def add_jitter(val, percent=0.05):
    return val * (1 + np.random.uniform(-percent, percent))
def clamp(val, min_val, max_val):
    return max(min(val, max_val), min_val)
def get_baseline(day, col):
    historical = df[(df['Month'] == day.month) & (df['Day'] == day.day)][col]
    return historical.mean() if not historical.empty else np.nan

latest_row = df.iloc[-1:].copy()
forecast_data = []
current_time = pd.Timestamp.now(tz='UTC').replace(hour=0, minute=0, second=0, microsecond=0)

for step in range(15 * 24):
    temp_features = latest_row[feature_cols].values
    pred = {key: reg_models[key].predict(temp_features)[0] for key in reg_targets}
    pred['Rain_Prob'] = clamp(add_jitter(pred['Rain_Prob']), 0, 100)
    for key in clf_targets:
        pred[key] = clf_models[key].predict(temp_features.astype(float))[0]
    season = seasonal_adjustment(current_time)
    pred['Temperature (C)'] += season['temp_adj']
    pred['Humidity'] += season['humidity_adj']
    pred['Pressure (millibars)'] += season['pressure_adj']
    pred['Cloud Cover'] += season['cloud_adj']
    pred['Temperature (C)'] = clamp(add_jitter(0.7 * pred['Temperature (C)'] + 0.3 * get_baseline(current_time, 'Temperature (C)')), 17, 38)
    pred['Humidity'] = clamp(add_jitter(0.7 * pred['Humidity'] + 0.3 * get_baseline(current_time, 'Humidity')), 0.4, 0.9)
    pred['Pressure (millibars)'] = clamp(add_jitter(0.7 * pred['Pressure (millibars)'] + 0.3 * get_baseline(current_time, 'Pressure (millibars)')), 950, 1015)
    pred['Cloud Cover'] = clamp(add_jitter(0.7 * pred['Cloud Cover'] + 0.3 * get_baseline(current_time, 'Cloud Cover')), 0.1, 0.9)
    pred['Rain_Prob'] = clamp(add_jitter(pred['Rain_Prob']), 0, 100)
    forecast_data.append({'Datetime': current_time, **pred})
    for t, prefix in zip(reg_targets, ['Temp', 'Humidity', 'Pressure', 'Cloud']):
        for lag in range(6, 1, -1):
            latest_row[f'{prefix}_lag{lag}'] = latest_row[f'{prefix}_lag{lag-1}']
        latest_row[f'{prefix}_lag1'] = pred[t]
    latest_row['Hour'] = current_time.hour
    latest_row['DayOfWeek'] = current_time.dayofweek
    latest_row['Month'] = current_time.month
    current_time += pd.Timedelta(hours=1)

forecast_df = pd.DataFrame(forecast_data)
forecast_df['Date'] = forecast_df['Datetime'].dt.date

# --- Aggregate to daily forecast ---
daily_forecast = forecast_df.groupby('Date').agg({
    'Temperature (C)': 'mean',
    'Humidity': 'mean',
    'Pressure (millibars)': 'mean',
    'Cloud Cover': 'mean',
    'Rain_Prob': 'mean',
    'Summary': lambda x: int(round(x.mode()[0]))
}).reset_index()

summary_map = dict(enumerate(df['Summary'].astype('category').cat.categories))
daily_forecast['Summary (Raw)'] = daily_forecast['Summary'].map(summary_map)

def generate_summary(row):
    if row['Rain_Prob'] > 80:
        return "Heavy Rain Expected"
    elif row['Rain_Prob'] > 60:
        return "Rain Likely"
    elif row['Rain_Prob'] > 30:
        return "Scattered Showers"
    elif row['Cloud Cover'] > 0.6:
        return "Mostly Cloudy"
    elif row['Cloud Cover'] > 0.4:
        return "Partly Cloudy"
    else:
        return "Clear Skies"
daily_forecast['Daily Summary'] = daily_forecast.apply(generate_summary, axis=1)

daily_forecast = daily_forecast[[
    'Date', 'Temperature (C)', 'Humidity', 'Pressure (millibars)', 'Cloud Cover',
    'Rain_Prob', 'Daily Summary'
]].round(2)
daily_forecast.rename(columns={'Rain_Prob': 'Rain Chance (%)'}, inplace=True)

# --- Save as JSON for frontend ---
daily_forecast.to_json(OUTPUT_PATH, orient='records', date_format='iso')
print(f"✅ Forecast generated and saved to {OUTPUT_PATH}") 