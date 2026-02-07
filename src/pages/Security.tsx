import { Link } from "react-router";
import { motion } from "framer-motion";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

const ShieldIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const LockIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const EyeOffIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
  </svg>
);

const TrashIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const ServerIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
  </svg>
);

const KeyIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
  </svg>
);

export default function Security() {
  const principles = [
    {
      icon: <LockIcon />,
      title: "256-bit Encryption",
      description: "All data is encrypted at rest and in transit using AES-256 encryption, the same standard used by banks and governments.",
    },
    {
      icon: <EyeOffIcon />,
      title: "We Never Sell Your Data",
      description: "Your network data is yours. We will never sell, share, or monetize your personal information or connections.",
    },
    {
      icon: <TrashIcon />,
      title: "Delete Anytime",
      description: "You own your data. Delete your account and all associated data permanently at any time with one click.",
    },
    {
      icon: <ServerIcon />,
      title: "SOC 2 Compliant Infrastructure",
      description: "Our infrastructure is hosted on SOC 2 Type II compliant providers with 99.9% uptime guarantees.",
    },
    {
      icon: <KeyIcon />,
      title: "OAuth & Secure Auth",
      description: "We use OAuth 2.0 for third-party connections. We never store your passwords for connected services.",
    },
    {
      icon: <ShieldIcon />,
      title: "Regular Security Audits",
      description: "We conduct regular penetration testing and security audits to identify and fix vulnerabilities.",
    },
  ];

  const dataHandling = [
    {
      title: "What data do we collect?",
      items: [
        "Email metadata (sender, recipient, subject, date) — not email content",
        "Calendar events (title, attendees, time) — for relationship mapping",
        "LinkedIn connections (public profile data only)",
        "Your search queries and preferences",
      ],
    },
    {
      title: "What we never access",
      items: [
        "Email body content or attachments",
        "Private messages or DMs",
        "Financial information",
        "Passwords to connected services",
      ],
    },
    {
      title: "How we use your data",
      items: [
        "Map your professional network and relationships",
        "Find warm introduction paths",
        "Generate research reports on contacts",
        "Improve our AI models (anonymized, opt-out available)",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* Hero */}
      <section className="container mx-auto px-6 pt-20 pb-16 max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-8">
            <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-light mb-6 tracking-tight">
            Privacy-first by design
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Your network is your most valuable professional asset. We built Know from the ground up to protect it. Your data stays yours — always.
          </p>
        </motion.div>
      </section>

      {/* Security Principles */}
      <section className="container mx-auto px-6 py-16 max-w-5xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {principles.map((principle, index) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="border border-border/50 rounded-2xl p-6"
            >
              <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center mb-4 text-foreground">
                {principle.icon}
              </div>
              <h3 className="font-medium mb-2">{principle.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {principle.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Data Handling */}
      <section className="border-t border-border/40 py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-2xl font-light mb-12 text-center">How we handle your data</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {dataHandling.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="font-medium mb-4 text-sm">{section.title}</h3>
                <ul className="space-y-3">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-emerald-500 mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Your Rights */}
      <section className="border-t border-border/40 py-20">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-2xl font-light mb-8 text-center">Your rights</h2>

          <div className="space-y-4">
            {[
              { right: "Access", description: "Request a copy of all data we have about you" },
              { right: "Correction", description: "Update or correct any inaccurate information" },
              { right: "Deletion", description: "Permanently delete your account and all data" },
              { right: "Portability", description: "Export your data in a machine-readable format" },
              { right: "Opt-out", description: "Opt out of AI model training with your data" },
            ].map((item, i) => (
              <motion.div
                key={item.right}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 py-4 border-b border-border/30"
              >
                <span className="font-medium w-28">{item.right}</span>
                <span className="text-sm text-muted-foreground">{item.description}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="border-t border-border/40 py-20 bg-muted/20">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <h2 className="text-2xl font-light mb-4">Questions about security?</h2>
          <p className="text-muted-foreground mb-8">
            We're happy to answer any questions about how we protect your data.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity"
            >
              Contact Us
            </Link>
            <Link
              to="/privacy"
              className="px-6 py-3 border border-border rounded-full font-medium hover:bg-muted/50 transition-colors"
            >
              Read Privacy Policy
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
