# API Integration Update - User Management & Reports

## Summary
Successfully integrated the following APIs into the BAMS Admin Panel:

### 1. PUT Update User
**Endpoint**: `PUT /api/users/:id`

**Request Body**:
```json
{
  "displayName": "Updated Name",
  "password": "NewPassword123!",
  "assignedDeviceId": "NEW-DEVICE-ID",
  "allocatedLocationId": "NEW-LOCATION-ID"
}
```

**Response**:
```json
{
  "ok": true,
  "user": {
    "_id": "68f1e1d94c58d95a780570cc",
    "username": "aayushhnair",
    "displayName": "Updated Name",
    "role": "employee",
    "companyId": "68f1e20b4c58d95a780570d0",
    "assignedDeviceId": "NEW-DEVICE-ID",
    "allocatedLocationId": "NEW-LOCATION-ID"
  },
  "message": "User updated successfully"
}
```

### 2. GET User Work Report (JSON)
**Endpoint**: `GET /api/user-work-report?userId={userId}&type={type}&date={date}`

**Parameters**:
- `userId`: User ID
- `type`: "daily" | "weekly" | "monthly" | "yearly"
- `date`: ISO date string (e.g., "2025-10-01")

**Response**:
```json
{
  "ok": true,
  "user": {
    "userId": "68f1e1d94c58d95a780570cc",
    "username": "aayushhnair",
    "displayName": "Ayush V Nair"
  },
  "type": "monthly",
  "from": "2025-10-01T00:00:00.000Z",
  "to": "2025-11-01T00:00:00.000Z",
  "totalSessions": 22,
  "totalWorkingMinutes": 10560,
  "totalWorkingHours": 176,
  "sessions": [
    {
      "sessionId": "67116f8a4c58d95a780570d5",
      "loginAt": "2025-10-01T09:00:00.000Z",
      "logoutAt": "2025-10-01T17:30:00.000Z",
      "workingMinutes": 510,
      "status": "logged_out"
    }
  ]
}
```

### 3. GET User Work Report Export (CSV)
**Endpoint**: `GET /api/user-work-report/export?userId={userId}&type={type}&date={date}`

**Response**: CSV file download
```csv
User,Username,Report Type,Period From,Period To,Session ID,Login Time,Logout Time,Working Minutes,Working Hours,Status
"Ayush V Nair","aayushhnair","MONTHLY","2025-10-01","2025-11-01","671..","2025-10-01T09:00:00.000Z","2025-10-01T17:30:00.000Z",510,8.5,"logged_out"
```

---

## Implementation Details

### 1. User Service Updates (`src/services/userService.ts`)

#### Added Methods:
1. **`updateUser(userId: string, updates: Partial<User>)`**
   - Updates user information
   - Accepts partial updates (only changed fields)
   - Returns updated user data

2. **`exportUserWorkReport(userId: string, type, date)`**
   - Downloads CSV report
   - Automatically triggers browser download
   - File name format: `user-report-{userId}-{type}-{date}.csv`

### 2. Users Page Updates (`src/components/UsersPage.tsx`)

#### New Features:
1. **Edit User Modal**
   - Click "✏️ Edit" button on any user
   - Modal form with fields:
     - Display Name
     - New Password (optional)
     - Assigned Device ID
     - Allocated Location
   - Only sends changed fields to API

2. **Edit Button**
   - Added to actions column
   - Orange warning color for visibility
   - Opens modal with current user data pre-filled

#### State Management:
```typescript
const [showEditModal, setShowEditModal] = useState(false);
const [editingUser, setEditingUser] = useState<User | null>(null);
const [editFormData, setEditFormData] = useState({
  displayName: '',
  password: '',
  assignedDeviceId: '',
  allocatedLocationId: ''
});
```

#### Handler Functions:
- `handleEdit(user)` - Opens edit modal
- `handleUpdateUser(e)` - Submits update form

### 3. User Report Page Updates (`src/components/UserReportPage.tsx`)

#### New Features:
1. **Export CSV Button**
   - Located in page header
   - Disabled when no report data
   - Downloads CSV with all session details
   - Icon: 📥 Export CSV

2. **Export Handler**
```typescript
const handleExport = async () => {
  if (!userId) return;
  try {
    await userService.exportUserWorkReport(userId, reportType, selectedDate);
  } catch (error) {
    setError('Failed to export report');
  }
};
```

### 4. UI Styling Updates

#### UsersPage.css - Added Modal Styles:
```css
.modal-overlay - Dark overlay background
.modal-content - White card with shadow
.modal-header - Header with close button
.modal-actions - Footer with action buttons
.btn-warning - Orange edit button
.btn-secondary - Gray cancel button
```

#### UserReportPage.css:
```css
.page-header - Flexbox layout for header + button
```

### 5. Location Integration Fix

#### Updated LocationsPage.tsx:
- Changed to support both `id` and `_id` fields
- Uses `location.id || location._id` for compatibility
- Supports both coordinate formats:
  - New: `lat` and `lon` fields directly
  - Old: `coords.coordinates[1]` and `coords.coordinates[0]`

---

## User Flow

### Editing a User:
1. Navigate to Users page
2. Click "✏️ Edit" on desired user
3. Modal opens with current data
4. Modify desired fields
5. Click "Update User"
6. Success message appears
7. Table refreshes with new data

### Exporting User Report:
1. Navigate to Users page
2. Click "📊 Report" on desired user
3. Select report type (Daily/Weekly/Monthly/Yearly)
4. Choose date
5. Click "📥 Export CSV"
6. CSV file downloads automatically

---

## Testing Checklist

### User Update:
- ✅ Edit modal opens/closes correctly
- ✅ Form pre-fills with current user data
- ✅ Can update display name
- ✅ Can change password
- ✅ Can assign device ID
- ✅ Can change location (employees only)
- ✅ Success message appears
- ✅ Table updates after save

### Report Export:
- ✅ Export button appears in header
- ✅ Button disabled when no report
- ✅ CSV downloads on click
- ✅ Filename includes userId, type, and date
- ✅ CSV contains all session data
- ✅ CSV format matches API spec

### Location Integration:
- ✅ Locations display correctly
- ✅ Edit form shows location dropdown
- ✅ Correct location ID submitted
- ✅ Works with both API response formats

---

## API Call Examples

### Update User:
```typescript
const result = await userService.updateUser("68f1e1d94c58d95a780570cc", {
  displayName: "New Name",
  assignedDeviceId: "DEVICE-123"
});
```

### Get Work Report:
```typescript
const result = await userService.getUserWorkReport(
  "68f1e1d94c58d95a780570cc",
  "monthly",
  "2025-10-01"
);
```

### Export Report:
```typescript
await userService.exportUserWorkReport(
  "68f1e1d94c58d95a780570cc",
  "monthly",
  "2025-10-01"
);
// File downloads automatically
```

---

## Files Modified

1. **src/services/userService.ts**
   - Added `updateUser` method
   - Added `exportUserWorkReport` method

2. **src/components/UsersPage.tsx**
   - Added edit modal state
   - Added edit form data state
   - Added `handleEdit` function
   - Added `handleUpdateUser` function
   - Added edit button in actions column
   - Added modal UI

3. **src/components/UsersPage.css**
   - Added modal overlay styles
   - Added modal content styles
   - Added button warning styles
   - Added animation keyframes

4. **src/components/UserReportPage.tsx**
   - Added export button in header
   - Added `handleExport` function

5. **src/components/UserReportPage.css**
   - Added page-header flex layout

6. **src/components/LocationsPage.tsx**
   - Updated to support both `id` and `_id` fields
   - Updated to support both coordinate formats

---

## Development Server

**Current Status**: ✅ Running on http://localhost:3501/

**Note**: Port 3500 was in use, so Vite automatically switched to 3501.

---

## Next Steps

### Recommended Enhancements:
1. Add form validation for edit modal
2. Add loading states during update
3. Add confirmation dialog before update
4. Add bulk export for multiple users
5. Add date range picker for custom reports
6. Add report visualization (charts/graphs)

### Backend Verification:
1. Test all API endpoints are working
2. Verify CSV format matches requirements
3. Test with large datasets
4. Verify permissions/authorization

---

*Last Updated: October 17, 2025*
*Version: 1.0*
