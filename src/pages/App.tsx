import { Link } from "react-router";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function App() {
  // Auto-redirect after 3 seconds (optional - can be removed if you want manual click only)
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "https://app.useknow.io";
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/40">
        <div className="container mx-auto px-6 py-4 max-w-5xl flex items-center justify-between">
          <Link to="/" className="text-lg font-mono font-medium hover:opacity-70 transition-opacity">
            [know]
          </Link>
          <nav className="flex items-center gap-6">
            <Link to="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </Link>
            <Link to="/security" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Security
            </Link>
            <a
              href="https://cal.com/useknow.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm px-4 py-2 bg-foreground text-background rounded-full font-medium hover:opacity-90 transition-opacity"
            >
              Book Demo
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-lg"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 15 }}
            className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-8"
          >
            <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </motion.div>

          <h1 className="text-3xl md:text-4xl font-light mb-4 tracking-tight">
            Launch the app
          </h1>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            You're being redirected to the Know app where you can sign up, connect your accounts, and start discovering your network.
          </p>

          {/* Progress bar */}
          <div className="w-full h-1 bg-border/50 rounded-full mb-8 overflow-hidden">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 3, ease: "linear" }}
              className="h-full bg-primary rounded-full"
            />
          </div>

          {/* CTA Button */}
          <motion.a
            href="https://app.useknow.io"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity"
          >
            Open Know App
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </motion.a>

          <p className="mt-6 text-sm text-muted-foreground">
            Not redirecting?{" "}
            <a
              href="https://app.useknow.io"
              className="text-foreground underline hover:no-underline"
            >
              Click here
            </a>
          </p>

          {/* Features preview */}
          <div className="mt-16 pt-8 border-t border-border/40">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-6">What you can do in the app</p>
            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                { icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z", label: "Search" },
                { icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z", label: "Connect" },
                { icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", label: "Research" },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center">
                    <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                    </svg>
                  </div>
                  <span className="text-xs text-muted-foreground">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 py-6">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Know Technologies, Inc.</p>
            <div className="flex gap-6">
              <Link to="/security" className="hover:text-foreground transition-colors">Security</Link>
              <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
