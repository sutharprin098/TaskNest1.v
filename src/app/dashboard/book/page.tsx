"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";

const LocationMap = dynamic(() => import("@/components/LocationMap"), { ssr: false });

interface Service {
  id: string;
  name: string;
  type: string;
  startingPrice: number;
  description?: string;
}

export default function BookServicePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [services, setServices] = useState<Service[]>([]);
  const [formData, setFormData] = useState({
    serviceId: "",
    date: "",
    time: "",
    duration: 2,
    guestCount: 7,
    address: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
      return;
    }

    fetchServices();
  }, [router]);

  useEffect(() => {
    if (!services.length || formData.serviceId) {
      return;
    }

    const slug = searchParams.get("service");
    if (!slug) {
      return;
    }

    const slugToType: Record<string, string> = {
      "home-cooking": "HOME_COOKING",
      "event-cooking": "EVENT_COOKING",
      "home-organization": "HOME_ORGANIZATION",
      "seasonal-concierge": "SEASONAL_CONCIERGE",
      "custom-cooking": "CUSTOM_COOKING",
    };

    const targetType = slugToType[slug];
    if (!targetType) {
      return;
    }

    const match = services.find((service) => service.type === targetType);
    if (match) {
      setFormData((prev) => ({ ...prev, serviceId: match.id }));
      validateField("serviceId", match.id);
    }
  }, [services, searchParams, formData.serviceId]);

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

  const validateField = (name: string, value: any) => {
    const errors: Record<string, string> = { ...fieldErrors };
    const selectedService = services.find((s) => s.id === formData.serviceId);

    switch (name) {
      case "serviceId":
        if (!value) {
          errors.serviceId = "Please select a service";
        } else {
          delete errors.serviceId;
        }
        break;
      case "date":
        if (!value) {
          errors.date = "Please select a date";
        } else if (new Date(value) < new Date()) {
          errors.date = "Date must be in the future";
        } else {
          delete errors.date;
        }
        break;
      case "time":
        if (!value) {
          errors.time = "Please select a time slot";
        } else {
          delete errors.time;
        }
        break;
      case "duration":
        if (selectedService?.type === "HOME_COOKING" && value < 2) {
          errors.duration = "Minimum 2 hours required for Home Cooking";
        } else if (selectedService?.type === "HOME_ORGANIZATION" && value < 3) {
          errors.duration = "Minimum 3 hours required for Home Organization";
        } else if (selectedService?.type === "CUSTOM_COOKING" && value < 3) {
          errors.duration = "Minimum 3 hours required for Custom Cooking";
        } else if (value < 1) {
          errors.duration = "Duration must be at least 1 hour";
        } else if (value > 12) {
          errors.duration = "Duration cannot exceed 12 hours";
        } else {
          delete errors.duration;
        }
        break;
      case "guestCount":
        if (selectedService?.type === "EVENT_COOKING") {
          if (value < 7) {
            errors.guestCount = "Minimum 7 guests required for events";
          } else if (value > 15) {
            errors.guestCount = "Maximum 15 guests allowed";
          } else {
            delete errors.guestCount;
          }
        }
        break;
      case "address":
        if (!value || value.trim().length < 10) {
          errors.address = "Please enter a complete address (minimum 10 characters)";
        } else {
          delete errors.address;
        }
        break;
    }

    setFieldErrors(errors);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    validateField("serviceId", formData.serviceId);
    validateField("date", formData.date);
    validateField("time", formData.time);
    validateField("duration", formData.duration);
    validateField("address", formData.address);
    
    const selectedService = services.find((s) => s.id === formData.serviceId);
    if (selectedService?.type === "EVENT_COOKING") {
      validateField("guestCount", formData.guestCount);
    }

    // Check if there are any errors
    if (Object.keys(fieldErrors).length > 0) {
      setError("Please fix all validation errors before submitting");
      return;
    }

    setLoading(true);
    setError("");

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        router.push("/dashboard");
      } else {
        setError(data.message || "Booking failed");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const selectedService = services.find((s) => s.id === formData.serviceId);

  return (
    <div className="min-h-screen bg-[--color-muted] py-8 sm:py-10 md:py-12">
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-[--color-primary]">
            Book a Service
          </h1>
          <p className="text-sm sm:text-base text-[--color-muted-foreground] mt-2">
            {!selectedService ? "Choose your service to get started" : "Complete your booking details"}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
            <div className="flex items-center">
              <span className="text-2xl mr-3">⚠️</span>
              <div>
                <p className="font-semibold text-red-800">Error</p>
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Service Selection - Show all services if none selected */}
        {!selectedService ? (
          <>
            <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
              {services.map((service) => (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => {
                    setFormData({ ...formData, serviceId: service.id });
                    validateField("serviceId", service.id);
                    setError("");
                  }}
                  className="group text-left p-5 sm:p-6 rounded-2xl border-2 border-[--color-border] bg-white hover:border-[--color-secondary] hover:shadow-2xl sm:hover:scale-105 transition-all duration-300"
                >
                  <div className="text-4xl sm:text-5xl mb-4 group-hover:scale-110 transition-transform">
                    {service.type === "HOME_COOKING" ? "🍳" :
                     service.type === "EVENT_COOKING" ? "👨‍🍳" :
                     service.type === "HOME_ORGANIZATION" ? "📦" :
                     service.type === "SEASONAL_CONCIERGE" ? "🎉" : "🥗"}
                  </div>
                  <h3 className="font-bold text-lg sm:text-xl text-[--color-primary] mb-2 group-hover:text-[--color-secondary] transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[--color-muted-foreground] mb-4 line-clamp-2">
                    {service.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-lg sm:text-xl font-bold text-[--color-secondary]">
                      ₹{service.startingPrice}
                    </p>
                    <span className="text-xs font-semibold text-[--color-primary] bg-[--color-primary]/10 px-3 py-1 rounded-full group-hover:bg-[--color-secondary] group-hover:text-white transition-colors">
                      Select →
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {fieldErrors.serviceId && (
              <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded-lg">
                <p className="text-yellow-800 font-semibold flex items-center gap-2">
                  <span>⚠️</span> {fieldErrors.serviceId}
                </p>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Selected Service Display */}
            <div className="bg-gradient-to-br from-white to-[--color-muted] rounded-3xl shadow-2xl p-6 sm:p-8 mb-6 sm:mb-8 border-2 border-[--color-secondary]/30">
              <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                  <div className="text-5xl sm:text-6xl md:text-7xl">
                    {selectedService.type === "HOME_COOKING" ? "🍳" :
                     selectedService.type === "EVENT_COOKING" ? "👨‍🍳" :
                     selectedService.type === "HOME_ORGANIZATION" ? "📦" :
                     selectedService.type === "SEASONAL_CONCIERGE" ? "🎉" : "🥗"}
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[--color-primary] mb-2">
                      {selectedService.name}
                    </h2>
                    <p className="text-sm sm:text-base text-[--color-muted-foreground]">
                      {selectedService.description}
                    </p>
                    <div className="mt-3 inline-block">
                      <span className="text-xl sm:text-2xl font-bold text-[--color-secondary]">
                        Starting ₹{selectedService.startingPrice}
                      </span>
                      <span className="text-sm text-[--color-muted-foreground] ml-2">
                        {selectedService.type === "EVENT_COOKING" ? "/guest" : "/hour"}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setFormData({
                      serviceId: "",
                      date: "",
                      time: "",
                      duration: 2,
                      guestCount: 7,
                      address: "",
                      notes: "",
                    });
                    setFieldErrors({});
                    setError("");
                  }}
                  className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-white border-2 border-[--color-border] text-[--color-foreground] font-semibold hover:bg-[--color-muted] hover:border-[--color-primary] transition-all shadow-md"
                >
                  ← Change Service
                </button>
              </div>
              
              <div className="flex gap-4 flex-wrap">
                <div className="px-4 py-2 bg-[--color-secondary]/10 rounded-xl">
                  <span className="text-xs font-semibold text-[--color-secondary] uppercase">
                    {selectedService.type.replace(/_/g, " ")}
                  </span>
                </div>
                <div className="px-4 py-2 bg-green-50 rounded-xl">
                  <span className="text-xs font-semibold text-green-700">
                    ✓ Professional Service
                  </span>
                </div>
                <div className="px-4 py-2 bg-blue-50 rounded-xl">
                  <span className="text-xs font-semibold text-blue-700">
                    ✓ Verified Workers
                  </span>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-[--color-border]">
              <h3 className="text-xl sm:text-2xl font-bold text-[--color-primary] mb-2 flex items-center gap-3">
                <span className="text-2xl sm:text-3xl">📅</span> Schedule Your Booking
              </h3>
              <p className="text-sm sm:text-base text-[--color-muted-foreground] mb-6 sm:mb-8 ml-9 sm:ml-11">Fill in the details below to complete your booking</p>
              
              <div className="grid gap-5 sm:gap-6 md:grid-cols-2 mb-6">
                <div>
                  <label className="block text-sm font-bold text-[--color-foreground] mb-2 flex items-center gap-2">
                    <span className="text-lg">📆</span> Preferred Date *
                  </label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split("T")[0]}
                    value={formData.date}
                    onChange={(e) => {
                      setFormData({ ...formData, date: e.target.value });
                      validateField("date", e.target.value);
                    }}
                    onBlur={(e) => validateField("date", e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none transition-all font-semibold ${
                      fieldErrors.date
                        ? "border-red-500 focus:border-red-600 bg-red-50"
                        : "border-[--color-border] focus:border-[--color-secondary] focus:shadow-lg"
                    }`}
                  />
                  {fieldErrors.date && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1 font-semibold">
                      <span>⚠️</span> {fieldErrors.date}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-[--color-foreground] mb-2 flex items-center gap-2">
                    <span className="text-lg">🕒</span> Preferred Time *
                  </label>
                  <select
                    required
                    value={formData.time}
                    onChange={(e) => {
                      setFormData({ ...formData, time: e.target.value });
                      validateField("time", e.target.value);
                    }}
                    onBlur={(e) => validateField("time", e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none transition-all font-semibold ${
                      fieldErrors.time
                        ? "border-red-500 focus:border-red-600 bg-red-50"
                        : "border-[--color-border] focus:border-[--color-secondary] focus:shadow-lg"
                    }`}
                  >
                    <option value="">Select Time</option>
                    <option value="06:00 AM">🌅 06:00 AM - Early Morning</option>
                    <option value="07:00 AM">🌄 07:00 AM</option>
                    <option value="08:00 AM">☀️ 08:00 AM</option>
                    <option value="09:00 AM">🌞 09:00 AM</option>
                    <option value="10:00 AM">⏰ 10:00 AM - Mid Morning</option>
                    <option value="11:00 AM">⏰ 11:00 AM</option>
                    <option value="12:00 PM">🕛 12:00 PM - Noon</option>
                    <option value="01:00 PM">🕐 01:00 PM - Afternoon</option>
                    <option value="02:00 PM">🕑 02:00 PM</option>
                    <option value="03:00 PM">🕒 03:00 PM</option>
                    <option value="04:00 PM">🕓 04:00 PM</option>
                    <option value="05:00 PM">🕔 05:00 PM - Evening</option>
                    <option value="06:00 PM">🌆 06:00 PM</option>
                    <option value="07:00 PM">🌃 07:00 PM</option>
                    <option value="08:00 PM">🌙 08:00 PM - Night</option>
                  </select>
                  {fieldErrors.time && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1 font-semibold">
                      <span>⚠️</span> {fieldErrors.time}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid gap-5 sm:gap-6 md:grid-cols-2 mb-6">
                <div>
                  <label className="block text-sm font-bold text-[--color-foreground] mb-2 flex items-center gap-2">
                    <span className="text-lg">⏱️</span> Duration (hours) *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    max="12"
                    value={formData.duration || 2}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 2;
                      setFormData({ ...formData, duration: val });
                      validateField("duration", val);
                    }}
                    onBlur={(e) => {
                      const val = parseInt(e.target.value) || 2;
                      validateField("duration", val);
                    }}
                    className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none transition-all font-semibold ${
                      fieldErrors.duration
                        ? "border-red-500 focus:border-red-600 bg-red-50"
                        : "border-[--color-border] focus:border-[--color-secondary] focus:shadow-lg"
                    }`}
                  />
                  {fieldErrors.duration && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1 font-semibold">
                      <span>⚠️</span> {fieldErrors.duration}
                    </p>
                  )}
                </div>
              </div>

              {selectedService?.type === "EVENT_COOKING" && (
                <div className="mb-6">
                  <label className="block text-sm font-bold text-[--color-foreground] mb-2 flex items-center gap-2">
                    <span className="text-lg">👥</span> Number of Guests *
                  </label>
                  <input
                    type="number"
                    required
                    min="7"
                    max="15"
                    value={formData.guestCount || 7}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 7;
                      setFormData({ ...formData, guestCount: val });
                      validateField("guestCount", val);
                    }}
                    onBlur={(e) => {
                      const val = parseInt(e.target.value) || 7;
                      validateField("guestCount", val);
                    }}
                    className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none transition-all font-semibold ${
                      fieldErrors.guestCount
                        ? "border-red-500 focus:border-red-600 bg-red-50"
                        : "border-[--color-border] focus:border-[--color-secondary] focus:shadow-lg"
                    }`}
                    placeholder="Minimum 7, Maximum 15"
                  />
                  {fieldErrors.guestCount && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1 font-semibold">
                      <span>⚠️</span> {fieldErrors.guestCount}
                    </p>
                  )}
                </div>
              )}

              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-bold text-[--color-foreground] flex items-center gap-2">
                    <span className="text-lg">📍</span> Service Address *
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowMap(!showMap)}
                    className="text-xs font-semibold px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  >
                    {showMap ? "🗺️ Hide Map" : "🗺️ Show Map"}
                  </button>
                </div>

                {showMap ? (
                  <div className="mb-4 rounded-lg overflow-hidden border-2 border-blue-300 p-4 bg-blue-50">
                    <LocationMap
                      onLocationSelect={(lat, lng, address) => {
                        setFormData({ ...formData, address });
                        validateField("address", address);
                      }}
                      initialAddress={formData.address}
                    />
                  </div>
                ) : (
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => {
                      setFormData({ ...formData, address: e.target.value });
                      validateField("address", e.target.value);
                    }}
                    onBlur={(e) => validateField("address", e.target.value)}
                    placeholder="Enter your complete address in Delhi or click Show Map"
                    className={`w-full px-4 py-3.5 rounded-xl border-2 focus:outline-none transition-all font-semibold ${
                      fieldErrors.address
                        ? "border-red-500 focus:border-red-600 bg-red-50"
                        : "border-[--color-border] focus:border-[--color-secondary] focus:shadow-lg"
                    }`}
                  />
                )}
                {fieldErrors.address && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1 font-semibold">
                    <span>⚠️</span> {fieldErrors.address}
                  </p>
                )}
              </div>

              <div className="mb-8">
                <label className="block text-sm font-bold text-[--color-foreground] mb-2 flex items-center gap-2">
                  <span className="text-lg">📝</span> Special Notes (Optional)
                </label>
                <textarea
                  rows={4}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Any special requirements, allergies, dietary preferences, or specific instructions..."
                  className="w-full px-4 py-3.5 rounded-xl border-2 border-[--color-border] focus:outline-none focus:border-[--color-secondary] focus:shadow-lg resize-none transition-all"
                />
              </div>

          {selectedService && (
            <div className="mb-8 p-6 bg-gradient-to-br from-[--color-secondary]/10 to-[--color-secondary]/5 rounded-2xl border-2 border-[--color-secondary]/30 shadow-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold text-[--color-primary] mb-1 flex items-center gap-2">
                    <span className="text-2xl">💰</span> Estimated Price
                  </h3>
                  <p className="text-sm text-[--color-muted-foreground]">
                    Final price may vary based on requirements
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-5xl font-black text-[--color-secondary] drop-shadow-sm">
                    ₹{
                      selectedService.type === "EVENT_COOKING"
                        ? (formData.guestCount || 7) * (selectedService.startingPrice || 299)
                        : (selectedService.startingPrice || 499) * (formData.duration || 2)
                    }
                  </p>
                  <p className="text-xs text-[--color-muted-foreground] mt-1">
                    {selectedService.type === "EVENT_COOKING"
                      ? `Total for ${formData.guestCount || 7} guests`
                      : `For ${formData.duration || 2} hour(s)`}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => {
                setFormData({
                  serviceId: "",
                  date: "",
                  time: "",
                  duration: 2,
                  guestCount: 7,
                  address: "",
                  notes: "",
                });
                setFieldErrors({});
                setError("");
              }}
              className="flex-1 rounded-xl bg-white border-2 border-[--color-border] px-8 py-4 text-lg font-bold text-[--color-foreground] hover:bg-[--color-muted] hover:border-[--color-primary] transition-all shadow-md"
            >
              ← Back to Services
            </button>
            <button
              type="submit"
              disabled={loading || Object.keys(fieldErrors).length > 0}
              className="flex-1 rounded-xl bg-gradient-to-r from-[--color-primary] to-[--color-secondary] px-8 py-4 text-lg font-bold text-white hover:shadow-2xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⏳</span> Creating Booking...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  ✅ Confirm Booking
                </span>
              )}
            </button>
          </div>
        </form>
        </>
        )}
      </div>
    </div>
  );
}
