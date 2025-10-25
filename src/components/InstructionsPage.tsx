import React from 'react';
import {  UserPlus, MapPin, Monitor, Users, Clock, AlertTriangle, CheckCircle, XCircle, LogOut, Mail, Info, Navigation, Settings, Shield } from 'lucide-react';

const InstructionsPage: React.FC = () => {
  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '32px', fontWeight: '700', color: '#0A192F', margin: '0' }}>
          <Info size={32} strokeWidth={2.5} color="#2BB3F3" />
          System Documentation
        </h1>
        <p style={{ color: '#64748b', marginTop: '8px', fontSize: '15px' }}>Comprehensive guide for WorkSens attendance management system</p>
      </div>

      <div style={{ display: 'grid', gap: '20px' }}>
        
        {/* Admin Setup Section */}
        <div style={{ background: '#ffffffff', borderRadius: '12px', padding: '28px', color: 'white', boxShadow: '0 4px 12px rgba(10,25,47,0.15)' }}>
          <h2 style={{color:'black', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '22px', fontWeight: '600', margin: '0 0 24px 0', borderBottom: '2px solid #2BB3F3', paddingBottom: '12px' }}>
            <Settings size={24} color="#2BB3F3" />
            Administrator Setup Protocol
          </h2>
          
          <div style={{color:'black', display: 'grid', gap: '14px' }}>
            
            <div style={{ background: 'rgba(43,179,243,0.1)', borderRadius: '10px', padding: '18px', border: '1px solid rgba(43,179,243,0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'start', gap: '14px' }}>
                <div style={{ background: '#2BB3F3', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: '700', fontSize: '16px', color: '#0A192F' }}>1</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <Monitor size={20} color="#2BB3F3" />
                    <strong style={{ fontSize: '17px' }}>Device Registration & Installation</strong>
                  </div>
                  <p style={{ margin: '0', lineHeight: '1.7', opacity: 0.9, fontSize: '14.5px' }}>
                    Navigate to <strong style={{ color: '#2BB3F3' }}>worksens.vercel.app</strong> on the target device. Install as web application (browser will prompt "Add to Home Screen" or "Install App"). Launch installed application to retrieve unique Device ID from dashboard.
                  </p>
                </div>
              </div>
            </div>

            <div style={{ background: 'rgba(43,179,243,0.1)', borderRadius: '10px', padding: '18px', border: '1px solid rgba(43,179,243,0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'start', gap: '14px' }}>
                <div style={{ background: '#2BB3F3', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: '700', fontSize: '16px', color: '#0A192F' }}>2</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <Shield size={20} color="#2BB3F3" />
                    <strong style={{ fontSize: '17px' }}>System Device Authorization</strong>
                  </div>
                  <p style={{ margin: '0', lineHeight: '1.7', opacity: 0.9, fontSize: '14.5px' }}>
                    Access admin portal via <strong style={{ color: '#2BB3F3' }}>Admin → Devices</strong>. Register new device using copied Device ID. This authorizes the device for attendance tracking within the system.
                  </p>
                </div>
              </div>
            </div>

            <div style={{ background: 'rgba(43,179,243,0.1)', borderRadius: '10px', padding: '18px', border: '1px solid rgba(43,179,243,0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'start', gap: '14px' }}>
                <div style={{ background: '#2BB3F3', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: '700', fontSize: '16px', color: '#0A192F' }}>3</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <MapPin size={20} color="#2BB3F3" />
                    <strong style={{ fontSize: '17px' }}>Geofence Configuration</strong>
                  </div>
                  <p style={{ margin: '0', lineHeight: '1.7', opacity: 0.9, fontSize: '14.5px' }}>
                    Define authorized work location coordinates. Utilize map interface for pin placement or manually input latitude/longitude values obtained from mapping services (Google Maps, OpenStreetMap, etc.).
                  </p>
                </div>
              </div>
            </div>

            <div style={{ background: 'rgba(43,179,243,0.1)', borderRadius: '10px', padding: '18px', border: '1px solid rgba(43,179,243,0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'start', gap: '14px' }}>
                <div style={{ background: '#2BB3F3', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: '700', fontSize: '16px', color: '#0A192F' }}>4</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <Navigation size={20} color="#2BB3F3" />
                    <strong style={{ fontSize: '17px' }}>Proximity Threshold Definition</strong>
                  </div>
                  <p style={{ margin: '0', lineHeight: '1.7', opacity: 0.9, fontSize: '14.5px' }}>
                    Establish acceptable distance radius from designated location. <strong style={{ color: '#2BB3F3' }}>Optimal range: 1-3 KM</strong>. Adjust based on facility size, GPS accuracy requirements, and site topology.
                  </p>
                </div>
              </div>
            </div>

            <div style={{ background: 'rgba(43,179,243,0.1)', borderRadius: '10px', padding: '18px', border: '1px solid rgba(43,179,243,0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'start', gap: '14px' }}>
                <div style={{ background: '#2BB3F3', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: '700', fontSize: '16px', color: '#0A192F' }}>5</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <UserPlus size={20} color="#2BB3F3" />
                    <strong style={{ fontSize: '17px' }}>User Account Provisioning</strong>
                  </div>
                  <p style={{ margin: '0', lineHeight: '1.7', opacity: 0.9, fontSize: '14.5px' }}>
                    Create employee accounts with required authentication credentials. Enable <strong style={{ color: '#2BB3F3' }}>Location Validation</strong> parameter to enforce geofence compliance during authentication and session maintenance.
                  </p>
                </div>
              </div>
            </div>

            <div style={{ background: 'rgba(43,179,243,0.1)', borderRadius: '10px', padding: '18px', border: '1px solid rgba(43,179,243,0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'start', gap: '14px' }}>
                <div style={{ background: '#2BB3F3', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: '700', fontSize: '16px', color: '#0A192F' }}>6</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <Users size={20} color="#2BB3F3" />
                    <strong style={{ fontSize: '17px' }}>Monitoring & Analytics Access</strong>
                  </div>
                  <p style={{ margin: '0', lineHeight: '1.7', opacity: 0.9, fontSize: '14.5px' }}>
                    Monitor real-time attendance via <strong style={{ color: '#2BB3F3' }}>Sessions</strong> dashboard. Access detailed user analytics through <strong style={{ color: '#2BB3F3' }}>Users</strong> and <strong style={{ color: '#2BB3F3' }}>User Report</strong> modules for compliance tracking and reporting.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* System Architecture Section */}
        <div style={{ background: 'white', borderRadius: '12px', padding: '28px', boxShadow: '0 2px 8px rgba(10,25,47,0.08)', border: '1px solid #e2e8f0' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '22px', fontWeight: '600', margin: '0 0 18px 0', color: '#0A192F', borderBottom: '2px solid #2BB3F3', paddingBottom: '12px' }}>
            <Clock size={24} color="#2BB3F3" />
            System Architecture & Operation
          </h2>
          <div style={{ lineHeight: '1.8', color: '#475569', fontSize: '14.5px' }}>
            <div style={{ marginBottom: '18px', padding: '16px', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #2BB3F3' }}>
              <strong style={{ color: '#0A192F', display: 'block', marginBottom: '8px', fontSize: '15px' }}>Heartbeat Protocol</strong>
              <p style={{ margin: '0' }}>
                System initiates location verification via automated heartbeat mechanism at <strong>10-minute intervals</strong> upon successful authentication. Continuous validation ensures real-time geofence compliance throughout active session duration.
              </p>
            </div>
            
            <div style={{ marginBottom: '18px', padding: '16px', background: '#fef3c7', borderRadius: '8px', borderLeft: '4px solid #f59e0b' }}>
              <strong style={{ color: '#92400e', display: 'block', marginBottom: '8px', fontSize: '15px' }}>⚠️ Violation Response Protocol</strong>
              <p style={{ margin: '0 0 10px 0', color: '#78350f' }}>
                <strong>Moderate Violation:</strong> Extended absence from authorized location triggers <strong style={{ color: '#f59e0b' }}>Suspected</strong> status flag. Administrator receives notification for manual intervention (contact employee or initiate forced logout).
              </p>
              <p style={{ margin: '0', color: '#78350f' }}>
                <strong>Critical Violation:</strong> Continuous unauthorized location exceeding <strong>60 minutes</strong> initiates automatic session termination with immediate logout enforcement.
              </p>
            </div>
            
            <div style={{ padding: '16px', background: '#dbeafe', borderRadius: '8px', borderLeft: '4px solid #2BB3F3' }}>
              <strong style={{ color: '#0A192F', display: 'block', marginBottom: '8px', fontSize: '15px' }}>⏱️ Maximum Session Duration Policy</strong>
              <p style={{ margin: '0', color: '#1e40af' }}>
                Daily session limit: <strong>10 hours maximum</strong>. System enforces automatic logout upon threshold breach regardless of location compliance or session activity status.
              </p>
            </div>
          </div>
        </div>

        {/* Session Status Reference */}
        <div style={{ background: 'white', borderRadius: '12px', padding: '28px', boxShadow: '0 2px 8px rgba(10,25,47,0.08)', border: '1px solid #e2e8f0' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '22px', fontWeight: '600', margin: '0 0 20px 0', color: '#0A192F', borderBottom: '2px solid #2BB3F3', paddingBottom: '12px' }}>
            <Info size={24} color="#2BB3F3" />
            Session Status Classification
          </h2>
          
          <div style={{ display: 'grid', gap: '10px' }}>
            
            <div style={{ display: 'flex', alignItems: 'start', gap: '12px', padding: '16px', background: '#f0fdf4', borderRadius: '8px', border: '1px solid #86efac' }}>
              <CheckCircle size={20} color="#10b981" style={{ flexShrink: 0, marginTop: '3px' }} />
              <div style={{ flex: 1 }}>
                <strong style={{ color: '#065f46', fontSize: '15px', display: 'block', marginBottom: '4px' }}>Active</strong>
                <p style={{ margin: '0', color: '#047857', fontSize: '14px', lineHeight: '1.6' }}>Session operational with continuous heartbeat transmission. User authenticated and location compliant.</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'start', gap: '12px', padding: '16px', background: '#fef3c7', borderRadius: '8px', border: '1px solid #fde047' }}>
              <AlertTriangle size={20} color="#f59e0b" style={{ flexShrink: 0, marginTop: '3px' }} />
              <div style={{ flex: 1 }}>
                <strong style={{ color: '#92400e', fontSize: '15px', display: 'block', marginBottom: '4px' }}>Suspected</strong>
                <p style={{ margin: '0', color: '#b45309', fontSize: '14px', lineHeight: '1.6' }}>Anomaly detected: repeated geofence violations or interrupted heartbeat sequence. Requires administrative review and potential intervention.</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'start', gap: '12px', padding: '16px', background: '#fee2e2', borderRadius: '8px', border: '1px solid #fca5a5' }}>
              <LogOut size={20} color="#ef4444" style={{ flexShrink: 0, marginTop: '3px' }} />
              <div style={{ flex: 1 }}>
                <strong style={{ color: '#991b1b', fontSize: '15px', display: 'block', marginBottom: '4px' }}>Heartbeat_Logout</strong>
                <p style={{ margin: '0', color: '#dc2626', fontSize: '14px', lineHeight: '1.6' }}>Session terminated via automated heartbeat validation protocol. System detected logout condition during location verification cycle.</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'start', gap: '12px', padding: '16px', background: '#f3f4f6', borderRadius: '8px', border: '1px solid #d1d5db' }}>
              <XCircle size={20} color="#6b7280" style={{ flexShrink: 0, marginTop: '3px' }} />
              <div style={{ flex: 1 }}>
                <strong style={{ color: '#374151', fontSize: '15px', display: 'block', marginBottom: '4px' }}>Expired</strong>
                <p style={{ margin: '0', color: '#4b5563', fontSize: '14px', lineHeight: '1.6' }}>Session concluded due to policy-defined time limit or scheduled termination parameters.</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'start', gap: '12px', padding: '16px', background: '#eff6ff', borderRadius: '8px', border: '1px solid #93c5fd' }}>
              <LogOut size={20} color="#2BB3F3" style={{ flexShrink: 0, marginTop: '3px' }} />
              <div style={{ flex: 1 }}>
                <strong style={{ color: '#0A192F', fontSize: '15px', display: 'block', marginBottom: '4px' }}>Logged Out</strong>
                <p style={{ margin: '0', color: '#1e40af', fontSize: '14px', lineHeight: '1.6' }}>User-initiated session termination. Manual logout executed via client interface.</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'start', gap: '12px', padding: '16px', background: '#faf5ff', borderRadius: '8px', border: '1px solid #d8b4fe' }}>
              <XCircle size={20} color="#a855f7" style={{ flexShrink: 0, marginTop: '3px' }} />
              <div style={{ flex: 1 }}>
                <strong style={{ color: '#6b21a8', fontSize: '15px', display: 'block', marginBottom: '4px' }}>Auto Logged Out</strong>
                <p style={{ margin: '0', color: '#9333ea', fontSize: '14px', lineHeight: '1.6' }}>System-enforced logout triggered by policy violation, maximum duration threshold, or critical geofence breach.</p>
              </div>
            </div>

          </div>
        </div>

        {/* Technical Requirements */}
        <div style={{ background: 'white', borderRadius: '12px', padding: '28px', boxShadow: '0 2px 8px rgba(10,25,47,0.08)', border: '1px solid #e2e8f0' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '22px', fontWeight: '600', margin: '0 0 18px 0', color: '#0A192F', borderBottom: '2px solid #2BB3F3', paddingBottom: '12px' }}>
            <AlertTriangle size={24} color="#2BB3F3" />
            System Requirements & Best Practices
          </h2>
          
          <div style={{ display: 'grid', gap: '10px' }}>
            <div style={{ padding: '14px 16px', background: '#f8fafc', borderRadius: '8px', borderLeft: '3px solid #2BB3F3' }}>
              <p style={{ margin: '0', color: '#475569', lineHeight: '1.7', fontSize: '14.5px' }}>
                <strong style={{ color: '#0A192F' }}>Geofence Radius:</strong> Recommended range 400-800m. Calibrate based on facility dimensions, GPS accuracy variance (±10-50m typical), and environmental interference factors (urban canyon effect, building density).
              </p>
            </div>
            
            <div style={{ padding: '14px 16px', background: '#f8fafc', borderRadius: '8px', borderLeft: '3px solid #2BB3F3' }}>
              <p style={{ margin: '0', color: '#475569', lineHeight: '1.7', fontSize: '14.5px' }}>
                <strong style={{ color: '#0A192F' }}>Heartbeat Interval:</strong> 10-minute verification cycle. Interruption beyond configured threshold triggers anomaly detection and suspect status activation.
              </p>
            </div>
            
            <div style={{ padding: '14px 16px', background: '#f8fafc', borderRadius: '8px', borderLeft: '3px solid #2BB3F3' }}>
              <p style={{ margin: '0', color: '#475569', lineHeight: '1.7', fontSize: '14.5px' }}>
                <strong style={{ color: '#0A192F' }}>Administrative Controls:</strong> Suspect session resolution and forced logout functionality accessible via Sessions dashboard. Real-time intervention capability for policy enforcement.
              </p>
            </div>
            
            <div style={{ padding: '14px 16px', background: '#f8fafc', borderRadius: '8px', borderLeft: '3px solid #2BB3F3' }}>
              <p style={{ margin: '0', color: '#475569', lineHeight: '1.7', fontSize: '14.5px' }}>
                <strong style={{ color: '#0A192F' }}>Device Authorization:</strong> Registration exclusively via installed application instance. Browser-based access does not expose Device ID required for system provisioning.
              </p>
            </div>
            
            <div style={{ padding: '14px 16px', background: '#f8fafc', borderRadius: '8px', borderLeft: '3px solid #2BB3F3' }}>
              <p style={{ margin: '0', color: '#475569', lineHeight: '1.7', fontSize: '14.5px' }}>
                <strong style={{ color: '#0A192F' }}>Location Services:</strong> Critical requirement—verify GPS/location permissions enabled at both browser and device OS levels. Insufficient permissions result in authentication failure and session instability.
              </p>
            </div>

            <div style={{ padding: '14px 16px', background: '#f8fafc', borderRadius: '8px', borderLeft: '3px solid #2BB3F3' }}>
              <p style={{ margin: '0', color: '#475569', lineHeight: '1.7', fontSize: '14.5px' }}>
                <strong style={{ color: '#0A192F' }}>Network Stability:</strong> Maintain consistent internet connectivity. Network interruptions may cause heartbeat transmission failures, potentially triggering false-positive suspect flags.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div style={{ background: '#0A192F', borderRadius: '12px', padding: '28px', color: 'white', boxShadow: '0 4px 12px rgba(10,25,47,0.15)' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '22px', fontWeight: '600', margin: '0 0 18px 0', borderBottom: '2px solid #2BB3F3', paddingBottom: '12px' }}>
            <Mail size={24} color="#2BB3F3" />
            Administrative Contact & Support
          </h2>
          
          <div style={{ display: 'grid', gap: '14px' }}>
            <div style={{ background: 'rgba(43,179,243,0.1)', padding: '18px', borderRadius: '10px', border: '1px solid rgba(43,179,243,0.2)' }}>
              <p style={{ margin: '0 0 10px 0', fontSize: '14px', opacity: 0.85 }}>Administrator Account Provisioning:</p>
              <a href="mailto:avnxk3@gmail.com" style={{ color: '#2BB3F3', fontSize: '17px', fontWeight: '600', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={20} />
                avnxk3@gmail.com
              </a>
            </div>
            
            <div style={{ background: 'rgba(43,179,243,0.1)', padding: '18px', borderRadius: '10px', border: '1px solid rgba(43,179,243,0.2)' }}>
              <p style={{ margin: '0 0 6px 0', fontSize: '14px', opacity: 0.85 }}>System Developer:</p>
              <p style={{ margin: '0', fontSize: '19px', fontWeight: '700', color: '#2BB3F3' }}>Manifesto</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default InstructionsPage;