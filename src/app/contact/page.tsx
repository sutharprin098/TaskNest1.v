import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[--color-muted]">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-slate-300 max-w-3xl">
            For any help, contact us using the details below.
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-[--color-border]">
              <div className="flex items-start gap-4 mb-6">
                <span className="text-4xl">📧</span>
                <div>
                  <h2 className="text-2xl font-bold text-[--color-primary] mb-2">Email</h2>
                  <p className="text-[--color-foreground]">
                    <a href="mailto:sutharprince098@gmail.com" className="text-[--color-secondary] hover:underline">
                      sutharprince098@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 border border-[--color-border]">
              <div className="flex items-start gap-4 mb-6">
                <span className="text-4xl">📞</span>
                <div>
                  <h2 className="text-2xl font-bold text-[--color-primary] mb-2">Mobile</h2>
                  <p className="text-[--color-foreground]">
                    <a href="tel:+919509706699" className="text-[--color-secondary] hover:underline">
                      9509706699
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-[--color-border] bg-white p-6">
            <h3 className="text-xl font-bold text-[--color-primary] mb-3">Terms and Policies</h3>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/terms-of-service"
                className="rounded-xl border border-[--color-border] px-4 py-2 text-sm font-semibold text-[--color-foreground] hover:bg-[--color-muted] transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/privacy-policy"
                className="rounded-xl border border-[--color-border] px-4 py-2 text-sm font-semibold text-[--color-foreground] hover:bg-[--color-muted] transition-colors"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
