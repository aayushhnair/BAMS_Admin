import axios from 'axios';
import type { ApiResponse, Location } from '../types';

const API_URL = '/api';

export const locationService = {
  async getLocations(companyId?: string): Promise<ApiResponse> {
    try {
      const params = companyId ? `?companyId=${companyId}` : '';
      const response = await axios.get<ApiResponse>(`${API_URL}/locations${params}`);
      return response.data;
    } catch (error: any) {
      console.error('Get locations error:', error);
      return {
        ok: false,
        message: error.response?.data?.message || 'Failed to fetch locations'
      };
    }
  },

  async createLocation(locationData: {
    name: string;
    lat: number;
    lon: number;
    radiusMeters: number;
    companyId: string;
  }): Promise<ApiResponse> {
    try {
      const response = await axios.post<ApiResponse>(`${API_URL}/locations`, locationData);
      return response.data;
    } catch (error: any) {
      console.error('Create location error:', error);
      return {
        ok: false,
        message: error.response?.data?.message || 'Failed to create location'
      };
    }
  },

  async deleteLocation(id: string): Promise<ApiResponse> {
    try {
      const response = await axios.post<ApiResponse>(`${API_URL}/locations/delete`, { id });
      return response.data;
    } catch (error: any) {
      console.error('Delete location error:', error);
      return {
        ok: false,
        message: error.response?.data?.message || 'Failed to delete location'
      };
    }
  }
};
