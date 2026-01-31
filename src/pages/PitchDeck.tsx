import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

// Animated counter that increments from start to end
function AnimatedCounter({ end, duration = 1.5, start = 0 }: { end: number; duration?: number; start?: number }) {
  const [count, setCount] = useState(start);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;

    const startTime = Date.now();
    const diff = end - start;

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(start + diff * eased));

      if (progress >= 1) {
        clearInterval(timer);
        setCount(end);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [inView, end, start, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

// Citation component
function Citation({ children }: { children: React.ReactNode }) {
  return (
    <p className="absolute bottom-4 left-4 right-4 text-[10px] text-white/30 leading-tight">
      {children}
    </p>
  );
}

// Simple fade animation
const fade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.4 }
};

// B2B Infrastructure Pitch Deck for [know]

export default function PitchDeck() {
  const [slide, setSlide] = useState(0);
  const totalSlides = 15;
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const next = useCallback(() => setSlide((s) => Math.min(s + 1, totalSlides - 1)), []);
  const prev = useCallback(() => setSlide((s) => Math.max(s - 1, 0)), []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); next(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [next, prev]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = touchStartX.current - touchEndX;
    const diffY = touchStartY.current - touchEndY;
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      if (diffX > 0) next();
      else prev();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const handleTap = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    if (e.clientY > window.innerHeight - 100) return;
    if (x > width * 0.7) next();
    else if (x < width * 0.3) prev();
  };

  return (
    <div
      className="min-h-screen bg-black text-white overflow-hidden select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={handleTap}
    >
      <div className="fixed top-0 left-0 right-0 h-1 bg-white/10 z-50">
        <motion.div
          className="h-full bg-white"
          initial={false}
          animate={{ width: `${((slide + 1) / totalSlides) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="fixed top-4 right-4 flex items-center gap-4 z-50">
        <a
          href="/know-pitch-deck.pdf"
          download="know-pitch-deck.pdf"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 transition-all text-white/60 hover:text-white text-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span className="hidden sm:inline">Download PDF</span>
        </a>
        <span className="text-sm text-white/40 font-mono">
          {slide + 1} / {totalSlides}
        </span>
      </div>

      <button
        onClick={(e) => { e.stopPropagation(); prev(); }}
        className={`fixed left-2 sm:left-4 top-1/2 -translate-y-1/2 z-50 p-2 sm:p-3 rounded-full bg-white/5 hover:bg-white/10 transition-all ${slide === 0 ? 'opacity-20' : 'opacity-60 hover:opacity-100'}`}
        disabled={slide === 0}
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); next(); }}
        className={`fixed right-2 sm:right-4 top-1/2 -translate-y-1/2 z-50 p-2 sm:p-3 rounded-full bg-white/5 hover:bg-white/10 transition-all ${slide === totalSlides - 1 ? 'opacity-20' : 'opacity-60 hover:opacity-100'}`}
        disabled={slide === totalSlides - 1}
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="min-h-screen flex items-center justify-center px-12 sm:px-16 md:px-8 py-16 sm:py-8">
        <div className="w-full max-w-5xl md:aspect-video bg-black overflow-visible relative flex items-center justify-center md:px-16 md:py-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="w-full"
            >
              <Slide index={slide} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="fixed bottom-4 sm:bottom-6 left-0 right-0 flex justify-center gap-1.5 sm:gap-2 z-50 px-4">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); setSlide(i); }}
            className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
              i === slide ? "bg-white w-6 sm:w-8" : "bg-white/30 hover:bg-white/50 w-1.5 sm:w-2"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function Slide({ index }: { index: number }) {
  switch (index) {
    case 0: return <S_Title />;
    case 1: return <S_Problem />;
    case 2: return <S_WhyMatters />;
    case 3: return <S_Insight />;
    case 4: return <S_Solution />;
    case 5: return <S_Moat />;
    case 6: return <S_Market />;
    case 7: return <S_Traction />;
    case 8: return <S_Competition />;
    case 9: return <S_Team />;
    case 10: return <S_Ask />;
    case 11: return <S_BudgetBreakdown />;
    case 12: return <S_FutureOutlook />;
    case 13: return <S_Close />;
    case 14: return <S_References />;
    default: return null;
  }
}

// ============ SLIDES ============

function S_Title() {
  return (
    <div className="text-center">
      <motion.div {...fade} className="text-5xl sm:text-7xl md:text-9xl font-mono tracking-tighter leading-none">
        [know]
      </motion.div>
      <motion.p {...fade} transition={{ delay: 0.1 }} className="text-xl sm:text-2xl md:text-3xl text-white/60 mt-6 sm:mt-8">
        Network Intelligence Infrastructure
      </motion.p>
      <motion.p {...fade} transition={{ delay: 0.2 }} className="text-base sm:text-lg text-emerald-400 mt-2">
        Your team's relationships, one search away.
      </motion.p>
    </div>
  );
}

function S_Problem() {
  return (
    <div className="space-y-6 relative pb-8">
      <p className="text-white/40 text-sm sm:text-base">THE PROBLEM</p>
      <h1 className="text-2xl sm:text-4xl md:text-5xl font-light leading-tight">
        Cold outreach is dying. Teams can't find warm paths.
      </h1>
      <div className="space-y-3 text-base sm:text-xl text-white/70 pt-4">
        <p>
          The average 10-person team has <span className="text-white">20,000+ relationships</span> trapped in silos.
        </p>
        <div className="grid grid-cols-2 gap-3 pt-4 text-sm sm:text-base">
          <div className="text-white/50">
            Cold email response → <span className="text-red-400">2%</span>
          </div>
          <div className="text-white/50">
            Warm intro response → <span className="text-emerald-400">68%</span>
          </div>
          <div className="text-white/50">
            Manual searching → <span className="text-white/70">10+ hrs/week</span>
          </div>
          <div className="text-white/50">
            Deals via warm intro → <span className="text-emerald-400">34x more</span>
          </div>
        </div>
      </div>
      <p className="text-lg sm:text-2xl pt-4">
        Warm intros close <span className="text-emerald-400">34x more deals</span>.
        <br />
        <span className="text-white/50">Teams can't find them at scale.</span>
      </p>
      <Citation>Sources: Belkins 2025 (2% cold response), GrowLeads (68% warm response), LinkedIn Sales Solutions (34x deal conversion)</Citation>
    </div>
  );
}

function S_WhyMatters() {
  return (
    <div>
      <p className="text-white/40 text-sm sm:text-base mb-4 sm:mb-6">WHY THIS MATTERS</p>
      <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-6">
        <div className="text-center">
          <div className="text-2xl sm:text-4xl md:text-5xl font-light text-red-400">2%</div>
          <p className="text-white/40 mt-1 sm:mt-2 text-[10px] sm:text-xs">cold email<br />response rate</p>
        </div>
        <div className="text-center">
          <div className="text-2xl sm:text-4xl md:text-5xl font-light text-emerald-400">68%</div>
          <p className="text-white/40 mt-1 sm:mt-2 text-[10px] sm:text-xs">warm intro<br />response rate</p>
        </div>
        <div className="text-center">
          <div className="text-2xl sm:text-4xl md:text-5xl font-light">$47B</div>
          <p className="text-white/40 mt-1 sm:mt-2 text-[10px] sm:text-xs">wasted yearly<br />on cold outreach</p>
        </div>
      </div>
      <p className="text-center text-base sm:text-lg text-white/60 mb-6">
        34x more effective, but impossible to find at team scale
      </p>
      <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-6">
        <div className="text-center">
          <div className="text-2xl sm:text-4xl md:text-5xl font-light">84%</div>
          <p className="text-white/40 mt-1 sm:mt-2 text-[10px] sm:text-xs">of B2B deals<br />start with referral</p>
        </div>
        <div className="text-center">
          <div className="text-2xl sm:text-4xl md:text-5xl font-light">3x</div>
          <p className="text-white/40 mt-1 sm:mt-2 text-[10px] sm:text-xs">faster close<br />with referrals</p>
        </div>
        <div className="text-center">
          <div className="text-2xl sm:text-4xl md:text-5xl font-light text-emerald-400">40%</div>
          <p className="text-white/40 mt-1 sm:mt-2 text-[10px] sm:text-xs">lower CAC<br />via warm paths</p>
        </div>
      </div>
      <p className="text-[9px] sm:text-[10px] text-white/20 text-center">
        Sources: Belkins 2025, GrowLeads, ReferReach, LinkedIn Sales Solutions
      </p>
    </div>
  );
}

function S_Insight() {
  return (
    <div className="relative pb-8">
      <p className="text-emerald-400 text-sm sm:text-base mb-6 sm:mb-8">THE INSIGHT</p>
      <h1 className="text-xl sm:text-3xl md:text-4xl font-light leading-tight mb-6 sm:mb-10">
        The average 10-person team has:
      </h1>
      <div className="space-y-4 sm:space-y-6">
        <div className="flex items-baseline gap-4">
          <span className="text-3xl sm:text-5xl md:text-6xl font-light">500,000+</span>
          <span className="text-white/50 text-lg sm:text-2xl">emails</span>
        </div>
        <div className="flex items-baseline gap-4">
          <span className="text-3xl sm:text-5xl md:text-6xl font-light">25,000+</span>
          <span className="text-white/50 text-lg sm:text-2xl">connections</span>
        </div>
        <div className="flex items-baseline gap-4">
          <span className="text-3xl sm:text-5xl md:text-6xl font-light">20,000+</span>
          <span className="text-white/50 text-lg sm:text-2xl">searchable warm paths</span>
        </div>
      </div>
      <div className="mt-8 sm:mt-12 space-y-2">
        <p className="text-white/50 text-lg sm:text-2xl">Scattered across individual silos.</p>
        <p className="text-white/50 text-lg sm:text-2xl">Completely unsearchable.</p>
        <p className="text-emerald-400 text-xl sm:text-3xl mt-4">We make it searchable.</p>
      </div>
    </div>
  );
}

function S_Solution() {
  return (
    <div className="relative pb-8">
      <p className="text-white/40 text-sm sm:text-base mb-4 sm:mb-6">THE SOLUTION</p>
      <h1 className="text-xl sm:text-3xl md:text-4xl font-light mb-6 sm:mb-8">
        [know] turns <span className="text-emerald-400">team networks</span> into <span className="text-emerald-400">searchable infrastructure</span>.
      </h1>

      <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-6">
        <p className="text-white/50 text-sm">Search:</p>
        <p className="text-lg sm:text-xl">"VP of Engineering at Stripe"</p>
        <p className="text-emerald-400 mt-2">→ 3 warm paths in 0.8 seconds</p>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:gap-6 text-sm sm:text-base">
        <div className="bg-white/5 rounded-lg p-3 sm:p-4">
          <p className="text-emerald-400 font-medium mb-2 sm:mb-3">CONNECT</p>
          <div className="text-white/70 space-y-1">
            <p>Gmail / Outlook</p>
            <p>Calendar</p>
            <p>LinkedIn</p>
          </div>
          <p className="text-white/40 text-xs sm:text-sm mt-3">2 min/person, OAuth</p>
        </div>
        <div className="bg-white/5 rounded-lg p-3 sm:p-4">
          <p className="text-emerald-400 font-medium mb-2 sm:mb-3">SEARCH</p>
          <div className="text-white/70 space-y-1">
            <p>Any role,</p>
            <p>company,</p>
            <p>criteria</p>
          </div>
          <p className="text-white/40 text-xs sm:text-sm mt-3">Sub-second results</p>
        </div>
        <div className="bg-white/5 rounded-lg p-3 sm:p-4">
          <p className="text-emerald-400 font-medium mb-2 sm:mb-3">GET INTRO</p>
          <div className="text-white/70 space-y-1">
            <p>Warm path</p>
            <p>Strength score</p>
            <p>One-click request</p>
          </div>
          <p className="text-white/40 text-xs sm:text-sm mt-3">68% response rate</p>
        </div>
      </div>

      <p className="text-center text-white/50 mt-6 text-sm sm:text-lg">
        From 10+ hours of manual searching to seconds of results.
      </p>
    </div>
  );
}

function S_Moat() {
  return (
    <div className="relative pb-8">
      <p className="text-white/40 text-sm sm:text-base mb-6 sm:mb-8">THE MOAT</p>
      <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
        <div>
          <h3 className="text-emerald-400 text-lg sm:text-xl mb-2">Team Network Effects</h3>
          <p className="text-white/60 text-sm sm:text-base">More members = exponentially more paths. 10→25 people = 14x value (Metcalfe's Law).</p>
        </div>
        <div>
          <h3 className="text-emerald-400 text-lg sm:text-xl mb-2">Proprietary Intelligence</h3>
          <p className="text-white/60 text-sm sm:text-base">Relationship scores from behavior signals. 6 months = irreplaceable data moat.</p>
        </div>
        <div>
          <h3 className="text-emerald-400 text-lg sm:text-xl mb-2">Privacy-First Architecture</h3>
          <p className="text-white/60 text-sm sm:text-base">Metadata only. Never read email content. SOC 2 compliant. Enterprise-ready.</p>
        </div>
        <div>
          <h3 className="text-emerald-400 text-lg sm:text-xl mb-2">Infrastructure Lock-In</h3>
          <p className="text-white/60 text-sm sm:text-base">Teams integrate into workflows. Switching = rebuilding entire network graph.</p>
        </div>
      </div>
      <p className="text-center text-xl sm:text-2xl mt-8 sm:mt-12">
        The first platform to make team relationship data<br />
        <span className="text-emerald-400">instantly searchable infrastructure.</span>
      </p>
      <Citation>Network effects: Zhang et al. 2015 (Metcalfe validation) · Avg professional connections: LinkedIn 2024</Citation>
    </div>
  );
}

function S_Market() {
  return (
    <div>
      <p className="text-white/40 text-sm sm:text-base mb-4">MARKET</p>
      <h1 className="text-2xl sm:text-4xl md:text-5xl font-light mb-4 sm:mb-6">
        <span className="text-emerald-400">$16B+</span> TAM in US alone
      </h1>
      <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-4">
        <div>
          <p className="text-white/40 text-[10px] sm:text-xs mb-2">BOTTOMS-UP TAM</p>
          <p className="text-sm sm:text-base mb-1">Sales teams (13M professionals): <span className="text-white/70">$12B</span></p>
          <p className="text-sm sm:text-base mb-1">Recruiting teams: <span className="text-white/70">$1B</span></p>
          <p className="text-sm sm:text-base mb-1">BD/Partnerships: <span className="text-white/70">$3B</span></p>
          <div className="text-[10px] sm:text-xs text-white/40 space-y-0.5 mt-3">
            <p>Entry: Sales teams at $499/mo (5 seats)</p>
            <p>→ 2.5M teams × $6K/year = <span className="text-white/70">$15B</span></p>
          </div>
        </div>
        <div>
          <p className="text-white/40 text-[10px] sm:text-xs mb-2">MARKET VALIDATION</p>
          <div className="space-y-1.5 text-xs sm:text-sm">
            <div className="flex justify-between">
              <span>ZoomInfo</span>
              <span className="text-white/40">$1.21B revenue</span>
            </div>
            <div className="flex justify-between">
              <span>Sales Navigator</span>
              <span className="text-white/40">~$1.5B revenue</span>
            </div>
            <div className="flex justify-between">
              <span>Apollo.io</span>
              <span className="text-white/40">$1.6B valuation</span>
            </div>
            <div className="flex justify-between">
              <span>Affinity</span>
              <span className="text-white/40">$640M valuation</span>
            </div>
            <div className="flex justify-between">
              <span>Clay</span>
              <span className="text-white/40">$1.25B valuation</span>
            </div>
          </div>
        </div>
      </div>
      <p className="text-xs sm:text-base text-white/60 mb-4">
        They sell contact data for <span className="text-red-400">strangers</span>. <span className="text-white">We unlock relationships teams already have.</span>
      </p>
      <p className="text-[9px] sm:text-[10px] text-white/20">
        Sources: ZoomInfo IR 2024, Apollo Series D, LinkedIn Earnings, Fortune Business Insights
      </p>
    </div>
  );
}

function S_Traction() {
  return (
    <div className="text-center relative pb-8">
      <p className="text-white/40 text-sm sm:text-base mb-6 sm:mb-8">TRACTION</p>
      <div className="text-5xl sm:text-7xl md:text-8xl font-light mb-2">
        <AnimatedCounter end={2847} start={2000} duration={1.5} />
      </div>
      <p className="text-lg sm:text-xl text-white/60 mb-1">waitlist signups in 21 days</p>
      <p className="text-emerald-400 text-sm sm:text-base mb-6">$0 marketing spend · 100% organic</p>

      <div className="grid grid-cols-3 gap-4 text-sm sm:text-base mb-6 max-w-md mx-auto">
        <div>
          <p className="text-white/40">Week 1</p>
          <p className="text-lg sm:text-xl">427</p>
        </div>
        <div>
          <p className="text-white/40">Week 2</p>
          <p className="text-lg sm:text-xl">891 <span className="text-emerald-400 text-xs">+108%</span></p>
        </div>
        <div>
          <p className="text-white/40">Week 3</p>
          <p className="text-lg sm:text-xl">1,529 <span className="text-emerald-400 text-xs">+72%</span></p>
        </div>
      </div>

      <p className="text-white/50 text-sm sm:text-base mb-4">Average growth: <span className="text-white">95% week-over-week</span></p>

      <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm text-white/60 max-w-sm mx-auto">
        <div>
          <p className="text-white/40 mb-1">Beta metrics</p>
          <p>68% weekly retention</p>
          <p>12 searches/user/week</p>
        </div>
        <div>
          <p className="text-white/40 mb-1">Pipeline</p>
          <p>$145K ARR in LOIs</p>
          <p>$499/mo avg deal</p>
        </div>
      </div>
    </div>
  );
}

function S_Competition() {
  return (
    <div className="relative pb-8">
      <p className="text-white/40 text-sm sm:text-base mb-4 sm:mb-6">COMPETITION</p>
      <h1 className="text-xl sm:text-3xl font-light mb-4">
        We're creating a new category. <span className="text-white/40">Not competing.</span>
      </h1>
      <div className="space-y-2 text-[10px] sm:text-xs">
        <div className="grid grid-cols-3 gap-2 py-2 border-b border-white/10 text-white/40">
          <span></span>
          <span>THEM</span>
          <span className="text-emerald-400">[KNOW]</span>
        </div>
        {[
          { name: "LinkedIn Sales Nav", them: "Searches their database, not yours", us: "Searches YOUR team's relationships" },
          { name: "ZoomInfo / Apollo", them: "Sells contact data for cold outreach", us: "Finds warm intro paths instantly" },
          { name: "Affinity", them: "$500/seat enterprise CRM, manual setup", us: "$499/mo teams, zero setup" },
          { name: "Clay", them: "Enriches stranger data for cold outreach", us: "Unlocks paths to people you know" },
          { name: "Happenstance (YC W24)", them: "Slack-dependent, enterprise only", us: "Works everywhere, any team size" },
        ].map((row) => (
          <div
            key={row.name}
            className="grid grid-cols-3 gap-2 py-1.5 border-b border-white/10"
          >
            <span className="text-white/70">{row.name}</span>
            <span className="text-white/40">{row.them}</span>
            <span className="text-emerald-400">{row.us}</span>
          </div>
        ))}
      </div>
      <p className="text-xs sm:text-sm text-white/60 mt-4 text-center">
        Privacy-first (metadata only). <span className="text-white">Team network effects. Infrastructure-grade economics.</span>
      </p>
    </div>
  );
}

function S_Team() {
  return (
    <div>
      <p className="text-white/40 text-sm sm:text-base mb-6 sm:mb-8">TEAM</p>
      <div className="grid sm:grid-cols-2 gap-6 sm:gap-10">
        <div>
          <div className="text-xl sm:text-3xl mb-2">Satyam Dave</div>
          <p className="text-emerald-400 text-sm sm:text-base mb-3">CEO & Co-founder</p>
          <ul className="space-y-1 text-white/60 text-xs sm:text-sm">
            <li>Ex-Microsoft · AI Product Manager (2.5M+ users)</li>
            <li>Ex-Verkada · Solutions Engineer ($10M+ pipeline)</li>
            <li>Built DesktopAI · 2.1K installs, 38% WAU</li>
            <li>Purdue University '26</li>
          </ul>
        </div>
        <div>
          <div className="text-xl sm:text-3xl mb-2">Udaya Vijay Anand</div>
          <p className="text-emerald-400 text-sm sm:text-base mb-3">CTO & Co-founder</p>
          <ul className="space-y-1 text-white/60 text-xs sm:text-sm">
            <li>Ex-KPMG · Cyber Defense Engineer (Fortune 500)</li>
            <li>Ex-DBS Bank · Security Automation</li>
            <li>Built AI safety guardrails for enterprise</li>
            <li>Purdue University '26</li>
          </ul>
        </div>
      </div>
      <p className="text-center text-white/40 mt-8 text-xs sm:text-sm">
        Technical founders who've shipped at scale. Enterprise security DNA. Now building network infrastructure.
      </p>
    </div>
  );
}

function S_Ask() {
  return (
    <div>
      <p className="text-white/40 text-sm sm:text-base mb-4 sm:mb-6">THE ASK</p>
      <div className="text-center mb-6 sm:mb-8">
        <div className="text-4xl sm:text-6xl font-light text-emerald-400">
          $750K
        </div>
        <p className="text-lg sm:text-xl text-white/40 mt-1">Pre-Seed at $5M post-money</p>
      </div>
      <div className="grid grid-cols-3 gap-3 sm:gap-6 text-xs sm:text-sm">
        <div>
          <p className="text-white/40 mb-2 sm:mb-3">USE OF FUNDS</p>
          <div className="space-y-1 text-white/70">
            <div className="flex justify-between"><span>Engineering</span><span>40%</span></div>
            <div className="flex justify-between"><span>Go-to-Market</span><span>40%</span></div>
            <div className="flex justify-between"><span>Operations</span><span>20%</span></div>
          </div>
          <p className="text-white/40 mt-3 text-[10px] sm:text-xs">18-month runway</p>
        </div>
        <div>
          <p className="text-white/40 mb-2 sm:mb-3">MILESTONES</p>
          <div className="space-y-1 text-white/70">
            <div><span className="text-white/40">M3:</span> PMF, 60% retention</div>
            <div><span className="text-white/40">M6:</span> 20 deals/mo, $75K MRR</div>
            <div><span className="text-white/40">M9:</span> 105% NRR, expand works</div>
            <div><span className="text-white/40">M12:</span> Series A ready, $1M+ ARR</div>
          </div>
        </div>
        <div>
          <p className="text-white/40 mb-2 sm:mb-3">WHY NOW</p>
          <div className="space-y-1 text-white/70">
            <p>2,847 signups in 3 weeks, $0 spent</p>
            <p>Cold outreach dying (2%)</p>
            <p>No horizontal team solution</p>
            <p className="text-emerald-400">First mover wins</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function S_BudgetBreakdown() {
  return (
    <div>
      <p className="text-white/40 text-sm sm:text-base mb-3">PATH TO PROFITABILITY</p>

      {/* Top: Budget Allocation */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4">
        <div className="bg-white/5 rounded-lg p-2 sm:p-3">
          <div className="flex items-baseline gap-1 mb-1">
            <span className="text-emerald-400 text-base sm:text-xl font-medium">$300K</span>
            <span className="text-white/30 text-[10px]">40%</span>
          </div>
          <p className="text-white/50 text-[9px] sm:text-[10px] mb-1.5">ENGINEERING</p>
          <div className="space-y-0.5 text-[8px] sm:text-[9px] text-white/40">
            <div className="flex justify-between"><span>2 Engineers</span><span>$240K</span></div>
            <div className="flex justify-between"><span>API/AI Costs</span><span>$30K</span></div>
            <div className="flex justify-between"><span>AWS/Infra</span><span>$30K</span></div>
          </div>
        </div>
        <div className="bg-white/5 rounded-lg p-2 sm:p-3">
          <div className="flex items-baseline gap-1 mb-1">
            <span className="text-emerald-400 text-base sm:text-xl font-medium">$300K</span>
            <span className="text-white/30 text-[10px]">40%</span>
          </div>
          <p className="text-white/50 text-[9px] sm:text-[10px] mb-1.5">GO-TO-MARKET</p>
          <div className="space-y-0.5 text-[8px] sm:text-[9px] text-white/40">
            <div className="flex justify-between"><span>2 Inside Sales</span><span>$180K</span></div>
            <div className="flex justify-between"><span>Paid Acquisition</span><span>$80K</span></div>
            <div className="flex justify-between"><span>Content & Events</span><span>$40K</span></div>
          </div>
        </div>
        <div className="bg-white/5 rounded-lg p-2 sm:p-3">
          <div className="flex items-baseline gap-1 mb-1">
            <span className="text-emerald-400 text-base sm:text-xl font-medium">$150K</span>
            <span className="text-white/30 text-[10px]">20%</span>
          </div>
          <p className="text-white/50 text-[9px] sm:text-[10px] mb-1.5">OPERATIONS</p>
          <div className="space-y-0.5 text-[8px] sm:text-[9px] text-white/40">
            <div className="flex justify-between"><span>Founder Salaries</span><span>$90K</span></div>
            <div className="flex justify-between"><span>Legal/Compliance</span><span>$30K</span></div>
            <div className="flex justify-between"><span>Office & Misc</span><span>$30K</span></div>
          </div>
        </div>
      </div>

      {/* Middle: Graph and Network Effects */}
      <div className="grid grid-cols-5 gap-3 sm:gap-4">
        {/* Breakeven Chart - Takes 3 columns */}
        <div className="col-span-3">
          <div className="bg-white/5 rounded-lg p-3 sm:p-4 h-full">
            <p className="text-white/60 text-[10px] sm:text-xs mb-2">BREAKEVEN TIMELINE</p>
            <svg viewBox="0 0 280 100" className="w-full h-28 sm:h-32">
              <defs>
                <pattern id="grid" width="28" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 28 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect x="35" y="10" width="235" height="70" fill="url(#grid)" />

              <line x1="35" y1="10" x2="35" y2="80" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
              <line x1="35" y1="80" x2="270" y2="80" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />

              <line x1="35" y1="45" x2="270" y2="45" stroke="rgba(239,68,68,0.4)" strokeWidth="1" strokeDasharray="4,4" />
              <text x="272" y="48" fill="rgba(239,68,68,0.6)" fontSize="7">$42K burn</text>

              <path
                d="M35 78 C60 76, 80 72, 100 65 S140 50, 170 45 S210 28, 240 18 L270 8"
                fill="none" stroke="#10b981" strokeWidth="2.5"
              />

              <circle cx="170" cy="45" r="6" fill="#10b981" />
              <circle cx="170" cy="45" r="10" fill="none" stroke="#10b981" strokeWidth="1" opacity="0.4" />

              <circle cx="67" cy="76" r="2" fill="#10b981" opacity="0.6" />
              <circle cx="100" cy="65" r="2" fill="#10b981" opacity="0.6" />
              <circle cx="140" cy="50" r="2" fill="#10b981" opacity="0.6" />
              <circle cx="210" cy="28" r="2" fill="#10b981" opacity="0.6" />
              <circle cx="240" cy="18" r="2" fill="#10b981" opacity="0.6" />

              <text x="8" y="48" fill="rgba(255,255,255,0.4)" fontSize="7">$42K</text>
              <text x="8" y="83" fill="rgba(255,255,255,0.4)" fontSize="7">$0</text>
              <text x="8" y="18" fill="rgba(255,255,255,0.4)" fontSize="7">$100K</text>

              <text x="35" y="92" fill="rgba(255,255,255,0.3)" fontSize="7">M0</text>
              <text x="100" y="92" fill="rgba(255,255,255,0.3)" fontSize="7">M6</text>
              <text x="170" y="92" fill="rgba(255,255,255,0.3)" fontSize="7">M10</text>
              <text x="240" y="92" fill="rgba(255,255,255,0.3)" fontSize="7">M18</text>

              <text x="170" y="38" fill="#10b981" fontSize="8" fontWeight="bold" textAnchor="middle">BREAKEVEN</text>
              <text x="170" y="60" fill="rgba(255,255,255,0.5)" fontSize="6" textAnchor="middle">85 teams @ $499/mo</text>
            </svg>

            <div className="flex justify-between items-center mt-2 text-[9px] sm:text-[10px]">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-0.5 bg-emerald-400"></div>
                  <span className="text-white/40">MRR @ $499/team</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-0.5 bg-red-400/60 border-dashed"></div>
                  <span className="text-white/40">$42K/mo burn</span>
                </div>
              </div>
              <span className="text-emerald-400 font-medium">Target: Month 10</span>
            </div>
          </div>
        </div>

        {/* Network Effects - Takes 2 columns */}
        <div className="col-span-2">
          <div className="bg-white/5 rounded-lg p-3 sm:p-4 h-full">
            <p className="text-white/60 text-[10px] sm:text-xs mb-1">TEAM NETWORK MULTIPLIER</p>
            <p className="text-white/30 text-[8px] mb-2">More members = exponentially more paths</p>

            <div className="space-y-2">
              {[
                { size: "5 people", multiplier: "1x", width: "7%" },
                { size: "10 people", multiplier: "3.2x", width: "23%" },
                { size: "25 people", multiplier: "14x", width: "100%", highlight: true },
              ].map((item) => (
                <div key={item.size} className="flex items-center gap-2">
                  <span className="text-white/40 text-[9px] w-14">{item.size}</span>
                  <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${item.highlight ? 'bg-emerald-400' : 'bg-emerald-400/70'}`}
                      style={{ width: item.width }}
                    />
                  </div>
                  <span className={`text-[9px] w-12 text-right ${item.highlight ? 'text-emerald-400 font-medium' : 'text-white/50'}`}>
                    {item.multiplier}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-3 pt-2 border-t border-white/10 text-[8px] sm:text-[9px] text-white/30">
              <p>Metcalfe's Law: value ∝ n²</p>
              <p className="mt-0.5">25-person team → <span className="text-white/50">35K warm paths</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom: Unit Economics */}
      <div className="mt-3 bg-gradient-to-r from-emerald-400/5 via-emerald-400/10 to-transparent rounded-lg p-2 sm:p-3">
        <p className="text-emerald-400 text-[9px] sm:text-[10px] mb-2">UNIT ECONOMICS</p>
        <div className="grid grid-cols-4 gap-3 text-[8px] sm:text-[9px]">
          <div>
            <p className="text-white/70 font-medium">$500 CAC</p>
            <p className="text-white/40">PLG + inside sales blend</p>
          </div>
          <div>
            <p className="text-white/70 font-medium">$3,600 LTV</p>
            <p className="text-white/40">$499/mo × 7.2mo avg lifetime</p>
          </div>
          <div>
            <p className="text-white/70 font-medium">7:1 LTV:CAC</p>
            <p className="text-white/40">Top-quartile SaaS</p>
          </div>
          <div>
            <p className="text-white/70 font-medium">85% Gross Margin</p>
            <p className="text-white/40">AI costs amortized</p>
          </div>
        </div>
      </div>

      <p className="text-[7px] sm:text-[8px] text-white/20 mt-2 text-center">
        Network effects: Zhang et al. 2015 · Unit economics: Bessemer SaaS benchmarks · Salaries: Levels.fyi 2024
      </p>
    </div>
  );
}

function S_FutureOutlook() {
  const milestones = [
    {
      users: "100 teams",
      timeline: "Month 6",
      color: "from-emerald-400/20 to-emerald-400/5",
      financial: { mrr: "$50K", arr: "$600K", valuation: "~$6M" },
      network: { paths: "800K+", coverage: "73%", searches: "5K/day" },
      unlocks: ["Product-market fit proven", "20 deals/month achieved", "Land-and-expand validated"]
    },
    {
      users: "250 teams",
      timeline: "Month 12",
      color: "from-emerald-400/40 to-emerald-400/10",
      financial: { mrr: "$125K", arr: "$1.5M", valuation: "~$15M" },
      network: { paths: "2.5M+", coverage: "89%", searches: "20K/day" },
      unlocks: ["Series A ready ($1M+ ARR)", "105% NRR proven", "Enterprise pilots launching"]
    },
    {
      users: "1,000 teams",
      timeline: "Month 24",
      color: "from-emerald-400/60 to-emerald-400/20",
      financial: { mrr: "$500K", arr: "$6M", valuation: "~$60M" },
      network: { paths: "10M+", coverage: "94%", searches: "100K/day" },
      unlocks: ["Category leader position", "Cross-company network effects", "Series B trajectory"]
    }
  ];

  return (
    <div className="relative pb-8">
      <p className="text-white/40 text-sm sm:text-base mb-2">FUTURE OUTLOOK</p>
      <p className="text-white/60 text-xs sm:text-sm mb-4">What happens as we scale — backed by network science</p>

      <div className="space-y-3">
        {milestones.map((m) => (
          <div
            key={m.users}
            className={`bg-gradient-to-r ${m.color} rounded-lg p-3 sm:p-4 border border-emerald-400/20`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <span className="text-xl sm:text-2xl font-light text-white">{m.users}</span>
              </div>
              <span className="text-emerald-400 text-xs sm:text-sm font-medium">{m.timeline}</span>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-4 text-[9px] sm:text-[10px]">
              <div>
                <p className="text-white/40 mb-1">FINANCIAL</p>
                <div className="space-y-0.5 text-white/70">
                  <p>MRR: <span className="text-white">{m.financial.mrr}</span></p>
                  <p>ARR: <span className="text-white">{m.financial.arr}</span></p>
                  <p>Est. Val: <span className="text-emerald-400">{m.financial.valuation}</span></p>
                </div>
              </div>

              <div>
                <p className="text-white/40 mb-1">NETWORK EFFECT</p>
                <div className="space-y-0.5 text-white/70">
                  <p>Paths: <span className="text-white">{m.network.paths}</span></p>
                  <p>Match Rate: <span className="text-white">{m.network.coverage}</span></p>
                  <p>Searches: <span className="text-white">{m.network.searches}</span></p>
                </div>
              </div>

              <div>
                <p className="text-white/40 mb-1">UNLOCKS</p>
                <div className="space-y-0.5 text-white/70">
                  {m.unlocks.map((u, j) => (
                    <p key={j} className="flex items-center gap-1">
                      <span className="text-emerald-400">→</span> {u}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 text-center">
        <p className="text-xs sm:text-sm text-white/50">
          Team network value grows <span className="text-emerald-400">n²</span> (Metcalfe's Law) — validated by Tencent/Facebook data
        </p>
        <p className="text-[8px] sm:text-[9px] text-white/30 mt-1">
          Zhang et al. 2015 · Bessemer SaaS benchmarks · LinkedIn professional network data 2024
        </p>
      </div>
    </div>
  );
}

function S_Close() {
  return (
    <div className="text-center">
      <div className="text-2xl sm:text-4xl md:text-5xl font-light leading-tight mb-6 sm:mb-10">
        The future of work runs on relationships.<br />
        <span className="text-white/30">We're building that infrastructure.</span>
      </div>
      <div>
        <div className="text-4xl sm:text-6xl font-mono mb-3">[know]</div>
        <p className="text-white/40 mb-6">useknow.io</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-10 text-sm sm:text-base mb-4">
          <div>
            <p className="text-white">Satyam Dave</p>
            <p className="text-white/40 text-xs">CEO & Co-founder</p>
            <a
              href="https://www.linkedin.com/in/satyamvdave/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-blue-400 hover:text-blue-300 text-xs"
            >
              LinkedIn →
            </a>
          </div>
          <div>
            <p className="text-white">Udaya Vijay Anand</p>
            <p className="text-white/40 text-xs">CTO & Co-founder</p>
            <a
              href="https://www.linkedin.com/in/udaya-vijay-anand/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-blue-400 hover:text-blue-300 text-xs"
            >
              LinkedIn →
            </a>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-emerald-400 text-lg">founders@useknow.io</p>
          <a
            href="https://www.linkedin.com/company/useknow/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-blue-400 hover:text-blue-300 text-xs flex items-center gap-1"
          >
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            Follow [know] on LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}

function S_References() {
  const references = [
    {
      category: "Cold Email & Response Rates",
      sources: [
        { name: "Belkins 2025 Cold Email Study", url: "https://belkins.io/blog/cold-email-response-rates", stat: "1-5% average response rate" },
        { name: "GrowLeads Warm vs Cold Study", url: "https://growleads.io/blog/warm-outreach-vs-cold-email/", stat: "68% warm intro response (decision-makers)" },
        { name: "LinkedIn Sales Solutions", url: "https://business.linkedin.com/sales-solutions", stat: "34x more deals via warm introductions" },
      ]
    },
    {
      category: "Referral & B2B Statistics",
      sources: [
        { name: "ReferReach Referral Statistics", url: "https://referreach.com/38-statistics-that-show-the-importance-of-referrals/", stat: "84% of B2B deals start with referral" },
        { name: "TrueList Referral Marketing", url: "https://truelist.co/blog/referral-marketing-statistics/", stat: "3x faster close with referrals" },
        { name: "Draftboard Warm Intros Study", url: "https://www.draftboard.com/blog/the-power-of-warm-intros-why-cold-outreach-is-fading-in-b2b-sales", stat: "40% lower CAC via warm paths" },
      ]
    },
    {
      category: "Market Size & Competitors",
      sources: [
        { name: "ZoomInfo Investor Relations", url: "https://ir.zoominfo.com/", stat: "$1.21B revenue (2024)" },
        { name: "Apollo.io Series D Announcement", url: "https://news.crunchbase.com/sales-marketing/apollo-io-funding-sales-tech-unicorn/", stat: "$1.6B valuation" },
        { name: "LinkedIn Sales Navigator", url: "https://business.linkedin.com/sales-solutions", stat: "~$1.5B estimated revenue" },
        { name: "Affinity CRM", url: "https://www.affinity.co/", stat: "$640M valuation (Series D)" },
        { name: "Clay Series B", url: "https://www.clay.com/", stat: "$1.25B valuation" },
      ]
    },
    {
      category: "Workforce & Productivity",
      sources: [
        { name: "Zippia Sales Demographics", url: "https://www.zippia.com/sales-representative-jobs/demographics/", stat: "13M+ sales professionals in US" },
        { name: "Salesforce State of Sales 2024", url: "https://www.salesforce.com/", stat: "Reps spend 30% of time actually selling" },
        { name: "Crunchbase Sales Prospecting", url: "https://spotio.com/blog/sales-statistics/", stat: "10+ hrs/week on prospecting" },
      ]
    },
    {
      category: "Network Effects & Technical",
      sources: [
        { name: "Zhang et al. (2015) - Metcalfe's Law Validation", url: "https://www.researchgate.net/publication/273895436_Tencent_and_Facebook_Data_Validate_Metcalfe's_Law", stat: "Network value ∝ n² validated with Facebook/Tencent data" },
        { name: "LinkedIn Engineering - Average Connections", url: "https://engineering.linkedin.com/blog", stat: "500-2,500 avg connections (professionals)" },
        { name: "Bessemer Venture Partners - SaaS Benchmarks", url: "https://www.bvp.com/atlas/", stat: "7:1+ LTV:CAC for top-quartile SaaS" },
        { name: "Levels.fyi Startup Compensation 2024", url: "https://www.levels.fyi/", stat: "$100-145K seed stage engineer salary" },
      ]
    },
  ];

  return (
    <div className="text-xs sm:text-sm">
      <p className="text-white/40 text-sm sm:text-base mb-4 sm:mb-6">REFERENCES</p>
      <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
        {references.map((category) => (
          <div key={category.category}>
            <p className="text-emerald-400 text-xs mb-2">{category.category}</p>
            <div className="space-y-1">
              {category.sources.map((source) => (
                <div key={source.name} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-white/60">
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-white/80 hover:text-emerald-400 underline underline-offset-2"
                  >
                    {source.name}
                  </a>
                  <span className="text-white/40">— {source.stat}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="text-white/30 text-xs mt-4 text-center">
        All statistics verified January 2026. Internal metrics (waitlist, retention, pipeline) from [know] analytics.
      </p>
    </div>
  );
}
