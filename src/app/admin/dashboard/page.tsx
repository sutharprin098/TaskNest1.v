"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface DashboardStats {
  totalUsers: number;
  totalBookings: number;
  totalWorkers: number;
  totalRevenue: number;
  recentBookings: any[];
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      router.push("/auth/login");
      return;
    }

    const user = JSON.parse(userData);
    if (user.role !== "ADMIN") {
      router.push("/dashboard");
      return;
    }

    fetchDashboardStats(token);
  }, [router]);

  const fetchDashboardStats = async (token: string) => {
    try {
      const response = await fetch("/api/admin/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-[--color-muted-foreground]">Loading admin panel...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[--color-muted]">
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-slate-300 mt-1">TaskNest Control Panel</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-6 py-2 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-colors"
            >
              Logout
            </button>
          </div>

          <nav className="mt-6 flex gap-4 flex-wrap">
            <Link
              href="/admin/dashboard"
              className="px-4 py-2 rounded-lg bg-white/20 font-medium"
            >
              Overview
            </Link>
            <Link
              href="/admin/bookings"
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              Bookings
            </Link>
            <Link
              href="/admin/workers"
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              Workers
            </Link>
            <Link
              href="/admin/users"
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              Users
            </Link>
            <Link
              href="/admin/services"
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              Services
            </Link>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-[--color-border]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[--color-muted-foreground] text-sm">Total Users</p>
                <p className="text-4xl font-bold text-[--color-primary] mt-2">
                  {stats?.totalUsers || 0}
                </p>
              </div>
              <div className="text-5xl">👥</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-[--color-border]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[--color-muted-foreground] text-sm">Total Bookings</p>
                <p className="text-4xl font-bold text-blue-600 mt-2">
                  {stats?.totalBookings || 0}
                </p>
              </div>
              <div className="text-5xl">📋</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-[--color-border]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[--color-muted-foreground] text-sm">Active Workers</p>
                <p className="text-4xl font-bold text-green-600 mt-2">
                  {stats?.totalWorkers || 0}
                </p>
              </div>
              <div className="text-5xl">👨‍💼</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-[--color-border]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[--color-muted-foreground] text-sm">Total Revenue</p>
                <p className="text-4xl font-bold text-[--color-secondary] mt-2">
                  {stats?.totalRevenue || 0}
                </p>
                <p className="text-xs text-[--color-muted-foreground]">AED</p>
              </div>
              <div className="text-5xl">💰</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-[--color-border] p-6">
          <h2 className="text-2xl font-bold text-[--color-primary] mb-6">
            Recent Bookings
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[--color-border]">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[--color-foreground]">
                    Customer
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[--color-foreground]">
                    Service
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[--color-foreground]">
                    Worker
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[--color-foreground]">
                    Date
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[--color-foreground]">
                    Status
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-[--color-foreground]">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {stats?.recentBookings && stats.recentBookings.length > 0 ? (
                  stats.recentBookings.map((booking) => (
                    <tr key={booking.id} className="border-b border-[--color-border]">
                      <td className="py-3 px-4 text-sm">{booking.user.name}</td>
                      <td className="py-3 px-4 text-sm">{booking.service.name}</td>
                      <td className="py-3 px-4 text-sm">
                        {booking.worker?.name || "Unassigned"}
                      </td>
                      <td className="py-3 px-4 text-sm">
                        {new Date(booking.date).toLocaleDateString("en-GB")}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            booking.status === "CONFIRMED"
                              ? "bg-green-100 text-green-700"
                              : booking.status === "PENDING"
                              ? "bg-yellow-100 text-yellow-700"
                              : booking.status === "COMPLETED"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-right font-semibold">
                        AED {booking.finalPrice}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-[--color-muted-foreground]">
                      No bookings yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {stats?.recentBookings && stats.recentBookings.length > 0 && (
            <div className="mt-6 text-center">
              <Link
                href="/admin/bookings"
                className="inline-block px-6 py-2 rounded-xl bg-[--color-primary] text-[--color-primary-foreground] font-semibold hover:bg-[--color-secondary] hover:text-[--color-secondary-foreground] transition-all"
              >
                View All Bookings
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
