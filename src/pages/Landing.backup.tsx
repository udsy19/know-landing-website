import { motion, AnimatePresence, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";

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
  const [waitlistCount, setWaitlistCount] = useState(2847);

  // Fetch waitlist count on mount
  useEffect(() => {
    fetch("/api/waitlist-count")
      .then(res => res.json())
      .then(data => {
        if (data.count) setWaitlistCount(data.count);
      })
      .catch(() => {
        // Keep default count on error
      });
  }, []);

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

    // Collect browser fingerprint data
    const urlParams = new URLSearchParams(window.location.search);
    const fingerprint = {
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      referrer: document.referrer || "direct",
      utmSource: urlParams.get("utm_source") || "",
      utmMedium: urlParams.get("utm_medium") || "",
      utmCampaign: urlParams.get("utm_campaign") || "",
    };

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...waitlistForm, ...fingerprint }),
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
          className="text-4xl md:text-6xl font-light leading-[1.1] mb-8 tracking-tighter"
        >
          Know anyone,<br />before you meet them.
        </motion.h1>

        <div className="space-y-2 mb-10">
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

        {/* Hero CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.8 }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
        >
          <motion.button
            onClick={() => {
              setIsWaitlistOpen(true);
              // Scroll to waitlist section
              document.getElementById('waitlist-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity"
          >
            Join Waitlist
          </motion.button>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-sm text-muted-foreground">
              <span className="text-foreground font-medium">{waitlistCount.toLocaleString()}</span> people waiting
            </span>
          </div>
        </motion.div>
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

      {/* Waitlist CTA - Inline Expansion */}
      <motion.section
        id="waitlist-section"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-6 py-24 max-w-2xl border-t border-border/40 mb-12"
      >
        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {[
            { icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z", text: "256-bit encrypted" },
            { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", text: "We never sell your data" },
            { icon: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16", text: "Delete anytime" },
          ].map((badge, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-4 py-2 bg-muted/30 rounded-full text-sm text-muted-foreground"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={badge.icon} />
              </svg>
              {badge.text}
            </div>
          ))}
        </div>

        <div className="text-center">
          <AnimatePresence mode="wait">
            {!isWaitlistOpen ? (
              <motion.div
                key="cta"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-3xl md:text-5xl font-light mb-4">Join the waitlist</h2>
                <p className="text-muted-foreground text-lg mb-6">Be first to unlock your network's full potential.</p>

                {/* Live counter */}
                <div className="flex items-center justify-center gap-2 mb-6">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-sm text-muted-foreground">
                    <span className="text-foreground font-medium">{waitlistCount.toLocaleString()}</span> people waiting
                  </span>
                </div>

                <motion.button
                  onClick={() => setIsWaitlistOpen(true)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-10 py-4 bg-primary text-primary-foreground rounded-full font-medium text-lg hover:opacity-90 transition-opacity"
                >
                  Get Early Access
                </motion.button>

                <p className="mt-6 text-sm text-muted-foreground/60">
                  Your privacy matters. Read our{" "}
                  <Link to="/privacy" className="underline hover:text-muted-foreground transition-colors">
                    privacy policy
                  </Link>
                </p>
              </motion.div>
            ) : waitlistStatus === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 15, delay: 0.1 }}
                  className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center"
                >
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                <h2 className="text-2xl md:text-3xl font-light mb-3">You're in, {waitlistForm.name.split(' ')[0]}</h2>
                <p className="text-muted-foreground mb-8">We'll reach out soon with early access.</p>

                {/* Skip the line - Referral */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="border border-border/50 rounded-2xl p-6 max-w-sm mx-auto bg-muted/20"
                >
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span className="font-medium">Skip the line</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Share with 3 people, get <span className="text-foreground font-medium">instant access</span>
                  </p>

                  {/* Share buttons */}
                  <div className="flex items-center justify-center gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent("Just joined the waitlist for [know] - find the warmest path to anyone in your network. 🔥\n\nLaunching soon: useknow.io")}`, '_blank')}
                      className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center hover:border-primary/50 transition-colors"
                      title="Share on X"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://useknow.io")}`, '_blank')}
                      className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center hover:border-primary/50 transition-colors"
                      title="Share on LinkedIn"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        navigator.clipboard.writeText("https://useknow.io");
                        alert("Link copied!");
                      }}
                      className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center hover:border-primary/50 transition-colors"
                      title="Copy link"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-md mx-auto"
              >
                {/* Progress indicator */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex gap-2">
                    {waitlistSteps.map((_, i) => (
                      <div
                        key={i}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          i <= waitlistStep ? "w-8 bg-primary" : "w-3 bg-border/50"
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={closeWaitlist}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Cancel
                  </button>
                </div>

                {/* Question */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={waitlistStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="text-left"
                  >
                    <label className="block text-lg md:text-xl font-light mb-3">
                      {waitlistSteps[waitlistStep].label}
                      {!waitlistSteps[waitlistStep].required && (
                        <span className="text-xs text-muted-foreground ml-2">(optional)</span>
                      )}
                    </label>

                    {waitlistSteps[waitlistStep].type === "textarea" ? (
                      <textarea
                        autoFocus
                        value={waitlistForm[waitlistSteps[waitlistStep].field as keyof typeof waitlistForm]}
                        onChange={(e) => updateWaitlistForm(waitlistSteps[waitlistStep].field, e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && e.metaKey) handleWaitlistNext();
                        }}
                        placeholder={waitlistSteps[waitlistStep].placeholder}
                        disabled={waitlistStatus === "loading"}
                        rows={3}
                        className="w-full px-5 py-3 text-base bg-background border border-border rounded-2xl outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/40 resize-none"
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
                        className="w-full px-5 py-3 text-base bg-background border border-border rounded-full outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/40"
                      />
                    )}

                    {waitlistStatus === "error" && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-2 text-sm text-red-500"
                      >
                        {waitlistMessage}
                      </motion.p>
                    )}

                    <div className="flex items-center justify-between mt-5">
                      <button
                        onClick={() => waitlistStep > 0 && setWaitlistStep(prev => prev - 1)}
                        disabled={waitlistStep === 0 || waitlistStatus === "loading"}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-0 disabled:cursor-default"
                      >
                        ← Back
                      </button>

                      <div className="flex items-center gap-3">
                        {/* Skip button for optional fields */}
                        {!waitlistSteps[waitlistStep].required && (
                          <button
                            onClick={() => {
                              updateWaitlistForm(waitlistSteps[waitlistStep].field, "");
                              setWaitlistStep(prev => prev + 1);
                            }}
                            disabled={waitlistStatus === "loading"}
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                          >
                            Skip
                          </button>
                        )}

                        <motion.button
                          onClick={handleWaitlistNext}
                          disabled={waitlistStatus === "loading"}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="px-6 py-2.5 bg-primary text-primary-foreground rounded-full font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
                        >
                          {waitlistStatus === "loading" ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                              />
                              Joining...
                            </>
                          ) : waitlistStep === waitlistSteps.length - 1 ? (
                            "Join Waitlist"
                          ) : (
                            <>
                              Next
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </>
                          )}
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Inline security reassurance */}
                <div className="flex items-center justify-center gap-2 mt-6">
                  <svg className="w-3.5 h-3.5 text-muted-foreground/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span className="text-xs text-muted-foreground/40">Protected with 256-bit encryption</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-10 mt-auto">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="flex flex-col items-center gap-6">
            {/* Logo */}
            <span className="text-lg font-mono font-medium">[know]</span>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/company/useknow/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-border transition-colors"
                title="LinkedIn"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://twitter.com/useknow"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-border transition-colors"
                title="X (Twitter)"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>

            {/* Links */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <Link to="/privacy" className="hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <a
                href="mailto:hello@useknow.io"
                className="hover:text-foreground transition-colors"
              >
                Contact
              </a>
            </div>

            {/* Copyright */}
            <p className="text-xs text-muted-foreground/60">
              © {new Date().getFullYear()} Know Technologies, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
