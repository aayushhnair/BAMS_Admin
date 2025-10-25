import axios from 'axios';
import type { LoginPayload, ApiResponse, User } from '../types';
import { API_URL } from '../config/api';

class AuthService {
  private sessionId: string | null = null;
  private user: User | null = null;
  private companyId: string | null = null;

  constructor() {
    // Load session from localStorage
    const stored = localStorage.getItem('bams_session');
    if (stored) {
      const data = JSON.parse(stored);
      this.sessionId = data.sessionId;
      this.user = data.user;
      this.companyId = data.companyId || data.user?.companyId || null;
    }
  }

  async login(username: string, password: string): Promise<ApiResponse> {
    const payload: LoginPayload = {
      username,
      password,
      deviceId: 'ADMIN-WEB-' + Date.now(),
      location: {
        lat: 0,
        lon: 0,
        accuracy: 0,
        ts: new Date().toISOString()
      }
    };

    try {
      const response = await axios.post<ApiResponse>(`${API_URL}/auth/login`, payload);
      
      if (response.data.ok) {
        this.sessionId = response.data.sessionId;
        
        // Verify session to get user data
        const verifyResponse = await this.verifySession(response.data.sessionId);
        if (verifyResponse.ok && verifyResponse.user) {
          this.user = verifyResponse.user;
          this.companyId = (verifyResponse.user as any).companyId || (verifyResponse as any).companyId || null;
          
          // Store session
          localStorage.setItem('bams_session', JSON.stringify({
            sessionId: this.sessionId,
            user: this.user,
            companyId: this.companyId
          }));
        }
      }
      
      return response.data;
    } catch (error: any) {
      console.error('Login error:', error);
      return {
        ok: false,
        message: error.response?.data?.message || 'Login failed'
      };
    }
  }

  async verifySession(sessionId: string): Promise<ApiResponse> {
    try {
      const response = await axios.post<ApiResponse>(`${API_URL}/auth/verify-session`, {
        sessionId
      });
      return response.data;
    } catch (error: any) {
      console.error('Verify session error:', error);
      return {
        ok: false,
        message: error.response?.data?.message || 'Session verification failed'
      };
    }
  }

  async logout(): Promise<void> {
    if (this.sessionId) {
      try {
        await axios.post(`${API_URL}/auth/logout`, {
          sessionId: this.sessionId,
          deviceId: 'ADMIN-WEB',
          location: { 
            lat: 0, 
            lon: 0, 
            accuracy: 0,
            ts: new Date().toISOString()
          }
        });
      } catch (error) {
        console.error('Logout error:', error);
      }
    }
    
    this.sessionId = null;
    this.user = null;
    this.companyId = null;
    localStorage.removeItem('bams_session');
  }

  isAuthenticated(): boolean {
    return this.sessionId !== null && this.user !== null;
  }

  getUser(): User | null {
    return this.user;
  }

  getSessionId(): string | null {
    return this.sessionId;
  }

  getCompanyId(): string | null {
    return this.companyId || this.user?.companyId || null;
  }
}

export default new AuthService();
