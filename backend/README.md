# GreenPulse AI backend

FastAPI service for the GreenPulse prototype.

## Run locally

```powershell
npm run backend:install
npm run backend:dev
```

Health check: `http://localhost:8000/health`

The waiting-time endpoint is intentionally retained only as a temporary scaffold for model-serving infrastructure. It is **not** the GreenPulse energy model. Replace it with the trained energy prediction model before presenting prediction metrics as real results.
