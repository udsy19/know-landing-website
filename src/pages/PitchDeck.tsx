import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

// Animated counter that increments from start to end
function AnimatedCounter({ end, duration = 2, start = 0 }: { end: number; duration?: number; start?: number }) {
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
      // Ease out cubic for smooth deceleration
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

// YC-ready pitch deck for [know]

export default function PitchDeck() {
  const [slide, setSlide] = useState(0);
  const totalSlides = 15; // Added future outlook slide
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
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-5xl sm:text-7xl md:text-9xl font-mono tracking-tighter leading-none"
      >
        [know]
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-xl sm:text-2xl md:text-3xl text-white/60 mt-6 sm:mt-8"
      >
        Your Network, Searchable.
      </motion.p>
    </div>
  );
}

function S_Problem() {
  return (
    <div className="space-y-6 relative pb-8">
      <p className="text-white/40 text-sm sm:text-base">THE PROBLEM</p>
      <h1 className="text-2xl sm:text-4xl md:text-5xl font-light leading-tight">
        Finding warm introductions is broken.
      </h1>
      <div className="space-y-3 text-base sm:text-xl text-white/70 pt-4">
        <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          Professionals spend <span className="text-white">6+ hours per week</span> asking "do you know anyone who..."
        </motion.p>
        <div className="grid grid-cols-2 gap-3 pt-4 text-sm sm:text-base">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-white/50">
            LinkedIn search → <span className="text-white/70">Hours</span>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-white/50">
            Old emails → <span className="text-white/70">Days</span>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-white/50">
            Friend intros → <span className="text-white/70">Weeks</span>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-white/50">
            Cold outreach → <span className="text-white/70">1-5% response</span>
          </motion.div>
        </div>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-lg sm:text-2xl pt-4"
      >
        Warm intros are <span className="text-emerald-400">15x more effective</span>.
        <br />
        <span className="text-white/50">But finding them is painfully slow.</span>
      </motion.p>
      <Citation>Sources: Crunchbase (6hrs prospecting/week), Belkins 2025 Cold Email Study (1-5% response), GrowLeads Warm Outreach Study (15x effectiveness)</Citation>
    </div>
  );
}

function S_WhyMatters() {
  return (
    <div>
      <p className="text-white/40 text-sm sm:text-base mb-4 sm:mb-6">WHY THIS MATTERS</p>
      <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-center">
          <div className="text-2xl sm:text-4xl md:text-5xl font-light">1-5%</div>
          <p className="text-white/40 mt-1 sm:mt-2 text-[10px] sm:text-xs">cold email<br />response rate</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-center">
          <div className="text-2xl sm:text-4xl md:text-5xl font-light text-emerald-400">46%</div>
          <p className="text-white/40 mt-1 sm:mt-2 text-[10px] sm:text-xs">warm intro<br />response rate</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-center">
          <div className="text-2xl sm:text-4xl md:text-5xl font-light">6hrs</div>
          <p className="text-white/40 mt-1 sm:mt-2 text-[10px] sm:text-xs">per week<br />prospecting</p>
        </motion.div>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center text-base sm:text-lg text-white/60 mb-6"
      >
        15x more effective, but painfully slow
      </motion.p>
      <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-center">
          <div className="text-2xl sm:text-4xl md:text-5xl font-light">84%</div>
          <p className="text-white/40 mt-1 sm:mt-2 text-[10px] sm:text-xs">of B2B deals<br />start with referral</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="text-center">
          <div className="text-2xl sm:text-4xl md:text-5xl font-light">69%</div>
          <p className="text-white/40 mt-1 sm:mt-2 text-[10px] sm:text-xs">faster close<br />with referrals</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="text-center">
          <div className="text-2xl sm:text-4xl md:text-5xl font-light text-emerald-400">71%</div>
          <p className="text-white/40 mt-1 sm:mt-2 text-[10px] sm:text-xs">higher conversion<br />with referrals</p>
        </motion.div>
      </div>
      <p className="text-[9px] sm:text-[10px] text-white/20 text-center">
        Sources: Belkins 2025, GrowLeads, ReferReach, TrueList
      </p>
    </div>
  );
}

function S_Insight() {
  return (
    <div className="relative pb-8">
      <p className="text-emerald-400 text-sm sm:text-base mb-6 sm:mb-8">THE INSIGHT</p>
      <h1 className="text-xl sm:text-3xl md:text-4xl font-light leading-tight mb-6 sm:mb-10">
        The average professional has:
      </h1>
      <div className="space-y-4 sm:space-y-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="flex items-baseline gap-4">
          <span className="text-3xl sm:text-5xl md:text-6xl font-light">50,000+</span>
          <span className="text-white/50 text-lg sm:text-2xl">emails</span>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="flex items-baseline gap-4">
          <span className="text-3xl sm:text-5xl md:text-6xl font-light">2,500+</span>
          <span className="text-white/50 text-lg sm:text-2xl">connections</span>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="flex items-baseline gap-4">
          <span className="text-3xl sm:text-5xl md:text-6xl font-light">10 years</span>
          <span className="text-white/50 text-lg sm:text-2xl">of relationship data</span>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 sm:mt-12 space-y-2"
      >
        <p className="text-white/50 text-lg sm:text-2xl">All sitting in your inbox.</p>
        <p className="text-white/50 text-lg sm:text-2xl">Completely unsearchable.</p>
        <p className="text-emerald-400 text-xl sm:text-3xl mt-4">We make it searchable.</p>
      </motion.div>
    </div>
  );
}

function S_Solution() {
  return (
    <div className="relative pb-8">
      <p className="text-white/40 text-sm sm:text-base mb-4 sm:mb-6">THE SOLUTION</p>
      <h1 className="text-xl sm:text-3xl md:text-4xl font-light mb-6 sm:mb-8">
        [know] turns <span className="text-emerald-400">hours</span> into <span className="text-emerald-400">seconds</span>.
      </h1>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/5 border border-white/10 rounded-lg p-4 mb-6"
      >
        <p className="text-white/50 text-sm">Search:</p>
        <p className="text-lg sm:text-xl">"VCs investing in AI robotics"</p>
        <p className="text-emerald-400 mt-2">→ 12 results in 0.8 seconds</p>
      </motion.div>

      <div className="grid grid-cols-3 gap-3 sm:gap-6 text-sm sm:text-base">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white/5 rounded-lg p-3 sm:p-4">
          <p className="text-emerald-400 font-medium mb-2 sm:mb-3">CONNECT</p>
          <div className="text-white/70 space-y-1">
            <p>Gmail</p>
            <p>Calendar</p>
            <p>LinkedIn</p>
          </div>
          <p className="text-white/40 text-xs sm:text-sm mt-3">2 minutes, one time</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white/5 rounded-lg p-3 sm:p-4">
          <p className="text-emerald-400 font-medium mb-2 sm:mb-3">SEARCH</p>
          <div className="text-white/70 space-y-1">
            <p>Any role,</p>
            <p>company,</p>
            <p>criteria</p>
          </div>
          <p className="text-white/40 text-xs sm:text-sm mt-3">Sub-second results</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-white/5 rounded-lg p-3 sm:p-4">
          <p className="text-emerald-400 font-medium mb-2 sm:mb-3">GET INTRO</p>
          <div className="text-white/70 space-y-1">
            <p>Warm path</p>
            <p>You → Target</p>
            <p>Strength score</p>
          </div>
          <p className="text-white/40 text-xs sm:text-sm mt-3">One click request</p>
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-center text-white/50 mt-6 text-sm sm:text-lg"
      >
        From hours of searching to seconds of results.
      </motion.p>
    </div>
  );
}

function S_Moat() {
  return (
    <div className="relative pb-8">
      <p className="text-white/40 text-sm sm:text-base mb-6 sm:mb-8">THE MOAT</p>
      <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h3 className="text-emerald-400 text-lg sm:text-xl mb-2">Network Effects (Validated)</h3>
          <p className="text-white/60 text-sm sm:text-base">Metcalfe's Law proven with Tencent/Facebook data. Network value grows n² as users join.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h3 className="text-emerald-400 text-lg sm:text-xl mb-2">Data Moat</h3>
          <p className="text-white/60 text-sm sm:text-base">Proprietary relationship graph. Each user adds ~930 connections to searchable paths.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h3 className="text-emerald-400 text-lg sm:text-xl mb-2">Privacy-First</h3>
          <p className="text-white/60 text-sm sm:text-base">Never read email content. Metadata only. Can't be replicated.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <h3 className="text-emerald-400 text-lg sm:text-xl mb-2">Switching Costs</h3>
          <p className="text-white/60 text-sm sm:text-base">Teams rely on it. Their network = locked in.</p>
        </motion.div>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-center text-xl sm:text-2xl mt-8 sm:mt-12"
      >
        The first platform to make your entire professional history<br />
        <span className="text-emerald-400">instantly searchable.</span>
      </motion.p>
      <Citation>Network effects: Zhang et al. 2015 (Metcalfe validation) · Avg professional connections: LinkedIn 2024</Citation>
    </div>
  );
}

function S_Market() {
  return (
    <div>
      <p className="text-white/40 text-sm sm:text-base mb-4">MARKET</p>
      <h1 className="text-2xl sm:text-4xl md:text-5xl font-light mb-4 sm:mb-6">
        <span className="text-emerald-400">$10B+</span> market by 2032
      </h1>
      <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-4">
        <div>
          <p className="text-white/40 text-[10px] sm:text-xs mb-2">TARGET MARKET</p>
          <p className="text-sm sm:text-base mb-1">100M knowledge workers in US</p>
          <p className="text-white/50 text-xs sm:text-sm mb-2">Wedge: 13M+ sales professionals</p>
          <div className="text-[10px] sm:text-xs text-white/40 space-y-0.5">
            <p>@ $30/month:</p>
            <p>→ Sales wedge = <span className="text-white/70">$4.7B</span></p>
            <p>→ US knowledge workers = <span className="text-white/70">$36B</span></p>
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
              <span>Apollo.io</span>
              <span className="text-white/40">$1.6B valuation</span>
            </div>
            <div className="flex justify-between">
              <span>Sales Intel Market</span>
              <span className="text-white/40">$4.4B → $10B</span>
            </div>
          </div>
        </div>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-xs sm:text-base text-white/60 mb-4"
      >
        They sell contact data. <span className="text-white">We reveal relationships you already have.</span>
      </motion.p>
      <p className="text-[9px] sm:text-[10px] text-white/20">
        Sources: ZoomInfo IR 2024, Apollo Series D, Fortune Business Insights, Zippia
      </p>
    </div>
  );
}

function S_Traction() {
  return (
    <div className="text-center relative pb-8">
      <p className="text-white/40 text-sm sm:text-base mb-6 sm:mb-8">TRACTION</p>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-5xl sm:text-7xl md:text-8xl font-light mb-2">
        <AnimatedCounter end={2847} start={2000} duration={2.5} />
      </motion.div>
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
          <p className="text-white/40 mb-1">Private beta</p>
          <p>50 users testing</p>
        </div>
        <div>
          <p className="text-white/40 mb-1">Public beta</p>
          <p>March 15 launch</p>
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
        We're not competing. <span className="text-white/40">We're creating.</span>
      </h1>
      <div className="space-y-2 text-[10px] sm:text-xs">
        <div className="grid grid-cols-3 gap-2 py-2 border-b border-white/10 text-white/40">
          <span></span>
          <span>THEM</span>
          <span className="text-emerald-400">[KNOW]</span>
        </div>
        {[
          { name: "LinkedIn Sales Nav", them: "Searches their database, not yours", us: "Searches YOUR relationships" },
          { name: "ZoomInfo / Apollo", them: "Sells contact data for cold outreach", us: "Finds warm intro paths instantly" },
          { name: "Pally (YC W24)", them: "Manual starring & tagging required", us: "Zero setup, instant results" },
          { name: "Happenstance (YC W24)", them: "Team-focused, Slack-dependent", us: "Individual-first, works anywhere" },
          { name: "Affinity", them: "$500/seat enterprise CRM", us: "$30/mo consumer product" },
        ].map((row, i) => (
          <motion.div
            key={row.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
            className="grid grid-cols-3 gap-2 py-1.5 border-b border-white/10"
          >
            <span className="text-white/70">{row.name}</span>
            <span className="text-white/40">{row.them}</span>
            <span className="text-emerald-400">{row.us}</span>
          </motion.div>
        ))}
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-xs sm:text-sm text-white/60 mt-4 text-center"
      >
        Privacy-first (metadata only). <span className="text-white">Sub-second search. Network effects.</span>
      </motion.p>
    </div>
  );
}

function S_Team() {
  return (
    <div>
      <p className="text-white/40 text-sm sm:text-base mb-6 sm:mb-8">TEAM</p>
      <div className="grid sm:grid-cols-2 gap-6 sm:gap-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="text-xl sm:text-3xl mb-2">Satyam Dave</div>
          <p className="text-emerald-400 text-sm sm:text-base mb-3">CEO & Co-founder</p>
          <ul className="space-y-1 text-white/60 text-xs sm:text-sm">
            <li>Ex-Microsoft · AI Product Manager</li>
            <li>Ex-Verkada · Solutions Engineer</li>
            <li>YC startup newsletter · 550+ subscribers</li>
            <li>Purdue University '26</li>
          </ul>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <div className="text-xl sm:text-3xl mb-2">Udaya Vijay Anand</div>
          <p className="text-emerald-400 text-sm sm:text-base mb-3">CTO & Co-founder</p>
          <ul className="space-y-1 text-white/60 text-xs sm:text-sm">
            <li>Ex-KPMG · Cyber Defense Engineer</li>
            <li>Ex-DBS Bank · Security Automation</li>
            <li>Built AI safety guardrails for enterprise</li>
            <li>Purdue University '26</li>
          </ul>
        </motion.div>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center text-white/40 mt-8 text-xs sm:text-sm"
      >
        Technical founders who've built at scale. Now building the future of networking.
      </motion.p>
    </div>
  );
}

function S_Ask() {
  return (
    <div>
      <p className="text-white/40 text-sm sm:text-base mb-4 sm:mb-6">THE ASK</p>
      <div className="text-center mb-6 sm:mb-8">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-4xl sm:text-6xl font-light text-emerald-400">
          $750K
        </motion.div>
        <p className="text-lg sm:text-xl text-white/40 mt-1">Pre-Seed at $5M post-money</p>
      </div>
      <div className="grid grid-cols-3 gap-3 sm:gap-6 text-xs sm:text-sm">
        <div>
          <p className="text-white/40 mb-2 sm:mb-3">USE OF FUNDS</p>
          <div className="space-y-1 text-white/70">
            <div className="flex justify-between"><span>Engineering</span><span>55%</span></div>
            <div className="flex justify-between"><span>Growth</span><span>25%</span></div>
            <div className="flex justify-between"><span>Operations</span><span>20%</span></div>
          </div>
          <p className="text-white/40 mt-3 text-[10px] sm:text-xs">15-month runway</p>
        </div>
        <div>
          <p className="text-white/40 mb-2 sm:mb-3">MILESTONES</p>
          <div className="space-y-1 text-white/70">
            <div><span className="text-white/40">M3:</span> 500 customers, $15K MRR</div>
            <div><span className="text-white/40">M6:</span> 1,500 customers, $45K MRR</div>
            <div><span className="text-white/40">M9:</span> 3,000 customers, $90K MRR</div>
            <div><span className="text-white/40">M12:</span> Series A ready, $1M+ ARR</div>
          </div>
        </div>
        <div>
          <p className="text-white/40 mb-2 sm:mb-3">WHY NOW</p>
          <div className="space-y-1 text-white/70">
            <p>2,847 signups in 3 weeks, $0 spent</p>
            <p>AI makes this possible now</p>
            <p>Cold outreach is dying</p>
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
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white/5 rounded-lg p-2 sm:p-3">
          <div className="flex items-baseline gap-1 mb-1">
            <span className="text-emerald-400 text-base sm:text-xl font-medium">$412K</span>
            <span className="text-white/30 text-[10px]">55%</span>
          </div>
          <p className="text-white/50 text-[9px] sm:text-[10px] mb-1.5">ENGINEERING</p>
          <div className="space-y-0.5 text-[8px] sm:text-[9px] text-white/40">
            <div className="flex justify-between"><span>2 Engineers</span><span>$325K</span></div>
            <div className="flex justify-between"><span>API Costs</span><span>$30K</span></div>
            <div className="flex justify-between"><span>AWS/Infra</span><span>$22K</span></div>
            <div className="flex justify-between"><span>Dev Tools</span><span>$35K</span></div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-white/5 rounded-lg p-2 sm:p-3">
          <div className="flex items-baseline gap-1 mb-1">
            <span className="text-emerald-400 text-base sm:text-xl font-medium">$188K</span>
            <span className="text-white/30 text-[10px]">25%</span>
          </div>
          <p className="text-white/50 text-[9px] sm:text-[10px] mb-1.5">GROWTH</p>
          <div className="space-y-0.5 text-[8px] sm:text-[9px] text-white/40">
            <div className="flex justify-between"><span>Paid Acquisition</span><span>$100K</span></div>
            <div className="flex justify-between"><span>Content & SEO</span><span>$48K</span></div>
            <div className="flex justify-between"><span>Community</span><span>$40K</span></div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white/5 rounded-lg p-2 sm:p-3">
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
        </motion.div>
      </div>

      {/* Middle: Graph and Network Effects */}
      <div className="grid grid-cols-5 gap-3 sm:gap-4">
        {/* Breakeven Chart - Takes 3 columns */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }} className="col-span-3">
          <div className="bg-white/5 rounded-lg p-3 sm:p-4 h-full">
            <p className="text-white/60 text-[10px] sm:text-xs mb-2">BREAKEVEN TIMELINE</p>
            <svg viewBox="0 0 280 100" className="w-full h-28 sm:h-32">
              {/* Background grid */}
              <defs>
                <pattern id="grid" width="28" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 28 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect x="35" y="10" width="235" height="70" fill="url(#grid)" />

              {/* Axes */}
              <line x1="35" y1="10" x2="35" y2="80" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
              <line x1="35" y1="80" x2="270" y2="80" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />

              {/* Breakeven threshold line */}
              <line x1="35" y1="45" x2="270" y2="45" stroke="rgba(239,68,68,0.4)" strokeWidth="1" strokeDasharray="4,4" />
              <text x="272" y="48" fill="rgba(239,68,68,0.6)" fontSize="7">$50K burn</text>

              {/* Revenue curve */}
              <motion.path
                d="M35 78 C60 76, 80 72, 100 65 S140 50, 160 45 S200 30, 230 20 L270 10"
                fill="none" stroke="#10b981" strokeWidth="2.5"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.4, duration: 2 }}
              />

              {/* Breakeven point marker */}
              <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.8 }}>
                <circle cx="160" cy="45" r="6" fill="#10b981" />
                <circle cx="160" cy="45" r="10" fill="none" stroke="#10b981" strokeWidth="1" opacity="0.4" />
              </motion.g>

              {/* Data points */}
              <circle cx="67" cy="76" r="2" fill="#10b981" opacity="0.6" />
              <circle cx="100" cy="65" r="2" fill="#10b981" opacity="0.6" />
              <circle cx="130" cy="52" r="2" fill="#10b981" opacity="0.6" />
              <circle cx="200" cy="30" r="2" fill="#10b981" opacity="0.6" />
              <circle cx="235" cy="18" r="2" fill="#10b981" opacity="0.6" />

              {/* Y-axis labels */}
              <text x="8" y="48" fill="rgba(255,255,255,0.4)" fontSize="7">$50K</text>
              <text x="8" y="83" fill="rgba(255,255,255,0.4)" fontSize="7">$0</text>
              <text x="8" y="18" fill="rgba(255,255,255,0.4)" fontSize="7">$100K</text>

              {/* X-axis labels */}
              <text x="35" y="92" fill="rgba(255,255,255,0.3)" fontSize="7">M0</text>
              <text x="100" y="92" fill="rgba(255,255,255,0.3)" fontSize="7">M5</text>
              <text x="160" y="92" fill="rgba(255,255,255,0.3)" fontSize="7">M8</text>
              <text x="230" y="92" fill="rgba(255,255,255,0.3)" fontSize="7">M15</text>

              {/* Annotation */}
              <text x="160" y="38" fill="#10b981" fontSize="8" fontWeight="bold" textAnchor="middle">BREAKEVEN</text>
              <text x="160" y="60" fill="rgba(255,255,255,0.5)" fontSize="6" textAnchor="middle">1,667 customers</text>
            </svg>

            <div className="flex justify-between items-center mt-2 text-[9px] sm:text-[10px]">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-0.5 bg-emerald-400"></div>
                  <span className="text-white/40">MRR @ $30/user</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-0.5 bg-red-400/60 border-dashed"></div>
                  <span className="text-white/40">$50K/mo burn</span>
                </div>
              </div>
              <span className="text-emerald-400 font-medium">Target: Month 8</span>
            </div>
          </div>
        </motion.div>

        {/* Network Effects - Takes 2 columns */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="col-span-2">
          <div className="bg-white/5 rounded-lg p-3 sm:p-4 h-full">
            <p className="text-white/60 text-[10px] sm:text-xs mb-1">NETWORK COVERAGE PROOF</p>
            <p className="text-white/30 text-[8px] mb-2">Graph theory: avg 930 LinkedIn connections per user</p>

            <div className="space-y-2">
              {[
                { users: "1K", percent: 73, label: "73% find warm path" },
                { users: "10K", percent: 94, label: "94% find warm path" },
                { users: "50K", percent: 99, label: "99%+ warm paths", highlight: true },
              ].map((item, i) => (
                <div key={item.users} className="flex items-center gap-2">
                  <span className="text-white/40 text-[9px] w-8">{item.users}</span>
                  <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${item.highlight ? 'bg-emerald-400' : 'bg-emerald-400/70'}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percent}%` }}
                      transition={{ delay: 0.5 + i * 0.2, duration: 0.8 }}
                    />
                  </div>
                  <span className={`text-[9px] w-16 text-right ${item.highlight ? 'text-emerald-400 font-medium' : 'text-white/50'}`}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-3 pt-2 border-t border-white/10 text-[8px] sm:text-[9px] text-white/30">
              <p>2nd-degree reach: users × 930 × overlap factor</p>
              <p className="mt-0.5">At 10K users → <span className="text-white/50">9.3M reachable people</span></p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom: Future Capabilities */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-3 bg-gradient-to-r from-emerald-400/5 via-emerald-400/10 to-transparent rounded-lg p-2 sm:p-3"
      >
        <p className="text-emerald-400 text-[9px] sm:text-[10px] mb-2">FUTURE PRODUCT EXPANSION</p>
        <div className="grid grid-cols-3 gap-3 text-[8px] sm:text-[9px]">
          <div>
            <p className="text-white/70 font-medium">Teams & Enterprise</p>
            <p className="text-white/40">Pooled network search across orgs → 10x reach per seat</p>
          </div>
          <div>
            <p className="text-white/70 font-medium">Intro Success Scoring</p>
            <p className="text-white/40">ML model predicts which paths convert based on relationship signals</p>
          </div>
          <div>
            <p className="text-white/70 font-medium">Proactive Recommendations</p>
            <p className="text-white/40">"You should connect with X" - AI surfaces opportunities before you search</p>
          </div>
        </div>
      </motion.div>

      <p className="text-[7px] sm:text-[8px] text-white/20 mt-2 text-center">
        Network coverage: Erdős-Rényi model, Backstrom et al. 2012 · Avg connections: LinkedIn 2024 · Salaries: Levels.fyi 2024
      </p>
    </div>
  );
}

function S_FutureOutlook() {
  const milestones = [
    {
      users: "1,000",
      timeline: "Month 3",
      color: "from-emerald-400/20 to-emerald-400/5",
      financial: { mrr: "$15K", arr: "$180K", valuation: "~$2M" },
      network: { reach: "930K people", coverage: "73%", paths: "1M+" },
      unlocks: ["Product-market fit validation", "First enterprise pilots", "Referral loop activated"]
    },
    {
      users: "10,000",
      timeline: "Month 9",
      color: "from-emerald-400/40 to-emerald-400/10",
      financial: { mrr: "$90K", arr: "$1.08M", valuation: "~$10M" },
      network: { reach: "9.3M people", coverage: "94%", paths: "50M+" },
      unlocks: ["Giant component formed", "Series A ready", "Team features launch"]
    },
    {
      users: "50,000",
      timeline: "Month 18",
      color: "from-emerald-400/60 to-emerald-400/20",
      financial: { mrr: "$450K", arr: "$5.4M", valuation: "~$50M" },
      network: { reach: "46.5M people", coverage: "99%+", paths: "500M+" },
      unlocks: ["Near-universal coverage", "Enterprise dominant", "Platform ecosystem"]
    }
  ];

  return (
    <div className="relative pb-8">
      <p className="text-white/40 text-sm sm:text-base mb-2">FUTURE OUTLOOK</p>
      <p className="text-white/60 text-xs sm:text-sm mb-4">What happens as we scale — backed by network science</p>

      <div className="space-y-3">
        {milestones.map((m, i) => (
          <motion.div
            key={m.users}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.15 }}
            className={`bg-gradient-to-r ${m.color} rounded-lg p-3 sm:p-4 border border-emerald-400/20`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <span className="text-xl sm:text-2xl font-light text-white">{m.users}</span>
                <span className="text-white/40 text-xs">users</span>
              </div>
              <span className="text-emerald-400 text-xs sm:text-sm font-medium">{m.timeline}</span>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-4 text-[9px] sm:text-[10px]">
              {/* Financial */}
              <div>
                <p className="text-white/40 mb-1">FINANCIAL</p>
                <div className="space-y-0.5 text-white/70">
                  <p>MRR: <span className="text-white">{m.financial.mrr}</span></p>
                  <p>ARR: <span className="text-white">{m.financial.arr}</span></p>
                  <p>Est. Val: <span className="text-emerald-400">{m.financial.valuation}</span></p>
                </div>
              </div>

              {/* Network */}
              <div>
                <p className="text-white/40 mb-1">NETWORK EFFECT</p>
                <div className="space-y-0.5 text-white/70">
                  <p>2° Reach: <span className="text-white">{m.network.reach}</span></p>
                  <p>Match Rate: <span className="text-white">{m.network.coverage}</span></p>
                  <p>Paths: <span className="text-white">{m.network.paths}</span></p>
                </div>
              </div>

              {/* Unlocks */}
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
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-3 text-center"
      >
        <p className="text-xs sm:text-sm text-white/50">
          Network value grows <span className="text-emerald-400">n²</span> (Metcalfe's Law) — validated by Tencent/Facebook data
        </p>
        <p className="text-[8px] sm:text-[9px] text-white/30 mt-1">
          Zhang et al. 2015 · Giant component threshold: Erdős-Rényi · Avg 930 connections/user: LinkedIn 2024
        </p>
      </motion.div>
    </div>
  );
}

function S_Close() {
  return (
    <div className="text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl sm:text-4xl md:text-5xl font-light leading-tight mb-6 sm:mb-10"
      >
        The path to anyone<br />
        <span className="text-white/30">shouldn't be cold.</span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
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
      </motion.div>
    </div>
  );
}

function S_References() {
  const references = [
    {
      category: "Cold Email & Response Rates",
      sources: [
        { name: "Belkins 2025 Cold Email Study", url: "https://belkins.io/blog/cold-email-response-rates", stat: "1-5% average response rate" },
        { name: "Martal B2B Cold Email Statistics", url: "https://martal.ca/b2b-cold-email-statistics-lb/", stat: "5.1% average in 2024" },
        { name: "GrowLeads Warm vs Cold Study", url: "https://growleads.io/blog/warm-outreach-vs-cold-email/", stat: "46% warm intro response (C-level)" },
      ]
    },
    {
      category: "Referral & Conversion Statistics",
      sources: [
        { name: "ReferReach Referral Statistics", url: "https://referreach.com/38-statistics-that-show-the-importance-of-referrals/", stat: "84% of B2B deals start with referral" },
        { name: "TrueList Referral Marketing", url: "https://truelist.co/blog/referral-marketing-statistics/", stat: "69% faster close, 71% higher conversion" },
        { name: "Draftboard Warm Intros", url: "https://www.draftboard.com/blog/the-power-of-warm-intros-why-cold-outreach-is-fading-in-b2b-sales", stat: "10-15x higher conversion" },
      ]
    },
    {
      category: "Market Size & Competitors",
      sources: [
        { name: "ZoomInfo Investor Relations", url: "https://ir.zoominfo.com/", stat: "$1.21B revenue (2024)" },
        { name: "Apollo.io Series D Announcement", url: "https://news.crunchbase.com/sales-marketing/apollo-io-funding-sales-tech-unicorn/", stat: "$1.6B valuation" },
        { name: "Fortune Business Insights", url: "https://www.fortunebusinessinsights.com/sales-intelligence-market-109103", stat: "$4.4B → $10B market (2024-2032)" },
      ]
    },
    {
      category: "Workforce & Productivity",
      sources: [
        { name: "Zippia Sales Demographics", url: "https://www.zippia.com/sales-representative-jobs/demographics/", stat: "13M+ sales workers in US" },
        { name: "GitHub/Miessler Knowledge Workers", url: "https://gist.github.com/danielmiessler/2dc039762a202b083753b1400452614d", stat: "100M knowledge workers in US" },
        { name: "Crunchbase Sales Prospecting", url: "https://spotio.com/blog/sales-statistics/", stat: "5-6 hrs/week on prospecting" },
        { name: "Salesforce State of Sales 2024", url: "https://www.salesforce.com/", stat: "30% of time actually selling" },
      ]
    },
    {
      category: "Network Effects & Technical",
      sources: [
        { name: "Zhang et al. (2015) - Metcalfe's Law Validation", url: "https://www.researchgate.net/publication/273895436_Tencent_and_Facebook_Data_Validate_Metcalfe's_Law", stat: "Network value ∝ n² validated with Facebook/Tencent data" },
        { name: "Daraghmi & Yuan (2014) - Social Network Degrees", url: "https://www.researchgate.net/publication/262284593_We_are_so_close_less_than_4_degrees_separating_you_and_me", stat: "3.4 average degrees of separation" },
        { name: "Backstrom et al. (2012) - Facebook Degrees of Separation", url: "https://arxiv.org/abs/1111.4570", stat: "4.74 degrees among 721M users" },
        { name: "LinkedIn Engineering - Average Connections", url: "https://engineering.linkedin.com/blog", stat: "500-1,300 avg connections (professionals)" },
        { name: "Erdős-Rényi Random Graph Model", url: "https://en.wikipedia.org/wiki/Erd%C5%91s%E2%80%93R%C3%A9nyi_model", stat: "Giant component emerges when avg degree > 1" },
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
        All statistics verified January 2026. Internal metrics (waitlist, growth) from [know] analytics.
      </p>
    </div>
  );
}
