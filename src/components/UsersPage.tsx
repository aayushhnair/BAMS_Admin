import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Plus, X, Edit, Trash2, BarChart3, Loader2 } from 'lucide-react';
import { userService } from '../services/userService';
import { companyService } from '../services/companyService';
import { locationService } from '../services/locationService';
import type { User, Company, Location } from '../types';
import './UsersPage.css';

const UsersPage: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    displayName: '',
    role: 'employee' as 'admin' | 'employee',
    companyId: '',
    assignedDeviceId: '',
    allocatedLocationId: ''
  });

  const [editFormData, setEditFormData] = useState({
    displayName: '',
    password: '',
    assignedDeviceId: '',
    allocatedLocationId: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [usersRes, companiesRes, locationsRes] = await Promise.all([
      userService.getUsers(),
      companyService.getCompanies(),
      locationService.getLocations()
    ]);

    if (usersRes.ok) setUsers(usersRes.users || []);
    if (companiesRes.ok) setCompanies(companiesRes.companies || []);
    if (locationsRes.ok) setLocations(locationsRes.locations || []);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSubmitting(true);

    try {
      const result = await userService.createUser(formData);
      
      if (result.ok) {
        setSuccess('User created successfully!');
        setShowForm(false);
        setFormData({
          username: '',
          password: '',
          displayName: '',
          role: 'employee',
          companyId: '',
          assignedDeviceId: '',
          allocatedLocationId: ''
        });
        await loadData();
      } else {
        setError(result.message || 'Failed to create user');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    
    setError('');
    setSuccess('');
    setDeletingId(userId);

    try {
      const result = await userService.deleteUser(userId);
      if (result.ok) {
        setSuccess('User deleted successfully!');
        await loadData();
      } else {
        setError(result.message || 'Failed to delete user');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setDeletingId(null);
    }
  };

  // TODO: Implement device assignment UI
  // const handleAssignDevice = async (userId: string) => {
  //   const deviceId = prompt('Enter Device ID to assign:');
  //   if (!deviceId) return;

  //   setError('');
  //   setSuccess('');

  //   try {
  //     const result = await userService.assignDevice(userId, deviceId);
  //     if (result.ok) {
  //       setSuccess('Device assigned successfully!');
  //       await loadData();
  //     } else {
  //       setError(result.message || 'Failed to assign device');
  //     }
  //   } catch (err: any) {
  //     setError(err.message || 'An error occurred');
  //   }
  // };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setEditFormData({
      displayName: user.displayName,
      password: '',
      assignedDeviceId: user.assignedDeviceId || '',
      allocatedLocationId: user.allocatedLocationId || ''
    });
    setShowEditModal(true);
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    setError('');
    setSuccess('');
    setSubmitting(true);

    try {
      // Only include fields that have values
      const updates: any = {};
      if (editFormData.displayName) updates.displayName = editFormData.displayName;
      if (editFormData.password) updates.password = editFormData.password;
      if (editFormData.assignedDeviceId) updates.assignedDeviceId = editFormData.assignedDeviceId;
      if (editFormData.allocatedLocationId) updates.allocatedLocationId = editFormData.allocatedLocationId;

      const result = await userService.updateUser(editingUser._id, updates);
      
      if (result.ok) {
        setSuccess('User updated successfully!');
        setShowEditModal(false);
        setEditingUser(null);
        await loadData();
      } else {
        setError(result.message || 'Failed to update user');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="users-page">
      <div className="page-header">
        <h1>
          <span className="page-icon"><Users size={28} strokeWidth={2} /></span>
          User Management
        </h1>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">
          {showForm ? <><X size={18} /> Cancel</> : <><Plus size={18} /> Add User</>}
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {showForm && (
        <div className="form-card">
          <h2>Create New User</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Username *</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Password *</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Display Name *</label>
                <input
                  type="text"
                  value={formData.displayName}
                  onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Role *</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as 'admin' | 'employee' })}
                >
                  <option value="employee">Employee</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>

            {formData.role === 'employee' && (
              <div className="form-row">
                <div className="form-group">
                  <label>Company</label>
                  <select
                    value={formData.companyId}
                    onChange={(e) => setFormData({ ...formData, companyId: e.target.value })}
                  >
                    <option value="">Select Company</option>
                    {companies.map(c => (
                      <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Assigned Device ID</label>
                  <input
                    type="text"
                    value={formData.assignedDeviceId}
                    onChange={(e) => setFormData({ ...formData, assignedDeviceId: e.target.value })}
                    placeholder="DEVICE-001"
                  />
                </div>
              </div>
            )}

            {formData.role === 'employee' && (
              <div className="form-group">
                <label>Allocated Location</label>
                <select
                  value={formData.allocatedLocationId}
                  onChange={(e) => setFormData({ ...formData, allocatedLocationId: e.target.value })}
                >
                  <option value="">Select Location</option>
                  {locations.map(l => (
                    <option key={l.id || l._id} value={l.id || l._id}>{l.name}</option>
                  ))}
                </select>
              </div>
            )}

            <button type="submit" className="btn-primary" disabled={submitting}>
              {submitting ? 'Creating...' : 'Create User'}
            </button>
          </form>
        </div>
      )}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Display Name</th>
              <th>Role</th>
              <th>Assigned Device</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} className="loading-cell">
                <div className="loading-spinner"></div>
                <span>Loading users...</span>
              </td></tr>
            ) : users.length === 0 ? (
              <tr><td colSpan={7} className="empty-cell">No users found</td></tr>
            ) : (
              users.map((user, index) => (
                <tr key={user._id}>
                  <td className="serial-number">{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.displayName}</td>
                  <td><span className={`badge badge-${user.role}`}>{user.role}</span></td>
                  <td>{user.assignedDeviceId || '-'}</td>
                  <td>{locations.find(l => (l.id || l._id) === user.allocatedLocationId)?.name || '-'}</td>
                  <td className="actions-cell">
                    <button 
                      onClick={() => navigate(`/user-report/${user._id}`)}
                      className="btn-icon btn-info"
                      title="View Report"
                    >
                      <BarChart3 size={16} />
                    </button>
                    <button 
                      onClick={() => handleEdit(user)}
                      className="btn-icon btn-warning"
                      title="Edit User"
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(user._id)}
                      className="btn-icon btn-danger"
                      disabled={deletingId === user._id}
                      title="Delete User"
                    >
                      {deletingId === user._id ? <Loader2 size={16} className="spin" /> : <Trash2 size={16} />}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Edit User Modal */}
      {showEditModal && editingUser && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Edit User: {editingUser.username}</h2>
              <button className="modal-close" onClick={() => setShowEditModal(false)}><X size={20} /></button>
            </div>
            
            <form onSubmit={handleUpdateUser}>
              <div className="form-group">
                <label>Display Name</label>
                <input
                  type="text"
                  value={editFormData.displayName}
                  onChange={(e) => setEditFormData({ ...editFormData, displayName: e.target.value })}
                  placeholder="Leave empty to keep current"
                />
              </div>

              <div className="form-group">
                <label>New Password</label>
                <input
                  type="password"
                  value={editFormData.password}
                  onChange={(e) => setEditFormData({ ...editFormData, password: e.target.value })}
                  placeholder="Leave empty to keep current"
                />
              </div>

              <div className="form-group">
                <label>Assigned Device ID</label>
                <input
                  type="text"
                  value={editFormData.assignedDeviceId}
                  onChange={(e) => setEditFormData({ ...editFormData, assignedDeviceId: e.target.value })}
                  placeholder="Leave empty to keep current"
                />
              </div>

              {editingUser.role === 'employee' && (
                <div className="form-group">
                  <label>Allocated Location</label>
                  <select
                    value={editFormData.allocatedLocationId}
                    onChange={(e) => setEditFormData({ ...editFormData, allocatedLocationId: e.target.value })}
                  >
                    <option value="">Select Location</option>
                    {locations.map(l => (
                      <option key={l.id || l._id} value={l.id || l._id}>{l.name}</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="modal-actions">
                <button 
                  type="button" 
                  onClick={() => setShowEditModal(false)} 
                  className="btn-secondary"
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-primary"
                  disabled={submitting}
                >
                  {submitting ? 'Updating...' : 'Update User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
