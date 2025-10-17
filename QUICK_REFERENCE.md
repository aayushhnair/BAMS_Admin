# BAMS Admin - Quick Reference Guide

## 🚀 Getting Started

**Start Development Server:**
```bash
npm run dev
```
**URL:** http://localhost:3500/

---

## 📍 Navigation Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/users` | UsersPage | Manage users |
| `/user-report/:userId` | UserReportPage | User work reports |
| `/devices` | DevicesPage | Manage devices |
| `/locations` | LocationsPage | Manage locations |
| `/sessions` | SessionsPage | View sessions |

---

## 🔌 API Endpoints

### **User Work Report**
```
GET /api/user-work-report?userId=xxx&type=monthly&date=2025-10-01
```
**Parameters:**
- `userId` - User ID (required)
- `type` - 'daily' | 'weekly' | 'monthly' | 'yearly' (required)
- `date` - Date string YYYY-MM-DD (required)

**Response:**
```json
{
  "ok": true,
  "user": { "userId": "xxx", "username": "john", "displayName": "John" },
  "type": "monthly",
  "from": "2025-10-01T00:00:00.000Z",
  "to": "2025-11-01T00:00:00.000Z",
  "totalSessions": 22,
  "totalWorkingMinutes": 660,
  "totalWorkingHours": 11,
  "sessions": [...]
}
```

### **Location Delete**
```
POST /api/locations/delete
Body: { "id": "LOCATION_ID" }
```

### **Sessions with Pagination**
```
GET /api/sessions?skip=0&limit=50&status=active
```

---

## 🎨 Icon Reference

### Navigation Icons
- 👤 Users
- 📱 Devices  
- 📍 Locations
- 📊 Sessions

### Action Icons
- ➕ Add/Create
- ✖️ Cancel
- 🔄 Refresh
- 📥 Export
- ⟳ Auto Refresh
- 📊 Report
- 🔧 Device
- 🗑️ Delete
- 🚪 Logout

---

## 🎨 Color Variables

```css
--primary-red: #DC143C
--primary-yellow: #FFD700
--primary-blue: #003366 (Navy Blue)
--primary-white: #FFFFFF
--dark-red: #B22222
--dark-blue: #001f3f (Dark Navy)
--light-gray: #F5F5F5
--medium-gray: #E0E0E0
--dark-gray: #333333
--text-dark: #2C3E50
```

---

## 📊 Report Page Usage

1. Navigate to Users page
2. Click "📊 Report" button for any user
3. Select report type: Daily | Weekly | Monthly | Yearly
4. Choose date using date picker
5. View summary statistics and session details
6. Click "← Back to Users" to return

---

## 🔧 Common Tasks

### View User Report
```
Users Page → Click "📊 Report" → Select Type → Choose Date
```

### Delete Location
```
Locations Page → Click "🗑️ Delete" → Confirm
```

### Filter Sessions
```
Sessions Page → Set Filters → Apply
Status Filter: All | Active | Logged Out | Expired | Auto Logged Out
```

### Export Sessions
```
Sessions Page → Select Company → Set Date Range → Click "📥 Export CSV"
```

---

## 🐛 Troubleshooting

### Status Filter Not Working
**Fixed!** Empty strings now properly excluded from API calls.

### Icons Not Showing
- Check unicode support in browser
- Verify CSS classes applied
- Clear browser cache

### Report Page Not Loading
- Verify userId in URL
- Check API endpoint availability
- Verify user has sessions

---

## 📱 Button Classes

```css
.btn-primary     - Navy blue, main actions
.btn-secondary   - White with blue border
.btn-danger      - Red, destructive actions
.btn-small       - Compact button
.btn-info        - Yellow, informational
.btn-back        - White with border
```

---

## 📏 Layout Classes

```css
.page-header     - Page title section
.form-card       - Form container
.filters-card    - Filter section
.table-container - Table wrapper
.summary-card    - Report statistic card
```

---

## 🎯 Key Features

✅ User work reports (Daily/Weekly/Monthly/Yearly)  
✅ Professional icons throughout  
✅ Navy blue theme  
✅ Status filter fixed  
✅ Pagination (50 per page)  
✅ Location delete  
✅ Export to CSV  
✅ Auto-refresh sessions  

---

## 📞 Support

**Server Running:** http://localhost:3500/  
**Build Status:** ✅ No Errors  
**Theme:** Navy Blue Professional  

---

**Ready for Production! 🚀**
