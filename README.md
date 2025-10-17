# BAMS Admin Dashboard

A modern React + TypeScript admin interface for the Bhishma Attendance Monitoring System.

## Features

- **User Management**: Create, view, and manage admin and employee users
- **Device Management**: Register devices and assign them to users
- **Location Management**: Add geofenced locations with interactive map or manual coordinates
- **Session Management**: View, filter, and export attendance sessions
- **Real-time Updates**: Auto-refresh sessions every 30 seconds

## Tech Stack

- React 18
- TypeScript
- Vite
- React Router DOM
- Axios
- React Leaflet (for maps)
- CSS3

## Installation

```bash
cd bams_admin
npm install
```

## Development

```bash
npm run dev
```

The app will run on `http://localhost:3000` with API proxy to `http://localhost:4000`.

## Build

```bash
npm run build
```

## Usage

### Login
Use admin credentials to log in:
- Username: `admin@company.com`
- Password: Your admin password

### Users Page
- Create new admin or employee users
- Assign devices to users
- View all users in the system
- Delete users

### Devices Page
- Register new devices with device ID and name
- Associate devices with companies

### Locations Page
- Add locations using interactive map or manual lat/lon input
- Set geofence radius in meters
- View all registered locations

### Sessions Page
- Filter sessions by company, user, status, and date range
- Export sessions to CSV
- Enable auto-refresh for active monitoring
- View session duration and status

## API Configuration

The app connects to the backend API at `http://localhost:4000` (configurable in `vite.config.ts`).

All API requests are proxied through `/api` prefix.

## Default Login Device

The admin UI uses a generated device ID: `ADMIN-WEB-{timestamp}` for login.

Location coordinates are not validated for admin logins.

## Project Structure

```
bams_admin/
├── src/
│   ├── components/      # React components
│   │   ├── LoginScreen.tsx
│   │   ├── UsersPage.tsx
│   │   ├── DevicesPage.tsx
│   │   ├── LocationsPage.tsx
│   │   └── SessionsPage.tsx
│   ├── services/        # API service layer
│   │   ├── authService.ts
│   │   ├── userService.ts
│   │   ├── deviceService.ts
│   │   ├── locationService.ts
│   │   ├── sessionService.ts
│   │   └── companyService.ts
│   ├── types/          # TypeScript definitions
│   │   └── index.ts
│   ├── App.tsx         # Main app component
│   ├── App.css
│   ├── index.tsx       # Entry point
│   └── index.css
├── package.json
├── tsconfig.json
├── vite.config.ts
└── index.html
```

## License

Part of the BAMS system.
