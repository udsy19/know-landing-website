import { motion, AnimatePresence, useInView } from "framer-motion";
import { useState, useEffect, useRef, FormEvent } from "react";

export default function Landing() {
  // Demo animation phases - like a real product demo
  type DemoPhase = "idle" | "typing" | "searching" | "paths" | "selected" | "sending" | "complete";
  const [demoPhase, setDemoPhase] = useState<DemoPhase>("idle");
  const [searchText, setSearchText] = useState("");
  const [hasStartedDemo, setHasStartedDemo] = useState(false);
  const [selectedPath, setSelectedPath] = useState<number | null>(null);

  // Ref for demo section
  const demoSectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(demoSectionRef, { once: false, amount: 0.5 });

  // Waitlist modal state
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [waitlistStep, setWaitlistStep] = useState(0);
  const [waitlistForm, setWaitlistForm] = useState({
    name: "",
    email: "",
    company: "",
    linkedin: "",
    reason: "",
  });
  const [waitlistStatus, setWaitlistStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [waitlistMessage, setWaitlistMessage] = useState("");

  const waitlistSteps = [
    { field: "name", label: "What's your name?", placeholder: "Jane Smith", type: "text", required: true },
    { field: "email", label: "What's your email?", placeholder: "jane@company.com", type: "email", required: true },
    { field: "company", label: "Where do you work?", placeholder: "Acme Inc", type: "text", required: true },
    { field: "linkedin", label: "Your LinkedIn?", placeholder: "linkedin.com/in/yourname", type: "text", required: false },
    { field: "reason", label: "Why do you want to try [know]?", placeholder: "I want to...", type: "textarea", required: true },
  ];

  const updateWaitlistForm = (field: string, value: string) => {
    setWaitlistForm(prev => ({ ...prev, [field]: value }));
    if (waitlistStatus === "error") setWaitlistStatus("idle");
  };

  const handleWaitlistNext = () => {
    const currentStep = waitlistSteps[waitlistStep];
    const value = waitlistForm[currentStep.field as keyof typeof waitlistForm];

    if (currentStep.required && !value.trim()) {
      setWaitlistStatus("error");
      setWaitlistMessage("Please fill this in");
      return;
    }

    setWaitlistStatus("idle");
    if (waitlistStep < waitlistSteps.length - 1) {
      setWaitlistStep(prev => prev + 1);
    } else {
      handleWaitlistSubmit();
    }
  };

  const handleWaitlistKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && waitlistSteps[waitlistStep].type !== "textarea") {
      e.preventDefault();
      handleWaitlistNext();
    }
  };

  const handleWaitlistSubmit = async () => {
    setWaitlistStatus("loading");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(waitlistForm),
      });

      const data = await response.json();

      if (response.ok) {
        setWaitlistStatus("success");
        setWaitlistMessage(data.message || "You're on the list!");
      } else {
        setWaitlistStatus("error");
        setWaitlistMessage(data.error || "Something went wrong");
      }
    } catch {
      setWaitlistStatus("error");
      setWaitlistMessage("Network error. Please try again.");
    }
  };

  const closeWaitlist = () => {
    if (waitlistStatus === "loading") return;
    setIsWaitlistOpen(false);
    setTimeout(() => {
      setWaitlistStep(0);
      setWaitlistStatus("idle");
      setWaitlistForm({ name: "", email: "", company: "", linkedin: "", reason: "" });
    }, 300);
  };

  // Handle escape key to close waitlist
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isWaitlistOpen) {
        closeWaitlist();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isWaitlistOpen, waitlistStatus]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isWaitlistOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isWaitlistOpen]);

  const searchQuery = "david sequoia capital";

  // Connection paths data - showing the algorithm's evaluation
  const connectionPaths = [
    { via: "Sarah Chen", viaInitials: "SC", strength: 0.92, relation: "47 emails, 3 meetings", degree: "1st" },
    { via: "Mike Ross", viaInitials: "MR", strength: 0.71, relation: "12 emails, ex-colleague", degree: "1st" },
    { via: "Lisa Wang", viaInitials: "LW", strength: 0.45, relation: "LinkedIn, 2nd degree", degree: "2nd" },
  ];

  // Network graph node positions (percentage-based for responsiveness)
  const networkNodes = {
    you: { x: 18, y: 50, label: "You", initials: "You" },
    sarah: { x: 45, y: 20, label: "Sarah Chen", initials: "SC" },
    mike: { x: 45, y: 50, label: "Mike Ross", initials: "MR" },
    lisa: { x: 45, y: 80, label: "Lisa Wang", initials: "LW" },
    david: { x: 78, y: 50, label: "David Park", initials: "DP" },
  };

  // Start demo when section is in view
  useEffect(() => {
    if (isInView && !hasStartedDemo && demoPhase === "idle") {
      const timer = setTimeout(() => {
        setHasStartedDemo(true);
        setDemoPhase("typing");
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isInView, hasStartedDemo, demoPhase]);

  // Demo sequence controller
  useEffect(() => {
    if (demoPhase === "typing" && searchText.length < searchQuery.length) {
      const timer = setTimeout(() => {
        setSearchText(searchQuery.slice(0, searchText.length + 1));
      }, 80);
      return () => clearTimeout(timer);
    }
    if (demoPhase === "typing" && searchText.length >= searchQuery.length) {
      const timer = setTimeout(() => setDemoPhase("searching"), 500);
      return () => clearTimeout(timer);
    }
    if (demoPhase === "searching") {
      const timer = setTimeout(() => setDemoPhase("paths"), 1000);
      return () => clearTimeout(timer);
    }
    if (demoPhase === "paths") {
      const timer = setTimeout(() => {
        setSelectedPath(0); // Select strongest path
        setDemoPhase("selected");
      }, 2000);
      return () => clearTimeout(timer);
    }
    if (demoPhase === "selected") {
      const timer = setTimeout(() => setDemoPhase("sending"), 1500);
      return () => clearTimeout(timer);
    }
    if (demoPhase === "sending") {
      const timer = setTimeout(() => setDemoPhase("complete"), 1500);
      return () => clearTimeout(timer);
    }
    if (demoPhase === "complete") {
      const timer = setTimeout(() => {
        setSearchText("");
        setSelectedPath(null);
        setDemoPhase("idle");
        setHasStartedDemo(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [demoPhase, searchText, searchQuery]);

  return (
    <div className="crt min-h-screen bg-background text-foreground font-sans selection:bg-foreground selection:text-background flex flex-col items-center overflow-x-hidden">

      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-32 pb-16 max-w-3xl min-h-[50vh] flex flex-col justify-center">
        <motion.h1
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-light leading-[1.1] mb-8 tracking-tighter text-glow"
        >
          Know anyone,<br />before you meet them.
        </motion.h1>

        <div className="space-y-2">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-xl md:text-2xl text-muted-foreground font-light max-w-xl leading-relaxed tracking-tight"
          >
            [know] finds the warmest path to anyone in your network.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="text-xl md:text-2xl text-muted-foreground font-light max-w-xl leading-relaxed tracking-tight"
          >
            And runs deep research on them before you reach out.
          </motion.p>
        </div>
      </section>

      {/* Feature 1: Network Search */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-6 py-24 max-w-6xl border-t border-border/40"
      >
        <div className="mb-12">
          <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-4 text-center">Network Search</h2>
          <p className="text-center text-muted-foreground text-sm font-mono">find anyone through your connections</p>
        </div>

        {/* Search Interface Demo */}
        <div className="bg-muted/20 border border-border/40 rounded-lg overflow-hidden">
          {/* Search bar */}
          <div className="border-b border-border/40 p-4">
            <div className="flex items-center gap-3 bg-background border border-border rounded-lg px-4 py-3">
              <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="text-foreground">VCs actively investing in AI wearables</span>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity, delay: 2 }}
                className="w-0.5 h-5 bg-primary ml-1"
              />
            </div>
          </div>

          <div className="flex">
            {/* Results List */}
            <div className="flex-1 border-r border-border/40">
              <div className="p-4 border-b border-border/40 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-primary text-sm">Found 12 people</span>
                  <span className="text-muted-foreground text-xs font-mono">· 847ms</span>
                </div>
              </div>

              {/* Result Items */}
              <div className="divide-y divide-border/40">
                {[
                  {
                    name: "Sarah Chen",
                    title: "Partner at Horizon Ventures",
                    company: "Horizon Ventures",
                    tags: ["AI/ML", "Hardware", "Series A"],
                    degree: 1,
                    strength: 0.92,
                    match: "Led $40M round in AI wearables startup. Active in hardware + AI intersection.",
                    via: null
                  },
                  {
                    name: "Marcus Johnson",
                    title: "Principal at a16z",
                    company: "Andreessen Horowitz",
                    tags: ["Robotics", "AI", "Deep Tech"],
                    degree: 2,
                    strength: 0.78,
                    match: "Invested in 3 AI wearable companies in 2024. Actively sourcing deals.",
                    via: "Sarah Chen"
                  },
                  {
                    name: "Julia Park",
                    title: "GP at Construct Capital",
                    company: "Construct Capital",
                    tags: ["Hardware", "Robotics", "Seed"],
                    degree: 2,
                    strength: 0.71,
                    match: "Focus on physical AI products. Board member at two wearable companies.",
                    via: "Alex Turner"
                  },
                  {
                    name: "David Kim",
                    title: "Partner at First Round",
                    company: "First Round Capital",
                    tags: ["AI", "Consumer", "Seed"],
                    degree: 3,
                    strength: 0.54,
                    match: "Recently announced focus on AI-first hardware companies.",
                    via: "Julia Park → Alex Turner"
                  },
                ].map((person, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className={`p-4 hover:bg-muted/30 transition-colors ${i === 0 ? 'bg-muted/20' : ''}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-medium text-primary shrink-0">
                        {person.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">{person.name}</span>
                          <span className="text-xs text-primary bg-primary/10 px-1.5 py-0.5 rounded font-mono">
                            {person.company}
                          </span>
                          {/* Degree dots */}
                          <div className="flex gap-0.5 ml-auto">
                            {[...Array(3)].map((_, d) => (
                              <div
                                key={d}
                                className={`w-1.5 h-1.5 rounded-full ${d < person.degree ? 'bg-primary' : 'bg-border'}`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{person.title}</p>
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {person.tags.map((tag, t) => (
                            <span key={t} className="text-[10px] px-1.5 py-0.5 bg-muted text-muted-foreground rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          <span className="text-foreground">·</span> {person.match}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Detail Panel */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="w-80 p-5 hidden lg:block"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center text-lg font-medium text-primary">
                  SC
                </div>
                <div>
                  <h3 className="font-medium">Sarah Chen</h3>
                  <p className="text-xs text-primary">Horizon Ventures</p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-4">Partner at Horizon Ventures</p>

              <div className="space-y-4 text-xs">
                <div>
                  <h4 className="font-mono uppercase tracking-wider text-muted-foreground mb-2">Connection Path</h4>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-primary font-medium">You</span>
                    <span className="text-muted-foreground">→</span>
                    <span>Sarah Chen</span>
                  </div>
                  <p className="text-muted-foreground mt-1">Direct connection · Last email 2 weeks ago</p>
                </div>

                <div>
                  <h4 className="font-mono uppercase tracking-wider text-muted-foreground mb-2">Relationship Strength</h4>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: '92%' }} />
                    </div>
                    <span className="text-primary font-mono">0.92</span>
                  </div>
                  <p className="text-muted-foreground mt-1">47 emails · 3 meetings · 12 LinkedIn interactions</p>
                </div>

                <div>
                  <h4 className="font-mono uppercase tracking-wider text-muted-foreground mb-2">Why They Match</h4>
                  <ul className="space-y-1.5 text-muted-foreground">
                    <li className="flex gap-2">
                      <span className="text-primary">✓</span>
                      <span>Led $40M round in AI wearables startup (2024)</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary">✓</span>
                      <span>Board member at Neuralink competitor</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary">✓</span>
                      <span>Spoke at CES on "Future of Wearable AI"</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-6 text-center text-muted-foreground text-sm"
        >
          Search by role, expertise, company, or any criteria. We find who matches and how to reach them.
        </motion.p>
      </motion.section>

      {/* Product Demo */}
      <motion.section
        ref={demoSectionRef}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-6 py-24 max-w-4xl border-t border-border/40"
      >
        <div className="mb-10">
          <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-4 text-center">See it in action</h2>
        </div>

        {/* Mini App Window */}
        <div className="border border-border/50 rounded-xl overflow-hidden bg-background shadow-2xl">
          {/* Window Header */}
          <div className="px-4 py-3 border-b border-border/50 flex items-center gap-3 bg-muted/30">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-border" />
              <div className="w-3 h-3 rounded-full bg-border" />
              <div className="w-3 h-3 rounded-full bg-border" />
            </div>
            <div className="flex-1 flex justify-center">
              <span className="text-xs text-muted-foreground font-mono">[know]</span>
            </div>
          </div>

          {/* App Content */}
          <div className="p-6">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="flex items-center gap-3 px-4 py-3 border border-border rounded-lg bg-muted/20">
                <svg className="w-4 h-4 text-muted-foreground shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="text-sm text-foreground">
                  {searchText}
                  {(demoPhase === "idle" || demoPhase === "typing") && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      className="inline-block w-0.5 h-4 bg-primary ml-0.5 align-middle"
                    />
                  )}
                </span>
                {demoPhase === "searching" && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="ml-auto w-4 h-4 border-2 border-primary border-t-transparent rounded-full"
                  />
                )}
              </div>
            </div>

            {/* Network Graph + Path List */}
            <div className="min-h-[400px]">
              <AnimatePresence mode="wait">
                {/* Network View */}
                {(demoPhase === "paths" || demoPhase === "selected" || demoPhase === "sending" || demoPhase === "complete") && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col lg:flex-row gap-6"
                  >
                    {/* Network Graph */}
                    <div className="flex-1 relative rounded-xl border border-border/50 bg-muted/30" style={{ minHeight: 320, padding: '24px' }}>
                      {/* Grid background */}
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage: `
                            linear-gradient(to right, hsl(var(--border) / 0.3) 1px, transparent 1px),
                            linear-gradient(to bottom, hsl(var(--border) / 0.3) 1px, transparent 1px)
                          `,
                          backgroundSize: '32px 32px'
                        }}
                      />

                      {/* SVG for connection lines */}
                      <svg className="absolute inset-6" style={{ width: 'calc(100% - 48px)', height: 'calc(100% - 48px)' }} preserveAspectRatio="none">
                        {/* You to Sarah */}
                        <motion.line
                          x1={`${networkNodes.you.x}%`} y1={`${networkNodes.you.y}%`}
                          x2={`${networkNodes.sarah.x}%`} y2={`${networkNodes.sarah.y}%`}
                          stroke={selectedPath === 0 ? "hsl(var(--primary))" : "hsl(var(--border))"}
                          strokeWidth={selectedPath === 0 ? 2 : 1}
                          strokeOpacity={selectedPath === 0 ? 1 : 0.5}
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.4, delay: 0.1 }}
                        />
                        {/* You to Mike */}
                        <motion.line
                          x1={`${networkNodes.you.x}%`} y1={`${networkNodes.you.y}%`}
                          x2={`${networkNodes.mike.x}%`} y2={`${networkNodes.mike.y}%`}
                          stroke={selectedPath === 1 ? "hsl(var(--primary))" : "hsl(var(--border))"}
                          strokeWidth={selectedPath === 1 ? 2 : 1}
                          strokeOpacity={selectedPath === 1 ? 1 : 0.5}
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.4, delay: 0.15 }}
                        />
                        {/* You to Lisa */}
                        <motion.line
                          x1={`${networkNodes.you.x}%`} y1={`${networkNodes.you.y}%`}
                          x2={`${networkNodes.lisa.x}%`} y2={`${networkNodes.lisa.y}%`}
                          stroke={selectedPath === 2 ? "hsl(var(--primary))" : "hsl(var(--border))"}
                          strokeWidth={selectedPath === 2 ? 2 : 1}
                          strokeOpacity={selectedPath === 2 ? 1 : 0.5}
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.4, delay: 0.2 }}
                        />
                        {/* Sarah to David */}
                        <motion.line
                          x1={`${networkNodes.sarah.x}%`} y1={`${networkNodes.sarah.y}%`}
                          x2={`${networkNodes.david.x}%`} y2={`${networkNodes.david.y}%`}
                          stroke={selectedPath === 0 ? "hsl(var(--primary))" : "hsl(var(--border))"}
                          strokeWidth={selectedPath === 0 ? 2 : 1}
                          strokeOpacity={selectedPath === 0 ? 1 : 0.5}
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.4, delay: 0.25 }}
                        />
                        {/* Mike to David */}
                        <motion.line
                          x1={`${networkNodes.mike.x}%`} y1={`${networkNodes.mike.y}%`}
                          x2={`${networkNodes.david.x}%`} y2={`${networkNodes.david.y}%`}
                          stroke={selectedPath === 1 ? "hsl(var(--primary))" : "hsl(var(--border))"}
                          strokeWidth={selectedPath === 1 ? 2 : 1}
                          strokeOpacity={selectedPath === 1 ? 1 : 0.5}
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.4, delay: 0.3 }}
                        />
                        {/* Lisa to David */}
                        <motion.line
                          x1={`${networkNodes.lisa.x}%`} y1={`${networkNodes.lisa.y}%`}
                          x2={`${networkNodes.david.x}%`} y2={`${networkNodes.david.y}%`}
                          stroke={selectedPath === 2 ? "hsl(var(--primary))" : "hsl(var(--border))"}
                          strokeWidth={selectedPath === 2 ? 2 : 1}
                          strokeOpacity={selectedPath === 2 ? 1 : 0.5}
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.4, delay: 0.35 }}
                        />
                      </svg>

                      {/* Nodes overlay */}
                      <div className="absolute inset-6 pointer-events-none">
                        {/* You node */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
                          className="absolute flex flex-col items-center"
                          style={{ left: `${networkNodes.you.x}%`, top: `${networkNodes.you.y}%`, transform: 'translate(-50%, -50%)' }}
                        >
                          <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xs font-semibold shadow-md transition-all duration-300 ${
                            demoPhase === "complete"
                              ? "bg-emerald-200 text-emerald-700 shadow-emerald-200/50"
                              : "bg-foreground text-background shadow-foreground/20"
                          }`}>
                            You
                          </div>
                        </motion.div>

                        {/* Sarah node */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.15, duration: 0.4, ease: "easeOut" }}
                          className="absolute flex flex-col items-center"
                          style={{ left: `${networkNodes.sarah.x}%`, top: `${networkNodes.sarah.y}%`, transform: 'translate(-50%, -50%)' }}
                        >
                          <div className={`w-11 h-11 rounded-full flex items-center justify-center text-[11px] font-medium shadow-sm transition-all duration-300 ${
                            selectedPath === 0
                              ? "bg-primary text-primary-foreground shadow-primary/30"
                              : "bg-background border border-border text-muted-foreground"
                          }`}>
                            SC
                          </div>
                          <span className={`text-[10px] mt-1.5 font-medium transition-colors ${selectedPath === 0 ? "text-foreground" : "text-muted-foreground"}`}>Sarah</span>
                        </motion.div>

                        {/* Mike node */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
                          className="absolute flex flex-col items-center"
                          style={{ left: `${networkNodes.mike.x}%`, top: `${networkNodes.mike.y}%`, transform: 'translate(-50%, -50%)' }}
                        >
                          <div className={`w-11 h-11 rounded-full flex items-center justify-center text-[11px] font-medium shadow-sm transition-all duration-300 ${
                            selectedPath === 1
                              ? "bg-primary text-primary-foreground shadow-primary/30"
                              : "bg-background border border-border text-muted-foreground"
                          }`}>
                            MR
                          </div>
                          <span className={`text-[10px] mt-1.5 font-medium transition-colors ${selectedPath === 1 ? "text-foreground" : "text-muted-foreground"}`}>Mike</span>
                        </motion.div>

                        {/* Lisa node */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.25, duration: 0.4, ease: "easeOut" }}
                          className="absolute flex flex-col items-center"
                          style={{ left: `${networkNodes.lisa.x}%`, top: `${networkNodes.lisa.y}%`, transform: 'translate(-50%, -50%)' }}
                        >
                          <div className={`w-11 h-11 rounded-full flex items-center justify-center text-[11px] font-medium shadow-sm transition-all duration-300 ${
                            selectedPath === 2
                              ? "bg-primary text-primary-foreground shadow-primary/30"
                              : "bg-background border border-border text-muted-foreground"
                          }`}>
                            LW
                          </div>
                          <span className={`text-[10px] mt-1.5 font-medium transition-colors ${selectedPath === 2 ? "text-foreground" : "text-muted-foreground"}`}>Lisa</span>
                        </motion.div>

                        {/* David (target) node */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
                          className="absolute flex flex-col items-center"
                          style={{ left: `${networkNodes.david.x}%`, top: `${networkNodes.david.y}%`, transform: 'translate(-50%, -50%)' }}
                        >
                          <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xs font-semibold shadow-md transition-all duration-300 ${
                            demoPhase === "complete"
                              ? "bg-emerald-200 text-emerald-700 shadow-emerald-200/50"
                              : "bg-muted text-foreground border border-border"
                          }`}>
                            DP
                          </div>
                          <span className="text-[10px] mt-1.5 font-medium">David Park</span>
                          <span className="text-[9px] text-muted-foreground">Sequoia</span>
                        </motion.div>
                      </div>

                      {/* Animated dot traveling along selected path */}
                      {selectedPath !== null && demoPhase !== "complete" && (
                        <div className="absolute inset-6 pointer-events-none">
                          <motion.div
                            className="absolute w-2.5 h-2.5 rounded-full bg-primary shadow-lg shadow-primary/50"
                            animate={{
                              left: [
                                `${networkNodes.you.x}%`,
                                `${selectedPath === 0 ? networkNodes.sarah.x : selectedPath === 1 ? networkNodes.mike.x : networkNodes.lisa.x}%`,
                                `${networkNodes.david.x}%`
                              ],
                              top: [
                                `${networkNodes.you.y}%`,
                                `${selectedPath === 0 ? networkNodes.sarah.y : selectedPath === 1 ? networkNodes.mike.y : networkNodes.lisa.y}%`,
                                `${networkNodes.david.y}%`
                              ],
                              opacity: [0, 1, 1, 1, 0]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "linear",
                              times: [0, 0.3, 0.7, 0.9, 1]
                            }}
                            style={{ transform: 'translate(-50%, -50%)' }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Path Options List */}
                    <div className="lg:w-64 space-y-2">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-muted-foreground uppercase tracking-wider">Paths found</span>
                        <span className="text-xs text-primary font-mono">3</span>
                      </div>

                      {connectionPaths.map((path, i) => (
                        <motion.div
                          key={path.via}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + i * 0.1 }}
                          className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                            selectedPath === i
                              ? "border-primary bg-primary/5"
                              : "border-border/50 hover:border-border"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`font-mono text-sm font-medium ${selectedPath === i ? "text-primary" : "text-muted-foreground"}`}>
                              {path.strength.toFixed(2)}
                            </span>
                            <span className="text-xs text-muted-foreground">via</span>
                            <span className="text-xs font-medium">{path.via}</span>
                            {i === 0 && selectedPath === 0 && (
                              <span className="text-[9px] px-1.5 py-0.5 rounded bg-primary/20 text-primary ml-auto">best</span>
                            )}
                          </div>
                          <div className="text-[10px] text-muted-foreground">{path.relation}</div>
                        </motion.div>
                      ))}

                      {/* Action Button */}
                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className={`w-full mt-4 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                          demoPhase === "complete"
                            ? "bg-emerald-200 text-emerald-700"
                            : demoPhase === "sending"
                            ? "bg-primary/80 text-primary-foreground"
                            : "bg-primary text-primary-foreground hover:bg-primary/90"
                        }`}
                      >
                        {demoPhase === "complete" ? (
                          <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Intro Requested
                          </>
                        ) : demoPhase === "sending" ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                            />
                            Sending...
                          </>
                        ) : selectedPath !== null ? (
                          <>Request Intro via {connectionPaths[selectedPath].via.split(' ')[0]}</>
                        ) : (
                          "Select a path"
                        )}
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {/* Empty / Loading State */}
                {(demoPhase === "idle" || demoPhase === "typing" || demoPhase === "searching") && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center h-[400px] text-muted-foreground"
                  >
                    {demoPhase === "searching" ? (
                      <div className="flex flex-col items-center">
                        <div className="relative mb-6">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="w-16 h-16 border border-primary/30 rounded-full"
                          />
                          <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-2 border border-primary/50 rounded-full"
                          />
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="absolute inset-4 bg-primary/20 rounded-full"
                          />
                        </div>
                        <p className="text-sm font-mono">Mapping paths to David...</p>
                        <p className="text-xs text-muted-foreground/60 mt-1">Analyzing 2,847 connections</p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="w-24 h-24 mx-auto mb-6 relative opacity-20">
                          <div className="absolute inset-0 border border-dashed border-current rounded-full" />
                          <div className="absolute inset-4 border border-dashed border-current rounded-full" />
                          <div className="absolute inset-8 border border-dashed border-current rounded-full" />
                        </div>
                        <p className="text-sm">Search for anyone to map your network</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Feature 2: Deep Research */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-6 py-24 max-w-5xl border-t border-border/40"
      >
        <div className="mb-12">
          <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-4 text-center">Deep Research</h2>
          <p className="text-center text-muted-foreground text-sm font-mono">comprehensive intelligence on anyone</p>
        </div>

        {/* Research Profile Demo */}
        <div className="bg-muted/20 border border-border/40 rounded-lg overflow-hidden p-6">
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex items-start gap-6 mb-6"
          >
            <div className="w-16 h-16 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center shrink-0">
              <span className="text-xl font-light text-primary">SC</span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-light mb-1">Sarah Chen</h3>
              <p className="text-muted-foreground mb-3">Partner at Horizon Ventures</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-mono rounded">verified</span>
                <span className="px-2 py-1 bg-muted text-muted-foreground text-xs font-mono rounded">san francisco</span>
                <span className="px-2 py-1 bg-muted text-muted-foreground text-xs font-mono rounded">12 years exp</span>
              </div>
            </div>
          </motion.div>

          {/* Data Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                title: "Investment Focus",
                items: ["AI/ML infrastructure", "Hardware + software", "Series A-B ($5-30M)", "12 active portfolio companies"],
                delay: 0.4
              },
              {
                title: "Recent Activity",
                items: ["Led Acme Robotics Series A (Jan 2024)", "Joined Neura board (Dec 2023)", "CES 2024 speaker", "Published on AI wearables (Forbes)"],
                delay: 0.5
              },
              {
                title: "Background",
                items: ["Stanford CS + MBA", "Ex-Google PM (5 years)", "Founded 2 startups (1 exit)", "500+ LinkedIn connections"],
                delay: 0.6
              },
              {
                title: "Public Records",
                items: ["Board seats: 4 companies", "No litigation found", "Angel investments: 23", "Advisor: TechStars, YC"],
                delay: 0.7
              }
            ].map((category, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: category.delay }}
                className="bg-background border border-border/40 rounded-lg p-4"
              >
                <h4 className="text-xs font-mono uppercase tracking-wider text-primary mb-3">{category.title}</h4>
                <ul className="space-y-1.5 text-sm">
                  {category.items.map((item, j) => (
                    <li key={j} className="text-muted-foreground">- {item}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="flex items-center justify-between pt-4 mt-4 border-t border-border/40 text-xs font-mono"
          >
            <span className="text-muted-foreground">38 sources analyzed</span>
            <span className="text-primary">confidence: 96%</span>
          </motion.div>
        </div>
      </motion.section>

      {/* How It Works */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-6 py-24 max-w-4xl border-t border-border/40"
      >
        <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-12 text-center">How it works</h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Connect Your Data */}
          <div>
            <h3 className="text-lg font-light mb-4">1. Connect your network</h3>
            <p className="text-muted-foreground mb-4">We analyze your email, calendar, and LinkedIn to map your real relationships and calculate connection strength.</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span> Gmail / Outlook
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span> Google / Outlook Calendar
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span> LinkedIn connections
              </li>
            </ul>
          </div>

          {/* Search & Research */}
          <div>
            <h3 className="text-lg font-light mb-4">2. Search & research</h3>
            <p className="text-muted-foreground mb-4">Search your extended network by any criteria. Get deep research on anyone before you reach out.</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span> Semantic search across connections
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span> 1st, 2nd, 3rd degree paths
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span> Deep public research
              </li>
            </ul>
          </div>
        </div>
      </motion.section>

      {/* Data Sources */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-6 py-24 max-w-5xl border-t border-border/40"
      >
        <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-4 text-center">Data Sources</h2>
        <p className="text-center text-muted-foreground text-sm mb-12">We aggregate intelligence from 50+ sources</p>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Your Network */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-muted/20 border border-border/40 rounded-lg p-5"
          >
            <h3 className="text-sm font-mono text-primary mb-3">Your Network</h3>
            <p className="text-muted-foreground text-xs mb-4">Connected privately for relationship strength</p>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li className="flex items-center gap-2"><span className="text-primary">·</span> Gmail / Google Workspace</li>
              <li className="flex items-center gap-2"><span className="text-primary">·</span> Microsoft Outlook / 365</li>
              <li className="flex items-center gap-2"><span className="text-primary">·</span> LinkedIn connections</li>
              <li className="flex items-center gap-2"><span className="text-primary">·</span> Google Calendar</li>
              <li className="flex items-center gap-2"><span className="text-primary">·</span> Outlook Calendar</li>
              <li className="flex items-center gap-2"><span className="text-primary">·</span> Slack (coming soon)</li>
            </ul>
          </motion.div>

          {/* Professional Profiles */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-muted/20 border border-border/40 rounded-lg p-5"
          >
            <h3 className="text-sm font-mono text-primary mb-3">Professional Profiles</h3>
            <p className="text-muted-foreground text-xs mb-4">Career history and professional presence</p>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li className="flex items-center gap-2"><span className="text-primary">·</span> LinkedIn profiles</li>
              <li className="flex items-center gap-2"><span className="text-primary">·</span> Company websites</li>
              <li className="flex items-center gap-2"><span className="text-primary">·</span> AngelList / Wellfound</li>
              <li className="flex items-center gap-2"><span className="text-primary">·</span> Crunchbase</li>
              <li className="flex items-center gap-2"><span className="text-primary">·</span> Personal websites / blogs</li>
              <li className="flex items-center gap-2"><span className="text-primary">·</span> GitHub profiles</li>
            </ul>
          </motion.div>

          {/* Social & Media */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-muted/20 border border-border/40 rounded-lg p-5"
          >
            <h3 className="text-sm font-mono text-primary mb-3">Social & Media</h3>
            <p className="text-muted-foreground text-xs mb-4">Public social presence and media mentions</p>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li className="flex items-center gap-2"><span className="text-primary">·</span> Twitter / X</li>
              <li className="flex items-center gap-2"><span className="text-primary">·</span> YouTube interviews</li>
              <li className="flex items-center gap-2"><span className="text-primary">·</span> Podcast appearances</li>
              <li className="flex items-center gap-2"><span className="text-primary">·</span> News articles</li>
              <li className="flex items-center gap-2"><span className="text-primary">·</span> Press releases</li>
              <li className="flex items-center gap-2"><span className="text-primary">·</span> Conference talks</li>
            </ul>
          </motion.div>

          {/* Business Records */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-muted/20 border border-border/40 rounded-lg p-5"
          >
            <h3 className="text-sm font-mono text-primary mb-3">Business Records</h3>
            <p className="text-muted-foreground text-xs mb-4">Corporate filings and business data</p>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li className="flex items-center gap-2"><span className="text-primary">·</span> SEC filings (10-K, 8-K, S-1)</li>
              <li className="flex items-center gap-2"><span className="text-primary">·</span> State business registrations</li>
              <li className="flex items-center gap-2"><span className="text-primary">·</span> Board seat records</li>
              <li className="flex items-center gap-2"><span className="text-primary">·</span> Patent filings (USPTO)</li>
              <li className="flex items-center gap-2"><span className="text-primary">·</span> Trademark records</li>
              <li className="flex items-center gap-2"><span className="text-primary">·</span> Funding announcements</li>
            </ul>
          </motion.div>

          {/* Public Records */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="bg-muted/20 border border-border/40 rounded-lg p-5"
          >
            <h3 className="text-sm font-mono text-primary mb-3">Public Records</h3>
            <p className="text-muted-foreground text-xs mb-4">Government and legal records</p>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li className="flex items-center gap-2"><span className="text-primary">·</span> Court records (PACER)</li>
              <li className="flex items-center gap-2"><span className="text-primary">·</span> Property records</li>
              <li className="flex items-center gap-2"><span className="text-primary">·</span> Bankruptcy filings</li>
              <li className="flex items-center gap-2"><span className="text-primary">·</span> UCC filings</li>
              <li className="flex items-center gap-2"><span className="text-primary">·</span> Political donations (FEC)</li>
              <li className="flex items-center gap-2"><span className="text-primary">·</span> Non-profit filings (990s)</li>
            </ul>
          </motion.div>

          {/* Academic & Research */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="bg-muted/20 border border-border/40 rounded-lg p-5"
          >
            <h3 className="text-sm font-mono text-primary mb-3">Academic & Research</h3>
            <p className="text-muted-foreground text-xs mb-4">Publications and academic work</p>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li className="flex items-center gap-2"><span className="text-primary">·</span> Google Scholar</li>
              <li className="flex items-center gap-2"><span className="text-primary">·</span> arXiv papers</li>
              <li className="flex items-center gap-2"><span className="text-primary">·</span> ResearchGate</li>
              <li className="flex items-center gap-2"><span className="text-primary">·</span> University profiles</li>
              <li className="flex items-center gap-2"><span className="text-primary">·</span> Published books</li>
              <li className="flex items-center gap-2"><span className="text-primary">·</span> Industry whitepapers</li>
            </ul>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
          className="mt-8 text-center text-muted-foreground text-sm"
        >
          Your data stays private. We never share your connections or emails.
        </motion.p>
      </motion.section>

      {/* Use Cases */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-6 py-24 max-w-3xl border-t border-border/40"
      >
        <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-12 text-center">Use cases</h2>

        <div className="space-y-6">
          {[
            { query: '"ML engineers with 7+ years at FAANG"', result: "Found 23 through your network. Best path: 2 hops via your Stanford connection." },
            { query: '"VCs actively investing in AI robotics"', result: "12 matches. 3 are 1st degree. Sarah Chen is your warmest intro." },
            { query: '"CMOs at Series B+ startups in fintech"', result: "8 matches. Deep research shows 2 are actively hiring." },
            { query: '"Founders who exited to Google"', result: "6 in your extended network. Best connection has 0.89 strength." },
          ].map((example, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="border-l-2 border-primary/30 pl-4"
            >
              <p className="font-mono text-sm mb-1">{example.query}</p>
              <p className="text-muted-foreground text-sm">{example.result}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Pricing */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-6 py-24 max-w-3xl border-t border-border/40"
      >
        <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-12">Pricing</h2>
        <div className="space-y-2">
          <p className="text-4xl md:text-5xl font-light tracking-tight">$29 / month</p>
          <p className="text-muted-foreground font-light text-lg">Unlimited searches. Full research reports. All connections.</p>
        </div>
      </motion.section>

      {/* Waitlist CTA */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-6 py-32 max-w-3xl border-t border-border/40 mb-12"
      >
        <div className="text-center">
          <h2 className="text-3xl md:text-5xl font-light mb-6">Join the waitlist</h2>
          <p className="text-muted-foreground text-lg mb-10">Be first to unlock your network's full potential.</p>
          <motion.button
            onClick={() => setIsWaitlistOpen(true)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-12 py-4 bg-primary text-primary-foreground rounded-full font-medium text-lg hover:opacity-90 transition-opacity"
          >
            Get Early Access
          </motion.button>
        </div>
      </motion.section>

      {/* Waitlist Modal - Full Screen Takeover */}
      <AnimatePresence>
        {isWaitlistOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-background z-50 flex flex-col overflow-hidden"
            onClick={(e) => e.target === e.currentTarget && closeWaitlist()}
          >
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center justify-between p-6"
            >
              <span className="text-sm font-mono text-muted-foreground">
                {waitlistStatus === "success" ? "done" : `${waitlistStep + 1} / ${waitlistSteps.length}`}
              </span>
              <button
                onClick={closeWaitlist}
                disabled={waitlistStatus === "loading"}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
              >
                esc to close
              </button>
            </motion.div>

            {/* Content */}
            <div className="flex-1 flex items-center justify-center px-6">
              <div className="w-full max-w-xl">
                <AnimatePresence mode="wait">
                  {waitlistStatus === "success" ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="text-center"
                    >
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", damping: 15, stiffness: 200 }}
                        className="w-16 h-16 mx-auto mb-8 rounded-full border-2 border-foreground flex items-center justify-center"
                      >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </motion.div>
                      <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-3xl md:text-4xl font-light mb-4"
                      >
                        You're in, {waitlistForm.name.split(' ')[0]}
                      </motion.h2>
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-muted-foreground text-lg"
                      >
                        We'll reach out soon with early access.
                      </motion.p>
                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        onClick={closeWaitlist}
                        className="mt-12 text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        press esc or click to close
                      </motion.button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={`step-${waitlistStep}`}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.h2
                        className="text-3xl md:text-5xl font-light mb-8"
                      >
                        {waitlistSteps[waitlistStep].label}
                      </motion.h2>

                      {waitlistSteps[waitlistStep].type === "textarea" ? (
                        <textarea
                          autoFocus
                          value={waitlistForm[waitlistSteps[waitlistStep].field as keyof typeof waitlistForm]}
                          onChange={(e) => updateWaitlistForm(waitlistSteps[waitlistStep].field, e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && e.metaKey) {
                              handleWaitlistNext();
                            }
                          }}
                          placeholder={waitlistSteps[waitlistStep].placeholder}
                          disabled={waitlistStatus === "loading"}
                          rows={3}
                          className="w-full text-2xl md:text-3xl font-light bg-transparent border-none outline-none placeholder:text-muted-foreground/40 resize-none"
                        />
                      ) : (
                        <input
                          autoFocus
                          type={waitlistSteps[waitlistStep].type}
                          value={waitlistForm[waitlistSteps[waitlistStep].field as keyof typeof waitlistForm]}
                          onChange={(e) => updateWaitlistForm(waitlistSteps[waitlistStep].field, e.target.value)}
                          onKeyDown={handleWaitlistKeyDown}
                          placeholder={waitlistSteps[waitlistStep].placeholder}
                          disabled={waitlistStatus === "loading"}
                          className="w-full text-2xl md:text-3xl font-light bg-transparent border-none outline-none placeholder:text-muted-foreground/40"
                        />
                      )}

                      <div className="mt-8 flex items-center gap-4">
                        <motion.button
                          type="button"
                          onClick={handleWaitlistNext}
                          disabled={waitlistStatus === "loading"}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="px-8 py-3 bg-foreground text-background rounded-full font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
                        >
                          {waitlistStatus === "loading" ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-4 h-4 border-2 border-background border-t-transparent rounded-full"
                              />
                              Joining...
                            </>
                          ) : waitlistStep === waitlistSteps.length - 1 ? (
                            "Join Waitlist"
                          ) : (
                            <>
                              Continue
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </>
                          )}
                        </motion.button>

                        <span className="text-sm text-muted-foreground">
                          {waitlistSteps[waitlistStep].type === "textarea"
                            ? "⌘ + Enter"
                            : !waitlistSteps[waitlistStep].required
                              ? "optional · press Enter to skip"
                              : "or press Enter ↵"}
                        </span>
                      </div>

                      <AnimatePresence>
                        {waitlistStatus === "error" && (
                          <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="mt-4 text-sm text-red-500"
                          >
                            {waitlistMessage}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Progress bar */}
            {waitlistStatus !== "success" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-6"
              >
                <div className="h-1 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-foreground"
                    initial={{ width: 0 }}
                    animate={{ width: `${((waitlistStep + 1) / waitlistSteps.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
