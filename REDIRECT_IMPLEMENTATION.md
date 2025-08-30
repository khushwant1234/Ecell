# Redirect After Login Implementation

## What's Been Updated

The authentication flow now redirects users back to the page they were trying to access before being redirected to login.

## How It Works

1. **User tries to access protected page** (e.g., `/recruitment/form` or `/recruitment/earlyRecruitmentForm`)
2. **ProtectedRoute component** stores the current path in `sessionStorage` and redirects to `/login`
3. **Login page** shows a message indicating which page they're trying to access
4. **User signs in with Google** → OAuth flow starts
5. **Auth callback** reads the stored path from `sessionStorage` and redirects there
6. **User lands on their original intended page**

## Files Updated

### `components/ProtectedRoute.tsx`

- Now stores the current pathname in `sessionStorage` before redirecting to login
- Uses `usePathname()` to get the current route

### `app/auth/callback/page.tsx`

- Reads the stored redirect path from `sessionStorage`
- Redirects to the original page or defaults to `/recruitment/form`
- Clears the stored path after use

### `app/login/page.tsx`

- Shows the intended destination in the login message
- Handles redirect to stored path when user is already logged in

### `app/recruitment/earlyRecruitmentForm/page.tsx`

- Updated to use centralized Supabase client
- Already protected with `ProtectedRoute`

## User Experience

- **Before**: User tries to access forms → redirected to login → after login → always goes to `/recruitment/form`
- **After**: User tries to access any protected page → redirected to login → after login → goes back to the original page they wanted

## Example Flow

1. User visits `/recruitment/earlyRecruitmentForm` (not logged in)
2. Gets redirected to `/login` with message "Sign in to access /recruitment/earlyRecruitmentForm"
3. Signs in with Google
4. Gets redirected back to `/recruitment/earlyRecruitmentForm`

This provides a much better user experience!
