import React, { useState, useEffect } from 'react';
import { Smartphone, Plus, X, Trash2, Loader2 } from 'lucide-react';
import { deviceService } from '../services/deviceService';
import authService from '../services/authService';
import type { Device } from '../types';
import './DevicesPage.css';

const DevicesPage: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    deviceId: '',
    serial: '',
    name: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const companyId = authService.getCompanyId() || '';
    const devicesRes = await deviceService.getDevices(companyId);
    if (devicesRes.ok) setDevices(devicesRes.devices || []);
    else setError(devicesRes.message || 'Failed to load devices');
    setLoading(false);
  };

  const loadDevices = async () => {
    setLoading(true);
    try {
      const companyId = authService.getCompanyId() || '';
      const result = await deviceService.getDevices(companyId);
      if (result.ok) {
        setDevices(result.devices || []);
      } else {
        setError(result.message || 'Failed to load devices');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSubmitting(true);

    try {
      const companyId = authService.getCompanyId() || '';
      if (!companyId) throw new Error('No company context found. Please log in again.');
      const result = await deviceService.registerDevice({ ...formData, companyId });
      
      if (result.ok) {
        setSuccess('Device registered successfully!');
        setShowForm(false);
        setFormData({ deviceId: '', serial: '', name: '' });
        await loadDevices();
      } else {
        setError(result.message || 'Failed to register device');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (deviceId: string) => {
    if (!confirm('Are you sure you want to delete this device?')) {
      return;
    }

    setError('');
    setSuccess('');
    setDeletingId(deviceId);

    try {
      const result = await deviceService.deleteDevice(deviceId);
      
      if (result.ok) {
        setSuccess('Device deleted successfully!');
        await loadDevices();
      } else {
        setError(result.message || 'Failed to delete device');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleString();
  };

  // company-scoped UI: no need to render company name

  return (
    <div className="devices-page">
      <div className="page-header">
        <h1>
          <span className="page-icon"><Smartphone size={28} strokeWidth={2} /></span>
          Device Management
        </h1>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">
          {showForm ? <><X size={18} /> Cancel</> : <><Plus size={18} /> Register Device</>}
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {showForm && (
        <div className="form-card">
          <h2>Register New Device</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Device ID *</label>
              <input
                type="text"
                value={formData.deviceId}
                onChange={(e) => setFormData({ ...formData, deviceId: e.target.value })}
                placeholder="DEVICE-001"
                required
                disabled={submitting}
              />
            </div>

            <div className="form-group">
              <label>Serial Number</label>
              <input
                type="text"
                value={formData.serial}
                onChange={(e) => setFormData({ ...formData, serial: e.target.value })}
                placeholder="SN123456"
                disabled={submitting}
              />
            </div>

            <div className="form-group">
              <label>Device Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Employee Tablet 1"
                required
                disabled={submitting}
              />
            </div>

            {/* Company is derived from logged-in context */}

            <button type="submit" className="btn-primary" disabled={submitting}>
              {submitting ? 'Registering...' : 'Register Device'}
            </button>
          </form>
        </div>
      )}
      {/* Company filter removed; all data is scoped to the logged-in company */}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Device ID</th>
              <th>Serial</th>
              <th>Device Name</th>
              <th>Last Seen</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} className="loading-cell">
                <div className="loading-spinner"></div>
                <span>Loading devices...</span>
              </td></tr>
            ) : devices.length === 0 ? (
              <tr><td colSpan={7} className="empty-cell">No devices found</td></tr>
            ) : (
              devices.map((device, index) => (
                <tr key={device.id || device._id}>
                  <td className="serial-number">{index + 1}</td>
                  <td>{device.deviceId}</td>
                  <td>{device.serial || '-'}</td>
                  <td>{device.name || device.deviceName || '-'}</td>
                  <td>{formatDate(device.lastSeen)}</td>
                  <td className="actions-cell">
                    <button 
                      onClick={() => handleDelete(device.id || device._id || '')}
                      className="btn-icon btn-danger"
                      disabled={deletingId === (device.id || device._id)}
                      title="Delete Device"
                    >
                      {deletingId === (device.id || device._id) ? <Loader2 size={16} className="spin" /> : <Trash2 size={16} />}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="info-box">
        <h3><Smartphone size={20} /> Device Management</h3>
        <p>Register devices and assign them to users in the Users page.</p>
        <p>Each device can only be assigned to one user at a time.</p>
      </div>
    </div>
  );
};

export default DevicesPage;
