# OAuth Authentication Setup with Supabase

## What's Been Implemented

1. **Google OAuth Authentication** using Supabase
2. **Protected Routes** - Only the forms page requires authentication
3. **Session Persistence** - Users stay logged in across browser sessions
4. **Login/Logout UI** - Added to the navbar (rightmost corner)
5. **Redirect Flow** - After login, users are redirected to the forms page

## Files Created/Modified

### New Files:

- `lib/supabase.ts` - Centralized Supabase client configuration
- `contexts/AuthContext.tsx` - Authentication context provider
- `components/ProtectedRoute.tsx` - Protected route wrapper component
- `app/login/page.tsx` - Login page with Google OAuth
- `app/auth/callback/page.tsx` - OAuth callback handler

### Modified Files:

- `app/layout.tsx` - Added AuthProvider wrapper
- `components/Navbar.tsx` - Added login/logout buttons
- `app/recruitment/form/page.tsx` - Protected with ProtectedRoute and updated to use centralized Supabase client

## Supabase Configuration Required

You need to configure the Google OAuth provider in your Supabase dashboard:

1. Go to your Supabase project dashboard
2. Navigate to Authentication > Providers
3. Enable Google provider
4. Add your Google OAuth credentials:
   - Client ID
   - Client Secret
5. Add these redirect URLs:
   - `http://localhost:3000/auth/callback` (for development)
   - `https://yourdomain.com/auth/callback` (for production)

## How It Works

1. **Public Pages**: All pages are publicly accessible except forms
2. **Protected Forms**: `/recruitment/form` requires authentication
3. **Login Flow**:
   - User tries to access forms → redirected to `/login`
   - User clicks "Continue with Google" → OAuth flow starts
   - After successful auth → redirected to `/auth/callback` → then to forms
4. **Navbar**: Shows "SIGN IN" when logged out, shows user name + "SIGN OUT" when logged in
5. **Session**: Persists across browser sessions

## Environment Variables

Make sure you have these in your `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Testing

1. Start the development server: `npm run dev`
2. Visit any page - should work normally
3. Try to access `/recruitment/form` - should redirect to login
4. Click "Continue with Google" - should start OAuth flow
5. After successful login - should redirect to forms page
6. Check navbar - should show your name and "SIGN OUT" button
