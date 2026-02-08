"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Booking {
  id: string;
  date: string;
  time: string;
  duration: number;
  status: string;
  finalPrice: number;
  address: string;
  notes: string;
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
  service: {
    name: string;
    type: string;
  };
  worker?: {
    id: string;
    name: string;
    phone: string;
  };
  payment?: {
    status: string;
    amount: number;
  };
}

interface WorkerOption {
  id: string;
  name: string;
  phone: string;
  status: string;
}

export default function AdminBookingsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [workers, setWorkers] = useState<WorkerOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [savingId, setSavingId] = useState<string | null>(null);
  const [savingWorkerId, setSavingWorkerId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const statusOptions = [
    "PENDING",
    "CONFIRMED",
    "IN_PROGRESS",
    "COMPLETED",
    "CANCELLED",
  ];

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.push("/auth/login");
      return;
    }

    const user = JSON.parse(userData);
    if (user.role !== "ADMIN") {
      router.push("/dashboard");
      return;
    }

    fetchBookings();
    fetchWorkers();
  }, [router, filter]);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const url = filter === "all" 
        ? "/api/admin/bookings"
        : `/api/admin/bookings?status=${filter}`;

      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
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

  const fetchWorkers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/admin/workers", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (data.success) {
        setWorkers(data.data || []);
      }
    } catch (error) {
      console.error("Error fetching workers:", error);
    }
  };

  const updateBookingStatus = async (id: string, status: string) => {
    try {
      setSavingId(id);
      setMessage(null);
      const token = localStorage.getItem("token");

      const response = await fetch("/api/admin/bookings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id, status }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to update booking");
      }

      setBookings((prev) =>
        prev.map((booking) => (booking.id === id ? { ...booking, status } : booking))
      );
      setMessage({ type: "success", text: "Booking status updated" });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Update failed";
      setMessage({ type: "error", text: errorMessage });
    } finally {
      setSavingId(null);
    }
  };

  const updateBookingWorker = async (id: string, workerId: string | null) => {
    try {
      setSavingWorkerId(id);
      setMessage(null);
      const token = localStorage.getItem("token");

      const response = await fetch("/api/admin/bookings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id, workerId: workerId || null }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to assign worker");
      }

      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === id
            ? {
                ...booking,
                worker: workerId
                  ? workers.find((worker) => worker.id === workerId) || booking.worker
                  : undefined,
              }
            : booking
        )
      );
      setMessage({ type: "success", text: "Worker assignment updated" });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Assignment failed";
      setMessage({ type: "error", text: errorMessage });
    } finally {
      setSavingWorkerId(null);
    }
  };

  const activeWorkers = workers.filter((worker) => worker.status === "ACTIVE");

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      PENDING: "bg-yellow-100 text-yellow-800 border-yellow-300",
      CONFIRMED: "bg-blue-100 text-blue-800 border-blue-300",
      IN_PROGRESS: "bg-purple-100 text-purple-800 border-purple-300",
      COMPLETED: "bg-green-100 text-green-800 border-green-300",
      CANCELLED: "bg-red-100 text-red-800 border-red-300",
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[status] || styles.PENDING}`}>
        {status}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-[--color-muted]">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-3xl font-bold mb-2">Bookings Management</h1>
          <p className="text-slate-300">View and manage all service bookings</p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-[--color-border]">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setFilter("all")}
              className={`px-6 py-2 rounded-xl font-semibold transition-all ${
                filter === "all"
                  ? "bg-[--color-primary] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All Bookings
            </button>
            <button
              onClick={() => setFilter("PENDING")}
              className={`px-6 py-2 rounded-xl font-semibold transition-all ${
                filter === "PENDING"
                  ? "bg-yellow-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter("CONFIRMED")}
              className={`px-6 py-2 rounded-xl font-semibold transition-all ${
                filter === "CONFIRMED"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Confirmed
            </button>
            <button
              onClick={() => setFilter("IN_PROGRESS")}
              className={`px-6 py-2 rounded-xl font-semibold transition-all ${
                filter === "IN_PROGRESS"
                  ? "bg-purple-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              In Progress
            </button>
            <button
              onClick={() => setFilter("COMPLETED")}
              className={`px-6 py-2 rounded-xl font-semibold transition-all ${
                filter === "COMPLETED"
                  ? "bg-green-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Completed
            </button>
            <button
              onClick={() => setFilter("CANCELLED")}
              className={`px-6 py-2 rounded-xl font-semibold transition-all ${
                filter === "CANCELLED"
                  ? "bg-red-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Cancelled
            </button>
          </div>
        </div>

        {message && (
          <div
            className={`mb-6 rounded-xl border px-4 py-3 text-sm ${
              message.type === "success"
                ? "border-green-200 bg-green-50 text-green-700"
                : "border-red-200 bg-red-50 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Bookings Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-[--color-border]">
          {loading ? (
            <div className="p-12 text-center">
              <p className="text-[--color-muted-foreground]">Loading bookings...</p>
            </div>
          ) : bookings.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-2xl mb-2">📋</p>
              <p className="text-[--color-muted-foreground]">No bookings found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[--color-muted]">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[--color-foreground]">ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[--color-foreground]">Customer</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[--color-foreground]">Service</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[--color-foreground]">Date & Time</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[--color-foreground]">Duration</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[--color-foreground]">Price</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[--color-foreground]">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[--color-foreground]">Update</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[--color-foreground]">Assign</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[--color-foreground]">Worker</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[--color-border]">
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-[--color-muted]/50 transition-colors">
                      <td className="px-6 py-4 text-sm text-[--color-foreground] font-mono">
                        {booking.id.slice(0, 8)}...
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-[--color-foreground]">{booking.user.name}</p>
                          <p className="text-sm text-[--color-muted-foreground]">{booking.user.email}</p>
                          <p className="text-sm text-[--color-muted-foreground]">{booking.user.phone}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-[--color-foreground]">{booking.service.name}</p>
                        <p className="text-sm text-[--color-muted-foreground]">
                          {booking.service.type.replace(/_/g, " ")}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-sm text-[--color-foreground]">
                        <div>
                          <p className="font-semibold">{formatDate(booking.date)}</p>
                          <p className="text-[--color-muted-foreground]">🕒 {booking.time}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-[--color-foreground]">
                        {booking.duration}h
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-[--color-secondary]">
                        ₹{booking.finalPrice}
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(booking.status)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <select
                            value={booking.status}
                            onChange={(event) => updateBookingStatus(booking.id, event.target.value)}
                            disabled={savingId === booking.id}
                            className="rounded-lg border border-[--color-border] bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[--color-secondary]"
                          >
                            {statusOptions.map((status) => (
                              <option key={status} value={status}>
                                {status.replace(/_/g, " ")}
                              </option>
                            ))}
                          </select>
                          {savingId === booking.id && (
                            <span className="text-xs text-[--color-muted-foreground]">Saving...</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <select
                            value={booking.worker?.id || ""}
                            onChange={(event) =>
                              updateBookingWorker(
                                booking.id,
                                event.target.value ? event.target.value : null
                              )
                            }
                            disabled={savingWorkerId === booking.id || activeWorkers.length === 0}
                            className="rounded-lg border border-[--color-border] bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[--color-secondary]"
                          >
                            <option value="">Unassigned</option>
                            {activeWorkers.map((worker) => (
                              <option key={worker.id} value={worker.id}>
                                {worker.name}
                              </option>
                            ))}
                          </select>
                          {savingWorkerId === booking.id && (
                            <span className="text-xs text-[--color-muted-foreground]">Saving...</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-[--color-foreground]">
                        {booking.worker ? (
                          <div>
                            <p className="font-semibold">{booking.worker.name}</p>
                            <p className="text-[--color-muted-foreground]">{booking.worker.phone}</p>
                          </div>
                        ) : (
                          <span className="text-[--color-muted-foreground] italic">Not assigned</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="mt-6">
          <Link
            href="/admin/dashboard"
            className="inline-block px-6 py-3 rounded-xl bg-white border-2 border-[--color-border] font-semibold hover:bg-[--color-muted] transition-all"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
