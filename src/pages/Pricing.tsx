import { Link } from "react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import SEO, { BreadcrumbSchema, FAQSchema } from "../components/SEO";

const CheckIcon = () => (
  <svg className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

export default function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly");

  const plans = [
    {
      name: "Free Trial",
      description: "Try everything free",
      price: { monthly: "0", annual: "0" },
      period: "14 days",
      features: [
        "Full access to all features",
        "Unlimited searches",
        "Connect all data sources",
        "Deep research reports",
        "AI message drafting",
      ],
      cta: "Start Free Trial",
      highlighted: false,
    },
    {
      name: "Pro",
      description: "For professionals",
      price: { monthly: "49", annual: "39" },
      annualTotal: "468",
      savings: "120",
      features: [
        "Everything in Free Trial",
        "Unlimited searches",
        "Deep research reports",
        "Meeting scheduling",
        "AI message drafting",
        "Priority support",
      ],
      cta: "Get Started",
      highlighted: true,
      badge: "Most Popular",
    },
    {
      name: "Business",
      description: "For power users",
      price: { monthly: "99", annual: "79" },
      annualTotal: "948",
      savings: "240",
      features: [
        "Everything in Pro",
        "Bulk search (50 at once)",
        "Export to CSV / CRM",
        "API access",
        "Verified data badges",
        "Advanced filters",
      ],
      cta: "Get Started",
      highlighted: false,
    },
    {
      name: "Enterprise",
      description: "For teams & organizations",
      price: { monthly: "Custom", annual: "Custom" },
      features: [
        "Everything in Business",
        "Unlimited team members",
        "SSO / SAML authentication",
        "Custom integrations",
        "Dedicated success manager",
        "SLA & uptime guarantee",
        "Custom data retention",
      ],
      cta: "Contact Us",
      highlighted: false,
      isEnterprise: true,
    },
  ];

  const faqs = [
    {
      q: "What happens after my free trial?",
      a: "After 14 days, you'll be prompted to choose a plan. Your data stays safe - we don't delete anything. You can upgrade anytime to continue using Know.",
    },
    {
      q: "Can I cancel anytime?",
      a: "Yes, you can cancel your subscription at any time. You'll retain access until the end of your billing period.",
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept all major credit cards (Visa, Mastercard, American Express) and can arrange invoicing for Enterprise customers.",
    },
    {
      q: "Is my data secure?",
      a: "Absolutely. We use 256-bit encryption, never sell your data, and you can delete your account and all associated data at any time.",
    },
    {
      q: "What's included in bulk search?",
      a: "Bulk search lets you find up to 50 people in a single query. Perfect for list building, event prep, or sales prospecting.",
    },
    {
      q: "Do you offer refunds?",
      a: "We offer a full refund within the first 7 days of any paid plan if you're not satisfied.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO
        title="Pricing"
        description="Simple, transparent pricing for Know. Start with a 14-day free trial, then choose Pro at $49/mo or Business at $99/mo. No hidden fees."
        path="/pricing"
      />
      <BreadcrumbSchema items={[{ name: "Pricing", path: "/pricing" }]} />
      <FAQSchema faqs={faqs} />
      <SiteHeader />

      {/* Hero */}
      <section className="container mx-auto px-6 pt-20 pb-12 max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-light mb-4 tracking-tight">
            Simple, transparent pricing
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Start free, upgrade when you're ready. No hidden fees.
          </p>
        </motion.div>

        {/* Billing Toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-3 mt-10"
        >
          <button
            onClick={() => setBillingPeriod("monthly")}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
              billingPeriod === "monthly"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingPeriod("annual")}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
              billingPeriod === "annual"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Annual
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              billingPeriod === "annual"
                ? "bg-primary-foreground/20 text-primary-foreground"
                : "bg-emerald-500/10 text-emerald-500"
            }`}>
              Save 20%
            </span>
          </button>
        </motion.div>
      </section>

      {/* Pricing Cards */}
      <section className="container mx-auto px-6 pb-24 max-w-6xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className={`rounded-2xl p-6 relative ${
                plan.highlighted
                  ? "border-2 border-primary lg:scale-105 lg:-my-4 z-10"
                  : "border border-border/50"
              } ${plan.isEnterprise ? "bg-muted/20" : "bg-background"}`}
              style={plan.highlighted ? {
                background: "linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(16, 185, 129, 0.02) 50%, transparent 100%)"
              } : undefined}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                  {plan.badge}
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-medium text-lg mb-1">{plan.name}</h3>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <div className="mb-6 h-16 overflow-hidden">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={billingPeriod}
                    initial={{ y: billingPeriod === "annual" ? 40 : -40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: billingPeriod === "annual" ? -40 : 40, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  >
                    {plan.price.monthly === "Custom" ? (
                      <span className="text-3xl font-light">Custom</span>
                    ) : plan.price.monthly === "0" ? (
                      <span className="text-3xl font-light">{plan.period}</span>
                    ) : (
                      <>
                        <div className="flex items-baseline gap-1">
                          <span className={`font-light ${plan.highlighted ? "text-4xl" : "text-3xl"}`}>
                            ${billingPeriod === "monthly" ? plan.price.monthly : plan.price.annual}
                          </span>
                          <span className="text-muted-foreground text-sm">/month</span>
                        </div>
                        {billingPeriod === "annual" && plan.savings && (
                          <p className="text-xs text-emerald-500 mt-1">
                            ${plan.annualTotal}/year · Save ${plan.savings}
                          </p>
                        )}
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckIcon />
                    {feature}
                  </li>
                ))}
              </ul>

              {plan.isEnterprise ? (
                <Link
                  to="/contact"
                  className="block w-full py-3 border border-border rounded-full text-sm font-medium hover:bg-muted/50 transition-colors text-center"
                >
                  {plan.cta}
                </Link>
              ) : (
                <Link
                  to="/#waitlist-section"
                  className={`block w-full py-3 rounded-full text-sm font-medium transition-all text-center ${
                    plan.highlighted
                      ? "bg-primary text-primary-foreground hover:opacity-90"
                      : "border border-border hover:bg-muted/50"
                  }`}
                >
                  {plan.cta}
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="border-t border-border/40 py-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-2xl font-light mb-12 text-center">Compare plans</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/40">
                  <th className="text-left py-4 font-medium">Feature</th>
                  <th className="text-center py-4 font-medium">Free Trial</th>
                  <th className="text-center py-4 font-medium">Pro</th>
                  <th className="text-center py-4 font-medium">Business</th>
                  <th className="text-center py-4 font-medium">Enterprise</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                {[
                  { feature: "Network searches", values: ["Unlimited", "Unlimited", "Unlimited", "Unlimited"] },
                  { feature: "Research reports", values: ["✓", "✓", "✓", "✓"] },
                  { feature: "Data sources", values: ["All", "All", "All", "All + Custom"] },
                  { feature: "Meeting scheduling", values: ["✓", "✓", "✓", "✓"] },
                  { feature: "AI message drafting", values: ["✓", "✓", "✓", "✓"] },
                  { feature: "Bulk search", values: ["—", "—", "50 at once", "Unlimited"] },
                  { feature: "Export to CSV/CRM", values: ["—", "—", "✓", "✓"] },
                  { feature: "API access", values: ["—", "—", "✓", "✓"] },
                  { feature: "Verified data badges", values: ["—", "—", "✓", "✓"] },
                  { feature: "Team members", values: ["1", "1", "1", "Unlimited"] },
                  { feature: "SSO / SAML", values: ["—", "—", "—", "✓"] },
                  { feature: "Support", values: ["Email", "Priority", "Priority", "Dedicated"] },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-border/20">
                    <td className="py-4 text-foreground">{row.feature}</td>
                    {row.values.map((val, j) => (
                      <td key={j} className="py-4 text-center">
                        {val === "✓" ? (
                          <svg className="w-4 h-4 text-emerald-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : val === "—" ? (
                          <span className="text-muted-foreground/40">—</span>
                        ) : (
                          val
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border/40 py-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-2xl font-light mb-12 text-center">Frequently asked questions</h2>

          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="border-b border-border/40 pb-6"
              >
                <h3 className="font-medium mb-2">{faq.q}</h3>
                <p className="text-sm text-muted-foreground">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border/40 py-24">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <h2 className="text-3xl font-light mb-4">Ready to get started?</h2>
          <p className="text-muted-foreground mb-8">
            Start your 14-day free trial. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/#waitlist-section"
              className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity"
            >
              Start Free Trial
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3 border border-border rounded-full font-medium hover:bg-muted/50 transition-colors"
            >
              Talk to Sales
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
