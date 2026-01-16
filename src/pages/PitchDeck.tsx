import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Clean, minimal pitch deck - Apple keynote style
// One idea per slide. Let the words breathe.

export default function PitchDeck() {
  const [slide, setSlide] = useState(0);
  const totalSlides = 12;

  const next = useCallback(() => setSlide((s) => Math.min(s + 1, totalSlides - 1)), []);
  const prev = useCallback(() => setSlide((s) => Math.max(s - 1, 0)), []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); next(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
      if (e.key === "f") document.documentElement.requestFullscreen?.();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [next, prev]);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Minimal progress */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-white/10 z-50">
        <motion.div
          className="h-full bg-white"
          animate={{ width: `${((slide + 1) / totalSlides) * 100}%` }}
        />
      </div>

      {/* Slide counter */}
      <div className="fixed top-6 right-8 text-sm text-white/30 font-mono z-50">
        {slide + 1}/{totalSlides}
      </div>

      {/* Content */}
      <div className="min-h-screen flex items-center justify-center p-8 md:p-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-5xl"
          >
            <Slide index={slide} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="fixed bottom-8 left-0 right-0 flex justify-center gap-2 z-50">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <button
            key={i}
            onClick={() => setSlide(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === slide ? "bg-white w-8" : "bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>

      {/* Keyboard hint */}
      <div className="fixed bottom-8 right-8 text-xs text-white/20">
        ← → to navigate
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
        className="text-[8rem] md:text-[12rem] font-mono tracking-tighter leading-none"
      >
        [know]
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-2xl md:text-3xl text-white/50 mt-8"
      >
        Know anyone, before you meet them.
      </motion.p>
    </div>
  );
}

function S_Problem1() {
  return (
    <div className="space-y-8">
      <p className="text-white/40 text-lg">THE PROBLEM</p>
      <h1 className="text-5xl md:text-7xl font-light leading-tight">
        You need to reach<br />
        <span className="text-white/40">a decision-maker.</span>
      </h1>
      <div className="pt-8 space-y-4 text-2xl text-white/60">
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
      <p className="text-white/40 text-lg mb-8">THE DATA</p>
      <div className="grid md:grid-cols-3 gap-12 md:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-7xl md:text-8xl font-light">91%</div>
          <p className="text-white/40 mt-4 text-lg">of cold emails<br />get no response</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="text-7xl md:text-8xl font-light">1.2%</div>
          <p className="text-white/40 mt-4 text-lg">cold outreach<br />conversion rate</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="text-7xl md:text-8xl font-light text-emerald-400">30%</div>
          <p className="text-white/40 mt-4 text-lg">warm intro<br />conversion rate</p>
        </motion.div>
      </div>
    </div>
  );
}

function S_Insight() {
  return (
    <div>
      <p className="text-emerald-400 text-lg mb-8">THE INSIGHT</p>
      <h1 className="text-5xl md:text-7xl font-light leading-tight mb-8">
        Everyone has a network.
      </h1>
      <h2 className="text-5xl md:text-7xl font-light leading-tight text-white/30">
        Nobody knows how to use it.
      </h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-xl text-white/50 mt-12 max-w-2xl"
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
      <p className="text-white/40 text-lg mb-8">THE SOLUTION</p>
      <h1 className="text-5xl md:text-7xl font-light leading-tight mb-12">
        [know] finds the warmest<br />
        path to anyone.
      </h1>
      <div className="grid md:grid-cols-2 gap-8 text-xl">
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
      <p className="text-white/40 text-lg mb-8">HOW IT WORKS</p>
      <h1 className="text-4xl md:text-5xl font-light leading-tight mb-12">
        Connect your email. We analyze metadata only.
        <span className="text-white/30"> Never content.</span>
      </h1>
      <div className="flex flex-wrap items-center justify-center gap-6 mb-12">
        {["Gmail", "Outlook", "Calendar", "LinkedIn"].map((name, i) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="px-6 py-3 bg-white/5 border border-white/10 rounded-full text-lg"
          >
            {name}
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-white/30 text-2xl"
        >
          →
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
          className="px-6 py-3 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-lg text-emerald-400"
        >
          Relationship Score
        </motion.div>
      </div>
      <p className="text-center text-white/40 text-lg">
        🔒 Privacy-first. We never read your emails.
      </p>
    </div>
  );
}

function S_Market() {
  return (
    <div>
      <p className="text-white/40 text-lg mb-8">MARKET</p>
      <h1 className="text-5xl md:text-6xl font-light mb-12">
        <span className="text-emerald-400">$3.5B</span> opportunity
      </h1>
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <p className="text-white/40 mb-4">TARGET USERS</p>
          <p className="text-2xl">10M+ sales reps, recruiters, VCs, founders</p>
          <p className="text-white/40 mt-2">@ $29–79/month</p>
        </div>
        <div>
          <p className="text-white/40 mb-4">MARKET VALIDATION</p>
          <div className="space-y-3">
            <div className="flex justify-between text-lg">
              <span>ZoomInfo</span>
              <span className="text-white/40">$1.2B revenue</span>
            </div>
            <div className="flex justify-between text-lg">
              <span>LinkedIn Sales Nav</span>
              <span className="text-white/40">$1.5B revenue</span>
            </div>
            <div className="flex justify-between text-lg">
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
        className="text-xl text-white/50 mt-12"
      >
        They sell contact data. We reveal the relationships you already have.
      </motion.p>
    </div>
  );
}

function S_Traction() {
  return (
    <div className="text-center">
      <p className="text-white/40 text-lg mb-8">TRACTION</p>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-8xl md:text-9xl font-light mb-4"
      >
        2,847
      </motion.div>
      <p className="text-2xl text-white/60 mb-2">waitlist signups</p>
      <p className="text-emerald-400 text-xl">in 3 weeks · $0 marketing spend</p>

      <div className="grid md:grid-cols-2 gap-8 mt-16 text-left max-w-2xl mx-auto">
        <div className="border-l-2 border-white/10 pl-6">
          <p className="text-4xl font-light">MVP</p>
          <p className="text-white/40">Built in 8 weeks</p>
        </div>
        <div className="border-l-2 border-white/10 pl-6">
          <p className="text-4xl font-light">100%</p>
          <p className="text-white/40">Organic growth</p>
        </div>
      </div>
    </div>
  );
}

function S_Competition() {
  return (
    <div>
      <p className="text-white/40 text-lg mb-8">COMPETITION</p>
      <h1 className="text-4xl md:text-5xl font-light mb-12">
        We're not competing. <span className="text-white/30">We're creating.</span>
      </h1>
      <div className="space-y-4">
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
            className="grid grid-cols-3 gap-4 py-4 border-b border-white/10"
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
      <p className="text-white/40 text-lg mb-8">TEAM</p>
      <div className="grid md:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-4xl mb-4">Satyam Dave</div>
          <p className="text-emerald-400 text-lg mb-4">CEO</p>
          <ul className="space-y-2 text-white/60">
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
          <div className="text-4xl mb-4">Udaya Vijay Anand</div>
          <p className="text-emerald-400 text-lg mb-4">CTO</p>
          <ul className="space-y-2 text-white/60">
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
        className="text-center text-white/40 mt-12"
      >
        Purdue University '26
      </motion.p>
    </div>
  );
}

function S_Ask() {
  return (
    <div>
      <p className="text-white/40 text-lg mb-8">THE ASK</p>
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-7xl md:text-8xl font-light text-emerald-400"
        >
          $500K
        </motion.div>
        <p className="text-2xl text-white/40 mt-2">Pre-Seed</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        <div>
          <p className="text-white/40 text-sm mb-4">USE OF FUNDS</p>
          <div className="space-y-2">
            <div className="flex justify-between"><span>Product</span><span className="text-white/40">40%</span></div>
            <div className="flex justify-between"><span>Engineering</span><span className="text-white/40">40%</span></div>
            <div className="flex justify-between"><span>Growth</span><span className="text-white/40">20%</span></div>
          </div>
        </div>
        <div>
          <p className="text-white/40 text-sm mb-4">MILESTONES</p>
          <div className="space-y-2">
            <div className="flex justify-between"><span>Month 3</span><span className="text-white/40">1K users</span></div>
            <div className="flex justify-between"><span>Month 6</span><span className="text-white/40">$50K MRR</span></div>
            <div className="flex justify-between"><span>Month 12</span><span className="text-white/40">Series A</span></div>
          </div>
        </div>
        <div>
          <p className="text-white/40 text-sm mb-4">WHY NOW</p>
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
        className="text-5xl md:text-7xl font-light leading-tight"
      >
        The path to anyone<br />
        <span className="text-white/30">shouldn't be cold.</span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-16"
      >
        <div className="text-6xl font-mono">[know]</div>
        <p className="text-white/40 mt-4">useknow.io</p>
      </motion.div>
    </div>
  );
}
