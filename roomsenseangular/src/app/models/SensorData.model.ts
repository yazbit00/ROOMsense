export interface SensorData {
  deviceId: string;
  timestamp: number;
  temperature: number;
  humidity: number;
  _ts: number;
}

export interface Devices {
  deviceId: string;
}
