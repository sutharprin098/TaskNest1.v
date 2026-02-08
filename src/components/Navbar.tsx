"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  userId: string;
  email: string;
  role: "ADMIN" | "CUSTOMER" | "WORKER";
}

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          return;
        }

        const response = await fetch("/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.data) {
            setUser(data.data);
          }
        }
      } catch (error) {
        console.error("Auth check error:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[--color-border] bg-[--color-background]/80 backdrop-blur supports-[backdrop-filter]:bg-[--color-background]/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        <Link href="/" className="text-2xl font-bold text-[--color-primary]">
          TaskNest
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/services" className="text-sm font-medium hover:text-[--color-secondary] transition-colors">
            Services
          </Link>
          <Link href="/pricing" className="text-sm font-medium hover:text-[--color-secondary] transition-colors">
            Pricing
          </Link>
          <Link href="/" className="text-sm font-medium hover:text-[--color-secondary] transition-colors">
            How It Works
          </Link>

          {user && user.role === "ADMIN" && (
            <>
              <Link
                href="/admin/dashboard"
                className="text-sm font-medium text-[--color-primary] hover:text-[--color-secondary] transition-colors"
              >
                📊 Dashboard
              </Link>
              <Link
                href="/admin/services"
                className="text-sm font-medium text-[--color-primary] hover:text-[--color-secondary] transition-colors"
              >
                🛠️ Services
              </Link>
              <Link
                href="/admin/bookings"
                className="text-sm font-medium text-[--color-primary] hover:text-[--color-secondary] transition-colors"
              >
                📋 Bookings
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-4">
          {!loading && !user ? (
            <>
              <Link
                href="/auth/login"
                className="text-sm font-medium text-[--color-primary] hover:text-[--color-secondary] transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/auth/register"
                className="rounded-2xl bg-[--color-primary] px-6 py-2 text-sm font-medium text-[--color-primary-foreground] hover:bg-[--color-secondary] hover:text-[--color-secondary-foreground] transition-all shadow-lg"
              >
                Get Started
              </Link>
            </>
          ) : user ? (
            <>
              <span className="text-sm font-medium text-[--color-foreground]">
                {user.email}
              </span>
              <button
                onClick={handleLogout}
                className="rounded-2xl bg-red-500 px-6 py-2 text-sm font-medium text-white hover:bg-red-600 transition-all"
              >
                Logout
              </button>
            </>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
