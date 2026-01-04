import { motion } from "framer-motion";
import { Terminal, Eye, Lock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 pt-32 pb-20 max-w-4xl"
      >
        <h1 className="text-5xl md:text-6xl font-light leading-tight mb-8 tracking-tight">
          Most things don't fail dramatically.<br />They fade.
        </h1>
        <p className="text-xl text-muted-foreground font-light mb-4">
          KNOW is personal infrastructure that runs quietly in the background.
        </p>
      </motion.section>

      {/* The Problem */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-20 max-w-4xl border-t border-border"
      >
        <h2 className="text-3xl font-light mb-8">The real problem isn't productivity</h2>
        <div className="space-y-4 text-lg text-muted-foreground font-light leading-relaxed">
          <p>
            It's the email you meant to send on Tuesday that's now Friday afternoon.
          </p>
          <p>
            The decision you've revisited four times without making.
          </p>
          <p>
            The same step in the same project where you always slow down.
          </p>
          <p>
            Not because you lack discipline. Because patterns are invisible until someone points them out.
          </p>
        </div>
      </motion.section>

      {/* The Shift */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-20 max-w-4xl border-t border-border"
      >
        <h2 className="text-3xl font-light mb-8">Tools you manage vs systems that watch</h2>
        <div className="grid md:grid-cols-2 gap-12 mt-12">
          <div>
            <h3 className="text-xl font-normal mb-4 text-muted-foreground">Most tools</h3>
            <ul className="space-y-3 text-muted-foreground font-light">
              <li>Dashboards you check</li>
              <li>Reminders you dismiss</li>
              <li>Data you track manually</li>
              <li>Insights you interpret</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-normal mb-4">KNOW</h3>
            <ul className="space-y-3 font-light">
              <li>Memory that accumulates</li>
              <li>Understanding that deepens</li>
              <li>Observation without effort</li>
              <li>Intervention when it matters</li>
            </ul>
          </div>
        </div>
      </motion.section>

      {/* What KNOW Does */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-20 max-w-4xl border-t border-border"
      >
        <h2 className="text-3xl font-light mb-12">What KNOW actually does</h2>
        <div className="space-y-8">
          <div className="flex gap-4">
            <Eye className="w-6 h-6 mt-1 text-muted-foreground flex-shrink-0" />
            <div>
              <h3 className="text-xl font-normal mb-2">Runs in the background</h3>
              <p className="text-muted-foreground font-light">
                A daemon process that observes your work patterns over time. You install it once and forget about it.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <Zap className="w-6 h-6 mt-1 text-muted-foreground flex-shrink-0" />
            <div>
              <h3 className="text-xl font-normal mb-2">Notices patterns</h3>
              <p className="text-muted-foreground font-light">
                Learns what derails you. Which tasks you avoid. When momentum breaks. What time of day things slip.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <Terminal className="w-6 h-6 mt-1 text-muted-foreground flex-shrink-0" />
            <div>
              <h3 className="text-xl font-normal mb-2">Speaks only when it matters</h3>
              <p className="text-muted-foreground font-light">
                No notifications. No dashboards. Just one timely suggestion when a pattern is about to repeat.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <Lock className="w-6 h-6 mt-1 text-muted-foreground flex-shrink-0" />
            <div>
              <h3 className="text-xl font-normal mb-2">Learns from what happens next</h3>
              <p className="text-muted-foreground font-light">
                Whether you act on its suggestion or ignore it, KNOW adjusts. It gets more accurate the longer it runs.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Trust & Restraint */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-20 max-w-4xl border-t border-border bg-muted/30"
      >
        <h2 className="text-3xl font-light mb-8">What KNOW can see, and what it cannot</h2>
        <div className="space-y-6 text-muted-foreground font-light leading-relaxed">
          <p>
            KNOW observes timing patterns, file access, and command history. It cannot read file contents, passwords, or private communications.
          </p>
          <p>
            All data is stored locally on your machine. Nothing leaves your system unless you explicitly configure sync.
          </p>
          <p>
            Every observation can be inspected. Every pattern can be questioned. Every piece of data can be deleted.
          </p>
          <p>
            Permissions are progressive. KNOW starts with minimal access and asks before observing more.
          </p>
          <p className="text-foreground font-normal pt-4">
            Trust is structural, not promised.
          </p>
        </div>
      </motion.section>

      {/* A Day With KNOW */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-20 max-w-4xl border-t border-border"
      >
        <h2 className="text-3xl font-light mb-8">A day with KNOW</h2>
        <div className="space-y-6 text-muted-foreground font-light leading-relaxed">
          <p>
            It's 4pm on a Thursday. You've been working on three things at once, switching between them when one gets difficult.
          </p>
          <p>
            KNOW has noticed this pattern before. The last four Thursdays, you avoided the same type of task around this time.
          </p>
          <p>
            A single line appears in your terminal: "You usually defer this step. Consider finishing it now while context is fresh."
          </p>
          <p>
            You pause. You finish it. Friday morning feels different.
          </p>
          <p className="text-foreground font-normal pt-4">
            No heroics. Just less friction.
          </p>
        </div>
      </motion.section>

      {/* Why People Pay */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-20 max-w-4xl border-t border-border"
      >
        <h2 className="text-3xl font-light mb-8">Why people pay</h2>
        <div className="space-y-6 text-muted-foreground font-light leading-relaxed mb-12">
          <p>
            KNOW compounds over time. The longer it runs, the more accurate it becomes.
          </p>
          <p>
            Switching away doesn't cost you data. It costs you the accumulated understanding of how you actually work.
          </p>
          <p>
            It replaces the mental overhead of tracking what's slipping. That attention goes elsewhere.
          </p>
        </div>
        <div className="text-2xl font-light">
          $24 per month
        </div>
      </motion.section>

      {/* Install */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-20 max-w-4xl border-t border-border bg-muted/30"
      >
        <h2 className="text-3xl font-light mb-8">Install</h2>
        <div className="bg-card border border-border rounded-lg p-6 mb-6 font-mono text-sm">
          curl -fsSL https://know.run/install | sh
        </div>
        <div className="space-y-3 text-muted-foreground font-light">
          <p>Starts immediately. No onboarding. No configuration.</p>
          <p>KNOW will speak first when it has something worth saying.</p>
        </div>
      </motion.section>

      {/* Who This Is For */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-20 max-w-4xl border-t border-border"
      >
        <h2 className="text-3xl font-light mb-12">Who this is for, and who it is not</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-normal mb-4">You'll love KNOW if you</h3>
            <ul className="space-y-3 text-muted-foreground font-light">
              <li>Work from the command line</li>
              <li>Notice patterns after they've repeated</li>
              <li>Want less to manage, not more</li>
              <li>Value systems that improve over time</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-normal mb-4">KNOW is not for you if you</h3>
            <ul className="space-y-3 text-muted-foreground font-light">
              <li>Prefer visual dashboards</li>
              <li>Want immediate transformation</li>
              <li>Need detailed analytics</li>
              <li>Don't work in a terminal environment</li>
            </ul>
          </div>
        </div>
      </motion.section>

      {/* Ending */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-32 max-w-4xl border-t border-border text-center"
      >
        <p className="text-2xl font-light text-muted-foreground leading-relaxed">
          Things stop slipping when something is watching.
        </p>
      </motion.section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 max-w-4xl text-center text-sm text-muted-foreground font-light">
          KNOW — Personal infrastructure that runs quietly forever
        </div>
      </footer>
    </div>
  );
}