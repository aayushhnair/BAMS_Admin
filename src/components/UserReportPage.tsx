import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Calendar, BarChart3, TrendingUp, CalendarDays } from 'lucide-react';
import { userService } from '../services/userService';
import './UserReportPage.css';

interface WorkSession {
  sessionId: string;
  loginAt: string;
  logoutAt: string;
  workingMinutes: number;
  status: string;
}

interface UserWorkReport {
  user: {
    userId: string;
    username: string;
    displayName: string;
  };
  type: 'daily' | 'weekly' | 'monthly' | 'yearly';
  from: string;
  to: string;
  totalSessions: number;
  totalWorkingMinutes: number;
  totalWorkingHours: number;
  sessions: WorkSession[];
}

const UserReportPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [report, setReport] = useState<UserWorkReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [reportType, setReportType] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('monthly');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    if (userId) {
      loadReport();
    }
  }, [userId, reportType, selectedDate]);

  const loadReport = async () => {
    if (!userId) return;
    
    setLoading(true);
    setError('');
    
    const result = await userService.getUserWorkReport(userId, reportType, selectedDate);
    
    if (result.ok) {
      setReport(result as any);
    } else {
      setError(result.message || 'Failed to load report');
    }
    
    setLoading(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const getReportTitle = () => {
    switch (reportType) {
      case 'daily': return 'Daily Report';
      case 'weekly': return 'Weekly Report';
      case 'monthly': return 'Monthly Report';
      case 'yearly': return 'Yearly Report';
      default: return 'Report';
    }
  };

  const handleExport = async () => {
    if (!userId) return;
    
    try {
      await userService.exportUserWorkReport(userId, reportType, selectedDate);
    } catch (error) {
      setError('Failed to export report');
    }
  };

  return (
    <div className="user-report-page">
      <div className="page-header">
        <div>
          <button onClick={() => navigate('/users')} className="btn-back">
            <ArrowLeft size={18} /> Back to Users
          </button>
          <h1>{report?.user.displayName || 'User'} - Work Report</h1>
          <p className="username-subtitle">@{report?.user.username}</p>
        </div>
        <button onClick={handleExport} className="btn-primary" disabled={!report}>
          <Download size={18} /> Export CSV
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="report-controls">
        <div className="control-group">
          <label>Report Type:</label>
          <div className="button-group">
            <button 
              className={reportType === 'daily' ? 'active' : ''}
              onClick={() => setReportType('daily')}
            >
              <Calendar size={16} /> Daily
            </button>
            <button 
              className={reportType === 'weekly' ? 'active' : ''}
              onClick={() => setReportType('weekly')}
            >
              <BarChart3 size={16} /> Weekly
            </button>
            <button 
              className={reportType === 'monthly' ? 'active' : ''}
              onClick={() => setReportType('monthly')}
            >
              <TrendingUp size={16} /> Monthly
            </button>
            <button 
              className={reportType === 'yearly' ? 'active' : ''}
              onClick={() => setReportType('yearly')}
            >
              <CalendarDays size={16} /> Yearly
            </button>
          </div>
        </div>

        <div className="control-group">
          <label>Date:</label>
          <input 
            type="date" 
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="loading-state">Loading report...</div>
      ) : report ? (
        <>
          <div className="report-summary">
            <h2>{getReportTitle()}</h2>
            <div className="summary-period">
              {new Date(report.from).toLocaleDateString()} - {new Date(report.to).toLocaleDateString()}
            </div>
            
            <div className="summary-cards">
              <div className="summary-card">
                <div className="card-icon"><BarChart3 size={28} strokeWidth={2.5} /></div>
                <div className="card-content">
                  <div className="card-value">{report.totalSessions}</div>
                  <div className="card-label">Total Sessions</div>
                </div>
              </div>
{/* 
              <div className="summary-card">
                <div className="card-icon">⏱️</div>
                <div className="card-content">
                  <div className="card-value">{report.totalWorkingHours}h</div>
                  <div className="card-label">Total Hours</div>
                </div>
              </div> */}

              <div className="summary-card">
                <div className="card-icon"><Calendar size={28} strokeWidth={2.5} /></div>
                <div className="card-content">
                  <div className="card-value">{formatDuration(report.totalWorkingMinutes)}</div>
                  <div className="card-label">Total Time</div>
                </div>
              </div>

              <div className="summary-card">
                <div className="card-icon"><TrendingUp size={28} strokeWidth={2.5} /></div>
                <div className="card-content">
                  <div className="card-value">
                    {report.totalSessions > 0 
                      ? formatDuration(Math.floor(report.totalWorkingMinutes / report.totalSessions))
                      : '0h 0m'}
                  </div>
                  <div className="card-label">Avg per Session</div>
                </div>
              </div>
            </div>
          </div>

            <div className="sessions-details">
            <h3>Session Details</h3>
            <div className="table-container">
              <table>
              <thead>
                <tr>
                <th>#</th>
                <th>Login Time</th>
                <th>Logout Time</th>
                <th>Duration</th>
                <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {report.sessions.length === 0 ? (
                <tr><td colSpan={5}>No sessions found for this period</td></tr>
                ) : (
                [...report.sessions].reverse().map((session, index) => (
                  <tr key={session.sessionId}>
                  <td>{index + 1}</td>
                  <td>{formatDate(session.loginAt)}</td>
                  <td>{formatDate(session.logoutAt)}</td>
                  <td>{formatDuration(session.workingMinutes)}</td>
                      <td>
                        <span className={`status-badge status-${session.status}`}>
                          {session.status}
                        </span>
                        {('suspect' in session) && (session as any).suspect && (
                          <span className="status-badge status-suspect" style={{ marginLeft: 8 }}>
                            Suspect
                          </span>
                        )}
                      </td>
                  </tr>
                ))
                )}
              </tbody>
              </table>
            </div>
            </div>
        </>
      ) : (
        <div className="empty-state">No report data available</div>
      )}
    </div>
  );
};

export default UserReportPage;
