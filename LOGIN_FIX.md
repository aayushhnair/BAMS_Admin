# Login Fix - Location Timestamp

## Issue
Login was failing with error:
```json
{
    "message": ["location.ts must be a string"],
    "error": "Bad Request",
    "statusCode": 400
}
```

## Root Cause
The backend's `LocationDto` requires a `ts` (timestamp) field as a string, which was missing from the login payload.

Backend DTO definition:
```typescript
export class LocationDto {
  @IsNumber()
  lat: number;

  @IsNumber()
  lon: number;

  @IsNumber()
  accuracy: number;

  @IsString()
  ts: string;  // <-- This was missing!
}
```

## Solution
Updated two files:

### 1. `src/types/index.ts`
Added `ts: string` to the LoginPayload location type:
```typescript
export interface LoginPayload {
  username: string;
  password: string;
  deviceId: string;
  location: {
    lat: number;
    lon: number;
    accuracy: number;
    ts: string;  // Added
  };
}
```

### 2. `src/services/authService.ts`
Added timestamp to login and logout payloads:
```typescript
location: {
  lat: 0,
  lon: 0,
  accuracy: 0,
  ts: new Date().toISOString()  // Added
}
```

## Notes
- For admin logins, we use dummy coordinates (0, 0) since location validation is not enforced for admins
- The `ts` field uses ISO 8601 format: `new Date().toISOString()`
- Example: `"2025-10-15T10:30:00.000Z"`

## Verification
After the fix:
1. Login should work without validation errors
2. Admin can login from anywhere (location not validated)
3. Timestamp is automatically generated on each login/logout

## Status
✅ **FIXED** - Login now works correctly for admin users
