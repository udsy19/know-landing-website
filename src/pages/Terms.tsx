import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* Content */}
      <main className="container mx-auto px-6 pt-20 pb-12 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-light mb-2">Terms of Service</h1>
        <p className="text-muted-foreground mb-12">Last updated: January 14, 2026</p>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-medium mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              Welcome to Know. These Terms of Service ("Terms") govern your access to and use of the Know platform, website, and services (collectively, the "Service") provided by Know Technologies, Inc. ("Know," "we," "us," or "our").
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              By accessing or using our Service, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">2. Description of Service</h2>
            <p className="text-muted-foreground leading-relaxed">
              Know is a network intelligence platform that helps professionals discover and leverage their professional connections. Our Service analyzes your connected accounts (with your permission) to map your network, calculate relationship strength, identify connection paths to individuals, and provide research insights.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">3. Eligibility</h2>
            <p className="text-muted-foreground leading-relaxed">
              You must be at least 18 years old and capable of forming a binding contract to use our Service. By using the Service, you represent and warrant that you meet these requirements and have the authority to bind yourself to these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">4. Account Registration</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">To access certain features, you must create an account. You agree to:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Provide accurate, current, and complete information during registration</li>
              <li>Maintain and promptly update your account information</li>
              <li>Keep your login credentials confidential and secure</li>
              <li>Notify us immediately of any unauthorized access to your account</li>
              <li>Accept responsibility for all activities that occur under your account</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">5. Connected Accounts and Data Access</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Our Service requires access to your professional accounts (such as email, calendar, and LinkedIn) to function. By connecting these accounts, you:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Grant us permission to access and analyze data from these accounts as described in our Privacy Policy</li>
              <li>Represent that you have the authority to grant such access</li>
              <li>Understand that you can revoke access at any time through your account settings</li>
              <li>Acknowledge that revoking access may limit or disable certain features of the Service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">6. Acceptable Use</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">You agree not to use the Service to:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Violate any applicable laws, regulations, or third-party rights</li>
              <li>Harass, stalk, or harm any individual</li>
              <li>Send spam, unsolicited messages, or engage in abusive outreach</li>
              <li>Scrape, harvest, or collect data from the Service for unauthorized purposes</li>
              <li>Attempt to gain unauthorized access to our systems or other users' accounts</li>
              <li>Interfere with or disrupt the integrity or performance of the Service</li>
              <li>Reverse engineer, decompile, or disassemble any part of the Service</li>
              <li>Use the Service for any illegal, fraudulent, or malicious purpose</li>
              <li>Impersonate any person or entity</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">7. Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed">
              The Service, including its original content, features, functionality, and design, is owned by Know Technologies, Inc. and is protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, sell, or lease any part of our Service without our prior written consent.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              You retain ownership of any data you provide to the Service. By using the Service, you grant us a limited, non-exclusive license to use, process, and analyze your data solely to provide and improve the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">8. Subscription and Payment</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Certain features of the Service require a paid subscription. By subscribing, you agree to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Pay all applicable fees as described at the time of purchase</li>
              <li>Provide accurate billing information</li>
              <li>Authorize us to charge your payment method on a recurring basis</li>
              <li>Understand that subscriptions auto-renew unless canceled before the renewal date</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Refunds are provided at our sole discretion. You may cancel your subscription at any time through your account settings. Cancellation takes effect at the end of the current billing period.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">9. Disclaimer of Warranties</h2>
            <p className="text-muted-foreground leading-relaxed">
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR COMPLETELY SECURE. WE DISCLAIM ALL WARRANTIES, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              The information and insights provided by our Service are based on available data and algorithms. We do not guarantee the accuracy, completeness, or reliability of any information provided through the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">10. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, KNOW TECHNOLOGIES, INC. AND ITS OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR GOODWILL, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE SERVICE.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              OUR TOTAL LIABILITY FOR ANY CLAIMS ARISING FROM OR RELATED TO THESE TERMS OR THE SERVICE SHALL NOT EXCEED THE AMOUNT YOU PAID TO US IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">11. Indemnification</h2>
            <p className="text-muted-foreground leading-relaxed">
              You agree to indemnify, defend, and hold harmless Know Technologies, Inc. and its affiliates, officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses (including reasonable attorneys' fees) arising out of or in connection with your use of the Service, your violation of these Terms, or your violation of any rights of a third party.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">12. Termination</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may suspend or terminate your access to the Service at any time, with or without cause, and with or without notice. Upon termination, your right to use the Service will immediately cease. You may terminate your account at any time by contacting us or through your account settings.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Provisions of these Terms that by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, indemnification, and limitations of liability.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">13. Governing Law and Dispute Resolution</h2>
            <p className="text-muted-foreground leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to its conflict of law provisions. Any disputes arising from these Terms or your use of the Service shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association, except that either party may seek injunctive relief in any court of competent jurisdiction.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">14. Changes to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to modify these Terms at any time. We will notify you of material changes by posting the updated Terms on our website and updating the "Last updated" date. Your continued use of the Service after such changes constitutes acceptance of the modified Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">15. Miscellaneous</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li><strong>Entire Agreement:</strong> These Terms, together with our Privacy Policy, constitute the entire agreement between you and Know regarding the Service.</li>
              <li><strong>Severability:</strong> If any provision of these Terms is found to be unenforceable, the remaining provisions will continue in full force and effect.</li>
              <li><strong>Waiver:</strong> Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.</li>
              <li><strong>Assignment:</strong> You may not assign or transfer these Terms without our prior written consent. We may assign our rights and obligations under these Terms without restriction.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">16. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about these Terms, please contact us:
            </p>
            <div className="mt-4 text-muted-foreground">
              <p>Know Technologies, Inc.</p>
              <p>Email: <a href="mailto:legal@useknow.io" className="text-foreground underline">legal@useknow.io</a></p>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
