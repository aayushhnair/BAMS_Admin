# BAMS Admin - Troubleshooting Guide

## 🔧 Common Issues & Solutions

### Installation Issues

#### ❌ "Cannot find module 'react'"
**Cause**: Dependencies not installed  
**Solution**:
```bash
cd bams_admin
npm install
```

#### ❌ npm install fails
**Cause**: Network issues or npm cache corruption  
**Solution**:
```bash
npm cache clean --force
npm install
```

---

### Runtime Issues

#### ❌ "Cannot connect to backend" / CORS errors
**Cause**: Backend not running or wrong URL  
**Solutions**:
1. Ensure backend is running on port 4000:
   ```bash
   cd bas-backend
   npm run start:dev
   ```
2. Check `vite.config.ts` proxy configuration
3. Check browser console for exact error
4. Try accessing `http://localhost:4000/api/companies` directly

#### ❌ Login fails with "Invalid credentials"
**Cause**: Wrong username/password or admin user doesn't exist  
**Solutions**:
1. Verify admin user exists in database
2. Check username and password are correct
3. Check backend logs for authentication errors
4. Try creating admin user via backend API:
   ```bash
   POST http://localhost:4000/api/users/create-admin
   {
     "username": "admin@company.com",
     "password": "Admin123@",
     "displayName": "Admin User",
     "role": "admin"
   }
   ```

#### ❌ "Session not found" after login
**Cause**: Session expired or localStorage cleared  
**Solution**:
1. Clear browser localStorage
2. Login again
3. Check backend session timeout settings

---

### Map Issues

#### ❌ Map tiles not loading
**Cause**: No internet connection or tile server down  
**Solutions**:
1. Check internet connection
2. Use manual lat/lon input instead of map
3. Try different tile server in `LocationsPage.tsx`:
   ```typescript
   url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
   // Alternative:
   url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
   ```

#### ❌ Map marker not showing
**Cause**: Leaflet CSS not loaded  
**Solution**: Verify `leaflet/dist/leaflet.css` is imported in `LocationsPage.tsx`

---

### Data Issues

#### ❌ "No users/devices/locations found"
**Cause**: Database is empty  
**Solution**: Create initial data:
1. Create a company first
2. Register devices
3. Add locations
4. Create users

#### ❌ "Device already assigned" error
**Cause**: Device is already assigned to another user  
**Solution**: 
1. Unassign device from current user first
2. Or use a different device

#### ❌ CSV export downloads empty file
**Cause**: No sessions match the filters  
**Solution**:
1. Check if sessions exist for selected filters
2. Remove some filters to broaden search
3. Check date range is correct

---

### UI Issues

#### ❌ Sidebar not showing
**Cause**: CSS not loaded or display issue  
**Solutions**:
1. Hard refresh: `Ctrl + Shift + R`
2. Clear browser cache
3. Check browser console for CSS errors

#### ❌ Forms not submitting
**Cause**: Validation errors or network issues  
**Solutions**:
1. Check all required fields are filled
2. Check browser console for errors
3. Check network tab for API response

#### ❌ Auto-refresh not working
**Cause**: JavaScript interval not clearing  
**Solution**:
1. Uncheck auto-refresh
2. Refresh page
3. Enable auto-refresh again

---

### Build Issues

#### ❌ `npm run build` fails
**Cause**: TypeScript errors or missing dependencies  
**Solutions**:
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Check TypeScript errors
npx tsc --noEmit

# Build again
npm run build
```

#### ❌ Build succeeds but app doesn't work
**Cause**: Environment variables or API URL mismatch  
**Solution**: Check API proxy settings for production deployment

---

### Performance Issues

#### ❌ App is slow
**Causes & Solutions**:
1. **Too many sessions**: Add pagination (future enhancement)
2. **Auto-refresh too frequent**: Increase interval in `SessionsPage.tsx`
3. **Large data tables**: Implement virtual scrolling
4. **Network latency**: Optimize API responses

#### ❌ Map lags when moving
**Cause**: Heavy rendering  
**Solution**: Disable circle rendering or reduce radius accuracy

---

## 🐛 Debugging Tips

### Check Browser Console
```
1. Open DevTools (F12)
2. Go to Console tab
3. Look for errors (red text)
4. Check warnings (yellow text)
```

### Check Network Tab
```
1. Open DevTools (F12)
2. Go to Network tab
3. Click on failed requests
4. Check Response tab for error details
```

### Check Backend Logs
```bash
# In bas-backend terminal
# Look for error messages
# Check API request logs
```

### Clear Application Data
```
1. Open DevTools (F12)
2. Go to Application tab
3. Click "Clear storage"
4. Click "Clear site data"
5. Refresh page
```

---

## 📝 Logging

### Enable Debug Mode
Create `.env.local`:
```bash
VITE_DEBUG=true
```

### Check Service Logs
All services log errors to console:
```javascript
console.error('Login error:', error);
```

Check browser console for these messages.

---

## 🔍 Common Error Messages

| Error | Meaning | Solution |
|-------|---------|----------|
| "Invalid credentials" | Wrong username/password | Check credentials |
| "Session not found" | Session expired | Login again |
| "Device already registered" | Device ID exists | Use different ID |
| "User not found" | User doesn't exist | Check user ID |
| "Device already assigned" | Device in use | Unassign first |
| "Failed to fetch" | Network error | Check backend |
| "CORS error" | Cross-origin issue | Check proxy |

---

## 🆘 Getting Help

### Check Documentation
1. README.md - Main docs
2. QUICKSTART.md - Setup guide
3. IMPLEMENTATION_SUMMARY.md - Feature overview
4. This file - Troubleshooting

### Check Code
1. TypeScript types in `src/types/`
2. Service implementations in `src/services/`
3. API calls have error handling

### Reset Everything
```bash
# Backend
cd bas-backend
npm run start:dev

# Admin UI
cd bams_admin
rm -rf node_modules
npm install
npm run dev

# Browser
Clear cache and localStorage
Hard refresh (Ctrl + Shift + R)
```

---

## 🔄 Update Guide

### Update Dependencies
```bash
# Check for updates
npm outdated

# Update all
npm update

# Update specific package
npm install react@latest
```

### Update Backend URL
Edit `vite.config.ts`:
```typescript
proxy: {
  '/api': {
    target: 'http://new-backend-url:port',
    changeOrigin: true
  }
}
```

---

## 📞 Support Checklist

Before asking for help, verify:
- ✅ Backend is running
- ✅ Dependencies are installed (`npm install`)
- ✅ No console errors
- ✅ Network tab shows API calls
- ✅ Database has data
- ✅ Admin user exists
- ✅ Tried clearing cache
- ✅ Tried different browser

---

## 🎯 Quick Fixes

### Fix 1: Complete Reset
```bash
# Stop all running processes
# Clear browser cache
cd bams_admin
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Fix 2: Fresh Login
```
1. Open DevTools
2. Application > Local Storage
3. Delete all items
4. Refresh page
5. Login again
```

### Fix 3: Database Check
```bash
# Check MongoDB is running
# Check collections exist
# Check admin user exists
```

---

**Most issues can be resolved by:**
1. Ensuring backend is running
2. Running `npm install`
3. Clearing browser cache
4. Checking console for errors

If problems persist, check the code - all error handling is already implemented!
