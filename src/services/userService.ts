import axios from 'axios';
import type { ApiResponse, User } from '../types';

const API_URL = '/api';

export const userService = {
  async getUsers(companyId?: string, role?: string): Promise<ApiResponse> {
    try {
      const params = new URLSearchParams();
      if (companyId) params.append('companyId', companyId);
      if (role) params.append('role', role);
      
      const response = await axios.get<ApiResponse>(`${API_URL}/users?${params.toString()}`);
      return response.data;
    } catch (error: any) {
      console.error('Get users error:', error);
      return {
        ok: false,
        message: error.response?.data?.message || 'Failed to fetch users'
      };
    }
  },

  async createUser(userData: {
    username: string;
    password: string;
    displayName: string;
    role: 'admin' | 'employee';
    companyId?: string;
    assignedDeviceId?: string;
    allocatedLocationId?: string;
  }): Promise<ApiResponse> {
    try {
      const endpoint = userData.role === 'admin' 
        ? `${API_URL}/users/create-admin`
        : `${API_URL}/users`;
      
      const response = await axios.post<ApiResponse>(endpoint, userData);
      return response.data;
    } catch (error: any) {
      console.error('Create user error:', error);
      return {
        ok: false,
        message: error.response?.data?.message || 'Failed to create user'
      };
    }
  },

  async updateUser(userId: string, updates: Partial<User>): Promise<ApiResponse> {
    try {
      const response = await axios.put<ApiResponse>(`${API_URL}/users/${userId}`, updates);
      return response.data;
    } catch (error: any) {
      console.error('Update user error:', error);
      return {
        ok: false,
        message: error.response?.data?.message || 'Failed to update user'
      };
    }
  },

  async deleteUser(userId: string): Promise<ApiResponse> {
    try {
      const response = await axios.delete<ApiResponse>(`${API_URL}/users/${userId}`);
      return response.data;
    } catch (error: any) {
      console.error('Delete user error:', error);
      return {
        ok: false,
        message: error.response?.data?.message || 'Failed to delete user'
      };
    }
  },

  async assignDevice(userId: string, deviceId: string): Promise<ApiResponse> {
    try {
      const response = await axios.post<ApiResponse>(`${API_URL}/admin/assign-device`, {
        userId,
        deviceId
      });
      return response.data;
    } catch (error: any) {
      console.error('Assign device error:', error);
      return {
        ok: false,
        message: error.response?.data?.message || 'Failed to assign device'
      };
    }
  },

  async getAvailableDevices(companyId: string): Promise<ApiResponse> {
    try {
      const response = await axios.get<ApiResponse>(`${API_URL}/users/available-devices/${companyId}`);
      return response.data;
    } catch (error: any) {
      console.error('Get available devices error:', error);
      return {
        ok: false,
        message: error.response?.data?.message || 'Failed to fetch available devices'
      };
    }
  },

  async getUserWorkReport(userId: string, type: 'daily' | 'weekly' | 'monthly' | 'yearly', date: string): Promise<ApiResponse> {
    try {
      const params = new URLSearchParams();
      params.append('userId', userId);
      params.append('type', type);
      params.append('date', date);
      
      const response = await axios.get<ApiResponse>(`${API_URL}/user-work-report?${params.toString()}`);
      return response.data;
    } catch (error: any) {
      console.error('Get user work report error:', error);
      return {
        ok: false,
        message: error.response?.data?.message || 'Failed to fetch user work report'
      };
    }
  },

  async exportUserWorkReport(userId: string, type: 'daily' | 'weekly' | 'monthly' | 'yearly', date: string): Promise<void> {
    try {
      const params = new URLSearchParams();
      params.append('userId', userId);
      params.append('type', type);
      params.append('date', date);
      
      const response = await axios.get(`${API_URL}/user-work-report/export?${params.toString()}`, {
        responseType: 'blob'
      });
      
      // Create a download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `user-report-${userId}-${type}-${date}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error: any) {
      console.error('Export user work report error:', error);
      throw new Error('Failed to export report');
    }
  }
};
