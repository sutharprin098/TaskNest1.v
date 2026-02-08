"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Booking {
  id: string;
  date: string;
  time: string;
  status: string;
  service: {
    name: string;
  };
  finalPrice: number;
  payment?: {
    status: string;
  };
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [showBookingForm, setShowBookingForm] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token) {
      router.push("/auth/login");
      return;
    }

    if (userData) {
      setUser(JSON.parse(userData));
    }

    fetchBookings(token);
  }, [router]);

  const fetchBookings = async (token: string) => {
    try {
      const response = await fetch("/api/bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setBookings(data.data);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
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
        <div className="text-lg text-[--color-muted-foreground]">Loading...</div>
      </div>
    );
  }

  const upcomingBookings = bookings.filter(
    (b) => ["PENDING", "CONFIRMED"].includes(b.status) && new Date(b.date) >= new Date()
  );

  const pastBookings = bookings.filter(
    (b) => ["COMPLETED", "CANCELLED"].includes(b.status) || new Date(b.date) < new Date()
  );

  return (
    <div className="min-h-screen bg-[--color-muted]">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-[--color-primary]">
              Welcome, {user?.name}!
            </h1>
            <p className="text-[--color-muted-foreground] mt-2">
              Manage your bookings and profile
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-2 rounded-xl bg-white border border-[--color-border] text-[--color-foreground] hover:bg-[--color-muted] transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-[--color-border]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[--color-muted-foreground] text-sm">Total Bookings</p>
                <p className="text-3xl font-bold text-[--color-primary]">{bookings.length}</p>
              </div>
              <div className="text-4xl">📋</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-[--color-border]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[--color-muted-foreground] text-sm">Upcoming</p>
                <p className="text-3xl font-bold text-[--color-secondary]">
                  {upcomingBookings.length}
                </p>
              </div>
              <div className="text-4xl">🗓️</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-[--color-border]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[--color-muted-foreground] text-sm">Completed</p>
                <p className="text-3xl font-bold text-green-600">
                  {bookings.filter((b) => b.status === "COMPLETED").length}
                </p>
              </div>
              <div className="text-4xl">✅</div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <Link
            href="/dashboard/book"
            className="inline-block rounded-xl bg-[--color-primary] px-8 py-3 text-lg font-semibold text-[--color-primary-foreground] hover:bg-[--color-secondary] hover:text-[--color-secondary-foreground] transition-all shadow-lg"
          >
            Book a New Service
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-lg border border-[--color-border] p-6">
            <h2 className="text-2xl font-bold text-[--color-primary] mb-6">
              Upcoming Bookings
            </h2>
            {upcomingBookings.length === 0 ? (
              <p className="text-[--color-muted-foreground]">No upcoming bookings</p>
            ) : (
              <div className="space-y-4">
                {upcomingBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="border border-[--color-border] rounded-xl p-4"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-[--color-foreground]">
                          {booking.service.name}
                        </h3>
                        <p className="text-sm text-[--color-muted-foreground]">
                          {new Date(booking.date).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                        <p className="text-sm text-[--color-muted-foreground]">
                          🕒 {booking.time}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          booking.status === "CONFIRMED"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="font-bold text-[--color-secondary]">
                        AED {booking.finalPrice}
                      </span>
                      <span className="text-xs text-[--color-muted-foreground]">
                        Payment: {booking.payment?.status || "Pending"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-[--color-border] p-6">
            <h2 className="text-2xl font-bold text-[--color-primary] mb-6">
              Past Bookings
            </h2>
            {pastBookings.length === 0 ? (
              <p className="text-[--color-muted-foreground]">No past bookings</p>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {pastBookings.slice(0, 5).map((booking) => (
                  <div
                    key={booking.id}
                    className="border border-[--color-border] rounded-xl p-4"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-[--color-foreground]">
                          {booking.service.name}
                        </h3>
                        <p className="text-sm text-[--color-muted-foreground]">
                          {new Date(booking.date).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                        <p className="text-sm text-[--color-muted-foreground]">
                          🕒 {booking.time}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          booking.status === "COMPLETED"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>
                    <div className="mt-2">
                      <span className="font-bold text-[--color-secondary]">
                        AED {booking.finalPrice}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
