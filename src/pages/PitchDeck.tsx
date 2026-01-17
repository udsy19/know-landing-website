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

// YC-ready pitch deck for [know]

export default function PitchDeck() {
  const [slide, setSlide] = useState(0);
  const totalSlides = 12;
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

      <div className="fixed top-4 right-4 text-sm text-white/40 font-mono z-50">
        {slide + 1} / {totalSlides}
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
    case 11: return <S_Close />;
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
    <div className="space-y-6">
      <p className="text-white/40 text-sm sm:text-base">THE PROBLEM</p>
      <h1 className="text-2xl sm:text-4xl md:text-5xl font-light leading-tight">
        Finding warm introductions is broken.
      </h1>
      <div className="space-y-3 text-base sm:text-xl text-white/70 pt-4">
        <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          Professionals spend <span className="text-white">10+ hours per week</span> asking "do you know anyone who..."
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
            Cold outreach → <span className="text-white/70">2% response</span>
          </motion.div>
        </div>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-lg sm:text-2xl pt-4"
      >
        Warm intros close <span className="text-emerald-400">34x more deals</span>.
        <br />
        <span className="text-white/50">But finding them is still manual in 2026.</span>
      </motion.p>
    </div>
  );
}

function S_WhyMatters() {
  return (
    <div>
      <p className="text-white/40 text-sm sm:text-base mb-6 sm:mb-8">WHY THIS MATTERS</p>
      <div className="grid grid-cols-3 gap-4 sm:gap-8 mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-center">
          <div className="text-3xl sm:text-5xl md:text-6xl font-light">2%</div>
          <p className="text-white/40 mt-2 text-xs sm:text-sm">cold email<br />response rate</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-center">
          <div className="text-3xl sm:text-5xl md:text-6xl font-light text-emerald-400">68%</div>
          <p className="text-white/40 mt-2 text-xs sm:text-sm">warm intro<br />response rate</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-center">
          <div className="text-3xl sm:text-5xl md:text-6xl font-light">10hrs</div>
          <p className="text-white/40 mt-2 text-xs sm:text-sm">per week<br />wasted</p>
        </motion.div>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center text-lg sm:text-xl text-white/60 mb-8"
      >
        34x more effective, but manual
      </motion.p>
      <div className="grid grid-cols-3 gap-4 sm:gap-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-center">
          <div className="text-3xl sm:text-5xl md:text-6xl font-light">91%</div>
          <p className="text-white/40 mt-2 text-xs sm:text-sm">of cold emails<br />ignored</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="text-center">
          <div className="text-3xl sm:text-5xl md:text-6xl font-light">3 wks</div>
          <p className="text-white/40 mt-2 text-xs sm:text-sm">to find one<br />warm path</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="text-center">
          <div className="text-3xl sm:text-5xl md:text-6xl font-light text-red-400">$47B</div>
          <p className="text-white/40 mt-2 text-xs sm:text-sm">wasted on<br />cold outreach</p>
        </motion.div>
      </div>
    </div>
  );
}

function S_Insight() {
  return (
    <div>
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
    <div>
      <p className="text-white/40 text-sm sm:text-base mb-4 sm:mb-6">THE SOLUTION</p>
      <h1 className="text-xl sm:text-3xl md:text-4xl font-light mb-6 sm:mb-8">
        [know] turns <span className="text-emerald-400">10 hours</span> into <span className="text-emerald-400">10 seconds</span>.
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
          <p className="text-white/40 text-xs sm:text-sm mt-3">0.8 seconds per search</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-white/5 rounded-lg p-3 sm:p-4">
          <p className="text-emerald-400 font-medium mb-2 sm:mb-3">GET INTRO</p>
          <div className="text-white/70 space-y-1">
            <p>Sarah Chen</p>
            <p>You → Sarah</p>
            <p>Score: 0.92</p>
          </div>
          <p className="text-white/40 text-xs sm:text-sm mt-3">One click, 85% response</p>
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
    <div>
      <p className="text-white/40 text-sm sm:text-base mb-6 sm:mb-8">THE MOAT</p>
      <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h3 className="text-emerald-400 text-lg sm:text-xl mb-2">Network Effects</h3>
          <p className="text-white/60 text-sm sm:text-base">More users = better connection paths discovered</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h3 className="text-emerald-400 text-lg sm:text-xl mb-2">Data Moat</h3>
          <p className="text-white/60 text-sm sm:text-base">Proprietary relationship graph gets smarter daily</p>
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
        Tech is hard. <span className="text-white/50">We figured it out.</span>
      </motion.p>
    </div>
  );
}

function S_Market() {
  return (
    <div>
      <p className="text-white/40 text-sm sm:text-base mb-4 sm:mb-6">MARKET</p>
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-light mb-6 sm:mb-8">
        <span className="text-emerald-400">$117B</span> global opportunity
      </h1>
      <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 mb-6">
        <div>
          <p className="text-white/40 text-xs sm:text-sm mb-3">TARGET MARKET</p>
          <p className="text-base sm:text-lg mb-2">200M knowledge workers globally</p>
          <p className="text-white/50 text-sm sm:text-base mb-3">Wedge: 10M sales reps + recruiters in US</p>
          <div className="text-xs sm:text-sm text-white/40 space-y-1">
            <p>@ $49/month:</p>
            <p>→ Wedge (10M) = <span className="text-white/70">$5.9B</span></p>
            <p>→ Full market (200M) = <span className="text-white/70">$117B</span></p>
          </div>
        </div>
        <div>
          <p className="text-white/40 text-xs sm:text-sm mb-3">MARKET VALIDATION</p>
          <div className="space-y-2 text-sm sm:text-base">
            <div className="flex justify-between">
              <span>ZoomInfo</span>
              <span className="text-white/40">$1.2B revenue</span>
            </div>
            <div className="flex justify-between">
              <span>LinkedIn Sales Nav</span>
              <span className="text-white/40">$1.5B revenue</span>
            </div>
            <div className="flex justify-between">
              <span>Apollo.io</span>
              <span className="text-white/40">$1.6B valuation</span>
            </div>
          </div>
        </div>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-sm sm:text-lg text-white/60"
      >
        They sell contact data. <span className="text-white">We reveal relationships you already have.</span>
        <br />
        <span className="text-emerald-400">Bigger market. Better product.</span>
      </motion.p>
    </div>
  );
}

function S_Traction() {
  return (
    <div className="text-center">
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

      <div className="grid grid-cols-3 gap-4 text-xs sm:text-sm text-white/60 max-w-lg mx-auto">
        <div>
          <p className="text-white/40 mb-1">Private beta</p>
          <p>50 users testing</p>
        </div>
        <div>
          <p className="text-white/40 mb-1">Public beta</p>
          <p>Jan 27 launch</p>
        </div>
        <div>
          <p className="text-white/40 mb-1">Pipeline</p>
          <p className="text-emerald-400">$145K ARR</p>
        </div>
      </div>
    </div>
  );
}

function S_Competition() {
  return (
    <div>
      <p className="text-white/40 text-sm sm:text-base mb-4 sm:mb-6">COMPETITION</p>
      <h1 className="text-xl sm:text-3xl font-light mb-6">
        We're not competing. <span className="text-white/40">We're creating.</span>
      </h1>
      <div className="space-y-3 text-xs sm:text-sm">
        <div className="grid grid-cols-3 gap-2 py-2 border-b border-white/10 text-white/40">
          <span></span>
          <span>THEM</span>
          <span className="text-emerald-400">[KNOW]</span>
        </div>
        {[
          { name: "LinkedIn Sales Nav", them: "Searches their 1B user database", us: "Searches YOUR relationships" },
          { name: "ZoomInfo / Apollo", them: "Sells contact data for strangers", us: "Finds warm intro paths instantly" },
          { name: "Affinity", them: "$500/seat enterprise CRM", us: "$49/mo consumer product" },
          { name: "Pally/Clay", them: "Tracks relationships manually", us: "AI-powered, 0.8s results" },
        ].map((row, i) => (
          <motion.div
            key={row.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.1 }}
            className="grid grid-cols-3 gap-2 py-2 border-b border-white/10"
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
        className="text-sm sm:text-base text-white/60 mt-6 text-center"
      >
        They sell data about strangers. <span className="text-white">We reveal relationships you already have.</span>
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
          <p className="text-white/40 mt-3 text-xs">15-month runway</p>
        </div>
        <div>
          <p className="text-white/40 mb-2 sm:mb-3">MILESTONES</p>
          <div className="space-y-1 text-white/70">
            <div><span className="text-white/40">M3:</span> 500 customers, $25K MRR</div>
            <div><span className="text-white/40">M6:</span> 1,500 customers, $75K MRR</div>
            <div><span className="text-white/40">M9:</span> 3,000 customers, $150K MRR</div>
            <div><span className="text-white/40">M12:</span> Series A ready, $1M ARR</div>
          </div>
        </div>
        <div>
          <p className="text-white/40 mb-2 sm:mb-3">WHY NOW</p>
          <div className="space-y-2 text-white/70">
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

function S_Close() {
  return (
    <div className="text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl sm:text-4xl md:text-5xl font-light leading-tight mb-8 sm:mb-12"
      >
        The path to anyone<br />
        <span className="text-white/30">shouldn't be cold.</span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="text-4xl sm:text-6xl font-mono mb-4">[know]</div>
        <p className="text-white/40 mb-8">useknow.io</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-12 text-sm sm:text-base">
          <div>
            <p className="text-white">Satyam Dave</p>
            <p className="text-white/40">CEO & Co-founder</p>
          </div>
          <div>
            <p className="text-white">Udaya Vijay Anand</p>
            <p className="text-white/40">CTO & Co-founder</p>
          </div>
        </div>
        <p className="text-emerald-400 mt-6 text-lg">founders@useknow.io</p>
      </motion.div>
    </div>
  );
}
