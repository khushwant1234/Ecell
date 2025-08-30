"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          console.error("Error during auth callback:", error.message);
          router.push("/login?error=auth_error");
          return;
        }

        if (data.session) {
          // Successfully authenticated, check for stored redirect path
          const redirectPath = sessionStorage.getItem("redirectPath");

          // Clear the stored path
          sessionStorage.removeItem("redirectPath");

          // Redirect to the original page or default to forms page
          const destination = redirectPath || "/recruitment/form";
          router.push(destination);
        } else {
          // No session found, redirect to login
          router.push("/login");
        }
      } catch (error) {
        console.error("Unexpected error during auth callback:", error);
        router.push("/login?error=unexpected_error");
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-xl">Completing sign in...</p>
      </div>
    </div>
  );
}
