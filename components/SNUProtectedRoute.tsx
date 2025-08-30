"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";

interface SNUProtectedRouteProps {
  children: React.ReactNode;
}

export default function SNUProtectedRoute({
  children,
}: SNUProtectedRouteProps) {
  const { user, loading, isValidSNUUser, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      // Store the current path in sessionStorage for redirect after login
      sessionStorage.setItem("redirectPath", pathname);
      router.push("/login");
    }
  }, [user, loading, router, pathname]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  // User is authenticated but doesn't have SNU email
  if (!isValidSNUUser) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar textColor="white" />
        <div className="flex items-center justify-center min-h-[calc(100vh-100px)]">
          <div className="max-w-md w-full mx-auto p-8 text-center">
            <div className="mb-6">
              <svg
                className="mx-auto h-16 w-16 text-red-500 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
              <h1 className="text-3xl font-bold mb-4">Access Restricted</h1>
              <p className="text-gray-300 mb-2">
                This form is only accessible to SNU students.
              </p>
              <p className="text-gray-400 text-sm mb-6">
                You are currently signed in as: <strong>{user.email}</strong>
              </p>
              <p className="text-gray-300 mb-8">
                Please sign in with your{" "}
                <span className="text-yellow-400 font-semibold">
                  @snu.edu.in
                </span>{" "}
                email address to continue.
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={async () => {
                  // Store redirect path and sign out current user
                  sessionStorage.setItem("redirectPath", pathname);
                  await signOut();
                  router.push("/login");
                }}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
              >
                Sign in with SNU Account
              </button>

              <button
                onClick={() => router.push("/")}
                className="w-full bg-gray-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-gray-700 transition-colors duration-200"
              >
                Go to Homepage
              </button>
            </div>

            <p className="text-xs text-gray-500 mt-6">
              If you believe this is an error, please contact the E-Cell team.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
