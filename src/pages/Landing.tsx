import { motion } from "framer-motion";
import { useState } from "react";

// Network Globe Component
const NetworkGlobe = () => {
  return (
    <div className="relative w-full h-[400px] flex items-center justify-center">
      {/* Orbiting connections */}
      <motion.div
        className="absolute w-64 h-64 rounded-full border border-primary/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full bg-primary/60"
            style={{
              top: "50%",
              left: "50%",
              marginTop: "-6px",
              marginLeft: "-6px",
            }}
            animate={{
              rotate: -360,
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            <motion.div
              className="absolute inset-0 rounded-full bg-primary"
              animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
            />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="absolute w-48 h-48 rounded-full border border-primary/30"
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            className="absolute w-2.5 h-2.5 rounded-full bg-primary/70"
            style={{
              top: "50%",
              left: "50%",
              marginTop: "-5px",
              marginLeft: "-5px",
            }}
            animate={{
              rotate: 360,
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </motion.div>

      {/* Center node (You) */}
      <motion.div
        className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg shadow-primary/20"
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-sm font-medium text-primary-foreground">You</span>
      </motion.div>

      {/* Connecting lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {[...Array(8)].map((_, i) => {
          const angle = (i / 8) * 360;
          const rad = (angle * Math.PI) / 180;
          const x1 = 200;
          const y1 = 200;
          const x2 = 200 + Math.cos(rad) * 120;
          const y2 = 200 + Math.sin(rad) * 120;

          return (
            <motion.line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="currentColor"
              strokeWidth="1"
              className="text-primary/20"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, delay: i * 0.1 }}
            />
          );
        })}
      </svg>
    </div>
  );
};

// Connection Path Visualization
const ConnectionPath = () => {
  const nodes = [
    { name: "You", degree: 0 },
    { name: "Sarah", degree: 1 },
    { name: "Marcus", degree: 2 },
    { name: "Target", degree: 3 },
  ];

  return (
    <div className="flex items-center justify-center gap-4 py-8">
      {nodes.map((node, i) => (
        <div key={i} className="flex items-center gap-4">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            className="flex flex-col items-center gap-2"
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                node.degree === 0
                  ? "bg-gradient-to-br from-primary to-primary/60"
                  : "bg-muted border-2 border-primary/40"
              }`}
            >
              <span className="text-xs font-medium">{node.name}</span>
            </div>
            <span className="text-xs text-muted-foreground">
              {node.degree === 0 ? "1st" : `${node.degree + 1}${node.degree === 1 ? 'nd' : node.degree === 2 ? 'rd' : 'th'}`}
            </span>
          </motion.div>
          {i < nodes.length - 1 && (
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 + 0.1 }}
              className="w-8 h-0.5 bg-gradient-to-r from-primary/60 to-primary/20"
              style={{ originX: 0 }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default function Landing() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const features = [
    {
      title: "Chat-First Intelligence",
      description: "Ask questions naturally. Get instant answers about your network.",
    },
    {
      title: "Warm Intro Paths",
      description: "Find connections 3-4 degrees away. Know who to ask for intros.",
    },
    {
      title: "Relationship Context",
      description: "Never forget. Last spoke, shared interests, connection strength.",
    },
    {
      title: "Smart Suggestions",
      description: "Who to follow up with. Who you're drifting from. When to reconnect.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-20 md:pt-32 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-5xl md:text-7xl font-bold leading-tight mb-6"
              >
                Reach anyone.<br />
                <span className="text-primary">3 degrees away.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-muted-foreground mb-8 leading-relaxed"
              >
                KNOW maps your real relationships from email and calendar. Chat to find warm intro paths to anyone in your extended network.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity">
                  Get Started
                </button>
                <button className="px-8 py-3 border border-border rounded-lg font-medium hover:bg-muted transition-colors">
                  See How It Works
                </button>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <NetworkGlobe />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Connection Path Demo */}
      <section className="container mx-auto px-6 py-16 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Find warm intro paths
            </h2>
            <p className="text-xl text-muted-foreground">
              KNOW shows you exactly how to reach anyone through your network
            </p>
          </motion.div>

          <ConnectionPath />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 bg-muted/30 rounded-xl p-6 border border-border"
          >
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                <div>
                  <p className="font-medium">Sarah Chen</p>
                  <p className="text-sm text-muted-foreground">Last spoke 3 weeks ago · Strong connection</p>
                </div>
              </div>
              <div className="flex items-start gap-3 ml-6">
                <div className="w-2 h-2 rounded-full bg-primary/60 mt-2" />
                <div>
                  <p className="font-medium">Marcus Rodriguez</p>
                  <p className="text-sm text-muted-foreground">Introduced by Sarah · Works at Acme Corp</p>
                </div>
              </div>
              <div className="flex items-start gap-3 ml-12">
                <div className="w-2 h-2 rounded-full bg-primary/40 mt-2" />
                <div>
                  <p className="font-medium">Your Target Contact</p>
                  <p className="text-sm text-muted-foreground">Marcus emails them regularly · High success rate</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-6 py-16 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Your network, intelligently mapped
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onHoverStart={() => setHoveredFeature(index)}
                onHoverEnd={() => setHoveredFeature(null)}
                className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-all cursor-pointer"
              >
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Simple Promise */}
      <section className="container mx-auto px-6 py-24 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Just chat. Get connected.
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              KNOW tells you who to talk to, why, and how — using your real relationships.
            </p>

            <div className="bg-muted/30 rounded-xl p-8 border border-border max-w-2xl mx-auto">
              <div className="space-y-4 text-left">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm">💬</span>
                  </div>
                  <div>
                    <p className="font-medium mb-1">"Who knows someone at Stripe?"</p>
                    <p className="text-sm text-muted-foreground">Get instant intro paths</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm">🎯</span>
                  </div>
                  <div>
                    <p className="font-medium mb-1">"Who should I follow up with?"</p>
                    <p className="text-sm text-muted-foreground">Never lose track of relationships</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm">✍️</span>
                  </div>
                  <div>
                    <p className="font-medium mb-1">"Draft an intro to Sarah"</p>
                    <p className="text-sm text-muted-foreground">Get contextual message templates</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What KNOW doesn't do */}
      <section className="container mx-auto px-6 py-16 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-muted-foreground">
              What KNOW doesn't do
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4">
            {["Dashboards", "CRM views", "Manual contact management", "Social feed tracking", "Analytics pages", "Team features"].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-2 text-muted-foreground"
              >
                <span className="text-primary/50">×</span>
                <span>{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing & CTA */}
      <section className="container mx-auto px-6 py-24 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-12 border border-primary/20">
              <h2 className="text-4xl md:text-6xl font-bold mb-4">$24/month</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Your network graph stays current. Your relationships stay maintained.
              </p>
              <button className="px-10 py-4 bg-primary text-primary-foreground rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity">
                Start Free Trial
              </button>
              <p className="text-sm text-muted-foreground mt-4">
                Connect your email and calendar in 2 minutes
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-12 border-t border-border">
        <div className="max-w-6xl mx-auto text-center text-muted-foreground text-sm">
          <p>© 2026 KNOW. Your relationships, intelligently mapped.</p>
        </div>
      </footer>
    </div>
  );
}