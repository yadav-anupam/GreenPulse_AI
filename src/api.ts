const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");

export type EnergyPrediction = {
  predicted_kwh: number;
  confidence: number;
  model: string;
  training_data: string;
  generated_at: string;
};

export type AnomalyResult = {
  actual_kwh: number;
  expected_kwh: number;
  deviation_percent: number;
  severity: "high" | "medium" | "normal";
  is_anomaly: boolean;
};

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  if (!API_BASE_URL) throw new Error("VITE_API_BASE_URL is not configured.");
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
  });
  if (!response.ok) throw new Error(`GreenPulse API error: ${response.status}`);
  return response.json() as Promise<T>;
}

export function predictEnergy(payload: {
  hour: number;
  day_of_week: number;
  occupancy: number;
  temperature_c: number;
  active_devices: number;
  previous_day_kwh: number;
}) {
  return request<EnergyPrediction>("/api/v1/energy/predict", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function detectEnergyAnomaly(actual_kwh: number, expected_kwh: number) {
  return request<AnomalyResult>("/api/v1/anomalies", {
    method: "POST",
    body: JSON.stringify({ actual_kwh, expected_kwh }),
  });
}
