import { Link } from "react-router";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/40">
        <div className="container mx-auto px-6 py-4 max-w-5xl flex items-center justify-between">
          <Link to="/" className="text-lg font-mono font-medium hover:opacity-70 transition-opacity">
            [know]
          </Link>
          <nav className="flex items-center gap-6">
            <Link to="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </Link>
            <Link to="/security" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Security
            </Link>
            <a
              href="https://cal.com/useknow.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm px-4 py-2 bg-foreground text-background rounded-full font-medium hover:opacity-90 transition-opacity"
            >
              Book Demo
            </a>
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-6 pt-20 pb-12 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-light mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground mb-12">Last updated: January 14, 2026</p>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-medium mb-4">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              Know Technologies, Inc. ("Know," "we," "us," or "our") respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our network intelligence platform and related services (collectively, the "Service").
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              By using our Service, you agree to the collection and use of information in accordance with this policy. If you do not agree with the terms of this Privacy Policy, please do not access or use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">2. Information We Collect</h2>

            <h3 className="text-lg font-medium mt-6 mb-3">2.1 Information You Provide</h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li><strong>Account Information:</strong> Name, email address, company name, and LinkedIn profile URL when you sign up for our waitlist or create an account.</li>
              <li><strong>Connected Account Data:</strong> With your explicit consent, we access data from your connected accounts (Gmail, Outlook, LinkedIn, Calendar) to analyze your professional network and relationships.</li>
              <li><strong>Communications:</strong> Information you provide when you contact us for support or feedback.</li>
            </ul>

            <h3 className="text-lg font-medium mt-6 mb-3">2.2 Information Collected Automatically</h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li><strong>Usage Data:</strong> Information about how you interact with our Service, including pages visited, features used, and time spent on the platform.</li>
              <li><strong>Device Information:</strong> Browser type, operating system, device identifiers, and IP address.</li>
              <li><strong>Cookies and Tracking:</strong> We use cookies and similar technologies to enhance your experience and collect analytics data.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">3. How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Provide, maintain, and improve our Service</li>
              <li>Analyze your professional network and calculate relationship strength scores</li>
              <li>Generate connection paths and research reports on individuals</li>
              <li>Send you updates about our Service, including waitlist status and product launches</li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Detect, prevent, and address technical issues and security threats</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">4. Data Sharing and Disclosure</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              <strong>We do not sell your personal data.</strong> We may share your information only in the following circumstances:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li><strong>Service Providers:</strong> With third-party vendors who assist us in operating our Service (e.g., cloud hosting, analytics), subject to confidentiality agreements.</li>
              <li><strong>Legal Requirements:</strong> When required by law, court order, or governmental authority.</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets, with notice to affected users.</li>
              <li><strong>With Your Consent:</strong> When you explicitly authorize us to share your information.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">5. Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We implement industry-standard security measures to protect your data, including encryption in transit (TLS) and at rest, access controls, and regular security audits. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">6. Data Retention</h2>
            <p className="text-muted-foreground leading-relaxed">
              We retain your personal data only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law. You may request deletion of your data at any time by contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">7. Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">Depending on your location, you may have the following rights:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li><strong>Access:</strong> Request a copy of the personal data we hold about you.</li>
              <li><strong>Correction:</strong> Request correction of inaccurate or incomplete data.</li>
              <li><strong>Deletion:</strong> Request deletion of your personal data.</li>
              <li><strong>Portability:</strong> Request your data in a portable format.</li>
              <li><strong>Opt-Out:</strong> Opt out of marketing communications at any time.</li>
              <li><strong>Withdraw Consent:</strong> Revoke access to connected accounts at any time.</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              To exercise these rights, please contact us at <a href="mailto:privacy@useknow.io" className="text-foreground underline">privacy@useknow.io</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">8. Third-Party Services</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our Service integrates with third-party platforms (Google, Microsoft, LinkedIn). Your use of these integrations is subject to the respective privacy policies of those platforms. We encourage you to review their policies before connecting your accounts.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">9. Children's Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our Service is not intended for individuals under 18 years of age. We do not knowingly collect personal data from children. If you believe we have collected data from a child, please contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">10. International Data Transfers</h2>
            <p className="text-muted-foreground leading-relaxed">
              Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place for such transfers in compliance with applicable data protection laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">11. Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of material changes by posting the new policy on this page and updating the "Last updated" date. Your continued use of the Service after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">12. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="mt-4 text-muted-foreground">
              <p>Know Technologies, Inc.</p>
              <p>Email: <a href="mailto:privacy@useknow.io" className="text-foreground underline">privacy@useknow.io</a></p>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8 mt-12">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Know Technologies, Inc.</p>
            <div className="flex gap-6">
              <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
              <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
