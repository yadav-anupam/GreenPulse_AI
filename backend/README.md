# GreenPulse AI backend

FastAPI service for GreenPulse AI energy prediction and anomaly detection.

## Run locally

From the repository root:

```powershell
npm run backend:install
npm run backend:dev
```

Health check: `http://localhost:8000/health`

Interactive API docs: `http://localhost:8000/docs`

## API

### Energy prediction

`POST /api/v1/energy/predict`

The prototype model uses representative synthetic campus data and a Random Forest regressor. It is an engineering prototype, not a validated campus forecasting model.

### Anomaly detection

`POST /api/v1/anomalies`

Accepts actual and expected kWh and returns percentage deviation and severity.

## Deployment

The repository includes `render.yaml` for a Render Web Service. Configure the frontend's `VITE_API_BASE_URL` to the deployed API origin and redeploy the Vercel frontend.

Before claiming production accuracy, replace the synthetic training data with real campus meter/occupancy/weather data and evaluate on a held-out test set.
