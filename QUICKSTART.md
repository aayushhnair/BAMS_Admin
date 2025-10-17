# BAMS Admin Dashboard - Quick Start Guide

## ✅ What's Been Created

A complete React + TypeScript admin dashboard with:

### Pages
1. **Login Screen** - Simple authentication using `/api/auth/login`
2. **Users Page** - Create, list, assign devices to users
3. **Devices Page** - Register new devices
4. **Locations Page** - Add geofenced locations (with interactive map or manual lat/lon)
5. **Sessions Page** - Query, filter, and export sessions

### Features
- ✅ Authentication with session management
- ✅ Full CRUD operations for users
- ✅ Device registration and assignment
- ✅ Location management with Leaflet map
- ✅ Session filtering by company, user, status, date range
- ✅ CSV export functionality
- ✅ Auto-refresh sessions (30s interval)
- ✅ Responsive design
- ✅ Clean, minimal UI

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18+ installed
- Backend server running on `http://localhost:4000`

### 2. Installation
Already done! Dependencies are installed.

### 3. Start Development Server

**Option A: Use the batch file**
```bash
start.bat
```

**Option B: Manual start**
```bash
npm run dev
```

The app will run on `http://localhost:3000` (or another port if 3000 is busy)

### 4. Login
Use your admin credentials:
- Username: `admin@company.com` (or your admin email)
- Password: Your admin password

## 📁 Project Structure

```
bams_admin/
├── src/
│   ├── components/          # React components
│   │   ├── LoginScreen.tsx  # Login page
│   │   ├── UsersPage.tsx    # User management
│   │   ├── DevicesPage.tsx  # Device registration
│   │   ├── LocationsPage.tsx # Location with map
│   │   └── SessionsPage.tsx  # Session viewer
│   ├── services/            # API services
│   │   ├── authService.ts
│   │   ├── userService.ts
│   │   ├── deviceService.ts
│   │   ├── locationService.ts
│   │   ├── sessionService.ts
│   │   └── companyService.ts
│   ├── types/              # TypeScript types
│   │   └── index.ts
│   ├── App.tsx             # Main app with routing
│   └── index.tsx           # Entry point
├── package.json
├── vite.config.ts          # Vite config with API proxy
└── tsconfig.json
```

## 🔧 Configuration

### API Endpoint
The app proxies `/api` requests to `http://localhost:4000`.

To change the backend URL, edit `vite.config.ts`:

```typescript
server: {
  proxy: {
    '/api': {
      target: 'http://your-backend-url:port',
      changeOrigin: true
    }
  }
}
```

## 📋 Usage Guide

### Users Page
1. Click **"+ Add User"**
2. Fill in username, password, display name, role
3. For employees: select company, assign device, allocate location
4. Click **"Create User"**
5. To assign a device to existing user, click **"Assign Device"** button

### Devices Page
1. Click **"+ Register Device"**
2. Enter Device ID (e.g., `DEVICE-001`)
3. Enter Device Name (e.g., `Employee Tablet 1`)
4. Select Company
5. Click **"Register Device"**

### Locations Page
1. Click **"+ Add Location"**
2. Enter Location Name
3. **Option A**: Check "Use Map" and click on map to select coordinates
4. **Option B**: Manually enter Latitude and Longitude
5. Set Radius in meters (geofence radius)
6. Select Company
7. Click **"Create Location"**

### Sessions Page
1. Use filters to narrow down sessions:
   - Company
   - User
   - Status (active, logged_out, expired, auto_logged_out)
   - Date range (from/to)
2. Click **"🔄 Refresh Now"** to manually refresh
3. Enable **"Auto Refresh"** for live updates every 30 seconds
4. Click **"📥 Export CSV"** to download sessions

## 🏗️ Building for Production

```bash
npm run build
```

Output will be in the `dist/` folder.

## 🎨 Styling

All styling is done with vanilla CSS (no external UI libraries).

Key CSS files:
- `App.css` - Main layout and sidebar
- `LoginScreen.css` - Login page styles
- `UsersPage.css` - Shared table and form styles
- `SessionsPage.css` - Session-specific styles
- `LocationsPage.css` - Location page styles

## 🔐 Authentication Flow

1. User logs in with username/password
2. AuthService calls `/api/auth/login`
3. Session ID is stored in localStorage
4. Session is verified to get user data
5. User remains logged in until logout or session expires

## 📡 API Integration

All API calls go through service files in `src/services/`:

- **authService**: Login, logout, session verification
- **userService**: CRUD operations for users
- **deviceService**: Device registration
- **locationService**: Location management
- **sessionService**: Session queries and CSV export
- **companyService**: Company data

## 🐛 Troubleshooting

### Issue: Can't connect to backend
- Ensure backend is running on `http://localhost:4000`
- Check browser console for CORS errors
- Verify proxy configuration in `vite.config.ts`

### Issue: Login fails
- Verify admin user exists in database
- Check credentials are correct
- Look at backend logs for authentication errors

### Issue: Map not loading
- Check internet connection (map tiles are loaded from OpenStreetMap)
- Clear browser cache
- Use manual lat/lon input as fallback

## 📦 Dependencies

- **react**: UI library
- **react-router-dom**: Client-side routing
- **axios**: HTTP client
- **leaflet**: Map library
- **react-leaflet**: React wrapper for Leaflet
- **vite**: Build tool
- **typescript**: Type safety

## 🎯 Next Steps

1. Start the backend server
2. Run `start.bat` or `npm run dev`
3. Login with admin credentials
4. Create some test data:
   - Add a company
   - Register devices
   - Add locations
   - Create employee users
5. View sessions and export data

## 📝 Notes

- Admin logins don't require location validation
- Device IDs must be unique
- Each device can only be assigned to one user
- Sessions auto-expire based on company settings
- CSV exports include human-readable timestamps

---

**Built with ❤️ for BAMS**
