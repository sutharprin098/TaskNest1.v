"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Worker {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  hourlyRate: number;
  status: string;
  experience?: number;
  avgRating?: number;
  totalReviews?: number;
  _count?: {
    bookings: number;
  };
  createdAt: string;
}

export default function AdminWorkersPage() {
  const router = useRouter();
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    hourlyRate: 0,
    bio: "",
    serviceType: [] as string[],
  });

  const serviceOptions = [
    { label: "Home Cooking", value: "HOME_COOKING" },
    { label: "Event Cooking", value: "EVENT_COOKING" },
    { label: "Home Organization", value: "HOME_ORGANIZATION" },
    { label: "Seasonal Concierge", value: "SEASONAL_CONCIERGE" },
    { label: "Custom Cooking", value: "CUSTOM_COOKING" },
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

    fetchWorkers();
  }, [router, filter]);

  const fetchWorkers = async () => {
    try {
      const token = localStorage.getItem("token");
      const url = filter === "all"
        ? "/api/admin/workers"
        : `/api/admin/workers?status=${filter}`;

      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (data.success) {
        setWorkers(data.data);
      }
    } catch (error) {
      console.error("Error fetching workers:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      ACTIVE: "bg-green-100 text-green-800 border-green-300",
      INACTIVE: "bg-gray-100 text-gray-800 border-gray-300",
      SUSPENDED: "bg-red-100 text-red-800 border-red-300",
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[status] || styles.ACTIVE}`}>
        {status}
      </span>
    );
  };

  const getServiceIcon = (type: string) => {
    const icons: Record<string, string> = {
      HOME_COOKING: "🍳",
      EVENT_COOKING: "👨‍🍳",
      HOME_ORGANIZATION: "📦",
      SEASONAL_CONCIERGE: "🎉",
      CUSTOM_COOKING: "🥗",
    };
    return icons[type] || "🔧";
  };

  const parseServiceTypes = (value: string) => {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [value];
    } catch {
      return value ? [value] : [];
    }
  };

  const handleToggleService = (value: string) => {
    setFormData((prev) => {
      const exists = prev.serviceType.includes(value);
      return {
        ...prev,
        serviceType: exists
          ? prev.serviceType.filter((item) => item !== value)
          : [...prev.serviceType, value],
      };
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      hourlyRate: 0,
      bio: "",
      serviceType: [],
    });
  };

  const handleCreateWorker = async (event: FormEvent) => {
    event.preventDefault();
    try {
      setSaving(true);
      setMessage(null);
      const token = localStorage.getItem("token");

      const response = await fetch("/api/admin/workers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          hourlyRate: Number(formData.hourlyRate),
          bio: formData.bio || undefined,
          serviceType: formData.serviceType,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to create worker");
      }

      setWorkers((prev) => [data.data, ...prev]);
      setMessage({ type: "success", text: "Worker created successfully" });
      resetForm();
      setShowAddModal(false);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Create failed";
      setMessage({ type: "error", text: errorMessage });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[--color-muted]">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-3xl font-bold mb-2">Workers Management</h1>
          <p className="text-slate-300">Manage service professionals</p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-[--color-border]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setFilter("all")}
                className={`px-6 py-2 rounded-xl font-semibold transition-all ${
                  filter === "all"
                    ? "bg-[--color-primary] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All Workers
              </button>
              <button
                onClick={() => setFilter("ACTIVE")}
                className={`px-6 py-2 rounded-xl font-semibold transition-all ${
                  filter === "ACTIVE"
                    ? "bg-green-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setFilter("INACTIVE")}
                className={`px-6 py-2 rounded-xl font-semibold transition-all ${
                  filter === "INACTIVE"
                    ? "bg-gray-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Inactive
              </button>
            </div>
            <button
              onClick={() => {
                resetForm();
                setShowAddModal(true);
              }}
              className="px-6 py-2 rounded-xl bg-[--color-primary] text-white font-semibold hover:bg-[--color-primary]/90 transition-all"
            >
              + Add Worker
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

        {/* Workers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full text-center py-12">
              <p className="text-[--color-muted-foreground]">Loading workers...</p>
            </div>
          ) : workers.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-4xl mb-4">👷</p>
              <p className="text-[--color-muted-foreground]">No workers found</p>
            </div>
          ) : (
            workers.map((worker) => (
              (() => {
                const serviceTypes = parseServiceTypes(worker.serviceType);
                const primaryService = serviceTypes[0] || "";
                const rating = Number(worker.avgRating ?? 5);
                const completedJobs = worker._count?.bookings ?? 0;
                const experienceYears = worker.experience ?? 0;
                return (
              <div
                key={worker.id}
                className="bg-white rounded-2xl shadow-lg p-6 border border-[--color-border] hover:shadow-xl transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">{getServiceIcon(primaryService)}</div>
                    <div>
                      <h3 className="font-bold text-lg text-[--color-primary]">{worker.name}</h3>
                      <p className="text-sm text-[--color-muted-foreground]">
                        {serviceTypes.length > 0
                          ? serviceTypes.map((type) => type.replace(/_/g, " ")).join(", ")
                          : "No service type"}
                      </p>
                    </div>
                  </div>
                  {getStatusBadge(worker.status)}
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-[--color-muted-foreground]">📧</span>
                    <span className="text-[--color-foreground]">{worker.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-[--color-muted-foreground]">📱</span>
                    <span className="text-[--color-foreground]">{worker.phone}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-[--color-muted] rounded-xl p-3">
                    <p className="text-xs text-[--color-muted-foreground] mb-1">Hourly Rate</p>
                    <p className="text-lg font-bold text-[--color-secondary]">₹{worker.hourlyRate}</p>
                  </div>
                  <div className="bg-[--color-muted] rounded-xl p-3">
                    <p className="text-xs text-[--color-muted-foreground] mb-1">Experience</p>
                    <p className="text-lg font-bold text-[--color-foreground]">{experienceYears} yrs</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[--color-border]">
                  <div>
                    <p className="text-xs text-[--color-muted-foreground]">Rating</p>
                    <p className="font-bold text-[--color-foreground]">
                      ⭐ {rating.toFixed(1)} ({completedJobs} jobs)
                    </p>
                  </div>
                </div>
              </div>
                );
              })()
            ))
          )}
        </div>

        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-[--color-primary]">Add New Worker</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-sm text-[--color-muted-foreground] hover:text-[--color-foreground]"
                >
                  Close
                </button>
              </div>

              <form onSubmit={handleCreateWorker} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-semibold text-[--color-foreground]">Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                      className="mt-2 w-full rounded-xl border border-[--color-border] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[--color-secondary]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[--color-foreground]">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                      className="mt-2 w-full rounded-xl border border-[--color-border] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[--color-secondary]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[--color-foreground]">Phone</label>
                    <input
                      type="text"
                      required
                      value={formData.phone}
                      onChange={(event) => setFormData({ ...formData, phone: event.target.value })}
                      className="mt-2 w-full rounded-xl border border-[--color-border] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[--color-secondary]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[--color-foreground]">Hourly Rate (INR)</label>
                    <input
                      type="number"
                      min="0"
                      required
                      value={formData.hourlyRate}
                      onChange={(event) =>
                        setFormData({ ...formData, hourlyRate: Number(event.target.value) })
                      }
                      className="mt-2 w-full rounded-xl border border-[--color-border] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[--color-secondary]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[--color-foreground]">Service Types</label>
                  <div className="mt-2 grid gap-3 md:grid-cols-2">
                    {serviceOptions.map((option) => (
                      <label key={option.value} className="flex items-center gap-2 text-sm text-[--color-foreground]">
                        <input
                          type="checkbox"
                          checked={formData.serviceType.includes(option.value)}
                          onChange={() => handleToggleService(option.value)}
                          className="h-4 w-4 rounded border-[--color-border] text-[--color-primary]"
                        />
                        {option.label}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[--color-foreground]">Bio</label>
                  <textarea
                    rows={3}
                    value={formData.bio}
                    onChange={(event) => setFormData({ ...formData, bio: event.target.value })}
                    className="mt-2 w-full rounded-xl border border-[--color-border] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[--color-secondary]"
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="rounded-xl border border-[--color-border] px-4 py-2 text-sm font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving || formData.serviceType.length === 0}
                    className="rounded-xl bg-[--color-primary] px-5 py-2 text-sm font-semibold text-white hover:bg-[--color-primary]/90 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {saving ? "Saving..." : "Create Worker"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

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
