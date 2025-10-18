import React, { useState, useEffect } from 'react';
import { MapPin, Plus, X, Edit, Trash2, Loader2 } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Circle, useMapEvents } from 'react-leaflet';
import { locationService } from '../services/locationService';
import { companyService } from '../services/companyService';
import type { Location, Company } from '../types';
import 'leaflet/dist/leaflet.css';
import './LocationsPage.css';

// Fix for default marker icon in react-leaflet
import L from 'leaflet';

let DefaultIcon = L.icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Map click handler component
function MapClickHandler({ onClick }: { onClick: (lat: number, lon: number) => void }) {
  useMapEvents({
    click: (e) => {
      onClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

const LocationsPage: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const [useMap, setUseMap] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    lat: 12.971599,
    lon: 77.594566,
    radiusMeters: 100,
    companyId: ''
  });

  const [editFormData, setEditFormData] = useState({
    name: '',
    lat: 12.971599,
    lon: 77.594566,
    radiusMeters: 100,
    companyId: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [locationsRes, companiesRes] = await Promise.all([
        locationService.getLocations(),
        companyService.getCompanies()
      ]);

      if (locationsRes.ok) setLocations(locationsRes.locations || []);
      if (companiesRes.ok) setCompanies(companiesRes.companies || []);
    } catch (err: any) {
      setError(err.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleMapClick = (lat: number, lon: number) => {
    setFormData({ ...formData, lat, lon });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSubmitting(true);

    try {
      const result = await locationService.createLocation(formData);
      
      if (result.ok) {
        setSuccess('Location created successfully!');
        setShowForm(false);
        setFormData({
          name: '',
          lat: 12.971599,
          lon: 77.594566,
          radiusMeters: 100,
          companyId: ''
        });
        await loadData();
      } else {
        setError(result.message || 'Failed to create location');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (locationId: string) => {
    if (!confirm('Are you sure you want to delete this location?')) {
      return;
    }

    setError('');
    setSuccess('');
    setDeletingId(locationId);

    try {
      const result = await locationService.deleteLocation(locationId);
      
      if (result.ok) {
        setSuccess('Location deleted successfully!');
        await loadData();
      } else {
        setError(result.message || 'Failed to delete location');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (location: Location) => {
    setEditingLocation(location);
    setEditFormData({
      name: location.name,
      lat: location.lat || location.coords?.coordinates?.[1] || 12.971599,
      lon: location.lon || location.coords?.coordinates?.[0] || 77.594566,
      radiusMeters: location.radiusMeters,
      companyId: location.companyId
    });
    setShowEditModal(true);
  };

  const handleUpdateLocation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLocation) return;

    setError('');
    setSuccess('');
    setSubmitting(true);

    try {
      const updates: any = {};
      if (editFormData.name) updates.name = editFormData.name;
      if (editFormData.lat) updates.lat = editFormData.lat;
      if (editFormData.lon) updates.lon = editFormData.lon;
      if (editFormData.radiusMeters) updates.radiusMeters = editFormData.radiusMeters;
      if (editFormData.companyId) updates.companyId = editFormData.companyId;

      const result = await locationService.updateLocation(
        editingLocation.id || editingLocation._id || '',
        updates
      );
      
      if (result.ok) {
        setSuccess('Location updated successfully!');
        setShowEditModal(false);
        setEditingLocation(null);
        await loadData();
      } else {
        setError(result.message || 'Failed to update location');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="locations-page">
      <div className="page-header">
        <h1>
          <span className="page-icon"><MapPin size={28} strokeWidth={2} /></span>
          Location Management
        </h1>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">
          {showForm ? <><X size={18} /> Cancel</> : <><Plus size={18} /> Add Location</>}
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {showForm && (
        <div className="form-card">
          <h2>Create New Location</h2>
          
          <div className="toggle-container">
            <label>
              <input
                type="checkbox"
                checked={useMap}
                onChange={(e) => setUseMap(e.target.checked)}
              />
              Use Map to Select Location
            </label>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Location Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Main Office"
                required
              />
            </div>

            {useMap ? (
              <div className="map-container">
                <p className="map-instructions">Click on the map to select location coordinates</p>
                <MapContainer
                  center={[formData.lat, formData.lon]}
                  zoom={13}
                  style={{ height: '400px', width: '100%' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  />
                  <MapClickHandler onClick={handleMapClick} />
                  <Marker position={[formData.lat, formData.lon]} />
                  <Circle
                    center={[formData.lat, formData.lon]}
                    radius={formData.radiusMeters}
                    pathOptions={{ color: 'blue', fillColor: 'blue', fillOpacity: 0.2 }}
                  />
                </MapContainer>
              </div>
            ) : (
              <div className="form-row">
                <div className="form-group">
                  <label>Latitude *</label>
                  <input
                    type="number"
                    step="any"
                    value={formData.lat}
                    onChange={(e) => setFormData({ ...formData, lat: parseFloat(e.target.value) })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Longitude *</label>
                  <input
                    type="number"
                    step="any"
                    value={formData.lon}
                    onChange={(e) => setFormData({ ...formData, lon: parseFloat(e.target.value) })}
                    required
                  />
                </div>
              </div>
            )}

            <div className="form-row">
              <div className="form-group">
                <label>Radius (meters) *</label>
                <input
                  type="number"
                  value={formData.radiusMeters}
                  onChange={(e) => setFormData({ ...formData, radiusMeters: parseInt(e.target.value) })}
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
            </div>

            <div className="current-coords">
              <strong>Selected Coordinates:</strong> {formData.lat.toFixed(6)}, {formData.lon.toFixed(6)}
            </div>

            <button type="submit" className="btn-primary" disabled={submitting}>
              {submitting ? 'Creating...' : 'Create Location'}
            </button>
          </form>
        </div>
      )}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Radius (m)</th>
              <th>Company</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} className="loading-cell">
                <div className="loading-spinner"></div>
                <span>Loading locations...</span>
              </td></tr>
            ) : locations.length === 0 ? (
              <tr><td colSpan={7} className="empty-cell">No locations found</td></tr>
            ) : (
              locations.map((location, index) => (
                <tr key={location.id || location._id}>
                  <td className="serial-number">{index + 1}</td>
                  <td>{location.name}</td>
                  <td>{location.lat?.toFixed(6) || location.coords?.coordinates?.[1]?.toFixed(6) || 'N/A'}</td>
                  <td>{location.lon?.toFixed(6) || location.coords?.coordinates?.[0]?.toFixed(6) || 'N/A'}</td>
                  <td>{location.radiusMeters}m</td>
                  <td>{companies.find(c => c._id === location.companyId)?.name || location.companyId || '-'}</td>
                  <td className="actions-cell">
                    <button 
                      onClick={() => handleEdit(location)}
                      className="btn-icon btn-warning"
                      title="Edit Location"
                      disabled={submitting}
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(location.id || location._id || '')}
                      className="btn-icon btn-danger"
                      disabled={deletingId === (location.id || location._id)}
                      title="Delete Location"
                    >
                      {deletingId === (location.id || location._id) ? <Loader2 size={16} className="spin" /> : <Trash2 size={16} />}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Location Modal */}
      {showEditModal && editingLocation && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Edit Location: {editingLocation.name}</h2>
              <button className="modal-close" onClick={() => setShowEditModal(false)}><X size={20} /></button>
            </div>
            
            <form onSubmit={handleUpdateLocation}>
              <div className="form-group">
                <label>Location Name</label>
                <input
                  type="text"
                  value={editFormData.name}
                  onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Latitude</label>
                  <input
                    type="number"
                    step="any"
                    value={editFormData.lat}
                    onChange={(e) => setEditFormData({ ...editFormData, lat: parseFloat(e.target.value) })}
                  />
                </div>

                <div className="form-group">
                  <label>Longitude</label>
                  <input
                    type="number"
                    step="any"
                    value={editFormData.lon}
                    onChange={(e) => setEditFormData({ ...editFormData, lon: parseFloat(e.target.value) })}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Radius (meters)</label>
                  <input
                    type="number"
                    value={editFormData.radiusMeters}
                    onChange={(e) => setEditFormData({ ...editFormData, radiusMeters: parseInt(e.target.value) })}
                  />
                </div>

                <div className="form-group">
                  <label>Company</label>
                  <select
                    value={editFormData.companyId}
                    onChange={(e) => setEditFormData({ ...editFormData, companyId: e.target.value })}
                  >
                    <option value="">Select Company</option>
                    {companies.map(c => (
                      <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

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
                  {submitting ? 'Updating...' : 'Update Location'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationsPage;
