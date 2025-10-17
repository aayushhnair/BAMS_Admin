import React, { useState, useEffect } from 'react';
import { deviceService } from '../services/deviceService';
import { companyService } from '../services/companyService';
import type { Company, Device } from '../types';
import './DevicesPage.css';

const DevicesPage: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [filterCompanyId, setFilterCompanyId] = useState('');

  const [formData, setFormData] = useState({
    deviceId: '',
    serial: '',
    name: '',
    companyId: ''
  });

  useEffect(() => {
    loadCompanies();
    loadDevices();
  }, []);

  useEffect(() => {
    loadDevices();
  }, [filterCompanyId]);

  const loadCompanies = async () => {
    const result = await companyService.getCompanies();
    if (result.ok) setCompanies(result.companies || []);
  };

  const loadDevices = async () => {
    const result = await deviceService.getDevices(filterCompanyId || undefined);
    if (result.ok) {
      setDevices(result.devices || []);
    } else {
      setError(result.message || 'Failed to load devices');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const result = await deviceService.registerDevice(formData);
    
    if (result.ok) {
      setSuccess(`Device registered successfully! ${result.message || ''}`);
      setShowForm(false);
      setFormData({ deviceId: '', serial: '', name: '', companyId: '' });
      loadDevices();
    } else {
      setError(result.message || 'Failed to register device');
    }
  };

  const handleDelete = async (deviceId: string) => {
    if (!confirm('Are you sure you want to delete this device?')) {
      return;
    }

    setError('');
    setSuccess('');

    const result = await deviceService.deleteDevice(deviceId);
    
    if (result.ok) {
      setSuccess('Device deleted successfully!');
      loadDevices();
    } else {
      setError(result.message || 'Failed to delete device');
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="devices-page">
      <div className="page-header">
        <h1>
          <span className="page-icon">📱</span>
          Device Management
        </h1>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">
          {showForm ? '✖️ Cancel' : '➕ Register Device'}
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
              />
            </div>

            <div className="form-group">
              <label>Serial Number</label>
              <input
                type="text"
                value={formData.serial}
                onChange={(e) => setFormData({ ...formData, serial: e.target.value })}
                placeholder="SN123456"
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
              />
            </div>

            <div className="form-group">
              <label>Company *</label>
              <select
                value={formData.companyId}
                onChange={(e) => setFormData({ ...formData, companyId: e.target.value })}
                required
              >
                <option value="">Select Company</option>
                {companies.map(c => (
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn-primary">Register Device</button>
          </form>
        </div>
      )}

      <div className="filters-card">
        <h3>Filters</h3>
        <div className="form-group">
          <label>Company</label>
          <select
            value={filterCompanyId}
            onChange={(e) => setFilterCompanyId(e.target.value)}
          >
            <option value="">All Companies</option>
            {companies.map(c => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Device ID</th>
              <th>Serial</th>
              <th>Device Name</th>
              <th>Company</th>
              <th>Last Seen</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {devices.length === 0 ? (
              <tr><td colSpan={6}>No devices found</td></tr>
            ) : (
              devices.map(device => (
                <tr key={device.id || device._id}>
                  <td>{device.deviceId}</td>
                  <td>{device.serial || '-'}</td>
                  <td>{device.name || device.deviceName || '-'}</td>
                  <td>{device.companyName || device.companyId}</td>
                  <td>{formatDate(device.lastSeen)}</td>
                  <td>
                    <button 
                      onClick={() => handleDelete(device.id || device._id || '')}
                      className="btn-danger"
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="info-box">
        <h3>Device Registration</h3>
        <p>Register devices here and assign them to users in the Users page.</p>
        <p>Each device can only be assigned to one user at a time.</p>
      </div>
    </div>
  );
};

export default DevicesPage;
