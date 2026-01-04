import { motion } from "framer-motion";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-foreground selection:text-background flex flex-col items-center">
      
      {/* Hero Section - Progressive Disclosure */}
      <section className="container mx-auto px-6 pt-40 pb-32 max-w-3xl min-h-[60vh] flex flex-col justify-center">
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-light leading-tight mb-8 tracking-tight"
        >
          Most things don't fail dramatically.<br />They fade.
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2 }}
          className="text-xl text-muted-foreground font-light max-w-xl leading-relaxed"
        >
          KNOW runs quietly on your machine.
        </motion.p>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 4 }}
          className="text-xl text-muted-foreground font-light max-w-xl leading-relaxed mt-2"
        >
          It notices what keeps slipping.
        </motion.p>
      </section>

      {/* Live Terminal Transcript */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-6 py-32 max-w-3xl border-t border-border/40"
      >
        <h2 className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-16">A real session, over time</h2>
        <div className="font-mono text-sm md:text-base space-y-8 text-foreground/90">
          <div>
            <p className="text-muted-foreground select-none mb-2">$ know</p>
            <p>know: I'm running locally.</p>
          </div>
          
          <div className="text-muted-foreground/50 py-4">
            [ 3 days pass ]
          </div>

          <div>
            <p>know: You've been starting this late all week.</p>
          </div>

          <div className="text-muted-foreground/50 py-4">
            [ no response ]
          </div>
          
          <div className="text-muted-foreground/50 py-4">
            [ 2 days pass ]
          </div>

          <div>
            <p>know: Do you want help catching this earlier?</p>
          </div>

          <div>
            <p className="text-muted-foreground select-none mb-2">$ yes</p>
            <p>know: Okay.</p>
          </div>
        </div>
      </motion.section>

      {/* State of the System */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-6 py-32 max-w-3xl border-t border-border/40"
      >
        <h2 className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-16">State of the system</h2>
        <div className="font-mono text-sm md:text-base space-y-4 max-w-md">
          <div className="flex justify-between border-b border-border/20 pb-2">
            <span className="text-muted-foreground">Daemon</span>
            <span>running</span>
          </div>
          <div className="flex justify-between border-b border-border/20 pb-2">
            <span className="text-muted-foreground">Memory</span>
            <span>local only</span>
          </div>
          <div className="flex justify-between border-b border-border/20 pb-2">
            <span className="text-muted-foreground">Interventions</span>
            <span>rare</span>
          </div>
          <div className="flex justify-between border-b border-border/20 pb-2">
            <span className="text-muted-foreground">Attention</span>
            <span>conserved</span>
          </div>
        </div>
        <p className="mt-12 text-muted-foreground font-light">
          If this state feels wrong, you can stop everything instantly.
        </p>
      </motion.section>

      {/* What KNOW refuses to do */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-6 py-32 max-w-3xl border-t border-border/40"
      >
        <h2 className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-16">What KNOW refuses to do</h2>
        <ul className="space-y-4 font-light text-lg text-muted-foreground">
          <li>No dashboards</li>
          <li>No daily goals</li>
          <li>No streaks</li>
          <li>No motivational language</li>
          <li>No reminders unless invited</li>
          <li>No syncing by default</li>
          <li>No acting on your behalf</li>
        </ul>
      </motion.section>

      {/* Pricing */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-6 py-32 max-w-3xl border-t border-border/40"
      >
        <h2 className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-16">Pricing</h2>
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
        transition={{ duration: 0.8 }}
        className="container mx-auto px-6 py-32 max-w-3xl border-t border-border/40 mb-24"
      >
        <div className="font-mono text-lg md:text-xl">
          $ brew install know
        </div>
      </motion.section>

    </div>
  );
}