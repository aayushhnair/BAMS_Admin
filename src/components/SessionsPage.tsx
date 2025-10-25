import React, { useState, useEffect } from 'react';
import { BarChart3, RefreshCw, Download, Loader2 } from 'lucide-react';
import { sessionService } from '../services/sessionService';
import { userService } from '../services/userService';
import authService from '../services/authService';
import type { Session, User } from '../types';
import './SessionsPage.css';

const SessionsPage: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  // Company is fixed to the logged-in admin's company
  const companyId = authService.getCompanyId() || '';
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalSessions, setTotalSessions] = useState(0);
  const pageSize = 50;

  const [filters, setFilters] = useState({
    companyId: companyId,
    userId: '',
    status: '',
    from: '',
    to: '',
    showAll: false,
    suspect: false
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

  // auto-refresh removed per request

  const loadMetadata = async () => {
    const usersRes = await userService.getUsers(companyId);
    if (usersRes.ok) setUsers(usersRes.users || []);
  };

  const loadSessions = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    
    const skip = (currentPage - 1) * pageSize;
    const result = await sessionService.getSessions({
      ...filters,
      companyId: companyId,
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

  const [resolvingId, setResolvingId] = useState<string | null>(null);
  const [forcingId, setForcingId] = useState<string | null>(null);

  const handleResolve = async (sessionId: string) => {
    if (!confirm('Restore this suspect session to active?')) return;
    setError('');
    setSuccess('');
    setResolvingId(sessionId);
    try {
      const res = await sessionService.resolveSession(sessionId);
      if (res.ok) {
        setSuccess(res.message || 'Session restored to active');
        await loadSessions();
      } else {
        setError(res.message || 'Failed to restore session');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setResolvingId(null);
    }
  };

  const handleForceLogout = async (sessionId: string) => {
    if (!confirm('Force-logout this session?')) return;
    setError('');
    setSuccess('');
    setForcingId(sessionId);
    try {
      const res = await sessionService.forceLogoutSession(sessionId);
      if (res.ok) {
        setSuccess(res.message || 'Session force-logged out');
        await loadSessions();
      } else {
        setError(res.message || 'Failed to force logout session');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setForcingId(null);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleString();
  };

  const renderLastHeartbeat = (session: Session) => {
    const val = session.lastHeartbeat as any;

    // If lastHeartbeat is present and is a valid date string, show formatted date
    if (val) {
      const parsed = Date.parse(val);
      if (!isNaN(parsed)) return formatDate(val);
    }

    // Normalize status for checks
    const status = (session.status || '').toString().toUpperCase();

    // If status indicates an auto / heartbeat logout or the lastHeartbeat contains a heartbeat marker,
    // show the explanatory badge instead of a date.
    if (
      status.includes('AUTO_LOGGED_OUT') ||
      status.includes('HEARTBEAT') ||
      (val && val.toString().toUpperCase().includes('HEARTBEAT'))
    ) {
      return <span className="status-badge status-heartbeat-missed">Heartbeat Logged Out</span>;
    }

    // Fallback
    return '-';
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
          {/* <label className="auto-refresh-label">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
            />
            <RefreshCw size={16} /> Auto Refresh (30s)
          </label> */}
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
          {/* Company is fixed - no company switcher for admins */}

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
              <option value="expired">Expired</option>
              <option value="active,expired">Active + Expired</option>
              <option value="logged_out">Logged Out</option>
              <option value="auto_logged_out">Auto Logged Out</option>
              <option value="logged_out,auto_logged_out">Logged Out + Auto Logged Out</option>
              <option value="heartbeat_timeout">Heartbeat Timeout</option>
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
          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={filters.suspect}
                onChange={(e) => setFilters({ ...filters, suspect: e.target.checked })}
              />
              <span>⚠️ Suspect only</span>
            </label>
          </div>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
  {success && <div className="alert alert-success">{success}</div>}

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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={8}>Loading sessions...</td></tr>
            ) : sessions.length === 0 ? (
              <tr><td colSpan={8}>No sessions found</td></tr>
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
                    {session.suspect && (
                      <span className="status-badge status-suspect" style={{ marginLeft: 8 }}>
                        Suspect
                      </span>
                    )}
                  </td>
                  <td>
                    {renderLastHeartbeat(session)}
                  </td>
                  <td className="actions-cell">
                    <button
                      onClick={() => handleResolve(session.sessionId || session._id)}
                      className="btn-secondary"
                      disabled={!session.suspect || resolvingId === (session.sessionId || session._id)}
                      title={session.suspect ? 'Restore session to active' : 'Resolve only available for suspect sessions'}
                    >
                      {resolvingId === (session.sessionId || session._id) ? <Loader2 size={14} /> : 'Resolve'}
                    </button>

                    <button
                      onClick={() => handleForceLogout(session.sessionId || session._id)}
                      className="btn-danger"
                      disabled={forcingId === (session.sessionId || session._id)}
                      style={{ marginLeft: 8 }}
                      title="Force logout this session"
                    >
                      {forcingId === (session.sessionId || session._id) ? <Loader2 size={14} /> : 'Kick Out'}
                    </button>
                  </td>
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
