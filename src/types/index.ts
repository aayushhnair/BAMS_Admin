// API Response Types
export interface ApiResponse<T = any> {
  ok: boolean;
  message?: string;
  data?: T;
  [key: string]: any;
}

// Auth Types
export interface LoginPayload {
  username: string;
  password: string;
  deviceId: string;
  location: {
    lat: number;
    lon: number;
    accuracy: number;
    ts: string;
  };
}

export interface SessionData {
  sessionId: string;
  userId: string;
  deviceId: string;
  loginAt: string;
  lastHeartbeat: string;
  status: string;
}

export interface User {
  _id: string;
  username: string;
  displayName: string;
  role: 'admin' | 'employee';
  companyId?: string;
  assignedDeviceId?: string;
  allocatedLocationId?: string;
}

// Company Types
export interface Company {
  _id: string;
  name: string;
  timezone: string;
  settings: {
    sessionTimeoutHours: number;
    heartbeatMinutes: number;
  };
  createdAt: string;
}

// Device Types
export interface Device {
  _id?: string;
  id?: string;
  deviceId: string;
  serial?: string;
  deviceName?: string;
  name?: string;
  companyId: string;
  companyName?: string;
  registeredAt?: string;
  lastSeen?: string;
}

// Location Types
export interface Location {
  _id?: string;
  id?: string;
  name: string;
  coords?: {
    type: string;
    coordinates: [number, number]; // [lon, lat]
  };
  lat?: number;
  lon?: number;
  radiusMeters: number;
  companyId: string;
  createdAt?: string;
}

// Session Types
export interface Session {
  _id: string;
  sessionId?: string;
  companyId: string;
  userId: string;
  userDisplayName?: string;
  deviceId: string;
  loginAt: string;
  logoutAt?: string;
  status: 'active' | 'logged_out' | 'expired' | 'auto_logged_out';
  loginLocation?: {
    type?: string;
    coordinates?: [number, number];
    lat?: number;
    lon?: number;
    accuracy?: number;
  };
  logoutLocation?: {
    type?: string;
    coordinates?: [number, number];
    lat?: number;
    lon?: number;
    accuracy?: number;
  };
  lastHeartbeat?: string;
}
