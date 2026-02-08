import { notFound } from "next/navigation";
import Link from "next/link";
import { SERVICES } from "@/lib/constants";

interface ServiceDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.type.toLowerCase().replace(/_/g, "-"),
  }));
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug: serviceSlug } = await params;
  const service = SERVICES.find(
    (s) => s.type.toLowerCase().replace(/_/g, "-") === serviceSlug
  );

  if (!service) {
    notFound();
  }

  const getServiceIcon = (type: string) => {
    switch (type) {
      case "HOME_COOKING": return "🍳";
      case "EVENT_COOKING": return "👨‍🍳";
      case "HOME_ORGANIZATION": return "📦";
      case "SEASONAL_CONCIERGE": return "🎉";
      case "CUSTOM_COOKING": return "🥗";
      default: return "🔧";
    }
  };

  const getFeatures = (type: string) => {
    switch (type) {
      case "HOME_COOKING":
        return [
          "Fresh, homemade meals prepared in your kitchen",
          "Customizable menu based on your preferences",
          "Dietary requirements accommodated",
          "Professional chef with 5+ years experience",
          "All ingredients and equipment provided",
          "Kitchen cleaned after service",
        ];
      case "EVENT_COOKING":
        return [
          "Perfect for birthdays, anniversaries, gatherings",
          "7-15 guests menu planning",
          "Multi-course meal preparation",
          "Professional presentation and plating",
          "Dietary accommodations available",
          "Setup and cleanup included",
        ];
      case "HOME_ORGANIZATION":
        return [
          "Complete room-by-room organization",
          "Closet and wardrobe optimization",
          "Kitchen pantry reorganization",
          "Storage solutions recommendations",
          "Decluttering guidance",
          "Maintenance tips provided",
        ];
      case "SEASONAL_CONCIERGE":
        return [
          "Diwali, Holi, and festival preparations",
          "Decoration setup and removal",
          "Event planning assistance",
          "Shopping and errands",
          "Guest coordination support",
          "Post-event cleanup",
        ];
      case "CUSTOM_COOKING":
        return [
          "Learn traditional Indian recipes",
          "Hands-on cooking experience",
          "Tips and techniques from experts",
          "Recipe cards to take home",
          "Small group or private sessions",
          "All ingredients provided",
        ];
      default:
        return [];
    }
  };

  const features = getFeatures(service.type);

  return (
    <div className="min-h-screen bg-[--color-muted]">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="flex items-center gap-6 mb-6">
            <div className="text-7xl">{getServiceIcon(service.type)}</div>
            <div>
              <h1 className="text-5xl font-bold mb-3">{service.name}</h1>
              <p className="text-xl text-slate-300">{service.description}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-8 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-4 border border-white/20">
              <p className="text-sm text-slate-300 mb-1">Starting from</p>
              <p className="text-4xl font-bold text-[--color-secondary]">
                ₹{service.startingPrice}
                {service.type === "EVENT_COOKING" && <span className="text-lg"> /guest</span>}
                {(service.type === "HOME_COOKING" || service.type === "HOME_ORGANIZATION" || service.type === "CUSTOM_COOKING") && <span className="text-lg"> /hour</span>}
              </p>
            </div>

            {service.minDuration && (
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-4 border border-white/20">
                <p className="text-sm text-slate-300 mb-1">Minimum Duration</p>
                <p className="text-2xl font-bold">{service.minDuration} hours</p>
              </div>
            )}

            {service.minGuests && (
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-4 border border-white/20">
                <p className="text-sm text-slate-300 mb-1">Group Size</p>
                <p className="text-2xl font-bold">{service.minGuests} guests</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Column - Features */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-[--color-border] mb-8">
              <h2 className="text-3xl font-bold text-[--color-primary] mb-6">
                What's Included
              </h2>
              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-2xl">✅</span>
                    <span className="text-lg text-[--color-foreground] pt-1">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {service.bestFor && (
              <div className="bg-gradient-to-br from-[--color-secondary]/10 to-[--color-secondary]/5 rounded-2xl p-8 border border-[--color-secondary]/20">
                <h3 className="text-2xl font-bold text-[--color-primary] mb-4">
                  Perfect For
                </h3>
                <p className="text-lg text-[--color-foreground]">{service.bestFor}</p>
              </div>
            )}
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-[--color-secondary]/30 sticky top-8">
              <h3 className="text-2xl font-bold text-[--color-primary] mb-6">
                Book This Service
              </h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center pb-4 border-b border-[--color-border]">
                  <span className="text-[--color-muted-foreground]">Service Type</span>
                  <span className="font-semibold text-[--color-foreground]">
                    {service.type.replace(/_/g, " ")}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-4 border-[--color-border]">
                  <span className="text-[--color-muted-foreground]">Starting Price</span>
                  <span className="font-bold text-xl text-[--color-secondary]">
                    ₹{service.startingPrice}
                  </span>
                </div>
                {service.minDuration && (
                  <div className="flex justify-between items-center pb-4 border-b border-[--color-border]">
                    <span className="text-[--color-muted-foreground]">Min. Duration</span>
                    <span className="font-semibold text-[--color-foreground]">
                      {service.minDuration}h
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center pb-4 border-b border-[--color-border]">
                  <span className="text-[--color-muted-foreground]">Location</span>
                  <span className="font-semibold text-[--color-foreground]">Delhi</span>
                </div>
              </div>

              <Link
                href="/dashboard/book"
                className="block w-full text-center rounded-xl bg-[--color-primary] px-6 py-4 text-lg font-semibold text-white hover:bg-[--color-secondary] transition-all shadow-lg mb-4"
              >
                Book Now
              </Link>

              <Link
                href="/services"
                className="block w-full text-center rounded-xl bg-white border-2 border-[--color-border] px-6 py-3 font-semibold text-[--color-foreground] hover:bg-[--color-muted] transition-all"
              >
                View All Services
              </Link>

              <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <p className="text-sm text-blue-800">
                  <span className="font-semibold">💡 Note:</span> Final pricing may vary based on your specific requirements. Book a consultation for an exact quote.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-slate-300 mb-8">
            Join hundreds of satisfied customers in Delhi who trust TaskNest for their home service needs.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/dashboard/book"
              className="rounded-xl bg-[--color-secondary] px-8 py-4 text-lg font-semibold text-[--color-secondary-foreground] hover:bg-[--color-secondary]/90 transition-all shadow-lg"
            >
              Book This Service
            </Link>
            <Link
              href="/pricing"
              className="rounded-xl bg-white/10 border-2 border-white/20 px-8 py-4 text-lg font-semibold hover:bg-white/20 transition-all"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
