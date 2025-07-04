"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { Loader } from "@/components/loader";

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

export function AuthGuard({ 
  children, 
  requireAuth = true, 
  redirectTo = "/login" 
}: AuthGuardProps) {
  const { user, hydrated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!hydrated) return; // Wait for hydration

    if (requireAuth && !user) {
      // User is not authenticated, redirect to login
      router.push(redirectTo);
    } else if (!requireAuth && user) {
      // User is authenticated but trying to access public route (like login), redirect to dashboard
      router.push("/dashboard");
    }
  }, [user, hydrated, requireAuth, redirectTo, router]);

  // Show loading while checking authentication
  if (!hydrated) {
    return <Loader />;
  }

  // If authentication check is required and user is not authenticated, show loading
  if (requireAuth && !user) {
    return <Loader />;
  }

  // If public route and user is authenticated, show loading while redirecting
  if (!requireAuth && user) {
    return <Loader />;
  }

  return <>{children}</>;
} 