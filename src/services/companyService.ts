import axios from 'axios';
import type { ApiResponse } from '../types';
import { API_URL } from '../config/api';

export const companyService = {
  async getCompanies(): Promise<ApiResponse> {
    try {
      const response = await axios.get<ApiResponse>(`${API_URL}/companies`);
      return response.data;
    } catch (error: any) {
      console.error('Get companies error:', error);
      return {
        ok: false,
        message: error.response?.data?.message || 'Failed to fetch companies'
      };
    }
  },

  async createCompany(companyData: {
    name: string;
    timezone: string;
    settings: {
      sessionTimeoutHours: number;
      heartbeatMinutes: number;
    };
  }): Promise<ApiResponse> {
    try {
      const response = await axios.post<ApiResponse>(`${API_URL}/companies`, companyData);
      return response.data;
    } catch (error: any) {
      console.error('Create company error:', error);
      return {
        ok: false,
        message: error.response?.data?.message || 'Failed to create company'
      };
    }
  }
};
