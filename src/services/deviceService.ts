import axios from 'axios';
import type { ApiResponse, Device } from '../types';

const API_URL = '/api';

export const deviceService = {
  async registerDevice(deviceData: {
    deviceId: string;
    serial?: string;
    name: string;
    companyId: string;
  }): Promise<ApiResponse> {
    try {
      const response = await axios.post<ApiResponse>(`${API_URL}/device/register`, deviceData);
      return response.data;
    } catch (error: any) {
      console.error('Register device error:', error);
      return {
        ok: false,
        message: error.response?.data?.message || 'Failed to register device'
      };
    }
  },

  async getDevices(companyId?: string): Promise<ApiResponse & { devices?: Device[] }> {
    try {
      const params = companyId ? { companyId } : {};
      const response = await axios.get<ApiResponse & { devices?: Device[] }>(
        `${API_URL}/device`,
        { params }
      );
      return response.data;
    } catch (error: any) {
      console.error('Get devices error:', error);
      return {
        ok: false,
        message: error.response?.data?.message || 'Failed to load devices',
        devices: []
      };
    }
  },

  async deleteDevice(id: string): Promise<ApiResponse> {
    try {
      const response = await axios.delete<ApiResponse>(`${API_URL}/device/${id}`);
      return response.data;
    } catch (error: any) {
      console.error('Delete device error:', error);
      return {
        ok: false,
        message: error.response?.data?.message || 'Failed to delete device'
      };
    }
  }
};

