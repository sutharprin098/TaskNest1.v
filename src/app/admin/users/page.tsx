"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  role: string;
  createdAt: string;
  _count?: {
    bookings: number;
  };
}

export default function AdminUsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

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

    fetchUsers();
  }, [router, filter]);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const url = filter === "all"
        ? "/api/admin/users"
        : `/api/admin/users?role=${filter}`;

      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (data.success) {
        setUsers(data.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const getRoleBadge = (role: string) => {
    const styles: Record<string, string> = {
      ADMIN: "bg-purple-100 text-purple-800 border-purple-300",
      CUSTOMER: "bg-blue-100 text-blue-800 border-blue-300",
      WORKER: "bg-green-100 text-green-800 border-green-300",
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[role] || styles.CUSTOMER}`}>
        {role}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-[--color-muted]">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-3xl font-bold mb-2">Users Management</h1>
          <p className="text-slate-300">Manage all platform users</p>
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
              All Users
            </button>
            <button
              onClick={() => setFilter("CUSTOMER")}
              className={`px-6 py-2 rounded-xl font-semibold transition-all ${
                filter === "CUSTOMER"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Customers
            </button>
            <button
              onClick={() => setFilter("ADMIN")}
              className={`px-6 py-2 rounded-xl font-semibold transition-all ${
                filter === "ADMIN"
                  ? "bg-purple-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Admins
            </button>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-[--color-border]">
          {loading ? (
            <div className="p-12 text-center">
              <p className="text-[--color-muted-foreground]">Loading users...</p>
            </div>
          ) : users.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-4xl mb-4">👥</p>
              <p className="text-[--color-muted-foreground]">No users found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[--color-muted]">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[--color-foreground]">ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[--color-foreground]">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[--color-foreground]">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[--color-foreground]">Phone</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[--color-foreground]">Location</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[--color-foreground]">Role</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[--color-foreground]">Bookings</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[--color-foreground]">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[--color-border]">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-[--color-muted]/50 transition-colors">
                      <td className="px-6 py-4 text-sm text-[--color-foreground] font-mono">
                        {user.id.slice(0, 8)}...
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-[--color-foreground]">{user.name}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-[--color-foreground]">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-[--color-foreground]">
                        {user.phone || <span className="text-[--color-muted-foreground] italic">N/A</span>}
                      </td>
                      <td className="px-6 py-4 text-sm text-[--color-foreground]">
                        {user.city}
                      </td>
                      <td className="px-6 py-4">
                        {getRoleBadge(user.role)}
                      </td>
                      <td className="px-6 py-4 text-sm text-center font-semibold text-[--color-foreground]">
                        {user._count?.bookings || 0}
                      </td>
                      <td className="px-6 py-4 text-sm text-[--color-muted-foreground]">
                        {formatDate(user.createdAt)}
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
