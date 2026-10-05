from datetime import datetime, timezone
from pathlib import Path
from typing import Any

import joblib
import numpy as np
from fastapi import FastAPI
from pydantic import BaseModel

ROOT = Path(__file__).resolve().parent
MODEL_PATH = ROOT / "models" / "waiting_time_model.pkl"

app = FastAPI(title="GreenPulse AI API", version="0.1.0")


class EnergyPredictionRequest(BaseModel):
    queue_length: float = 0
    active_counters: float = 1
    avg_service_time: float = 10
    appointments_next_hour: float = 0
    hour: float = 12
    day_of_week: float = 0
    peak_hour: float = 0


class EnergyPredictionResponse(BaseModel):
    prediction: float
    confidence: float
    model_status: str
    generated_at: str


class AnomalyRequest(BaseModel):
    actual_kwh: float
    expected_kwh: float


@app.get("/health")
def health() -> dict[str, Any]:
    return {
        "status": "ok",
        "service": "greenpulse-ai-api",
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }


@app.post("/api/v1/predictions/waiting-time", response_model=EnergyPredictionResponse)
def predict_waiting_time(payload: EnergyPredictionRequest) -> EnergyPredictionResponse:
    if MODEL_PATH.exists():
        model = joblib.load(MODEL_PATH)
        features = np.array([[
            payload.queue_length,
            payload.active_counters,
            payload.avg_service_time,
            payload.appointments_next_hour,
            payload.hour,
            payload.day_of_week,
            payload.peak_hour,
        ]])
        prediction = float(model.predict(features)[0])
        status = "loaded"
    else:
        # Temporary deterministic fallback until a GreenPulse energy model is trained.
        prediction = max(
            0.0,
            payload.queue_length * payload.avg_service_time /
            max(payload.active_counters, 1),
        )
        status = "fallback"

    return EnergyPredictionResponse(
        prediction=round(prediction, 2),
        confidence=0.0,
        model_status=status,
        generated_at=datetime.now(timezone.utc).isoformat(),
    )


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
