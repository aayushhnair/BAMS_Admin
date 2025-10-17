import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { Users, Smartphone, MapPin, Activity, LogOut } from 'lucide-react';
import authService from './services/authService';
import LoginScreen from './components/LoginScreen';
import UsersPage from './components/UsersPage';
import DevicesPage from './components/DevicesPage';
import LocationsPage from './components/LocationsPage';
import SessionsPage from './components/SessionsPage';
import UserReportPage from './components/UserReportPage';
import logo from './assets/logo_with_tagline.png';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(authService.isAuthenticated());
  const user = authService.getUser();

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
    window.location.href = '/';
  };

  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  return (
    <BrowserRouter>
      <div className="app">
        <nav className="sidebar">
          <div className="sidebar-header">
            <img src={logo} alt="BAMS Logo" className="sidebar-logo" />
            <h2>Admin Panel</h2>
            <p className="user-info">{user?.displayName}</p>
          </div>
          
          <ul className="nav-menu">
            <li>
              <Link to="/users">
                <Users className="nav-icon" size={20} />
                <span className="nav-text">Users</span>
              </Link>
            </li>
            <li>
              <Link to="/devices">
                <Smartphone className="nav-icon" size={20} />
                <span className="nav-text">Devices</span>
              </Link>
            </li>
            <li>
              <Link to="/locations">
                <MapPin className="nav-icon" size={20} />
                <span className="nav-text">Locations</span>
              </Link>
            </li>
            <li>
              <Link to="/sessions">
                <Activity className="nav-icon" size={20} />
                <span className="nav-text">Sessions</span>
              </Link>
            </li>
          </ul>

          <div className="sidebar-footer">
            <button onClick={handleLogout} className="logout-btn">
              <LogOut className="btn-icon" size={18} />
              <span>Logout</span>
            </button>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/users" />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/user-report/:userId" element={<UserReportPage />} />
            <Route path="/devices" element={<DevicesPage />} />
            <Route path="/locations" element={<LocationsPage />} />
            <Route path="/sessions" element={<SessionsPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
