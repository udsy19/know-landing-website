import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const BlinkingCursor = () => (
  <motion.span
    animate={{ opacity: [0, 1, 0] }}
    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    className="inline-block w-2 h-5 bg-primary ml-1 align-middle"
  />
);

const StatusDot = ({ status }: { status: string }) => (
  <div className="flex items-center gap-2">
    {status === "running" && (
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>
    )}
    {status === "building" && (
      <span className="relative flex h-2 w-2">
        <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
      </span>
    )}
    <span>{status}</span>
  </div>
);

const Typewriter = ({ text, onComplete, speed = 15 }: { text: string, onComplete?: () => void, speed?: number }) => {
  const [displayText, setDisplayText] = useState("");
  
  useEffect(() => {
    setDisplayText("");
    if (!text) {
      if (onComplete) onComplete();
      return;
    }

    let i = 0;
    const timer = setInterval(() => {
      setDisplayText(text.substring(0, i + 1));
      if (i + 1 >= text.length) {
        clearInterval(timer);
        if (onComplete) onComplete();
      }
      i += 1;
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed, onComplete]);

  return <span>{displayText}</span>;
};

const transcriptLines = [
  { text: "$ know", type: "command" },
  { text: "Who should I talk to this week?", type: "output" },
  { text: "[ SARAH CHEN ]", type: "marker" },
  { text: "know: Last spoke 3 weeks ago. Co-founder at AI startup.", type: "output" },
  { text: "know: You mentioned wanting an intro to her investors.", type: "output" },
  { text: "[ MARCUS LEE ]", type: "marker" },
  { text: "know: Met at conference. Works at OpenAI.", type: "output" },
  { text: "know: You're drifting. Last contact: 2 months.", type: "output" },
  { text: "$ Find me a warm intro to Acme Ventures", type: "command" },
  { text: "[ PATH FOUND ]", type: "marker" },
  { text: "know: You → Sarah Chen → Julia Park (Partner at Acme)", type: "output" },
  { text: "know: Sarah emailed Julia 4x last month. Strong connection.", type: "output" },
  { text: "$ Draft an intro ask to Sarah", type: "command" },
  { text: "know: drafting...", type: "output" },
  { text: "[ DRAFT READY ]", type: "marker" },
  { text: "know: 'Hey Sarah, hope you're doing well. I'm exploring...'", type: "output" },
  { text: "know: Click to view full message.", type: "output", hasCursor: true },
];

export default function Landing() {
  const [activeLineIndex, setActiveLineIndex] = useState(0);
  const [showFinalSentence, setShowFinalSentence] = useState(false);

  const handleLineComplete = () => {
    if (activeLineIndex < transcriptLines.length - 1) {
      setActiveLineIndex((prev) => prev + 1);
    } else {
      setShowFinalSentence(true);
    }
  };

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
          Who should you talk to?<br />KNOW already knows.
        </motion.h1>

        <div className="space-y-1">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-xl md:text-2xl text-muted-foreground font-light max-w-xl leading-relaxed tracking-tight"
          >
            Chat-first network intelligence.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.6 }}
            className="text-xl md:text-2xl text-muted-foreground font-light max-w-xl leading-relaxed tracking-tight"
          >
            Built from your real relationships.
          </motion.p>
        </div>
      </section>

      {/* Live Terminal Transcript */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -200px 0px" }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-6 pt-12 pb-24 max-w-3xl border-t border-border/40"
      >
        <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-12">A conversation with KNOW</h2>
        <div className="font-mono text-sm md:text-base space-y-6 text-foreground/90 pl-4 border-l border-border/20 min-h-[400px]">
          {transcriptLines.map((line, index) => {
            if (index > activeLineIndex) return null;
            
            const isLast = index === transcriptLines.length - 1;
            const isTyping = index === activeLineIndex;
            
            return (
              <div key={index} className={line.type === "marker" ? "text-muted-foreground/40 py-2 text-xs uppercase tracking-widest" : ""}>
                {line.type === "command" && <span className="text-muted-foreground select-none mr-2">$</span>}
                {isTyping ? (
                  <Typewriter 
                    text={line.text} 
                    onComplete={handleLineComplete} 
                    speed={15} 
                  />
                ) : (
                  <span>{line.text}</span>
                )}
                {line.hasCursor && isLast && !isTyping && <BlinkingCursor />}
                {isTyping && <BlinkingCursor />}
              </div>
            );
          })}
        </div>
        <motion.p
          className="mt-12 text-muted-foreground font-light text-lg md:text-xl max-w-2xl min-h-[3rem]"
        >
          {showFinalSentence && (
             <Typewriter
               text="Know tells you who to talk to, why, and how, using your real relationships."
               speed={30}
             />
          )}
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
        <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-12">How it works</h2>
        <div className="font-mono text-sm md:text-base w-full max-w-md bg-muted/30 p-6 rounded-sm border border-border/20">
          <div className="grid grid-cols-2 gap-y-4">
            <span className="text-muted-foreground">Connect</span>
            <span>Email + Calendar</span>

            <span className="text-muted-foreground">Graph</span>
            <StatusDot status="building" />

            <span className="text-muted-foreground">Ask</span>
            <span>Chat interface</span>

            <span className="text-muted-foreground">Memory</span>
            <span>Private, local</span>
          </div>
        </div>
        <p className="mt-8 text-muted-foreground font-light text-sm">
          KNOW builds a relationship graph from your real interactions.
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

      {/* Install */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -200px 0px" }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-6 py-32 max-w-3xl border-t border-border/40 mb-12"
      >
        <div className="font-mono text-lg md:text-xl bg-foreground text-background inline-block px-4 py-2">
          $ brew install know
        </div>
      </motion.section>

    </div>
  );
}