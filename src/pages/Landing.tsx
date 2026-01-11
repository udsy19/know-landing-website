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
            [know] maps your real relationships.
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

      {/* How It Works - Technical Network Graph */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -200px 0px" }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-6 pt-12 pb-24 max-w-7xl border-t border-border/40"
      >
        <div className="mb-16">
          <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-4 text-center">Network graph analysis</h2>
          <p className="text-center text-muted-foreground text-sm font-mono">Real-time pathfinding through 3-4 degree connections</p>
        </div>

        {/* Technical Network Graph with Axes */}
        <div className="relative bg-background border border-border/40 rounded-lg p-8 mb-8">
          {/* Grid background */}
          <div className="absolute inset-8 opacity-20">
            <svg className="w-full h-full">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-border"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <div className="relative h-[600px]">
            {/* Y-axis label */}
            <div className="absolute -left-2 top-1/2 -translate-y-1/2 -rotate-90 text-xs font-mono text-muted-foreground">
              connection strength
            </div>

            {/* X-axis label */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-8 text-xs font-mono text-muted-foreground">
              degree of separation
            </div>

            {/* Degree markers on X-axis */}
            <div className="absolute bottom-4 left-[15%] text-xs font-mono text-muted-foreground">0°</div>
            <div className="absolute bottom-4 left-[38%] text-xs font-mono text-muted-foreground">1°</div>
            <div className="absolute bottom-4 left-[61%] text-xs font-mono text-muted-foreground">2°</div>
            <div className="absolute bottom-4 left-[84%] text-xs font-mono text-muted-foreground">3°</div>

            {/* Connection strength markers on Y-axis */}
            <div className="absolute left-4 top-[15%] text-xs font-mono text-muted-foreground">high</div>
            <div className="absolute left-4 top-[45%] text-xs font-mono text-muted-foreground">med</div>
            <div className="absolute left-4 top-[75%] text-xs font-mono text-muted-foreground">low</div>

            {/* Vertical degree separator lines */}
            {[15, 38, 61, 84].map((left, i) => (
              <motion.div
                key={i}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className="absolute w-px bg-border/30 origin-bottom"
                style={{ left: `${left}%`, top: '8%', bottom: '8%' }}
              />
            ))}

            {/* Center Node - 0° (You) */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: "spring" }}
              className="absolute z-20"
              style={{ left: '15%', top: '20%' }}
            >
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/60 border-2 border-background flex items-center justify-center shadow-lg">
                  <span className="text-xs font-bold text-primary-foreground">YOU</span>
                </div>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-mono text-muted-foreground whitespace-nowrap">
                  node_0
                </div>
              </div>
            </motion.div>

            {/* 1° Degree Nodes */}
            {[
              { name: 'Sarah', y: 25, highlight: true, strength: 0.92 },
              { name: 'Alex', y: 50, highlight: false, strength: 0.76 },
              { name: 'Emma', y: 65, highlight: false, strength: 0.64 },
            ].map((person, i) => (
              <motion.div key={i}>
                {/* Connection line */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                  <motion.line
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.6 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
                    x1="15%"
                    y1="20%"
                    x2="38%"
                    y2={`${person.y}%`}
                    stroke="currentColor"
                    strokeWidth={person.highlight ? "2" : "1"}
                    strokeDasharray={person.highlight ? "0" : "4 4"}
                    className={person.highlight ? 'text-primary/60' : 'text-border/50'}
                  />
                </svg>

                {/* Node */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
                  className="absolute z-10"
                  style={{ left: '38%', top: `${person.y}%` }}
                >
                  <div className="relative">
                    <div className={`w-12 h-12 rounded-full ${
                      person.highlight
                        ? 'bg-primary/30 border-2 border-primary'
                        : 'bg-muted border border-border'
                    } flex items-center justify-center shadow-md`}>
                      <span className={`text-xs font-medium ${person.highlight ? 'text-primary' : 'text-muted-foreground'}`}>
                        {person.name}
                      </span>
                    </div>
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-mono text-muted-foreground whitespace-nowrap">
                      σ={person.strength}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}

            {/* 2° Degree Nodes */}
            {[
              { name: 'Marcus', y: 35, highlight: false, strength: 0.71, from: 25 },
              { name: 'Julia', y: 20, highlight: true, strength: 0.88, from: 25 },
            ].map((person, i) => (
              <motion.div key={i}>
                {/* Connection line */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                  <motion.line
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.6 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 + i * 0.1, duration: 0.6 }}
                    x1="38%"
                    y1={`${person.from}%`}
                    x2="61%"
                    y2={`${person.y}%`}
                    stroke="currentColor"
                    strokeWidth={person.highlight ? "2" : "1"}
                    strokeDasharray={person.highlight ? "0" : "4 4"}
                    className={person.highlight ? 'text-primary/60' : 'text-border/50'}
                  />
                </svg>

                {/* Node */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.9 + i * 0.1, type: "spring" }}
                  className="absolute z-10"
                  style={{ left: '61%', top: `${person.y}%` }}
                >
                  <div className="relative">
                    <div className={`w-12 h-12 rounded-full ${
                      person.highlight
                        ? 'bg-primary/20 border-2 border-primary/70'
                        : 'bg-muted border border-border/60'
                    } flex items-center justify-center shadow-md`}>
                      <span className={`text-xs font-medium ${person.highlight ? 'text-primary' : 'text-muted-foreground'}`}>
                        {person.name}
                      </span>
                    </div>
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-mono text-muted-foreground whitespace-nowrap">
                      σ={person.strength}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}

            {/* 3° Degree Node - Target */}
            <motion.div>
              {/* Connection line */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                <motion.line
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.6 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                  x1="61%"
                  y1="20%"
                  x2="84%"
                  y2="25%"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-primary/60"
                />
              </svg>

              {/* Target Node */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.3, type: "spring" }}
                className="absolute z-10"
                style={{ left: '84%', top: '25%' }}
              >
                <div className="relative">
                  <div className="w-14 h-14 rounded-full bg-primary/10 border-2 border-primary/50 flex items-center justify-center shadow-lg">
                    <span className="text-xs font-bold text-primary">TARGET</span>
                  </div>
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-mono text-muted-foreground whitespace-nowrap">
                    σ=0.81
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Path highlight overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.5 }}
              className="absolute top-4 right-4 bg-primary/10 border border-primary/30 rounded px-3 py-2 text-xs font-mono"
            >
              <div className="text-primary font-semibold mb-1">[optimal path found]</div>
              <div className="text-muted-foreground">depth: 3 | strength: 0.87 | hops: 3</div>
            </motion.div>
          </div>
        </div>

        {/* Chat Interface Below Graph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-muted/30 border border-border/40 rounded-lg p-6 font-mono text-sm space-y-4">
            <div className="flex gap-3">
              <span className="text-muted-foreground shrink-0">user:</span>
              <span>find intro path to acme ventures partner</span>
            </div>

            <div className="flex gap-3 items-start">
              <span className="text-primary shrink-0">[know]</span>
              <div className="space-y-2 flex-1">
                <div className="text-muted-foreground">analyzing network graph...</div>
                <div className="text-muted-foreground">scanning 247 connections across 3 degrees</div>
                <div className="mt-3 p-3 bg-background border border-primary/20 rounded">
                  <div className="text-primary mb-2">path identified:</div>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">0°</span>
                      <span>you</span>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <span className="text-muted-foreground">→</span>
                      <span>1° sarah_chen (σ=0.92, last_contact=21d)</span>
                    </div>
                    <div className="flex items-center gap-2 ml-8">
                      <span className="text-muted-foreground">→</span>
                      <span>2° julia_park (σ=0.88, freq=4/mo)</span>
                    </div>
                    <div className="flex items-center gap-2 ml-12">
                      <span className="text-muted-foreground">→</span>
                      <span className="text-primary">3° target: partner@acme_ventures</span>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-border/40 text-xs text-muted-foreground">
                    path_confidence: 0.87 | estimated_response_time: &lt;48h
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.8 }}
          className="mt-12 text-center text-muted-foreground font-mono text-sm"
        >
          pathfinding algorithm analyzes connection strength, recency, and interaction frequency
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
        <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-12">what [know] maps</h2>
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

      {/* what [know] doesn't do */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -200px 0px" }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-6 py-24 max-w-3xl border-t border-border/40"
      >
        <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-12">what [know] doesn't do</h2>
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