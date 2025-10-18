import React, { useState, useEffect } from 'react';
import { BarChart3, RefreshCw, Download } from 'lucide-react';
import { sessionService } from '../services/sessionService';
import { userService } from '../services/userService';
import { companyService } from '../services/companyService';
import type { Session, User, Company } from '../types';
import './SessionsPage.css';

const SessionsPage: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalSessions, setTotalSessions] = useState(0);
  const pageSize = 50;

  const [filters, setFilters] = useState({
    companyId: '',
    userId: '',
    status: '',
    from: '',
    to: '',
    showAll: false
  });

  useEffect(() => {
    loadMetadata();
  }, []);

  useEffect(() => {
    loadSessions();
    // Reset to page 1 when filters change
    setCurrentPage(1);
  }, [filters]);

  useEffect(() => {
    loadSessions();
  }, [currentPage]);

  useEffect(() => {
    let interval: number | null = null;
    
    if (autoRefresh) {
      interval = window.setInterval(() => {
        loadSessions();
      }, 30000); // 30 seconds
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefresh, filters, currentPage]);

  const loadMetadata = async () => {
    const [usersRes, companiesRes] = await Promise.all([
      userService.getUsers(),
      companyService.getCompanies()
    ]);

    if (usersRes.ok) setUsers(usersRes.users || []);
    if (companiesRes.ok) setCompanies(companiesRes.companies || []);
  };

  const loadSessions = async () => {
    setLoading(true);
    setError('');
    
    const skip = (currentPage - 1) * pageSize;
    const result = await sessionService.getSessions({
      ...filters,
      skip,
      limit: pageSize
    });
    
    if (result.ok) {
      setSessions(result.sessions || []);
      setTotalSessions(result.total || result.sessions?.length || 0);
    } else {
      setError(result.message || 'Failed to load sessions');
    }
    
    setLoading(false);
  };

  const handleExport = async () => {
    if (!filters.companyId) {
      alert('Please select a company to export sessions');
      return;
    }

    try {
      await sessionService.exportSessions(
        filters.companyId,
        filters.from,
        filters.to
      );
    } catch (err: any) {
      setError(err.message || 'Failed to export sessions');
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleString();
  };

  const calculateDuration = (session: Session) => {
    if (!session.logoutAt) return 'Active';
    
    const loginTime = new Date(session.loginAt).getTime();
    const logoutTime = new Date(session.logoutAt).getTime();
    const hours = (logoutTime - loginTime) / (1000 * 60 * 60);
    
    return `${hours.toFixed(2)} hrs`;
  };

  const getUserName = (session: Session) => {
    // First check if session already has userDisplayName from API
    if (session.userDisplayName) {
      return session.userDisplayName;
    }
    // Otherwise look it up in the users list
    const user = users.find(u => u._id === session.userId);
    return user ? user.displayName : session.userId;
  };

  return (
    <div className="sessions-page">
      <div className="page-header">
        <h1>
          <span className="page-icon"><BarChart3 size={28} strokeWidth={2} /></span>
          Session Management
        </h1>
        <div className="header-actions">
          <label className="auto-refresh-label">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
            />
            <RefreshCw size={16} /> Auto Refresh (30s)
          </label>
          <button onClick={loadSessions} className="btn-secondary">
            <RefreshCw size={18} /> Refresh Now
          </button>
          <button onClick={handleExport} className="btn-primary">
            <Download size={18} /> Export CSV
          </button>
        </div>
      </div>

      <div className="filters-card">
        <h3>Filters</h3>
        <div className="filters-grid">
          <div className="form-group">
            <label>Company</label>
            <select
              value={filters.companyId}
              onChange={(e) => setFilters({ ...filters, companyId: e.target.value })}
            >
              <option value="">All Companies</option>
              {companies.map(c => (
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>User</label>
            <select
              value={filters.userId}
              onChange={(e) => setFilters({ ...filters, userId: e.target.value })}
            >
              <option value="">All Users</option>
              {users.map(u => (
                <option key={u._id} value={u._id}>{u.displayName} ({u.username})</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Status</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="logged_out">Logged Out</option>
              <option value="expired">Expired</option>
              <option value="auto_logged_out">Auto Logged Out</option>
            </select>
          </div>

          <div className="form-group">
            <label>From Date</label>
            <input
              type="date"
              value={filters.from}
              onChange={(e) => setFilters({ ...filters, from: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>To Date</label>
            <input
              type="date"
              value={filters.to}
              onChange={(e) => setFilters({ ...filters, to: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={filters.showAll}
                onChange={(e) => setFilters({ ...filters, showAll: e.target.checked })}
              />
              <span>📋 Show All Sessions (last 30 days by default)</span>
            </label>
          </div>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>User Name</th>
              <th>Device ID</th>
              <th>Login Time</th>
              <th>Logout Time</th>
              <th>Work Hours</th>
              <th>Status</th>
              <th>Last Heartbeat</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7}>Loading sessions...</td></tr>
            ) : sessions.length === 0 ? (
              <tr><td colSpan={7}>No sessions found</td></tr>
            ) : (
              sessions.map(session => (
                <tr key={session._id}>
                  <td>{getUserName(session)}</td>
                  <td>{session.deviceId}</td>
                  <td>{formatDate(session.loginAt)}</td>
                  <td>{formatDate(session.logoutAt)}</td>
                  <td>{calculateDuration(session)}</td>
                  <td>
                    <span className={`status-badge status-${session.status}`}>
                      {session.status}
                    </span>
                  </td>
                  <td>{formatDate(session.lastHeartbeat)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination-container">
        <div className="sessions-count">
          Showing {sessions.length} sessions (Page {currentPage})
          {totalSessions > 0 && ` - Total: ${totalSessions}`}
        </div>
        
        <div className="pagination-controls">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="btn-secondary"
          >
            ← Previous
          </button>
          
          <span className="page-info">Page {currentPage}</span>
          
          <button 
            onClick={() => setCurrentPage(prev => prev + 1)}
            disabled={sessions.length < pageSize}
            className="btn-secondary"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionsPage;
