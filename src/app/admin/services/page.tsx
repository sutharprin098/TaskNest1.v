"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Service {
  id: string;
  name: string;
  type: string;
  startingPrice: number;
  description: string | null;
  longDescription?: string | null;
  image?: string | null;
  included?: string | null;
  excluded?: string | null;
}

export default function AdminServicesPage() {
  const router = useRouter();
  const [services, setServices] = useState<Service[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
    longDescription: "",
    startingPrice: 0,
    image: "",
    included: "",
    excluded: "",
  });

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

    fetchServices();
  }, [router]);

  const fetchServices = async () => {
    try {
      const response = await fetch("/api/services");
      const data = await response.json();
      if (data.success) {
        setServices(data.data);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const handleEdit = (service: Service) => {
    setEditingId(service.id);
    setFormData({
      name: service.name,
      type: service.type,
      description: service.description || "",
      longDescription: service.longDescription || "",
      startingPrice: service.startingPrice,
      image: service.image || "",
      included: service.included || "",
      excluded: service.excluded || "",
    });
    setMessage(null);
  };

  const handleCancel = () => {
    setEditingId(null);
    setShowAddModal(false);
    setFormData({
      name: "",
      type: "",
      description: "",
      longDescription: "",
      startingPrice: 0,
      image: "",
      included: "",
      excluded: "",
    });
    setMessage(null);
  };

  const handleUpdate = async (serviceId: string) => {
    if (formData.startingPrice <= 0) {
      setMessage({ type: "error", text: "Price must be greater than 0" });
      return;
    }

    if (!formData.name || !formData.description) {
      setMessage({ type: "error", text: "Name and description are required" });
      return;
    }

    setLoading(true);
    setMessage(null);

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`/api/admin/services/${serviceId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: "success", text: "Service updated successfully!" });
        setEditingId(null);
        fetchServices();
      } else {
        setMessage({ type: "error", text: data.message || "Failed to update service" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "An error occurred. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (formData.startingPrice <= 0) {
      setMessage({ type: "error", text: "Price must be greater than 0" });
      return;
    }

    if (!formData.name || !formData.type || !formData.description) {
      setMessage({ type: "error", text: "Name, type, and description are required" });
      return;
    }

    setLoading(true);
    setMessage(null);

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("/api/admin/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: "success", text: "Service added successfully!" });
        setShowAddModal(false);
        handleCancel();
        fetchServices();
      } else {
        setMessage({ type: "error", text: data.message || "Failed to add service" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "An error occurred. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (serviceId: string, serviceName: string) => {
    if (!confirm(`Are you sure you want to delete "${serviceName}"? This action cannot be undone.`)) {
      return;
    }

    setLoading(true);
    setMessage(null);

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`/api/admin/services/${serviceId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: "success", text: "Service deleted successfully!" });
        fetchServices();
      } else {
        setMessage({ type: "error", text: data.message || "Failed to delete service" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "An error occurred. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const getServiceEmoji = (type: string) => {
    switch (type) {
      case "HOME_COOKING": return "🍳";
      case "EVENT_COOKING": return "👨‍🍳";
      case "HOME_ORGANIZATION": return "📦";
      case "SEASONAL_CONCIERGE": return "🎉";
      case "CUSTOM_COOKING": return "🥗";
      default: return "🔧";
    }
  };

  return (
    <div className="min-h-screen bg-[--color-muted] py-12">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-[--color-primary] mb-2">
              Service Management
            </h1>
            <p className="text-[--color-muted-foreground]">
              Add, edit, or remove services and update pricing
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-6 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-all shadow-md"
          >
            ➕ Add New Service
          </button>
        </div>

        {message && (
          <div
            className={`mb-6 p-4 rounded-2xl border-l-4 ${
              message.type === "success"
                ? "bg-green-50 border-green-500"
                : "bg-red-50 border-red-500"
            }`}
          >
            <div className="flex items-center">
              <span className="text-2xl mr-3">{message.type === "success" ? "✅" : "⚠️"}</span>
              <p
                className={`font-semibold ${
                  message.type === "success" ? "text-green-800" : "text-red-800"
                }`}
              >
                {message.text}
              </p>
            </div>
          </div>
        )}

        {/* Add Service Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
              <h2 className="text-3xl font-bold text-[--color-primary] mb-6">Add New Service</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Service Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-[--color-primary] focus:outline-none"
                    placeholder="e.g., Home Deep Cleaning"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Service Type *</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-[--color-primary] focus:outline-none"
                  >
                    <option value="">Select Type</option>
                    <option value="HOME_COOKING">Home Cooking</option>
                    <option value="EVENT_COOKING">Event Cooking</option>
                    <option value="HOME_ORGANIZATION">Home Organization</option>
                    <option value="SEASONAL_CONCIERGE">Seasonal Concierge</option>
                    <option value="CUSTOM_COOKING">Custom Cooking</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Description *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-[--color-primary] focus:outline-none"
                    rows={3}
                    placeholder="Short description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Long Description</label>
                  <textarea
                    value={formData.longDescription}
                    onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-[--color-primary] focus:outline-none"
                    rows={4}
                    placeholder="Detailed description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Starting Price (₹) *</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.startingPrice}
                    onChange={(e) => setFormData({ ...formData, startingPrice: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-[--color-primary] focus:outline-none"
                    placeholder="1000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Image URL</label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-[--color-primary] focus:outline-none"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">What&apos;s Included</label>
                  <textarea
                    value={formData.included}
                    onChange={(e) => setFormData({ ...formData, included: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-[--color-primary] focus:outline-none"
                    rows={2}
                    placeholder="List what's included"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">What&apos;s Excluded</label>
                  <textarea
                    value={formData.excluded}
                    onChange={(e) => setFormData({ ...formData, excluded: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-[--color-primary] focus:outline-none"
                    rows={2}
                    placeholder="List what's excluded"
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleAdd}
                  disabled={loading}
                  className="flex-1 px-6 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-all disabled:opacity-50"
                >
                  {loading ? "Adding..." : "✅ Add Service"}
                </button>
                <button
                  onClick={handleCancel}
                  disabled={loading}
                  className="flex-1 px-6 py-3 rounded-xl bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition-all"
                >
                  ❌ Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl shadow-lg p-6 border border-[--color-border]"
            >
              {editingId === service.id ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="text-5xl">{getServiceEmoji(service.type)}</div>
                    <h3 className="text-2xl font-bold text-[--color-primary]">
                      Editing: {service.name}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-1">Service Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 focus:border-[--color-primary] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-1">Starting Price (₹)</label>
                      <input
                        type="number"
                        min="1"
                        value={formData.startingPrice}
                        onChange={(e) => setFormData({ ...formData, startingPrice: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 focus:border-[--color-primary] focus:outline-none"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold mb-1">Description</label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 focus:border-[--color-primary] focus:outline-none"
                        rows={2}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold mb-1">Long Description</label>
                      <textarea
                        value={formData.longDescription}
                        onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 focus:border-[--color-primary] focus:outline-none"
                        rows={3}
                      />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleUpdate(service.id)}
                      disabled={loading}
                      className="px-6 py-2 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-all disabled:opacity-50"
                    >
                      {loading ? "Saving..." : "💾 Save Changes"}
                    </button>
                    <button
                      onClick={handleCancel}
                      disabled={loading}
                      className="px-6 py-2 rounded-xl bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition-all"
                    >
                      ❌ Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-6">
                  <div className="text-5xl">{getServiceEmoji(service.type)}</div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-[--color-primary] mb-2">
                      {service.name}
                    </h3>
                    <p className="text-[--color-muted-foreground] mb-4">
                      {service.description || "No description available"}
                    </p>
                    
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-sm text-[--color-muted-foreground] mb-1">
                          Service Type
                        </p>
                        <p className="font-semibold text-[--color-foreground]">
                          {service.type.replace(/_/g, " ")}
                        </p>
                      </div>
                      
                      <div className="h-12 w-px bg-[--color-border]" />
                      
                      <div>
                        <p className="text-sm text-[--color-muted-foreground] mb-1">
                          Starting Price
                        </p>
                        <p className="text-2xl font-bold text-[--color-secondary]">
                          ₹{service.startingPrice}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => handleEdit(service)}
                      className="px-6 py-2 rounded-xl bg-[--color-primary] text-white font-semibold hover:bg-[--color-secondary] transition-all shadow-md"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(service.id, service.name)}
                      className="px-6 py-2 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition-all shadow-md"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8">
          <button
            onClick={() => router.push("/admin/dashboard")}
            className="px-6 py-3 rounded-xl bg-white border-2 border-[--color-border] font-semibold hover:bg-[--color-muted] transition-all"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
