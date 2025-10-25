// API Configuration
const getApiUrl = (): string => {
  // In production (Vercel), use the full API URL with /api path
  if (import.meta.env.PROD) {
    const baseUrl = import.meta.env.VITE_API_URL || 'https://bamsserver.vercel.app';
    return `${baseUrl}/api`;
  }
  
  // In development, use proxy (which already includes /api)
  return '/api';
};

export const API_URL = getApiUrl();
export const IS_PRODUCTION = import.meta.env.PROD;
export const DEBUG_MODE = import.meta.env.VITE_DEBUG === 'true';
