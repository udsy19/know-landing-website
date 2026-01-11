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
        <div className="relative bg-gradient-to-br from-background via-background to-primary/5 border border-border/40 rounded-lg p-8 mb-8 overflow-hidden">
          {/* Animated grid background */}
          <div className="absolute inset-8 opacity-10">
            <svg className="w-full h-full">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary"/>
                </pattern>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="currentColor" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="currentColor" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Ambient glow effect */}
          <motion.div
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none"
          />

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
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="absolute z-20"
              style={{ left: '15%', top: '20%' }}
            >
              <div className="relative">
                {/* Pulsing ring effect */}
                <motion.div
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                  className="absolute inset-0 rounded-full border-2 border-primary"
                />
                <motion.div
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-primary via-primary/80 to-primary/60 border-2 border-background flex items-center justify-center shadow-lg shadow-primary/50"
                >
                  <motion.span
                    animate={{ rotate: -360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="text-xs font-bold text-primary-foreground"
                  >
                    YOU
                  </motion.span>
                </motion.div>
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
                {/* Connection line with animated gradient */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                  <defs>
                    <linearGradient id={`lineGrad-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                      <motion.stop
                        offset="0%"
                        stopColor="currentColor"
                        stopOpacity={person.highlight ? "0.8" : "0.3"}
                        animate={person.highlight ? { stopOpacity: [0.8, 0.4, 0.8] } : {}}
                        transition={person.highlight ? { duration: 2, repeat: Infinity } : {}}
                      />
                      <motion.stop
                        offset="100%"
                        stopColor="currentColor"
                        stopOpacity={person.highlight ? "0.2" : "0.1"}
                      />
                    </linearGradient>
                  </defs>
                  <motion.line
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.1, duration: 0.8, ease: "easeOut" }}
                    x1="15%"
                    y1="20%"
                    x2="38%"
                    y2={`${person.y}%`}
                    stroke={`url(#lineGrad-${i})`}
                    strokeWidth={person.highlight ? "3" : "1.5"}
                    strokeDasharray={person.highlight ? "0" : "4 4"}
                    className={person.highlight ? 'text-primary' : 'text-border'}
                    filter={person.highlight ? "drop-shadow(0 0 4px currentColor)" : "none"}
                  />
                </svg>

                {/* Node */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1, type: "spring", stiffness: 200 }}
                  whileHover={{ scale: 1.1 }}
                  className="absolute z-10"
                  style={{ left: '38%', top: `${person.y}%` }}
                >
                  <div className="relative">
                    {person.highlight && (
                      <motion.div
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.3, 0, 0.3],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeOut",
                          delay: i * 0.3
                        }}
                        className="absolute inset-0 rounded-full bg-primary"
                      />
                    )}
                    <div className={`w-12 h-12 rounded-full ${
                      person.highlight
                        ? 'bg-gradient-to-br from-primary/40 to-primary/20 border-2 border-primary shadow-lg shadow-primary/30'
                        : 'bg-muted border border-border shadow-md'
                    } flex items-center justify-center backdrop-blur-sm transition-all cursor-pointer`}>
                      <span className={`text-xs font-medium ${person.highlight ? 'text-primary font-semibold' : 'text-muted-foreground'}`}>
                        {person.name}
                      </span>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + i * 0.1 }}
                      className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-mono text-muted-foreground whitespace-nowrap"
                    >
                      σ={person.strength}
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            ))}

            {/* 2° Degree Nodes */}
            {[
              { name: 'Marcus', y: 35, highlight: false, strength: 0.71, from: 25 },
              { name: 'Julia', y: 20, highlight: true, strength: 0.88, from: 25 },
            ].map((person, i) => (
              <motion.div key={`deg2-${i}`}>
                {/* Connection line with gradient */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                  <defs>
                    <linearGradient id={`lineGrad2-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                      <motion.stop
                        offset="0%"
                        stopColor="currentColor"
                        stopOpacity={person.highlight ? "0.7" : "0.25"}
                        animate={person.highlight ? { stopOpacity: [0.7, 0.3, 0.7] } : {}}
                        transition={person.highlight ? { duration: 2.5, repeat: Infinity, delay: 0.5 } : {}}
                      />
                      <motion.stop
                        offset="100%"
                        stopColor="currentColor"
                        stopOpacity={person.highlight ? "0.2" : "0.1"}
                      />
                    </linearGradient>
                  </defs>
                  <motion.line
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 + i * 0.1, duration: 0.8, ease: "easeOut" }}
                    x1="38%"
                    y1={`${person.from}%`}
                    x2="61%"
                    y2={`${person.y}%`}
                    stroke={`url(#lineGrad2-${i})`}
                    strokeWidth={person.highlight ? "3" : "1.5"}
                    strokeDasharray={person.highlight ? "0" : "4 4"}
                    className={person.highlight ? 'text-primary' : 'text-border'}
                    filter={person.highlight ? "drop-shadow(0 0 3px currentColor)" : "none"}
                  />
                </svg>

                {/* Node */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.9 + i * 0.1, type: "spring", stiffness: 200 }}
                  whileHover={{ scale: 1.1 }}
                  className="absolute z-10"
                  style={{ left: '61%', top: `${person.y}%` }}
                >
                  <div className="relative">
                    {person.highlight && (
                      <motion.div
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.25, 0, 0.25],
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          ease: "easeOut",
                          delay: 0.5
                        }}
                        className="absolute inset-0 rounded-full bg-primary"
                      />
                    )}
                    <div className={`w-12 h-12 rounded-full ${
                      person.highlight
                        ? 'bg-gradient-to-br from-primary/30 to-primary/15 border-2 border-primary/70 shadow-lg shadow-primary/20'
                        : 'bg-muted border border-border/60 shadow-md'
                    } flex items-center justify-center backdrop-blur-sm transition-all cursor-pointer`}>
                      <span className={`text-xs font-medium ${person.highlight ? 'text-primary font-semibold' : 'text-muted-foreground'}`}>
                        {person.name}
                      </span>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.1 + i * 0.1 }}
                      className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-mono text-muted-foreground whitespace-nowrap"
                    >
                      σ={person.strength}
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            ))}

            {/* 3° Degree Node - Target */}
            <motion.div>
              {/* Connection line with gradient */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                <defs>
                  <linearGradient id="lineGrad3" x1="0%" y1="0%" x2="100%" y2="0%">
                    <motion.stop
                      offset="0%"
                      stopColor="currentColor"
                      stopOpacity="0.7"
                      animate={{ stopOpacity: [0.7, 0.3, 0.7] }}
                      transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                    />
                    <motion.stop
                      offset="100%"
                      stopColor="currentColor"
                      stopOpacity="0.3"
                    />
                  </linearGradient>
                </defs>
                <motion.line
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
                  x1="61%"
                  y1="20%"
                  x2="84%"
                  y2="25%"
                  stroke="url(#lineGrad3)"
                  strokeWidth="3"
                  className="text-primary"
                  filter="drop-shadow(0 0 6px currentColor)"
                />
              </svg>

              {/* Target Node */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.3, type: "spring", stiffness: 150 }}
                whileHover={{ scale: 1.15 }}
                className="absolute z-10"
                style={{ left: '84%', top: '25%' }}
              >
                <div className="relative">
                  {/* Multiple pulsing rings */}
                  <motion.div
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.4, 0, 0.4],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeOut",
                      delay: 0
                    }}
                    className="absolute inset-0 rounded-full bg-primary"
                  />
                  <motion.div
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.4, 0, 0.4],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeOut",
                      delay: 0.5
                    }}
                    className="absolute inset-0 rounded-full bg-primary"
                  />
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/30 via-primary/20 to-primary/10 border-3 border-primary shadow-xl shadow-primary/40 flex items-center justify-center backdrop-blur-sm cursor-pointer transition-all">
                    <span className="text-xs font-bold text-primary">TARGET</span>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 }}
                    className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-mono text-muted-foreground whitespace-nowrap"
                  >
                    σ=0.81
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            {/* Path highlight overlay with animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
              className="absolute top-4 right-4 bg-gradient-to-br from-primary/15 via-primary/10 to-background border-2 border-primary/40 rounded-lg px-4 py-3 text-xs font-mono shadow-lg shadow-primary/20 backdrop-blur-sm"
            >
              <motion.div
                animate={{
                  opacity: [1, 0.7, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-primary font-bold mb-2 flex items-center gap-2"
              >
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="inline-block"
                >
                  ●
                </motion.span>
                [optimal path found]
              </motion.div>
              <div className="text-muted-foreground space-y-1">
                <div className="flex justify-between gap-4">
                  <span>depth:</span>
                  <span className="text-primary font-medium">3</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span>strength:</span>
                  <span className="text-primary font-medium">0.87</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span>hops:</span>
                  <span className="text-primary font-medium">3</span>
                </div>
              </div>
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