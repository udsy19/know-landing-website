import { useState } from "react";
import { Link, useLocation } from "react-router";

export default function SiteHeader() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/40">
      <div className="container mx-auto px-6 py-4 max-w-5xl flex items-center justify-between">
        <Link
          to="/"
          className="text-lg font-mono font-medium hover:opacity-70 transition-opacity"
          aria-label="Know homepage"
        >
          [know]
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-6" aria-label="Main navigation">
          <Link
            to="/pricing"
            className={`text-sm transition-colors ${
              isActive("/pricing")
                ? "text-foreground font-medium"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Pricing
          </Link>
          <Link
            to="/security"
            className={`text-sm transition-colors ${
              isActive("/security")
                ? "text-foreground font-medium"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
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

        {/* Mobile hamburger */}
        <button
          className="sm:hidden p-2 -mr-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav
          className="sm:hidden border-t border-border/40 bg-background/95 backdrop-blur-sm px-6 py-4 space-y-3"
          aria-label="Mobile navigation"
        >
          <Link
            to="/pricing"
            onClick={() => setMobileOpen(false)}
            className={`block text-sm py-2 transition-colors ${
              isActive("/pricing") ? "text-foreground font-medium" : "text-muted-foreground"
            }`}
          >
            Pricing
          </Link>
          <Link
            to="/security"
            onClick={() => setMobileOpen(false)}
            className={`block text-sm py-2 transition-colors ${
              isActive("/security") ? "text-foreground font-medium" : "text-muted-foreground"
            }`}
          >
            Security
          </Link>
          <a
            href="https://cal.com/useknow.io"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-sm py-2 text-foreground font-medium"
          >
            Book Demo
          </a>
        </nav>
      )}
    </header>
  );
}
