import { motion } from "framer-motion";

const BlinkingCursor = () => (
  <motion.span
    animate={{ opacity: [0, 1, 0] }}
    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    className="inline-block w-2 h-5 bg-primary ml-1 align-middle"
  />
);

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
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-foreground selection:text-background flex flex-col items-center overflow-x-hidden">
      
      {/* Hero Section - Progressive Disclosure */}
      <section className="container mx-auto px-6 pt-32 pb-24 max-w-3xl min-h-[50vh] flex flex-col justify-center">
        <motion.h1 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-light leading-[1.1] mb-8 tracking-tighter"
        >
          Most things don't fail dramatically.<br />They fade.
        </motion.h1>
        
        <div className="space-y-1">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-xl md:text-2xl text-muted-foreground font-light max-w-xl leading-relaxed tracking-tight"
          >
            KNOW runs quietly on your machine.
          </motion.p>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.6 }}
            className="text-xl md:text-2xl text-muted-foreground font-light max-w-xl leading-relaxed tracking-tight"
          >
            It notices what keeps slipping.
          </motion.p>
        </div>
      </section>

      {/* Live Terminal Transcript */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-6 py-24 max-w-3xl border-t border-border/40"
      >
        <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-12">A real session, over time</h2>
        <div className="font-mono text-sm md:text-base space-y-6 text-foreground/90 pl-4 border-l border-border/20">
          <div>
            <p className="text-muted-foreground select-none mb-1">$ know</p>
            <p>know: I'm running locally.</p>
          </div>
          
          <div className="text-muted-foreground/40 py-2 text-xs uppercase tracking-widest">
            [ 3 days pass ]
          </div>

          <div>
            <p>know: You've been starting this late all week.</p>
          </div>

          <div className="text-muted-foreground/40 py-2 text-xs uppercase tracking-widest">
            [ no response ]
          </div>
          
          <div className="text-muted-foreground/40 py-2 text-xs uppercase tracking-widest">
            [ 2 days pass ]
          </div>

          <div>
            <p>know: Do you want help catching this earlier?</p>
          </div>

          <div>
            <p className="text-muted-foreground select-none mb-1">$ yes</p>
            <p>know: Okay.<BlinkingCursor /></p>
          </div>
        </div>
      </motion.section>

      {/* State of the System */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-6 py-24 max-w-3xl border-t border-border/40"
      >
        <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-12">State of the system</h2>
        <div className="font-mono text-sm md:text-base w-full max-w-md bg-muted/30 p-6 rounded-sm border border-border/20">
          <div className="grid grid-cols-2 gap-y-4">
            <span className="text-muted-foreground">Daemon</span>
            <StatusDot status="running" />
            
            <span className="text-muted-foreground">Memory</span>
            <span>local only</span>
            
            <span className="text-muted-foreground">Interventions</span>
            <span>rare</span>
            
            <span className="text-muted-foreground">Attention</span>
            <span>conserved</span>
          </div>
        </div>
        <p className="mt-8 text-muted-foreground font-light text-sm">
          If this state feels wrong, you can stop everything instantly.
        </p>
      </motion.section>

      {/* What KNOW refuses to do */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-6 py-24 max-w-3xl border-t border-border/40"
      >
        <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-12">What KNOW refuses to do</h2>
        <ul className="space-y-3 font-light text-lg md:text-xl text-muted-foreground">
          <li className="flex items-center gap-3">
            <span className="w-1 h-1 bg-muted-foreground/50 rounded-full" />
            No dashboards
          </li>
          <li className="flex items-center gap-3">
            <span className="w-1 h-1 bg-muted-foreground/50 rounded-full" />
            No daily goals
          </li>
          <li className="flex items-center gap-3">
            <span className="w-1 h-1 bg-muted-foreground/50 rounded-full" />
            No streaks
          </li>
          <li className="flex items-center gap-3">
            <span className="w-1 h-1 bg-muted-foreground/50 rounded-full" />
            No motivational language
          </li>
          <li className="flex items-center gap-3">
            <span className="w-1 h-1 bg-muted-foreground/50 rounded-full" />
            No reminders unless invited
          </li>
          <li className="flex items-center gap-3">
            <span className="w-1 h-1 bg-muted-foreground/50 rounded-full" />
            No syncing by default
          </li>
          <li className="flex items-center gap-3">
            <span className="w-1 h-1 bg-muted-foreground/50 rounded-full" />
            No acting on your behalf
          </li>
        </ul>
      </motion.section>

      {/* Pricing */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-6 py-24 max-w-3xl border-t border-border/40"
      >
        <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-12">Pricing</h2>
        <div className="space-y-2">
          <p className="text-4xl md:text-5xl font-light tracking-tight">$24 / month</p>
          <p className="text-muted-foreground font-light text-lg">KNOW only works if it runs continuously and remembers.</p>
        </div>
      </motion.section>

      {/* Install */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-6 py-32 max-w-3xl border-t border-border/40 mb-12"
      >
        <div className="font-mono text-lg md:text-xl bg-foreground text-background inline-block px-4 py-2">
          $ brew install know
        </div>
      </motion.section>

    </div>
  );
}