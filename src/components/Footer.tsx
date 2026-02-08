import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[--color-border] bg-[--color-muted]">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-[--color-primary] mb-4">TaskNest</h3>
            <p className="text-sm text-[--color-muted-foreground]">
              Premium home services in Delhi, delivered with trust and excellence.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-[--color-foreground] mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/services/home-cooking" className="text-sm text-[--color-muted-foreground] hover:text-[--color-secondary]">
                  Home Cooking
                </Link>
              </li>
              <li>
                <Link href="/services/event-cooking" className="text-sm text-[--color-muted-foreground] hover:text-[--color-secondary]">
                  Event Cooking
                </Link>
              </li>
              <li>
                <Link href="/services/home-organization" className="text-sm text-[--color-muted-foreground] hover:text-[--color-secondary]">
                  Home Organization
                </Link>
              </li>
              <li>
                <Link href="/services/seasonal-concierge" className="text-sm text-[--color-muted-foreground] hover:text-[--color-secondary]">
                  Seasonal Concierge
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[--color-foreground] mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-[--color-muted-foreground] hover:text-[--color-secondary]">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm text-[--color-muted-foreground] hover:text-[--color-secondary]">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-[--color-muted-foreground] hover:text-[--color-secondary]">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[--color-foreground] mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className="text-sm text-[--color-muted-foreground] hover:text-[--color-secondary]">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-sm text-[--color-muted-foreground] hover:text-[--color-secondary]">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[--color-border] text-center">
          <p className="text-sm text-[--color-muted-foreground]">
            © 2026 TaskNest. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
