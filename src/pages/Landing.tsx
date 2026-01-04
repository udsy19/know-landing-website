import { motion } from "framer-motion";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-foreground selection:text-background">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-6 pt-32 pb-24 max-w-3xl"
      >
        <h1 className="text-4xl md:text-5xl font-light leading-tight mb-8 tracking-tight">
          Most things don't fail dramatically.<br />They fade.
        </h1>
        <p className="text-xl text-muted-foreground font-light max-w-xl leading-relaxed">
          KNOW is personal infrastructure. It runs quietly in the background, observing patterns you cannot see.
        </p>
      </motion.section>

      {/* Terminal Moments - How KNOW shows up */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-6 py-24 max-w-3xl border-t border-border/40"
      >
        <h2 className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-12">How KNOW shows up</h2>
        <div className="space-y-12 font-mono text-sm md:text-base">
          <div className="space-y-2">
            <p className="text-muted-foreground select-none">$ know status</p>
            <p>Daemon: running</p>
            <p>Uptime: 336h</p>
            <p>Patterns observed: 14</p>
            <p>Last intervention: 2 days ago</p>
          </div>

          <div className="space-y-2">
            <p className="text-muted-foreground select-none">$ know</p>
            <p>know: You usually defer this step on Thursdays.</p>
            <p>know: Consider finishing it now while context is fresh.</p>
          </div>

          <div className="space-y-2">
            <p className="text-muted-foreground select-none">$ know log --last</p>
            <p>[14:02] Pattern detected: Rapid context switching</p>
            <p>[14:02] Intervention: "Focus slipping."</p>
            <p>[14:03] User action: Browser closed.</p>
          </div>
        </div>
      </motion.section>

      {/* The Loop */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-6 py-24 max-w-3xl border-t border-border/40"
      >
        <h2 className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-12">The Loop</h2>
        <p className="text-lg md:text-xl font-light leading-relaxed">
          It begins with observation, silent and continuous, reading the cadence of your input rather than the content of your work. When a pattern emerges—a hesitation, a loop, a recurring delay—it recognizes the signature of friction before you do. The decision to speak is weighed against the cost of interruption; it only intervenes when the silence is more expensive than the noise. Once it speaks, it watches for your reaction, refining its understanding of what helps and what distracts, tightening the circle for next time.
        </p>
      </motion.section>

      {/* Failure by Design */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-6 py-24 max-w-3xl border-t border-border/40"
      >
        <h2 className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-12">What KNOW refuses to do</h2>
        <ul className="space-y-4 font-light text-lg">
          <li>No dashboards to check</li>
          <li>No daily goals to miss</li>
          <li>No streaks to maintain</li>
          <li>No motivational language</li>
          <li>No reminders unless invited</li>
          <li>No syncing by default</li>
          <li>No acting on your behalf</li>
        </ul>
      </motion.section>

      {/* Trust & Restraint */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-6 py-24 max-w-3xl border-t border-border/40"
      >
        <h2 className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-12">Trust</h2>
        <div className="space-y-6 font-light leading-relaxed text-muted-foreground">
          <p>
            KNOW observes timing patterns, file access, and command history. It cannot read file contents, passwords, or private communications.
          </p>
          <p>
            All data is stored locally. Nothing leaves your system unless you explicitly configure sync.
          </p>
          <p className="text-foreground">
            Trust is structural, not promised.
          </p>
        </div>
      </motion.section>

      {/* Pricing */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-6 py-24 max-w-3xl border-t border-border/40"
      >
        <h2 className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-12">Pricing</h2>
        <div className="space-y-4">
          <p className="text-3xl font-light">$24 / month</p>
          <p className="text-muted-foreground font-light">KNOW only works if it runs continuously and remembers.</p>
        </div>
      </motion.section>

      {/* Install */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-6 py-24 max-w-3xl border-t border-border/40"
      >
        <h2 className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-12">Install</h2>
        <div className="font-mono text-sm bg-muted/30 p-4 rounded border border-border inline-block">
          curl -fsSL https://know.run/install | sh
        </div>
        <p className="mt-6 text-muted-foreground font-light">
          Starts immediately. No onboarding.
        </p>
      </motion.section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-12 max-w-3xl border-t border-border/40 text-sm text-muted-foreground font-mono">
        KNOW — Personal infrastructure
      </footer>
    </div>
  );
}