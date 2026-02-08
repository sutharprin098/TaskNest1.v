import Link from "next/link";

export default function PricingPage() {
  const pricingData = [
    {
      service: "Home-style Cooking",
      icon: "🍳",
      tiers: [
        { name: "Hourly Rate", price: "AED 150", period: "per hour", description: "Minimum 3 hours" },
        { name: "Full Day", price: "AED 1,000", period: "8 hours", description: "Best value for daily cooking" },
      ],
    },
    {
      service: "Event Cooking",
      icon: "👨‍🍳",
      tiers: [
        { name: "Per Guest", price: "AED 100", period: "per person", description: "7-15 guests minimum" },
        { name: "Full Service Event", price: "AED 600", period: "per event", description: "Complete event catering" },
      ],
    },
    {
      service: "Home Organization",
      icon: "📦",
      tiers: [
        { name: "Hourly Rate", price: "AED 200", period: "per hour", description: "Minimum 2 hours" },
        { name: "Full Room", price: "AED 1,500", period: "per room", description: "Complete room transformation" },
      ],
    },
    {
      service: "Seasonal Concierge",
      icon: "🎉",
      tiers: [
        { name: "Small Event", price: "AED 500", period: "per event", description: "Basic event coordination" },
        { name: "Large Event", price: "AED 1,500", period: "per event", description: "Full-scale event planning" },
      ],
    },
    {
      service: "Custom Cooking Card",
      icon: "🥗",
      tiers: [
        { name: "Hourly Meal Prep", price: "AED 100", period: "per hour", description: "Specialized diet cooking" },
        { name: "Weekly Package", price: "AED 600", period: "per week", description: "5 days of meal prep" },
      ],
    },
  ];

  return (
    <div className="py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-[--color-primary] mb-4">
            Transparent Pricing
          </h1>
          <p className="text-xl text-[--color-muted-foreground] max-w-3xl mx-auto">
            No hidden fees. Clear, straightforward pricing for premium services.
          </p>
        </div>

        <div className="space-y-12 max-w-6xl mx-auto">
          {pricingData.map((category) => (
            <div
              key={category.service}
              className="bg-white rounded-2xl shadow-xl overflow-hidden border border-[--color-border]"
            >
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6">
                <div className="flex items-center gap-4">
                  <span className="text-5xl">{category.icon}</span>
                  <h2 className="text-3xl font-bold text-white">{category.service}</h2>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 p-8">
                {category.tiers.map((tier, index) => (
                  <div
                    key={index}
                    className="border border-[--color-border] rounded-xl p-6 hover:shadow-lg transition-shadow"
                  >
                    <h3 className="text-xl font-semibold text-[--color-primary] mb-2">
                      {tier.name}
                    </h3>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-[--color-secondary]">
                        {tier.price}
                      </span>
                      <span className="text-[--color-muted-foreground] ml-2">
                        {tier.period}
                      </span>
                    </div>
                    <p className="text-[--color-muted-foreground] mb-4">
                      {tier.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center bg-[--color-muted] rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-[--color-primary] mb-4">
            Ready to Get Started?
          </h3>
          <p className="text-[--color-muted-foreground] mb-6">
            Book your first service today and experience the TaskNest difference
          </p>
          <Link
            href="/auth/register"
            className="inline-block rounded-xl bg-[--color-primary] px-8 py-3 text-lg font-semibold text-[--color-primary-foreground] hover:bg-[--color-secondary] hover:text-[--color-secondary-foreground] transition-all shadow-lg"
          >
            Book Now
          </Link>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center">
            <div className="text-4xl mb-3">💳</div>
            <h4 className="font-semibold text-[--color-primary] mb-2">Flexible Payment</h4>
            <p className="text-sm text-[--color-muted-foreground]">
              Pay securely online or upon service completion
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🛡️</div>
            <h4 className="font-semibold text-[--color-primary] mb-2">Quality Guaranteed</h4>
            <p className="text-sm text-[--color-muted-foreground]">
              100% satisfaction or your money back
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">⭐</div>
            <h4 className="font-semibold text-[--color-primary] mb-2">Verified Professionals</h4>
            <p className="text-sm text-[--color-muted-foreground]">
              All service providers are background-checked
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
