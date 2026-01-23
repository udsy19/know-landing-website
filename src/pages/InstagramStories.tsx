import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function InstagramStories() {
  const [currentStory, setCurrentStory] = useState(0);
  const totalStories = 10;

  return (
    <div className="min-h-screen bg-zinc-950 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-xl text-white/60 font-light mb-2">Instagram Stories</h1>
          <p className="text-white/30 text-sm">Screen record with Cmd+Shift+5</p>
        </div>

        <div className="flex justify-center gap-2 mb-8">
          {Array.from({ length: totalStories }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentStory(i)}
              className={`w-8 h-8 rounded-lg text-xs transition-all ${
                currentStory === i
                  ? "bg-white text-black"
                  : "bg-white/10 text-white/40 hover:bg-white/20"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <div className="flex justify-center">
          <div className="w-[360px] aspect-[9/16] rounded-3xl overflow-hidden bg-black">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full"
              >
                <Story index={currentStory} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

function Story({ index }: { index: number }) {
  switch (index) {
    case 0: return <Story1 />;
    case 1: return <Story2 />;
    case 2: return <Story3 />;
    case 3: return <Story4 />;
    case 4: return <Story5 />;
    case 5: return <Story6 />;
    case 6: return <Story7 />;
    case 7: return <Story8 />;
    case 8: return <Story9 />;
    case 9: return <Story10 />;
    default: return null;
  }
}

// Shared fade animation
const fade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.8 }
};

// Story 1: Brand
function Story1() {
  return (
    <div className="w-full h-full bg-black flex flex-col items-center justify-center">
      <motion.div {...fade} className="text-5xl font-mono text-white tracking-tight">
        [know]
      </motion.div>
      <motion.p
        {...fade}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-white/40 text-sm mt-6"
      >
        Your network, searchable.
      </motion.p>
    </div>
  );
}

// Story 2: Pain point
function Story2() {
  return (
    <div className="w-full h-full bg-black flex flex-col items-center justify-center px-10">
      <motion.p
        {...fade}
        className="text-white/40 text-sm mb-8"
      >
        You've asked this 100 times
      </motion.p>
      <motion.h1
        {...fade}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-2xl text-white font-light text-center leading-relaxed"
      >
        "Do you know anyone who works at..."
      </motion.h1>
    </div>
  );
}

// Story 3: Pain point 2
function Story3() {
  return (
    <div className="w-full h-full bg-black flex flex-col items-center justify-center px-10">
      <motion.p
        {...fade}
        className="text-white text-2xl font-light text-center leading-relaxed"
      >
        10 hours a week
      </motion.p>
      <motion.p
        {...fade}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="text-white/40 text-sm mt-4 text-center"
      >
        spent searching for warm intros
      </motion.p>
    </div>
  );
}

// Story 4: Stat
function Story4() {
  const [count, setCount] = useState(2);

  useEffect(() => {
    const timer = setTimeout(() => setCount(68), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-full bg-black flex flex-col items-center justify-center">
      <motion.p {...fade} className="text-white/40 text-sm mb-4">
        Cold emails
      </motion.p>
      <motion.div {...fade} className="text-6xl font-light text-white/30 mb-12">
        2%
      </motion.div>
      <motion.p
        {...fade}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-white/40 text-sm mb-4"
      >
        Warm intros
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="text-6xl font-light text-white"
      >
        {count}%
      </motion.div>
    </div>
  );
}

// Story 5: Insight
function Story5() {
  return (
    <div className="w-full h-full bg-black flex flex-col items-center justify-center px-10">
      <motion.p {...fade} className="text-white/40 text-sm mb-8">
        You already have
      </motion.p>
      <motion.p
        {...fade}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-white text-3xl font-light mb-2"
      >
        50,000 emails
      </motion.p>
      <motion.p
        {...fade}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-white text-3xl font-light mb-2"
      >
        2,500 connections
      </motion.p>
      <motion.p
        {...fade}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="text-white/40 text-sm mt-8"
      >
        All unsearchable. Until now.
      </motion.p>
    </div>
  );
}

// Story 6: Product
function Story6() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 1000);
    const t2 = setTimeout(() => setStep(2), 2500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="w-full h-full bg-black flex flex-col items-center justify-center px-8">
      <motion.div {...fade} className="text-3xl font-mono text-white mb-10">
        [know]
      </motion.div>

      <div className="w-full bg-white/5 rounded-xl p-4 mb-4">
        <p className="text-white/30 text-xs mb-1">Search</p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: step >= 1 ? 1 : 0 }}
          className="text-white"
        >
          {step >= 1 ? "VCs in AI robotics" : ""}
          <span className="text-white/30">|</span>
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: step >= 2 ? 1 : 0, y: step >= 2 ? 0 : 10 }}
        transition={{ duration: 0.4 }}
        className="w-full"
      >
        <p className="text-white/30 text-xs mb-2">12 results · 0.8s</p>
        <div className="space-y-2">
          <div className="bg-white/5 rounded-lg p-3">
            <p className="text-white text-sm">Sarah Chen</p>
            <p className="text-white/40 text-xs">Partner @ Sequoia</p>
          </div>
          <div className="bg-white/5 rounded-lg p-3">
            <p className="text-white text-sm">Mike Kim</p>
            <p className="text-white/40 text-xs">GP @ a16z</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Story 7: Time
function Story7() {
  return (
    <div className="w-full h-full bg-black flex flex-col items-center justify-center">
      <motion.p {...fade} className="text-white/30 text-sm mb-2">
        Before
      </motion.p>
      <motion.p
        {...fade}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-white/40 text-4xl font-light mb-16"
      >
        10 hours
      </motion.p>
      <motion.p
        {...fade}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-white/30 text-sm mb-2"
      >
        After
      </motion.p>
      <motion.p
        {...fade}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="text-white text-4xl font-light"
      >
        10 seconds
      </motion.p>
    </div>
  );
}

// Story 8: Traction
function Story8() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let current = 0;
    const timer = setInterval(() => {
      current += 71;
      if (current >= 2847) {
        setCount(2847);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, 25);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-full bg-black flex flex-col items-center justify-center">
      <motion.div {...fade} className="text-6xl font-light text-white">
        {count.toLocaleString()}
      </motion.div>
      <motion.p
        {...fade}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-white/40 text-sm mt-4"
      >
        on the waitlist
      </motion.p>
      <motion.p
        {...fade}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-white/30 text-xs mt-8"
      >
        $0 marketing · 100% organic
      </motion.p>
    </div>
  );
}

// Story 9: CTA
function Story9() {
  return (
    <div className="w-full h-full bg-black flex flex-col items-center justify-center px-10">
      <motion.p
        {...fade}
        className="text-white text-2xl font-light text-center leading-relaxed mb-12"
      >
        Stop cold outreach.
        <br />
        <span className="text-white/40">Start warm intros.</span>
      </motion.p>
      <motion.div
        {...fade}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-4xl font-mono text-white"
      >
        [know]
      </motion.div>
    </div>
  );
}

// Story 10: Final CTA
function Story10() {
  return (
    <div className="w-full h-full bg-black flex flex-col items-center justify-center">
      <motion.div {...fade} className="text-4xl font-mono text-white mb-6">
        [know]
      </motion.div>
      <motion.p
        {...fade}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-white/40 text-sm mb-12"
      >
        Your network, searchable.
      </motion.p>
      <motion.div
        {...fade}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="text-center"
      >
        <p className="text-white text-sm">useknow.io</p>
        <p className="text-white/30 text-xs mt-1">Join the waitlist</p>
      </motion.div>
    </div>
  );
}
