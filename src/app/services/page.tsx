"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ServicesPage() {
  const router = useRouter();
  const services = [
    {
      id: "home-cooking",
      slug: "home-cooking",
      title: "Home-style Cooking",
      description: "Professional chef prepares daily meals at your home",
      longDescription: "Our experienced chefs will visit your home to prepare fresh, customized meals. Perfect for busy families wanting home-cooked food without the hassle. All ingredients can be sourced by us or you can provide your own.",
      icon: "🍳",
      price: "From ₹399/hr",
      included: [
        "Professional chef visit",
        "Menu planning consultation",
        "Meal preparation",
        "Kitchen cleanup",
        "Food storage guidance",
      ],
      excluded: [
        "Grocery shopping (available as add-on)",
        "Serving staff",
        "Tableware and cutlery",
      ],
    },
    {
      id: "event-cooking",
      slug: "event-cooking",
      title: "Event Cooking",
      description: "Private chef for 7–15 guest events",
      longDescription: "Professional catering service for your private events. We handle food preparation, service, and cleanup for intimate gatherings. Perfect for dinner parties, family celebrations, or small corporate events.",
      icon: "👨‍🍳",
      price: "From ₹299/guest",
      included: [
        "Multi-course menu planning",
        "Professional chef and assistant",
        "Food preparation and cooking",
        "Plating and presentation",
        "Full cleanup service",
      ],
      excluded: [
        "Tableware and decorations",
        "Beverages",
        "Venue rental",
      ],
    },
    {
      id: "home-organization",
      slug: "home-organization",
      title: "Home Organization & Reset",
      description: "Professional organizers transform your living space",
      longDescription: "Expert organizing service to declutter, reorganize, and optimize your home. We help you create a functional and beautiful living space with sustainable organization systems.",
      icon: "📦",
      price: "From ₹249/hr",
      included: [
        "Initial consultation",
        "Space assessment",
        "Decluttering assistance",
        "Organization system design",
        "Implementation and setup",
        "Maintenance tips",
      ],
      excluded: [
        "Storage containers (can be purchased)",
        "Furniture or fixtures",
        "Waste disposal fees",
      ],
    },
    {
      id: "seasonal-concierge",
      slug: "seasonal-concierge",
      title: "Seasonal / Event Concierge",
      description: "Complete event planning and coordination",
      longDescription: "Full concierge service for seasonal celebrations and special events. From planning to execution, we handle every detail to make your event unforgettable.",
      icon: "🎉",
      price: "From ₹1499",
      included: [
        "Event planning consultation",
        "Vendor coordination",
        "Timeline management",
        "Day-of coordination",
        "Setup and breakdown",
      ],
      excluded: [
        "Vendor fees",
        "Venue costs",
        "Decorations and supplies",
      ],
    },
    {
      id: "custom-cooking",
      slug: "custom-cooking",
      title: "Custom Cooking Card",
      description: "Meal prep and specialized diet cooking",
      longDescription: "Customized meal preparation tailored to your dietary needs. Whether keto, vegan, diabetic-friendly, or specific health requirements, we prepare meals perfectly suited to you.",
      icon: "🥗",
      price: "From ₹499/hr",
      included: [
        "Nutritional consultation",
        "Custom menu planning",
        "Special diet expertise",
        "Meal preparation",
        "Portion control and labeling",
        "Storage instructions",
      ],
      excluded: [
        "Specialty ingredients (charged separately)",
        "Nutritionist consultation",
        "Delivery service",
      ],
    },
  ];

  return (
    <div className="py-10 sm:py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[--color-primary] mb-3 sm:mb-4">
            Our Premium Services
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-[--color-muted-foreground] max-w-3xl mx-auto">
            Discover our carefully curated selection of luxury home services designed to elevate your lifestyle in Delhi
          </p>
        </div>

        <div className="space-y-12">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl shadow-xl overflow-hidden border border-[--color-border]"
              onClick={(event) => {
                const target = event.target as HTMLElement;
                if (target.closest("a")) {
                  return;
                }
                router.push(`/dashboard/book?service=${service.slug}`);
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  router.push(`/dashboard/book?service=${service.slug}`);
                }
              }}
            >
              <div className="grid md:grid-cols-2 gap-6 md:gap-8 p-6 sm:p-8">
                <div>
                  <div className="text-5xl sm:text-6xl mb-4">{service.icon}</div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[--color-primary] mb-3">
                    {service.title}
                  </h2>
                  <p className="text-base sm:text-lg text-[--color-muted-foreground] mb-4">
                    {service.description}
                  </p>
                  <p className="text-sm sm:text-base text-[--color-foreground] mb-6">
                    {service.longDescription}
                  </p>
                  <p className="text-xl sm:text-2xl text-[--color-secondary] font-bold mb-6">
                    {service.price}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-block w-full sm:w-auto rounded-xl bg-[--color-primary] px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold text-[--color-primary-foreground] hover:bg-[--color-secondary] hover:text-[--color-secondary-foreground] transition-all shadow-lg"
                    >
                      View Details
                    </Link>
                    <Link
                      href="/dashboard/book"
                      className="inline-block w-full sm:w-auto rounded-xl bg-white border-2 border-[--color-border] px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold text-[--color-foreground] hover:bg-[--color-muted] transition-all"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-[--color-primary] mb-3">
                      What's Included
                    </h3>
                    <ul className="space-y-2">
                      {service.included.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-green-600 mr-2">✓</span>
                          <span className="text-sm sm:text-base text-[--color-foreground]">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-[--color-primary] mb-3">
                      Not Included
                    </h3>
                    <ul className="space-y-2">
                      {service.excluded.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-red-600 mr-2">✗</span>
                          <span className="text-sm sm:text-base text-[--color-muted-foreground]">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
