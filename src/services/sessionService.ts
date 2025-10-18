import axios from 'axios';
import type { ApiResponse, Session } from '../types';

const API_URL = '/api';

export const sessionService = {
  async getSessions(filters?: {
    companyId?: string;
    userId?: string;
    status?: string;
    from?: string;
    to?: string;
    skip?: number;
    limit?: number;
    showAll?: boolean;
  }): Promise<ApiResponse> {
    try {
      const params = new URLSearchParams();
      if (filters?.companyId && filters.companyId !== '') params.append('companyId', filters.companyId);
      if (filters?.userId && filters.userId !== '') params.append('userId', filters.userId);
      if (filters?.status && filters.status !== '') params.append('status', filters.status);
      if (filters?.from && filters.from !== '') params.append('from', filters.from);
      if (filters?.to && filters.to !== '') params.append('to', filters.to);
      if (filters?.skip !== undefined) params.append('skip', filters.skip.toString());
      if (filters?.limit !== undefined) params.append('limit', filters.limit.toString());
      if (filters?.showAll) params.append('showAll', 'true');
      
      const response = await axios.get<ApiResponse>(`${API_URL}/sessions?${params.toString()}`);
      return response.data;
    } catch (error: any) {
      console.error('Get sessions error:', error);
      return {
        ok: false,
        message: error.response?.data?.message || 'Failed to fetch sessions'
      };
    }
  },

  async exportSessions(companyId: string, from?: string, to?: string): Promise<void> {
    try {
      const params = new URLSearchParams();
      params.append('companyId', companyId);
      if (from) params.append('from', from);
      if (to) params.append('to', to);
      
      const response = await axios.get(`${API_URL}/export?${params.toString()}`, {
        responseType: 'blob'
      });
      
      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `sessions-export-${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error: any) {
      console.error('Export sessions error:', error);
      throw new Error('Failed to export sessions');
    }
  }
};
