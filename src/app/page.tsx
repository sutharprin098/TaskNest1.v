import Link from "next/link";

export default function HomePage() {
  const services = [
    {
      id: "home-cooking",
      slug: "home-cooking",
      title: "Home-style Cooking",
      description: "Professional chef prepares daily meals at your home",
      icon: "🍳",
      price: "From ₹399/hr",
    },
    {
      id: "event-cooking",
      slug: "event-cooking",
      title: "Event Cooking",
      description: "Private chef for 7–15 guest events",
      icon: "👨‍🍳",
      price: "From ₹299/guest",
    },
    {
      id: "home-organization",
      slug: "home-organization",
      title: "Home Organization",
      description: "Professional organizers transform your space",
      icon: "📦",
      price: "From ₹249/hr",
    },
    {
      id: "seasonal-concierge",
      slug: "seasonal-concierge",
      title: "Seasonal Concierge",
      description: "Complete event planning and coordination",
      icon: "🎉",
      price: "From ₹1499",
    },
    {
      id: "custom-cooking",
      slug: "custom-cooking",
      title: "Custom Cooking Card",
      description: "Meal prep and specialized diet cooking",
      icon: "🥗",
      price: "From ₹499/hr",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Choose Your Service",
      description: "Browse our premium services and select what fits your needs",
    },
    {
      number: "02",
      title: "Book & Schedule",
      description: "Pick your preferred date, time, and provide details",
    },
    {
      number: "03",
      title: "Enjoy Excellence",
      description: "Our verified professionals deliver exceptional service",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Ahmed",
      role: "Busy Professional",
      comment: "TaskNest has transformed my life. Coming home to fresh, delicious meals every day is priceless.",
      rating: 5,
    },
    {
      name: "Mohammed Hassan",
      role: "Event Host",
      comment: "They catered my dinner party flawlessly. Professional, organized, and the food was outstanding!",
      rating: 5,
    },
    {
      name: "Fatima Ali",
      role: "Homemaker",
      comment: "The home organization service helped me declutter and create a beautiful, functional space.",
      rating: 5,
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="container mx-auto px-4 lg:px-8 py-16 sm:py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
              Premium Home Services,
              <span className="text-[--color-secondary]"> Delivered with Trust</span>
            </h1>
            <p className="text-base sm:text-lg md:text-2xl text-slate-300 mb-8 sm:mb-10 leading-relaxed">
              Experience luxury home services in Dubai. From personal chefs to home organization, we bring excellence to your doorstep.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/services"
                className="w-full sm:w-auto rounded-2xl bg-[--color-secondary] px-8 py-4 text-base sm:text-lg font-semibold text-[--color-secondary-foreground] hover:bg-[--color-secondary]/90 transition-all shadow-2xl"
              >
                Explore Services
              </Link>
              <Link
                href="/auth/register"
                className="w-full sm:w-auto rounded-2xl bg-white/10 backdrop-blur px-8 py-4 text-base sm:text-lg font-semibold text-white border-2 border-white/20 hover:bg-white/20 transition-all"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 sm:py-20 md:py-24 bg-[--color-background]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[--color-primary] mb-3 sm:mb-4">
              Our Premium Services
            </h2>
            <p className="text-base sm:text-lg text-[--color-muted-foreground] max-w-2xl mx-auto">
              Carefully curated services to make your life easier and more luxurious
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className="group"
              >
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all border border-[--color-border] h-full sm:hover:scale-105 duration-300">
                  <div className="text-4xl sm:text-5xl mb-4">{service.icon}</div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[--color-primary] mb-3 group-hover:text-[--color-secondary] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[--color-muted-foreground] mb-4">
                    {service.description}
                  </p>
                  <p className="text-[--color-secondary] font-semibold text-base sm:text-lg">
                    {service.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-20 md:py-24 bg-[--color-muted]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[--color-primary] mb-3 sm:mb-4">
              How It Works
            </h2>
            <p className="text-base sm:text-lg text-[--color-muted-foreground]">
              Getting started is simple
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[--color-secondary] text-[--color-secondary-foreground] text-xl sm:text-2xl font-bold mb-6 shadow-lg">
                  {step.number}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[--color-primary] mb-3">
                  {step.title}
                </h3>
                <p className="text-sm sm:text-base text-[--color-muted-foreground]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-20 md:py-24 bg-[--color-background]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[--color-primary] mb-3 sm:mb-4">
              What Our Clients Say
            </h2>
            <p className="text-base sm:text-lg text-[--color-muted-foreground]">
              Trusted by families across Delhi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-[--color-border]"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-[--color-secondary] text-xl">★</span>
                  ))}
                </div>
                <p className="text-sm sm:text-base text-[--color-foreground] mb-6 italic">
                  "{testimonial.comment}"
                </p>
                <div>
                  <p className="font-semibold text-[--color-primary]">{testimonial.name}</p>
                  <p className="text-sm text-[--color-muted-foreground]">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            Ready to Experience Excellence?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-300 mb-8 sm:mb-10 max-w-2xl mx-auto">
            Join hundreds of satisfied customers who trust TaskNest for their home services
          </p>
          <Link
            href="/auth/register"
            className="inline-block w-full sm:w-auto rounded-2xl bg-[--color-secondary] px-10 py-4 text-base sm:text-lg font-semibold text-[--color-secondary-foreground] hover:bg-[--color-secondary]/90 transition-all shadow-2xl"
          >
            Book Your First Service
          </Link>
        </div>
      </section>
    </div>
  );
}
