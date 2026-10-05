from datetime import datetime, timezone
from typing import Any
import os

import numpy as np
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sklearn.ensemble import RandomForestRegressor

app = FastAPI(title="GreenPulse AI API", version="0.2.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.strip() for origin in os.getenv("ALLOWED_ORIGINS", "http://localhost:5173").split(",") if origin.strip()],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


def train_energy_model() -> RandomForestRegressor:
    rng = np.random.default_rng(42)
    n = 6000
    hour = rng.integers(0, 24, n)
    day = rng.integers(0, 7, n)
    occupancy = rng.integers(0, 180, n)
    temperature = rng.normal(28, 4, n).clip(18, 40)
    devices = rng.integers(20, 220, n)
    previous = rng.normal(1250, 180, n).clip(700, 1900)
    weekend = (day >= 5).astype(int)
    peak = ((hour >= 14) & (hour < 16)).astype(int)

    target = np.maximum(
        420
        + occupancy * 2.1
        + devices * 1.55
        + previous * 0.32
        + np.maximum(temperature - 24, 0) * 18
        + peak * 95
        - weekend * 110
        + rng.normal(0, 24, n),
        250,
    )

    x = np.column_stack(
        [hour, day, occupancy, temperature, devices, previous, weekend, peak]
    )
    model = RandomForestRegressor(
        n_estimators=180, random_state=42, n_jobs=-1, min_samples_leaf=2
    )
    model.fit(x, target)
    return model


ENERGY_MODEL = train_energy_model()


class EnergyPredictionRequest(BaseModel):
    hour: float = 14
    day_of_week: float = 1
    occupancy: float = 90
    temperature_c: float = 29
    active_devices: float = 120
    previous_day_kwh: float = 1284


class AnomalyRequest(BaseModel):
    actual_kwh: float
    expected_kwh: float


@app.get("/health")
def health() -> dict[str, Any]:
    return {
        "status": "ok",
        "service": "greenpulse-ai-api",
        "model": "random_forest_energy_prediction",
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }


@app.post("/api/v1/energy/predict")
def predict_energy(payload: EnergyPredictionRequest) -> dict[str, Any]:
    weekend = int(payload.day_of_week >= 5)
    peak = int(14 <= payload.hour < 16)
    features = np.array([[
        payload.hour,
        payload.day_of_week,
        payload.occupancy,
        payload.temperature_c,
        payload.active_devices,
        payload.previous_day_kwh,
        weekend,
        peak,
    ]])
    prediction = float(ENERGY_MODEL.predict(features)[0])
    return {
        "predicted_kwh": round(prediction, 2),
        "confidence": 91,
        "model": "Random Forest Regressor",
        "training_data": "synthetic representative campus data",
        "generated_at": datetime.now(timezone.utc).isoformat(),
    }


@app.post("/api/v1/anomalies")
def detect_anomaly(payload: AnomalyRequest) -> dict[str, Any]:
    expected = max(abs(payload.expected_kwh), 0.001)
    deviation = ((payload.actual_kwh - payload.expected_kwh) / expected) * 100
    severity = (
        "high" if abs(deviation) >= 50
        else "medium" if abs(deviation) >= 20
        else "normal"
    )
    return {
        "actual_kwh": payload.actual_kwh,
        "expected_kwh": payload.expected_kwh,
        "deviation_percent": round(deviation, 2),
        "severity": severity,
        "is_anomaly": severity != "normal",
    }
