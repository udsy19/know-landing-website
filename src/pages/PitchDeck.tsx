import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// PPT-style pitch deck with landscape layout

export default function PitchDeck() {
  const [slide, setSlide] = useState(0);
  const totalSlides = 12;
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const next = useCallback(() => setSlide((s) => Math.min(s + 1, totalSlides - 1)), []);
  const prev = useCallback(() => setSlide((s) => Math.max(s - 1, 0)), []);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); next(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [next, prev]);

  // Touch swipe navigation
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

    // Only trigger if horizontal swipe is dominant
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      if (diffX > 0) next();
      else prev();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Tap navigation - tap right side for next, left side for prev
  const handleTap = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;

    // Ignore taps on navigation dots area (bottom 100px)
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
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-white/10 z-50">
        <motion.div
          className="h-full bg-white"
          initial={false}
          animate={{ width: `${((slide + 1) / totalSlides) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Slide counter */}
      <div className="fixed top-4 right-4 text-sm text-white/40 font-mono z-50">
        {slide + 1} / {totalSlides}
      </div>

      {/* Left arrow */}
      <button
        onClick={(e) => { e.stopPropagation(); prev(); }}
        className={`fixed left-2 sm:left-4 top-1/2 -translate-y-1/2 z-50 p-2 sm:p-3 rounded-full bg-white/5 hover:bg-white/10 transition-all ${slide === 0 ? 'opacity-20 cursor-not-allowed' : 'opacity-60 hover:opacity-100'}`}
        disabled={slide === 0}
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Right arrow */}
      <button
        onClick={(e) => { e.stopPropagation(); next(); }}
        className={`fixed right-2 sm:right-4 top-1/2 -translate-y-1/2 z-50 p-2 sm:p-3 rounded-full bg-white/5 hover:bg-white/10 transition-all ${slide === totalSlides - 1 ? 'opacity-20 cursor-not-allowed' : 'opacity-60 hover:opacity-100'}`}
        disabled={slide === totalSlides - 1}
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide container - full screen on mobile, 16:9 on desktop */}
      <div className="min-h-screen flex items-center justify-center px-12 sm:px-16 md:px-8 py-16 sm:py-8">
        <div className="w-full max-w-6xl md:aspect-video bg-black rounded-lg overflow-visible relative flex items-center justify-center md:px-20 md:py-12">
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

      {/* Bottom navigation dots */}
      <div className="fixed bottom-4 sm:bottom-6 left-0 right-0 flex justify-center gap-1.5 sm:gap-2 z-50 px-4">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); setSlide(i); }}
            className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
              i === slide
                ? "bg-white w-6 sm:w-8"
                : "bg-white/30 hover:bg-white/50 w-1.5 sm:w-2"
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
    case 1: return <S_Problem1 />;
    case 2: return <S_Problem2 />;
    case 3: return <S_Insight />;
    case 4: return <S_Solution />;
    case 5: return <S_HowItWorks />;
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
        className="text-6xl sm:text-[8rem] md:text-[12rem] font-mono tracking-tighter leading-none"
      >
        [know]
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-xl sm:text-2xl md:text-3xl text-white/50 mt-6 sm:mt-8 px-4"
      >
        Know anyone, before you meet them.
      </motion.p>
    </div>
  );
}

function S_Problem1() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <p className="text-white/40 text-base sm:text-lg">THE PROBLEM</p>
      <h1 className="text-3xl sm:text-5xl md:text-7xl font-light leading-tight">
        You need to reach<br />
        <span className="text-white/40">a decision-maker.</span>
      </h1>
      <div className="pt-4 sm:pt-8 space-y-3 sm:space-y-4 text-lg sm:text-2xl text-white/60">
        <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
          You find them on LinkedIn.
        </motion.p>
        <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
          You write the perfect cold email.
        </motion.p>
        <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }}>
          You send it.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9 }}
          className="text-white text-3xl pt-4"
        >
          Nothing.
        </motion.p>
      </div>
    </div>
  );
}

function S_Problem2() {
  return (
    <div className="text-center">
      <p className="text-white/40 text-base sm:text-lg mb-6 sm:mb-8">THE DATA</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 md:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-5xl sm:text-7xl md:text-8xl font-light">91%</div>
          <p className="text-white/40 mt-2 sm:mt-4 text-base sm:text-lg">of cold emails<br />get no response</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="text-5xl sm:text-7xl md:text-8xl font-light">1.2%</div>
          <p className="text-white/40 mt-2 sm:mt-4 text-base sm:text-lg">cold outreach<br />conversion rate</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="text-5xl sm:text-7xl md:text-8xl font-light text-emerald-400">30%</div>
          <p className="text-white/40 mt-2 sm:mt-4 text-base sm:text-lg">warm intro<br />conversion rate</p>
        </motion.div>
      </div>
    </div>
  );
}

function S_Insight() {
  return (
    <div>
      <p className="text-emerald-400 text-base sm:text-lg mb-6 sm:mb-8">THE INSIGHT</p>
      <h1 className="text-3xl sm:text-5xl md:text-7xl font-light leading-tight mb-4 sm:mb-8">
        Everyone has a network.
      </h1>
      <h2 className="text-3xl sm:text-5xl md:text-7xl font-light leading-tight text-white/30">
        Nobody knows how to use it.
      </h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-base sm:text-xl text-white/50 mt-8 sm:mt-12 max-w-2xl"
      >
        Your inbox holds years of relationship data. Who you email, how often,
        who responds. It's more valuable than any CRM — but it's locked away.
      </motion.p>
    </div>
  );
}

function S_Solution() {
  return (
    <div>
      <p className="text-white/40 text-base sm:text-lg mb-6 sm:mb-8">THE SOLUTION</p>
      <h1 className="text-2xl sm:text-5xl md:text-7xl font-light leading-tight mb-8 sm:mb-12">
        [know] finds the warmest<br />
        path to anyone.
      </h1>
      <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 text-base sm:text-xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="border-l-2 border-white/20 pl-6"
        >
          <span className="text-emerald-400">Search</span> for any person
          <p className="text-white/40 mt-1">CEO, investor, hiring manager</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="border-l-2 border-white/20 pl-6"
        >
          <span className="text-emerald-400">See</span> who can connect you
          <p className="text-white/40 mt-1">You → mutual contact → them</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="border-l-2 border-white/20 pl-6"
        >
          <span className="text-emerald-400">Research</span> before you reach out
          <p className="text-white/40 mt-1">AI-generated brief in minutes</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="border-l-2 border-white/20 pl-6"
        >
          <span className="text-emerald-400">Request</span> the introduction
          <p className="text-white/40 mt-1">One click to activate the path</p>
        </motion.div>
      </div>
    </div>
  );
}

function S_HowItWorks() {
  return (
    <div>
      <p className="text-white/40 text-base sm:text-lg mb-6 sm:mb-8">HOW IT WORKS</p>
      <h1 className="text-2xl sm:text-4xl md:text-5xl font-light leading-tight mb-8 sm:mb-12">
        Connect your email. We analyze metadata only.
        <span className="text-white/30"> Never content.</span>
      </h1>
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mb-8 sm:mb-12">
        {["Gmail", "Outlook", "Calendar", "LinkedIn"].map((name, i) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-white/5 border border-white/10 rounded-full text-sm sm:text-lg"
          >
            {name}
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-white/30 text-xl sm:text-2xl"
        >
          →
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
          className="px-4 sm:px-6 py-2 sm:py-3 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-sm sm:text-lg text-emerald-400"
        >
          Relationship Score
        </motion.div>
      </div>
      <p className="text-center text-white/40 text-base sm:text-lg">
        Privacy-first. We never read your emails.
      </p>
    </div>
  );
}

function S_Market() {
  return (
    <div>
      <p className="text-white/40 text-base sm:text-lg mb-6 sm:mb-8">MARKET</p>
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-light mb-8 sm:mb-12">
        <span className="text-emerald-400">$3.5B</span> opportunity
      </h1>
      <div className="grid sm:grid-cols-2 gap-8 sm:gap-12">
        <div>
          <p className="text-white/40 mb-3 sm:mb-4 text-sm sm:text-base">TARGET USERS</p>
          <p className="text-lg sm:text-2xl">10M+ sales reps, recruiters, VCs, founders</p>
          <p className="text-white/40 mt-2 text-sm sm:text-base">@ $29–79/month</p>
        </div>
        <div>
          <p className="text-white/40 mb-3 sm:mb-4 text-sm sm:text-base">MARKET VALIDATION</p>
          <div className="space-y-2 sm:space-y-3">
            <div className="flex justify-between text-sm sm:text-lg">
              <span>ZoomInfo</span>
              <span className="text-white/40">$1.2B revenue</span>
            </div>
            <div className="flex justify-between text-sm sm:text-lg">
              <span>LinkedIn Sales Nav</span>
              <span className="text-white/40">$1.5B revenue</span>
            </div>
            <div className="flex justify-between text-sm sm:text-lg">
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
        className="text-base sm:text-xl text-white/50 mt-8 sm:mt-12"
      >
        They sell contact data. We reveal the relationships you already have.
      </motion.p>
    </div>
  );
}

function S_Traction() {
  return (
    <div className="text-center">
      <p className="text-white/40 text-base sm:text-lg mb-6 sm:mb-8">TRACTION</p>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-6xl sm:text-8xl md:text-9xl font-light mb-2 sm:mb-4"
      >
        2,847
      </motion.div>
      <p className="text-xl sm:text-2xl text-white/60 mb-2">waitlist signups</p>
      <p className="text-emerald-400 text-base sm:text-xl">in 3 weeks · $0 marketing spend</p>

      <div className="grid grid-cols-2 gap-6 sm:gap-8 mt-10 sm:mt-16 text-left max-w-2xl mx-auto">
        <div className="border-l-2 border-white/10 pl-4 sm:pl-6">
          <p className="text-2xl sm:text-4xl font-light">MVP</p>
          <p className="text-white/40 text-sm sm:text-base">Built in 8 weeks</p>
        </div>
        <div className="border-l-2 border-white/10 pl-4 sm:pl-6">
          <p className="text-2xl sm:text-4xl font-light">100%</p>
          <p className="text-white/40 text-sm sm:text-base">Organic growth</p>
        </div>
      </div>
    </div>
  );
}

function S_Competition() {
  return (
    <div>
      <p className="text-white/40 text-base sm:text-lg mb-6 sm:mb-8">COMPETITION</p>
      <h1 className="text-2xl sm:text-4xl md:text-5xl font-light mb-8 sm:mb-12">
        We're not competing. <span className="text-white/30">We're creating.</span>
      </h1>
      <div className="space-y-3 sm:space-y-4">
        {[
          { name: "LinkedIn Sales Nav", them: "Searches their database", us: "Maps your relationships" },
          { name: "ZoomInfo / Apollo", them: "Sells contact data", us: "Finds warm paths" },
          { name: "Affinity", them: "$500/seat enterprise CRM", us: "$29/mo for everyone" },
        ].map((row, i) => (
          <motion.div
            key={row.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="grid grid-cols-3 gap-2 sm:gap-4 py-3 sm:py-4 border-b border-white/10 text-xs sm:text-base"
          >
            <span className="font-medium">{row.name}</span>
            <span className="text-white/40">{row.them}</span>
            <span className="text-emerald-400">{row.us}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function S_Team() {
  return (
    <div>
      <p className="text-white/40 text-base sm:text-lg mb-6 sm:mb-8">TEAM</p>
      <div className="grid sm:grid-cols-2 gap-8 sm:gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-2xl sm:text-4xl mb-2 sm:mb-4">Satyam Dave</div>
          <p className="text-emerald-400 text-base sm:text-lg mb-3 sm:mb-4">CEO</p>
          <ul className="space-y-1 sm:space-y-2 text-white/60 text-sm sm:text-base">
            <li>AI Product Manager @ Microsoft</li>
            <li>Solutions Engineer @ Verkada</li>
            <li>YC startup newsletter · 550+ subscribers</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-2xl sm:text-4xl mb-2 sm:mb-4">Udaya Vijay Anand</div>
          <p className="text-emerald-400 text-base sm:text-lg mb-3 sm:mb-4">CTO</p>
          <ul className="space-y-1 sm:space-y-2 text-white/60 text-sm sm:text-base">
            <li>Cyber Defense @ KPMG India</li>
            <li>Built AI safety guardrails for enterprise</li>
            <li>Automated security intel · 70K+ pages</li>
          </ul>
        </motion.div>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center text-white/40 mt-8 sm:mt-12 text-sm sm:text-base"
      >
        Purdue University '26
      </motion.p>
    </div>
  );
}

function S_Ask() {
  return (
    <div>
      <p className="text-white/40 text-base sm:text-lg mb-6 sm:mb-8">THE ASK</p>
      <div className="text-center mb-10 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-5xl sm:text-7xl md:text-8xl font-light text-emerald-400"
        >
          $500K
        </motion.div>
        <p className="text-xl sm:text-2xl text-white/40 mt-2">Pre-Seed</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-sm sm:text-base">
        <div>
          <p className="text-white/40 text-xs sm:text-sm mb-3 sm:mb-4">USE OF FUNDS</p>
          <div className="space-y-2">
            <div className="flex justify-between"><span>Product</span><span className="text-white/40">40%</span></div>
            <div className="flex justify-between"><span>Engineering</span><span className="text-white/40">40%</span></div>
            <div className="flex justify-between"><span>Growth</span><span className="text-white/40">20%</span></div>
          </div>
        </div>
        <div>
          <p className="text-white/40 text-xs sm:text-sm mb-3 sm:mb-4">MILESTONES</p>
          <div className="space-y-2">
            <div className="flex justify-between"><span>Month 3</span><span className="text-white/40">1K users</span></div>
            <div className="flex justify-between"><span>Month 6</span><span className="text-white/40">$50K MRR</span></div>
            <div className="flex justify-between"><span>Month 12</span><span className="text-white/40">Series A</span></div>
          </div>
        </div>
        <div>
          <p className="text-white/40 text-xs sm:text-sm mb-3 sm:mb-4">WHY NOW</p>
          <ul className="space-y-2 text-white/70">
            <li>AI makes research 10x cheaper</li>
            <li>Cold outreach declining fast</li>
            <li>No one owns this category</li>
          </ul>
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
        className="text-3xl sm:text-5xl md:text-7xl font-light leading-tight"
      >
        The path to anyone<br />
        <span className="text-white/30">shouldn't be cold.</span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-10 sm:mt-16"
      >
        <div className="text-4xl sm:text-6xl font-mono">[know]</div>
        <p className="text-white/40 mt-4 text-sm sm:text-base">useknow.io</p>
      </motion.div>
    </div>
  );
}
