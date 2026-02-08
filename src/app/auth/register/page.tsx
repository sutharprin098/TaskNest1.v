"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token) {
      return;
    }

    if (userData) {
      const user = JSON.parse(userData);
      router.push(user.role === "ADMIN" ? "/admin/dashboard" : "/dashboard");
      return;
    }

    const verifySession = async () => {
      try {
        const response = await fetch("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const data = await response.json();
          if (data?.data?.role) {
            router.push(data.data.role === "ADMIN" ? "/admin/dashboard" : "/dashboard");
          }
        }
      } catch (fetchError) {
        console.error("Session check error:", fetchError);
      }
    };

    verifySession();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        // Store token
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data.user));

        // Redirect to dashboard
        router.push("/dashboard");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[--color-muted] px-4 py-12">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-[--color-border]">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[--color-primary]">Create Account</h2>
            <p className="text-[--color-muted-foreground] mt-2">
              Join TaskNest and experience premium services
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[--color-foreground] mb-2">
                Full Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-[--color-border] focus:outline-none focus:ring-2 focus:ring-[--color-secondary] focus:border-transparent"
                placeholder="John Smith"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[--color-foreground] mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-[--color-border] focus:outline-none focus:ring-2 focus:ring-[--color-secondary] focus:border-transparent"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[--color-foreground] mb-2">
                Password
              </label>
              <input
                type="password"
                required
                minLength={8}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-[--color-border] focus:outline-none focus:ring-2 focus:ring-[--color-secondary] focus:border-transparent"
                placeholder="••••••••"
              />
              <p className="text-xs text-[--color-muted-foreground] mt-1">
                Minimum 8 characters
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-[--color-foreground] mb-2">
                Phone Number (Optional)
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-[--color-border] focus:outline-none focus:ring-2 focus:ring-[--color-secondary] focus:border-transparent"
                placeholder="+971 50 123 4567"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[--color-foreground] mb-2">
                Address (Optional)
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-[--color-border] focus:outline-none focus:ring-2 focus:ring-[--color-secondary] focus:border-transparent"
                placeholder="Your address in Delhi"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[--color-primary] px-6 py-3 text-lg font-semibold text-[--color-primary-foreground] hover:bg-[--color-secondary] hover:text-[--color-secondary-foreground] transition-all shadow-lg disabled:opacity-50"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-[--color-muted-foreground]">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-[--color-secondary] font-semibold hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
