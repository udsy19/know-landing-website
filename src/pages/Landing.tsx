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

      {/* How It Works - Network Visualization */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -200px 0px" }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-6 pt-12 pb-24 max-w-6xl border-t border-border/40"
      >
        <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-16 text-center">Finding warm intros</h2>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Network Graph Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Network Graph */}
            <div className="relative h-[500px] flex items-center justify-center bg-muted/20 rounded-lg border border-border/40 p-8">
              {/* Center - You */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, type: "spring" }}
                className="absolute z-20 w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/60 border-2 border-background flex items-center justify-center shadow-lg"
                style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
              >
                <span className="text-xs font-bold text-primary-foreground">YOU</span>
              </motion.div>

              {/* 1st Degree Connections */}
              {[
                { angle: 0, name: 'Sarah', delay: 0.3, highlight: true },
                { angle: 90, name: 'Alex', delay: 0.35, highlight: false },
                { angle: 180, name: 'Emma', delay: 0.4, highlight: false },
                { angle: 270, name: 'Mike', delay: 0.45, highlight: false },
              ].map((person, i) => {
                const radius = 120;
                const x = 50 + radius * Math.cos((person.angle * Math.PI) / 180);
                const y = 50 + radius * Math.sin((person.angle * Math.PI) / 180);

                return (
                  <motion.div key={i}>
                    {/* Connection Line */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: person.delay, duration: 0.4 }}
                      className={`absolute origin-center h-0.5 ${person.highlight ? 'bg-primary/60' : 'bg-border/40'}`}
                      style={{
                        left: '50%',
                        top: '50%',
                        width: `${radius}px`,
                        transform: `rotate(${person.angle}deg)`,
                      }}
                    />
                    {/* Person Node */}
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: person.delay + 0.2, type: "spring" }}
                      className={`absolute w-14 h-14 rounded-full ${
                        person.highlight
                          ? 'bg-primary/30 border-2 border-primary'
                          : 'bg-muted border-2 border-border'
                      } flex items-center justify-center shadow-md`}
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                    >
                      <span className={`text-xs font-medium ${person.highlight ? 'text-primary' : 'text-muted-foreground'}`}>
                        {person.name}
                      </span>
                    </motion.div>
                  </motion.div>
                );
              })}

              {/* 2nd Degree - Connected to Sarah */}
              {[
                { angle: 30, name: 'Julia', delay: 0.6, highlight: true },
                { angle: -30, name: 'Tom', delay: 0.65, highlight: false },
              ].map((person, i) => {
                const innerRadius = 120;
                const outerRadius = 100;
                const x1 = 50 + innerRadius * Math.cos(0);
                const y1 = 50 + innerRadius * Math.sin(0);
                const x2 = x1 + outerRadius * Math.cos((person.angle * Math.PI) / 180);
                const y2 = y1 + outerRadius * Math.sin((person.angle * Math.PI) / 180);

                return (
                  <motion.div key={i}>
                    {/* Connection Line to Sarah */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                      <motion.line
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: person.delay, duration: 0.4 }}
                        x1={`${x1}%`}
                        y1={`${y1}%`}
                        x2={`${x2}%`}
                        y2={`${y2}%`}
                        stroke="currentColor"
                        strokeWidth="2"
                        className={person.highlight ? 'text-primary/60' : 'text-border/40'}
                      />
                    </svg>
                    {/* Person Node */}
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: person.delay + 0.2, type: "spring" }}
                      className={`absolute w-12 h-12 rounded-full ${
                        person.highlight
                          ? 'bg-primary/20 border-2 border-primary/70'
                          : 'bg-muted border-2 border-border/60'
                      } flex items-center justify-center shadow-md`}
                      style={{
                        left: `${x2}%`,
                        top: `${y2}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                    >
                      <span className={`text-xs font-medium ${person.highlight ? 'text-primary' : 'text-muted-foreground'}`}>
                        {person.name}
                      </span>
                    </motion.div>
                  </motion.div>
                );
              })}

              {/* Degree Labels */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="absolute bottom-4 left-4 space-y-2 text-xs font-mono"
              >
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                  <span className="text-muted-foreground">Highlighted Path</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-muted border-2 border-border"></div>
                  <span className="text-muted-foreground">Other Connections</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Chat Interface */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Chat Message */}
            <div className="bg-background border border-border/40 rounded-lg p-4 shadow-sm">
              <p className="text-sm text-muted-foreground mb-2">You</p>
              <p className="text-lg">Who can intro me to Acme Ventures?</p>
            </div>

            {/* KNOW Response */}
            <div className="bg-muted/30 border border-primary/20 rounded-lg p-5 shadow-sm space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                <p className="text-sm font-medium">KNOW</p>
              </div>

              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">Found 1 warm intro path:</p>

                <div className="flex items-center gap-2 flex-wrap">
                  <div className="px-3 py-1.5 bg-primary/10 border border-primary/30 rounded-md text-sm font-medium">
                    You
                  </div>
                  <div className="text-primary">→</div>
                  <div className="px-3 py-1.5 bg-primary/10 border border-primary/30 rounded-md text-sm font-medium">
                    Sarah Chen
                  </div>
                  <div className="text-primary">→</div>
                  <div className="px-3 py-1.5 bg-primary/10 border border-primary/30 rounded-md text-sm font-medium">
                    Julia Park
                  </div>
                </div>

                <div className="pt-3 border-t border-border/40 space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">Sarah Chen: Last spoke 3 weeks ago, strong connection</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">Julia Park: Partner at Acme Ventures</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">Sarah emailed Julia 4x last month</span>
                  </div>
                </div>

                <div className="pt-3">
                  <button className="text-sm px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity">
                    Draft intro request
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9 }}
          className="mt-16 text-center text-muted-foreground font-light text-lg max-w-2xl mx-auto"
        >
          Every connection in your network. Every path mapped. Every relationship remembered.
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