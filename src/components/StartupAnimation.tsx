import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function StartupAnimation({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"init" | "brand" | "exit">("init");
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Start brand reveal after brief pause
    const brandTimer = setTimeout(() => setPhase("brand"), 300);

    // Start exit
    const exitTimer = setTimeout(() => setPhase("exit"), 2400);

    // Complete and unmount
    const completeTimer = setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 3200);

    return () => {
      clearTimeout(brandTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key="startup-animation"
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === "exit" ? 0 : 1 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[9999] bg-[#0a0a0a] flex items-center justify-center overflow-hidden"
        >
          {/* Subtle ambient glow behind text */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: phase === "brand" ? 0.15 : 0,
              scale: phase === "brand" ? 1.5 : 0.5
            }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute w-[600px] h-[600px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)",
            }}
          />

          {/* Brand reveal */}
          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: phase === "brand" || phase === "exit" ? 1 : 0,
                scale: phase === "brand" || phase === "exit" ? 1 : 0.8,
              }}
              transition={{
                duration: 0.7,
                ease: [0.34, 1.56, 0.64, 1] // Bouncy pop
              }}
              className="flex flex-col items-center"
            >
              <h1 className="text-6xl md:text-8xl font-extralight tracking-tight text-white">
                <motion.span
                  initial={{ opacity: 0, x: -15 }}
                  animate={{
                    opacity: phase === "brand" || phase === "exit" ? 0.4 : 0,
                    x: phase === "brand" || phase === "exit" ? 0 : -15,
                  }}
                  transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
                  className="text-white/40"
                >
                  [
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, filter: "blur(20px)", scale: 0.9 }}
                  animate={{
                    opacity: phase === "brand" || phase === "exit" ? 1 : 0,
                    filter: phase === "brand" || phase === "exit" ? "blur(0px)" : "blur(20px)",
                    scale: phase === "brand" || phase === "exit" ? 1 : 0.9,
                  }}
                  transition={{ delay: 0.15, duration: 0.6, ease: "easeOut" }}
                  style={{
                    textShadow: "0 0 60px rgba(255,255,255,0.5), 0 0 120px rgba(255,255,255,0.2)",
                  }}
                >
                  know
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, x: 15 }}
                  animate={{
                    opacity: phase === "brand" || phase === "exit" ? 0.4 : 0,
                    x: phase === "brand" || phase === "exit" ? 0 : 15,
                  }}
                  transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
                  className="text-white/40"
                >
                  ]
                </motion.span>
              </h1>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: phase === "brand" || phase === "exit" ? 0.5 : 0,
                  y: phase === "brand" || phase === "exit" ? 0 : 10,
                }}
                transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
                className="mt-6 text-xs md:text-sm text-white/50 font-light tracking-[0.25em] uppercase"
              >
                find anyone. research everyone.
              </motion.p>
            </motion.div>
          </div>

          {/* Subtle vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
