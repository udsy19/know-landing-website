import { motion } from "framer-motion";

const StatusDot = ({ status }: { status: string }) => (
  <div className="flex items-center gap-2">
    {status === "running" && (
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>
    )}
    <span>{status}</span>
  </div>
);

export default function Landing() {

  return (
    <div className="crt min-h-screen bg-background text-foreground font-sans selection:bg-foreground selection:text-background flex flex-col items-center overflow-x-hidden">
      
      {/* Hero Section - Progressive Disclosure */}
      <section className="container mx-auto px-6 pt-32 pb-12 max-w-3xl min-h-[40vh] flex flex-col justify-center">
        <motion.h1
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-light leading-[1.1] mb-8 tracking-tighter text-glow"
        >
          Your network extends further<br />than you think.
        </motion.h1>

        <div className="space-y-1">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-xl md:text-2xl text-muted-foreground font-light max-w-xl leading-relaxed tracking-tight"
          >
            KNOW maps your real relationships.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.6 }}
            className="text-xl md:text-2xl text-muted-foreground font-light max-w-xl leading-relaxed tracking-tight"
          >
            Chat to reach anyone 3-4 degrees away.
          </motion.p>
        </div>
      </section>

      {/* How It Works - Visual Flow */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -200px 0px" }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-6 pt-12 pb-24 max-w-5xl border-t border-border/40"
      >
        <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-16 text-center">How it works</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 relative">
              <span className="text-2xl">📧</span>
              <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">
                1
              </span>
            </div>
            <h3 className="text-xl font-medium mb-3">Connect</h3>
            <p className="text-muted-foreground leading-relaxed">
              Link your email and calendar. KNOW passively builds your relationship graph from real interactions.
            </p>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 relative">
              <span className="text-2xl">💬</span>
              <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">
                2
              </span>
            </div>
            <h3 className="text-xl font-medium mb-3">Ask</h3>
            <p className="text-muted-foreground leading-relaxed">
              Chat naturally. "Who knows someone at Stripe?" Find warm intro paths 3-4 degrees away instantly.
            </p>
          </motion.div>

          {/* Step 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 relative">
              <span className="text-2xl">🎯</span>
              <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">
                3
              </span>
            </div>
            <h3 className="text-xl font-medium mb-3">Connect</h3>
            <p className="text-muted-foreground leading-relaxed">
              Get intro drafts, relationship context, and suggestions. Never lose track of who matters.
            </p>
          </motion.div>
        </div>

        {/* Example Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 bg-muted/30 border border-border/40 rounded-lg p-6 md:p-8"
        >
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="text-2xl">👤</div>
              <div className="flex-1">
                <p className="font-medium text-sm text-muted-foreground mb-1">You ask:</p>
                <p className="text-lg">"Who can intro me to Acme Ventures?"</p>
              </div>
            </div>

            <div className="pl-11 border-l-2 border-primary/30 ml-4 py-3">
              <p className="font-medium text-sm text-muted-foreground mb-2">KNOW finds:</p>
              <div className="flex items-center gap-2 text-sm">
                <span className="px-2 py-1 bg-primary/10 rounded">You</span>
                <span className="text-primary">→</span>
                <span className="px-2 py-1 bg-primary/10 rounded">Sarah Chen</span>
                <span className="text-primary">→</span>
                <span className="px-2 py-1 bg-primary/10 rounded">Julia Park</span>
              </div>
              <p className="text-muted-foreground mt-3 text-sm">
                Sarah emailed Julia 4x last month. Strong connection. High success rate.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center text-muted-foreground font-light text-lg max-w-2xl mx-auto"
        >
          Know tells you who to talk to, why, and how — using your real relationships.
        </motion.p>
      </motion.section>

      {/* State of the System */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -200px 0px" }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-6 py-24 max-w-3xl border-t border-border/40"
      >
        <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-12">What it maps</h2>
        <div className="font-mono text-sm md:text-base w-full max-w-md bg-muted/30 p-6 rounded-sm border border-border/20">
          <div className="grid grid-cols-2 gap-y-4">
            <span className="text-muted-foreground">Sources</span>
            <span>email + calendar</span>

            <span className="text-muted-foreground">Network depth</span>
            <span>3-4 degrees</span>

            <span className="text-muted-foreground">Context</span>
            <span>conversations</span>

            <span className="text-muted-foreground">Privacy</span>
            <span>local only</span>
          </div>
        </div>
        <p className="mt-8 text-muted-foreground font-light text-sm">
          Your relationship graph is built from real interactions.
        </p>
      </motion.section>

      {/* What KNOW refuses to do */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -200px 0px" }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-6 py-24 max-w-3xl border-t border-border/40"
      >
        <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-12">What KNOW doesn't do</h2>
        <ul className="space-y-3 font-light text-lg md:text-xl text-muted-foreground">
          <li className="flex items-center gap-3">
            <span className="w-1 h-1 bg-muted-foreground/50 rounded-full" />
            No dashboards
          </li>
          <li className="flex items-center gap-3">
            <span className="w-1 h-1 bg-muted-foreground/50 rounded-full" />
            No CRM views
          </li>
          <li className="flex items-center gap-3">
            <span className="w-1 h-1 bg-muted-foreground/50 rounded-full" />
            No manual contact management
          </li>
          <li className="flex items-center gap-3">
            <span className="w-1 h-1 bg-muted-foreground/50 rounded-full" />
            No social feed tracking
          </li>
          <li className="flex items-center gap-3">
            <span className="w-1 h-1 bg-muted-foreground/50 rounded-full" />
            No analytics pages
          </li>
          <li className="flex items-center gap-3">
            <span className="w-1 h-1 bg-muted-foreground/50 rounded-full" />
            No team features
          </li>
        </ul>
      </motion.section>

      {/* Pricing */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -200px 0px" }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-6 py-24 max-w-3xl border-t border-border/40"
      >
        <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-12">Pricing</h2>
        <div className="space-y-2">
          <p className="text-4xl md:text-5xl font-light tracking-tight">$24 / month</p>
          <p className="text-muted-foreground font-light text-lg">Your network graph stays current. Your relationships stay maintained.</p>
        </div>
      </motion.section>

      {/* Waitlist */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -200px 0px" }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-6 py-32 max-w-3xl border-t border-border/40 mb-12"
      >
        <div className="text-center">
          <h2 className="text-3xl md:text-5xl font-light mb-6">Join the waitlist</h2>
          <p className="text-muted-foreground mb-8 text-lg">Be the first to map your network.</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity whitespace-nowrap">
              Join Waitlist
            </button>
          </div>
        </div>
      </motion.section>

    </div>
  );
}