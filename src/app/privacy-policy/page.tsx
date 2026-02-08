export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[--color-muted]">
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <h1 className="text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-slate-300">Last updated: February 8, 2026</p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 max-w-4xl py-16">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-[--color-border]">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-[--color-primary] mb-4">1. Introduction</h2>
            <p className="text-[--color-foreground] mb-6">
              Welcome to TaskNest ("we," "us," or "our"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
            </p>

            <h2 className="text-3xl font-bold text-[--color-primary] mb-4">2. Information We Collect</h2>
            <h3 className="text-2xl font-semibold text-[--color-primary] mb-3">2.1 Personal Information</h3>
            <p className="text-[--color-foreground] mb-4">We collect information that you provide directly to us, including:</p>
            <ul className="list-disc pl-6 mb-6 text-[--color-foreground] space-y-2">
              <li>Name, email address, and phone number</li>
              <li>Billing and payment information</li>
              <li>Service address and location data</li>
              <li>Account credentials (username and password)</li>
              <li>Communication preferences</li>
            </ul>

            <h3 className="text-2xl font-semibold text-[--color-primary] mb-3">2.2 Automatically Collected Information</h3>
            <ul className="list-disc pl-6 mb-6 text-[--color-foreground] space-y-2">
              <li>Device information (IP address, browser type, operating system)</li>
              <li>Usage data (pages visited, time spent, features used)</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>

            <h2 className="text-3xl font-bold text-[--color-primary] mb-4">3. How We Use Your Information</h2>
            <p className="text-[--color-foreground] mb-4">We use your information to:</p>
            <ul className="list-disc pl-6 mb-6 text-[--color-foreground] space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Process your bookings and payments</li>
              <li>Send you service updates, confirmations, and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>Send marketing communications (with your consent)</li>
              <li>Detect, prevent, and address fraud and security issues</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2 className="text-3xl font-bold text-[--color-primary] mb-4">4. Information Sharing</h2>
            <p className="text-[--color-foreground] mb-4">We may share your information with:</p>
            <ul className="list-disc pl-6 mb-6 text-[--color-foreground] space-y-2">
              <li><strong>Service Providers:</strong> Professionals who fulfill your service requests</li>
              <li><strong>Business Partners:</strong> Payment processors and verification services</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              <li><strong>Business Transfers:</strong> In connection with mergers or acquisitions</li>
            </ul>

            <h2 className="text-3xl font-bold text-[--color-primary] mb-4">5. Data Security</h2>
            <p className="text-[--color-foreground] mb-6">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes encryption, secure servers, and regular security assessments.
            </p>

            <h2 className="text-3xl font-bold text-[--color-primary] mb-4">6. Your Rights</h2>
            <p className="text-[--color-foreground] mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 mb-6 text-[--color-foreground] space-y-2">
              <li>Access and receive a copy of your personal data</li>
              <li>Correct inaccurate or incomplete data</li>
              <li>Request deletion of your data</li>
              <li>Object to or restrict processing of your data</li>
              <li>Withdraw consent at any time</li>
              <li>Data portability</li>
            </ul>

            <h2 className="text-3xl font-bold text-[--color-primary] mb-4">7. Cookies</h2>
            <p className="text-[--color-foreground] mb-6">
              We use cookies and similar tracking technologies to track activity on our platform and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>

            <h2 className="text-3xl font-bold text-[--color-primary] mb-4">8. Children's Privacy</h2>
            <p className="text-[--color-foreground] mb-6">
              Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children under 18.
            </p>

            <h2 className="text-3xl font-bold text-[--color-primary] mb-4">9. Changes to This Policy</h2>
            <p className="text-[--color-foreground] mb-6">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>

            <h2 className="text-3xl font-bold text-[--color-primary] mb-4">10. Contact Us</h2>
            <p className="text-[--color-foreground] mb-4">
              If you have questions about this Privacy Policy, please contact us:
            </p>
            <div className="bg-[--color-muted] rounded-xl p-6 mb-6">
              <p className="text-[--color-foreground]">
                <strong>Email:</strong> privacy@tasknest.com<br />
                <strong>Phone:</strong> +91 98765 43210<br />
                <strong>Address:</strong> TaskNest HQ, Connaught Place, New Delhi, Delhi 110001, India
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
