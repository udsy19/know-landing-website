import { motion } from "framer-motion";
import { useState, useEffect, Component, type ReactNode } from "react";
import { Link } from "react-router";
import { PLATFORMS } from "../data/platforms";
import SiteHeader from "../components/SiteHeader";

class LandingErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
          <div className="text-center">
            <span className="text-2xl font-mono font-medium">[know]</span>
            <p className="mt-4 text-muted-foreground">
              Something went wrong. Please refresh.
            </p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function LandingPage() {
  const [waitlistCount, setWaitlistCount] = useState(2847);
  const [flowStep, setFlowStep] = useState(0);

  // Fetch waitlist count on mount
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/waitlist-count", { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error("Non-200 response");
        return res.json();
      })
      .then(data => {
        if (data.count) setWaitlistCount(data.count);
      })
      .catch(err => {
        if (err.name !== "AbortError") {
          console.warn("Failed to fetch waitlist count");
        }
      });
    return () => controller.abort();
  }, []);

  // Flow diagram animation cycle
  useEffect(() => {
    const interval = setInterval(() => {
      setFlowStep(prev => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-center px-6 pt-20 relative overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-primary/5 blur-3xl"
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-primary/5 blur-3xl"
            animate={{
              x: [0, -50, 0],
              y: [0, -30, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2 mb-6"
            >
              <motion.div
                className="w-2 h-2 rounded-full bg-emerald-500"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <p className="text-sm font-mono text-muted-foreground">
                Network intelligence for teams
              </p>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl md:text-7xl font-light tracking-tight leading-[1.1] mb-8"
            >
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                Your team's network,
              </motion.span>
              <br />
              <motion.span
                className="text-muted-foreground"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                one search away.
              </motion.span>
            </motion.h1>

            {/* Subhead */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-xl text-muted-foreground max-w-xl leading-relaxed mb-12"
            >
              Network intelligence infrastructure that turns organizational relationships into an actionable system.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row items-start gap-4"
            >
              <motion.a
                href="https://cal.com/useknow.io"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-foreground text-background rounded-full font-medium text-lg relative overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">Book a demo</span>
                <motion.div
                  className="absolute inset-0 bg-primary"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
              <motion.button
                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 text-muted-foreground hover:text-foreground transition-colors text-lg flex items-center gap-2"
                whileHover={{ x: 5 }}
              >
                See how it works
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-border rounded-full flex justify-center pt-2"
          >
            <motion.div
              className="w-1 h-2 bg-muted-foreground rounded-full"
              animate={{ y: [0, 4, 0], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* The Problem → Solution */}
      <section className="py-32 px-6 border-t border-border/40">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-16"
          >
            {/* Problem */}
            <div>
              <p className="text-sm font-mono text-muted-foreground mb-4">The problem</p>
              <p className="text-2xl md:text-3xl font-light leading-relaxed text-muted-foreground">
                Your team collectively knows <span className="text-foreground">thousands of people</span>.
                But that knowledge is trapped in individual inboxes, calendars, and LinkedIn accounts.
              </p>
            </div>

            {/* Solution */}
            <div>
              <p className="text-sm font-mono text-muted-foreground mb-4">The solution</p>
              <p className="text-2xl md:text-3xl font-light leading-relaxed">
                Know builds a shared network graph from your team's connections.
                Search across everyone. Find the warmest path. Request intros.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How it works - Flow Diagram */}
      <section id="how-it-works" className="py-32 px-6 bg-muted/30 overflow-hidden">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-mono text-muted-foreground mb-4 text-center"
            >
              How it works
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-light text-center mb-16"
            >
              From scattered contacts to warm intros
            </motion.h2>

            {/* Flow Diagram - Simple 3-column with CSS connectors */}
            <div className="grid grid-cols-[1fr_auto_1.5fr_auto_1fr] items-center gap-4 md:gap-6">
              {/* Your Team Column */}
              <div className="flex flex-col items-center">
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-6">Your Team</p>
                <div className="flex flex-col gap-4">
                  {[
                    { initials: "SC", name: "Sarah", role: "Sales", idx: 0 },
                    { initials: "MR", name: "Mike", role: "Eng", idx: 1 },
                    { initials: "LW", name: "Lisa", role: "BD", idx: 2 },
                  ].map((member) => (
                    <motion.div
                      key={member.initials}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: member.idx * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <motion.div
                        className={`w-11 h-11 rounded-full flex items-center justify-center text-xs font-medium border-2 transition-all duration-500 ${
                          flowStep >= 3 && member.idx === 1
                            ? "bg-foreground text-background border-foreground scale-110 shadow-lg"
                            : "bg-background border-border"
                        }`}
                        whileHover={{ scale: 1.05 }}
                      >
                        {member.initials}
                      </motion.div>
                      <div className="hidden sm:block">
                        <p className="text-sm font-medium">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.role}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Arrow 1 */}
              <motion.div
                className="flex flex-col items-center justify-center h-full"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <motion.div
                  className={`flex items-center transition-colors duration-500 ${flowStep >= 1 ? "text-foreground" : "text-border"}`}
                  animate={{ x: flowStep >= 1 ? [0, 5, 0] : 0 }}
                  transition={{ duration: 1, repeat: flowStep >= 1 && flowStep < 3 ? Infinity : 0 }}
                >
                  <div className={`w-8 md:w-16 h-px transition-colors duration-500 ${flowStep >= 1 ? "bg-foreground" : "bg-border"}`} />
                  <svg className="w-4 h-4 -ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </motion.div>
              </motion.div>

              {/* Network Column */}
              <div className="flex flex-col items-center">
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-6">Shared Network</p>
                <motion.div
                  className="relative w-full aspect-square max-w-[200px] flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  {/* Animated network visualization */}
                  <div className="absolute inset-0">
                    {/* Orbiting dots */}
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <motion.div
                        key={i}
                        className={`absolute w-2 h-2 rounded-full transition-colors duration-500 ${
                          flowStep >= 3 && i === 2 ? "bg-foreground" : "bg-muted-foreground/40"
                        }`}
                        style={{
                          left: `${50 + 40 * Math.cos((i * Math.PI * 2) / 6)}%`,
                          top: `${50 + 40 * Math.sin((i * Math.PI * 2) / 6)}%`,
                          transform: "translate(-50%, -50%)",
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                          scale: flowStep >= 1 ? 1 : 0,
                          opacity: flowStep >= 1 ? 1 : 0,
                        }}
                        transition={{ delay: 0.3 + i * 0.08, type: "spring" }}
                      />
                    ))}
                    {/* Inner ring dots */}
                    {[0, 1, 2, 3].map((i) => (
                      <motion.div
                        key={`inner-${i}`}
                        className="absolute w-1.5 h-1.5 rounded-full bg-muted-foreground/30"
                        style={{
                          left: `${50 + 22 * Math.cos((i * Math.PI * 2) / 4 + Math.PI / 4)}%`,
                          top: `${50 + 22 * Math.sin((i * Math.PI * 2) / 4 + Math.PI / 4)}%`,
                          transform: "translate(-50%, -50%)",
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                          scale: flowStep >= 1 ? 1 : 0,
                          opacity: flowStep >= 1 ? 1 : 0,
                        }}
                        transition={{ delay: 0.5 + i * 0.05, type: "spring" }}
                      />
                    ))}
                    {/* Center node */}
                    <motion.div
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-muted-foreground/50"
                      initial={{ scale: 0 }}
                      animate={{ scale: flowStep >= 1 ? 1 : 0 }}
                      transition={{ delay: 0.4, type: "spring" }}
                    />
                    {/* Pulsing ring */}
                    <motion.div
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full border border-border/50"
                      animate={{
                        scale: flowStep >= 1 ? [1, 1.1, 1] : 1,
                        opacity: flowStep >= 1 ? [0.5, 0, 0.5] : 0,
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>

                  {/* Connection count - center */}
                  <motion.div
                    className="relative z-10 text-center bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: flowStep >= 1 ? 1 : 0, scale: flowStep >= 1 ? 1 : 0.9 }}
                    transition={{ delay: 0.6 }}
                  >
                    <motion.p
                      className="text-2xl font-light tabular-nums"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                    >
                      12,847
                    </motion.p>
                    <p className="text-[10px] text-muted-foreground">connections</p>
                  </motion.div>
                </motion.div>
              </div>

              {/* Arrow 2 */}
              <motion.div
                className="flex flex-col items-center justify-center h-full"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <motion.div
                  className={`flex items-center transition-colors duration-500 ${flowStep >= 2 ? "text-foreground" : "text-border"}`}
                  animate={{ x: flowStep >= 2 ? [0, 5, 0] : 0 }}
                  transition={{ duration: 1, repeat: flowStep >= 2 && flowStep < 3 ? Infinity : 0 }}
                >
                  <div className={`w-8 md:w-16 h-px transition-colors duration-500 ${flowStep >= 2 ? "bg-foreground" : "bg-border"}`} />
                  <svg className="w-4 h-4 -ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </motion.div>
              </motion.div>

              {/* Target Column */}
              <div className="flex flex-col items-center">
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-6">Target</p>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col items-center gap-3"
                >
                  <motion.div
                    className={`w-14 h-14 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-all duration-500 ${
                      flowStep >= 3
                        ? "bg-foreground text-background border-foreground shadow-lg shadow-foreground/20"
                        : flowStep >= 2
                          ? "bg-background border-border"
                          : "bg-muted border-muted text-muted-foreground"
                    }`}
                    animate={{
                      scale: flowStep >= 3 ? [1, 1.1, 1] : 1,
                    }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    JS
                  </motion.div>
                  <div className="text-center">
                    <p className="text-sm font-medium">John Smith</p>
                    <p className="text-xs text-muted-foreground">CTO @ Stripe</p>
                  </div>
                </motion.div>

                {/* Result badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{
                    opacity: flowStep >= 3 ? 1 : 0,
                    y: flowStep >= 3 ? 0 : 20,
                    scale: flowStep >= 3 ? 1 : 0.9,
                  }}
                  transition={{ type: "spring", damping: 15 }}
                  className="mt-4 px-4 py-2 rounded-full bg-foreground text-background text-center"
                >
                  <p className="text-sm font-medium">2nd degree</p>
                  <p className="text-xs opacity-70">via Mike</p>
                </motion.div>
              </div>
            </div>

            {/* Step indicators */}
            <div className="flex justify-center gap-2 mt-12">
              {[0, 1, 2, 3].map((step) => (
                <button
                  key={step}
                  onClick={() => setFlowStep(step)}
                  className={`h-1.5 rounded-full transition-all duration-300 hover:bg-muted-foreground ${
                    flowStep === step ? "w-8 bg-foreground" : "w-2 bg-border"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Three pillars */}
      <section className="py-32 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-3 gap-12 md:gap-8">
            {[
              {
                number: "01",
                title: "Connect",
                description: "Team members link their work accounts. Gmail, Calendar, LinkedIn. Takes 2 minutes.",
                icon: "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1",
              },
              {
                number: "02",
                title: "Map",
                description: "Know builds a shared graph of every relationship. Calculates connection strength automatically.",
                icon: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7",
              },
              {
                number: "03",
                title: "Search",
                description: "Find warm paths to anyone. Request intros through the teammate with the strongest connection.",
                icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
              },
            ].map((item, i) => (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <motion.div
                  className="w-12 h-12 rounded-xl bg-foreground/5 flex items-center justify-center mb-6 group-hover:bg-foreground/10 transition-colors"
                  whileHover={{ rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <svg className="w-6 h-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                  </svg>
                </motion.div>
                <motion.p
                  className="text-sm font-mono text-primary mb-3"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 + 0.1 }}
                >
                  {item.number}
                </motion.p>
                <h3 className="text-2xl font-medium mb-3 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Principle */}
      <section className="py-32 px-6 border-t border-border/40">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-mono text-muted-foreground mb-8"
            >
              The principle
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-2xl md:text-3xl font-light leading-relaxed mb-12"
            >
              In any organization, outcomes flow through relationships.
            </motion.p>

            <div className="space-y-4 mb-12">
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-lg text-muted-foreground"
              >
                Each person adds thousands of new connections.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="text-lg text-muted-foreground"
              >
                Each connection creates new paths.
              </motion.p>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="text-xl md:text-2xl font-light"
            >
              Know maps those paths so teams can use them{" "}
              <span className="text-primary">intentionally</span>, not accidentally.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-32 px-6 border-t border-border/40">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-mono text-muted-foreground mb-4 text-center">Use cases</p>
            <h2 className="text-3xl md:text-4xl font-light text-center mb-16">
              Built for every team that relies on relationships
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  team: "Sales",
                  title: "Close deals faster",
                  description: "Find warm paths into target accounts. See who on your team knows the decision makers. Request intros that actually get responses.",
                  example: "\"Who knows the VP of Engineering at Acme Corp?\"",
                  metric: "3x higher response rates",
                  icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                },
                {
                  team: "Recruiting",
                  title: "Hire top talent",
                  description: "Source candidates through your network. Reach passive talent via mutual connections. Skip the cold InMails.",
                  example: "\"Senior ML engineers from Google in our network\"",
                  metric: "2x faster time-to-hire",
                  icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
                },
                {
                  team: "Business Development",
                  title: "Build partnerships",
                  description: "Map relationships to potential partners. Find the warmest introduction path. Turn cold outreach into warm intros.",
                  example: "\"Connections at Series B+ fintech companies\"",
                  metric: "5x more meetings booked",
                  icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                },
              ].map((useCase, i) => (
                <motion.div
                  key={useCase.team}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, type: "spring", damping: 20 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="p-6 rounded-2xl border border-border bg-background hover:border-foreground/30 hover:shadow-lg hover:shadow-foreground/5 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <motion.div
                      className="w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors"
                      whileHover={{ rotate: 5 }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={useCase.icon} />
                      </svg>
                    </motion.div>
                    <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">{useCase.team}</p>
                  </div>
                  <h3 className="text-xl font-medium mb-3 group-hover:text-primary transition-colors">{useCase.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{useCase.description}</p>
                  <p className="text-xs font-mono text-muted-foreground/60 mb-4 italic">{useCase.example}</p>
                  <motion.p
                    className="text-sm font-medium text-primary flex items-center gap-2"
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                  >
                    {useCase.metric}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </motion.p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Integrations — Infinite Marquee */}
      <section className="py-20 px-6 bg-muted/30 overflow-hidden">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-mono text-muted-foreground mb-4 text-center">Integrations</p>
            <h2 className="text-2xl md:text-3xl font-light text-center mb-12">Connects to the tools you already use</h2>

            <div className="space-y-4">
              {/* Row 1 — scrolls left */}
              <div
                className="group relative overflow-hidden"
                style={{
                  maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
                  WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
                }}
              >
                <div
                  className="flex gap-4 w-max group-hover:[animation-play-state:paused]"
                  style={{ animation: "marquee-left 40s linear infinite" }}
                >
                  {[...PLATFORMS.slice(0, 12), ...PLATFORMS.slice(0, 12)].map((p, i) => (
                    <div
                      key={`r1-${i}`}
                      className="flex items-center gap-3 px-5 py-3 bg-background border border-border rounded-2xl shrink-0"
                    >
                      <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill={p.color}>
                        <path d={p.svgPath} />
                      </svg>
                      <span className="text-sm font-medium whitespace-nowrap">{p.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Row 2 — scrolls right */}
              <div
                className="group relative overflow-hidden"
                style={{
                  maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
                  WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
                }}
              >
                <div
                  className="flex gap-4 w-max group-hover:[animation-play-state:paused]"
                  style={{ animation: "marquee-right 45s linear infinite" }}
                >
                  {[...PLATFORMS.slice(12), ...PLATFORMS.slice(12)].map((p, i) => (
                    <div
                      key={`r2-${i}`}
                      className="flex items-center gap-3 px-5 py-3 bg-background border border-border rounded-2xl shrink-0"
                    >
                      <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill={p.color}>
                        <path d={p.svgPath} />
                      </svg>
                      <span className="text-sm font-medium whitespace-nowrap">{p.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-xs text-muted-foreground mt-8 text-center">Connect in 2 minutes. Read-only access. Revoke anytime.</p>
          </motion.div>
        </div>
      </section>

      {/* The multiplier effect */}
      <section className="py-32 px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-mono text-muted-foreground mb-8"
            >
              The math
            </motion.p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, type: "spring" }}
                className="text-center"
              >
                <motion.p
                  className="text-5xl md:text-6xl font-light tabular-nums"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  10
                </motion.p>
                <p className="text-sm text-muted-foreground mt-2">team members</p>
              </motion.div>

              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-3xl text-muted-foreground"
              >
                ×
              </motion.span>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, type: "spring" }}
                className="text-center"
              >
                <p className="text-5xl md:text-6xl font-light tabular-nums">2,000</p>
                <p className="text-sm text-muted-foreground mt-2">connections each</p>
              </motion.div>

              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-3xl text-muted-foreground"
              >
                =
              </motion.span>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: "spring" }}
                className="text-center"
              >
                <motion.p
                  className="text-5xl md:text-6xl font-light text-primary tabular-nums"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                  20,000+
                </motion.p>
                <p className="text-sm text-muted-foreground mt-2">searchable relationships</p>
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="text-xl text-muted-foreground"
            >
              Every person you add multiplies your network intelligence.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Trust & Security */}
      <section className="py-24 px-6 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-mono text-muted-foreground mb-4 text-center">Security</p>
            <h2 className="text-2xl md:text-3xl font-light text-center mb-12">
              Enterprise-grade security for your network data
            </h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[
                {
                  icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
                  title: "256-bit encryption",
                  description: "All data encrypted in transit and at rest"
                },
                {
                  icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                  title: "SOC 2 Type II",
                  description: "Independently audited security controls"
                },
                {
                  icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
                  title: "Read-only access",
                  description: "We never send emails on your behalf"
                },
                {
                  icon: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16",
                  title: "Delete anytime",
                  description: "Full data deletion within 24 hours"
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center p-4"
                >
                  <div className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center mx-auto mb-3">
                    <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                    </svg>
                  </div>
                  <h3 className="text-sm font-medium mb-1">{item.title}</h3>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <Link to="/security" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Learn more about our security practices →
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32 px-6">
        <div className="container mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-mono text-muted-foreground mb-4 text-center">FAQ</p>
            <h2 className="text-2xl md:text-3xl font-light text-center mb-12">
              Common questions
            </h2>

            <div className="space-y-6">
              {[
                {
                  q: "How does Know access my data?",
                  a: "Know connects to your work email and calendar via OAuth (the same secure method used by other apps). We only read metadata like names, email addresses, and meeting attendees—we never read the content of your emails or calendar events."
                },
                {
                  q: "Can other team members see my emails?",
                  a: "No. Team members can only see who you're connected to and the strength of those connections. They cannot see email content, calendar details, or any private information."
                },
                {
                  q: "What happens if I disconnect my account?",
                  a: "You can disconnect at any time from your account settings. When you disconnect, we delete all your data within 24 hours. Your connections will no longer appear in your team's shared network."
                },
                {
                  q: "How is connection strength calculated?",
                  a: "We analyze email frequency, recency, response patterns, and meeting history to calculate a relationship strength score. More recent and frequent interactions result in higher scores."
                },
                {
                  q: "Can I try Know individually before rolling it out to my team?",
                  a: "Yes! Our Solo plan at $49/month lets founders and operators test Know before team rollout. You'll get full access to search your own network and see how Know works."
                },
              ].map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-border pb-6"
                >
                  <h3 className="font-medium mb-2">{faq.q}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 relative overflow-hidden">
        {/* Background animation */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="container mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-light mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Ready to unlock your team's network?
            </motion.h2>
            <motion.p
              className="text-xl text-muted-foreground mb-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              See how Know can help your team close deals, hire talent, and build partnerships faster.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
            >
              <motion.a
                href="https://cal.com/useknow.io"
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-4 bg-foreground text-background rounded-full font-medium text-lg relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Book a team demo</span>
                <motion.div
                  className="absolute inset-0 bg-primary"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
              <span className="text-muted-foreground">or</span>
              <motion.a
                href="https://app.useknow.io"
                className="text-lg text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                whileHover={{ x: 5 }}
              >
                Try solo for $49/mo
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-2 text-sm text-muted-foreground"
            >
              <motion.div
                className="w-2 h-2 bg-emerald-500 rounded-full"
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span>{waitlistCount.toLocaleString()} teams on the waitlist</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 pt-12 pb-8 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-10">
            <div>
              <span className="font-mono text-sm">[know]</span>
              <p className="text-sm text-muted-foreground mt-2 max-w-xs">Your network, intelligently mapped. Find the right connection in seconds.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-8">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider mb-3">Product</p>
                <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                  <Link to="/pricing" className="hover:text-foreground transition-colors">Pricing</Link>
                  <Link to="/security" className="hover:text-foreground transition-colors">Security</Link>
                  <a href="https://app.useknow.io" className="hover:text-foreground transition-colors">Open App</a>
                </div>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider mb-3">Company</p>
                <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                  <Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link>
                  <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
                  <Link to="/terms" className="hover:text-foreground transition-colors">Terms</Link>
                </div>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider mb-3">Press</p>
                <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                  <a
                    href="https://companylaunchtracker.substack.com/p/company-launch-tracker-44"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors inline-flex items-center gap-1"
                  >
                    Company Launch Tracker
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-border/40 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
            <p>© {new Date().getFullYear()} Know Technologies, Inc.</p>
            <p>Built in West Lafayette, IN</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function Landing() {
  return (
    <LandingErrorBoundary>
      <LandingPage />
    </LandingErrorBoundary>
  );
}
