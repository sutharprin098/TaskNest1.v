import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[--color-muted]">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About TaskNest</h1>
          <p className="text-xl text-slate-300 max-w-3xl">
            Bringing premium home services to Delhi with trust, excellence, and a commitment to making your life easier.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-[--color-primary] mb-6">Our Mission</h2>
              <p className="text-lg text-[--color-foreground] mb-4">
                TaskNest was founded with a simple yet powerful vision: to bring professional, reliable, and premium home services to every household in Delhi.
              </p>
              <p className="text-lg text-[--color-foreground] mb-4">
                We understand that modern life is busy, and finding time for cooking, organizing, and managing events can be overwhelming. That's where we come in.
              </p>
              <p className="text-lg text-[--color-foreground]">
                Our carefully vetted professionals are passionate about what they do and committed to delivering exceptional service every single time.
              </p>
            </div>
            <div className="bg-gradient-to-br from-[--color-secondary]/10 to-[--color-secondary]/5 rounded-2xl p-12 border border-[--color-secondary]/20">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <span className="text-4xl">🎯</span>
                  <div>
                    <h3 className="text-xl font-bold text-[--color-primary] mb-2">Excellence</h3>
                    <p className="text-[--color-muted-foreground]">We never compromise on quality</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-4xl">🤝</span>
                  <div>
                    <h3 className="text-xl font-bold text-[--color-primary] mb-2">Trust</h3>
                    <p className="text-[--color-muted-foreground]">All professionals are verified and trained</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-4xl">⚡</span>
                  <div>
                    <h3 className="text-xl font-bold text-[--color-primary] mb-2">Convenience</h3>
                    <p className="text-[--color-muted-foreground]">Book online, manage everything effortlessly</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[--color-muted]">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <h2 className="text-4xl font-bold text-[--color-primary] text-center mb-12">
            TaskNest by the Numbers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-5xl font-bold text-[--color-secondary] mb-2">500+</p>
              <p className="text-[--color-muted-foreground]">Happy Customers</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-bold text-[--color-secondary] mb-2">1200+</p>
              <p className="text-[--color-muted-foreground]">Services Completed</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-bold text-[--color-secondary] mb-2">50+</p>
              <p className="text-[--color-muted-foreground]">Trained Professionals</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-bold text-[--color-secondary] mb-2">4.9/5</p>
              <p className="text-[--color-muted-foreground]">Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <h2 className="text-4xl font-bold text-[--color-primary] text-center mb-12">
            Our Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-[--color-border]">
              <div className="text-5xl mb-4">🌟</div>
              <h3 className="text-2xl font-bold text-[--color-primary] mb-3">Quality First</h3>
              <p className="text-[--color-foreground]">
                Every service provider is thoroughly vetted, trained, and monitored to ensure the highest standards of quality and professionalism.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-[--color-border]">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="text-2xl font-bold text-[--color-primary] mb-3">Safety & Security</h3>
              <p className="text-[--color-foreground]">
                Background checks, insurance coverage, and secure payment options ensure your peace of mind with every booking.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-[--color-border]">
              <div className="text-5xl mb-4">💚</div>
              <h3 className="text-2xl font-bold text-[--color-primary] mb-3">Customer Care</h3>
              <p className="text-[--color-foreground]">
                Our dedicated support team is available 7 days a week to address any questions, concerns, or special requests you may have.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Experience TaskNest?</h2>
          <p className="text-xl text-slate-300 mb-8">
            Join hundreds of satisfied customers who trust us for their home service needs.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/auth/register"
              className="rounded-xl bg-[--color-secondary] px-8 py-4 text-lg font-semibold text-[--color-secondary-foreground] hover:bg-[--color-secondary]/90 transition-all shadow-lg"
            >
              Get Started Today
            </Link>
            <Link
              href="/services"
              className="rounded-xl bg-white/10 border-2 border-white/20 px-8 py-4 text-lg font-semibold hover:bg-white/20 transition-all"
            >
              View Our Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
