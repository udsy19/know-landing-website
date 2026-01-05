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
    <span>{status}</span>
  </div>
);

const Typewriter = ({ text, onComplete, speed = 15 }: { text: string, onComplete?: () => void, speed?: number }) => {
  const [displayText, setDisplayText] = useState("");
  
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
        if (onComplete) onComplete();
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed, onComplete]);

  return <span>{displayText}</span>;
};

const transcriptLines = [
  { text: "$ know", type: "command" },
  { text: "know: running locally.", type: "output" },
  { text: "[ DAY 1 ]", type: "marker" },
  { text: "know: work began at 11:43pm.", type: "output" },
  { text: "[ DAY 2 ]", type: "marker" },
  { text: "know: same start time.", type: "output" },
  { text: "[ DAY 4 ]", type: "marker" },
  { text: "know: this is becoming a pattern.", type: "output" },
  { text: "[ NO RESPONSE ]", type: "marker" },
  { text: "[ DAY 6 ]", type: "marker" },
  { text: "know: you work late before important deadlines.", type: "output" },
  { text: "know: outcomes are still good.", type: "output" },
  { text: "know: effort cost is rising.", type: "output" },
  { text: "[ DAY 9 ]", type: "marker" },
  { text: "know: next Friday matters.", type: "output" },
  { text: "know: if nothing changes, you will start late again.", type: "output" },
  { text: "[ DAY 9 — EARLIER THAT EVENING ]", type: "marker" },
  { text: "know: reminding you now.", type: "output" },
  { text: "[ YOU START EARLIER ]", type: "marker" },
  { text: "know: noted.", type: "output", hasCursor: true },
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
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-foreground selection:text-background flex flex-col items-center overflow-x-hidden">
      
      {/* Hero Section - Progressive Disclosure */}
      <section className="container mx-auto px-6 pt-32 pb-12 max-w-3xl min-h-[40vh] flex flex-col justify-center">
        <motion.h1 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-light leading-[1.1] mb-8 tracking-tighter"
        >
          Most things don't fail dramatically.<br />They fade.
        </motion.h1>
        
        <div className="space-y-1">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-xl md:text-2xl text-muted-foreground font-light max-w-xl leading-relaxed tracking-tight"
          >
            KNOW runs quietly on your machine.
          </motion.p>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.6 }}
            className="text-xl md:text-2xl text-muted-foreground font-light max-w-xl leading-relaxed tracking-tight"
          >
            It notices what keeps slipping.
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
        <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-12">A real session, over time</h2>
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
               text="This is not a chatbot. It is a system that keeps paying attention when you don't."
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
        <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-12">State of the system</h2>
        <div className="font-mono text-sm md:text-base w-full max-w-md bg-muted/30 p-6 rounded-sm border border-border/20">
          <div className="grid grid-cols-2 gap-y-4">
            <span className="text-muted-foreground">Daemon</span>
            <StatusDot status="running" />
            
            <span className="text-muted-foreground">Memory</span>
            <span>local only</span>
            
            <span className="text-muted-foreground">Interventions</span>
            <span>rare</span>
            
            <span className="text-muted-foreground">Attention</span>
            <span>conserved</span>
          </div>
        </div>
        <p className="mt-8 text-muted-foreground font-light text-sm">
          If this state feels wrong, you can stop everything instantly.
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
        <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-12">What KNOW refuses to do</h2>
        <ul className="space-y-3 font-light text-lg md:text-xl text-muted-foreground">
          <li className="flex items-center gap-3">
            <span className="w-1 h-1 bg-muted-foreground/50 rounded-full" />
            No dashboards
          </li>
          <li className="flex items-center gap-3">
            <span className="w-1 h-1 bg-muted-foreground/50 rounded-full" />
            No daily goals
          </li>
          <li className="flex items-center gap-3">
            <span className="w-1 h-1 bg-muted-foreground/50 rounded-full" />
            No streaks
          </li>
          <li className="flex items-center gap-3">
            <span className="w-1 h-1 bg-muted-foreground/50 rounded-full" />
            No motivational language
          </li>
          <li className="flex items-center gap-3">
            <span className="w-1 h-1 bg-muted-foreground/50 rounded-full" />
            No reminders unless invited
          </li>
          <li className="flex items-center gap-3">
            <span className="w-1 h-1 bg-muted-foreground/50 rounded-full" />
            No syncing by default
          </li>
          <li className="flex items-center gap-3">
            <span className="w-1 h-1 bg-muted-foreground/50 rounded-full" />
            No acting on your behalf
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
          <p className="text-muted-foreground font-light text-lg">KNOW only works if it runs continuously and remembers.</p>
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