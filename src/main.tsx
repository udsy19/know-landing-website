import { Toaster } from "@/components/ui/sonner";
import { InstrumentationProvider } from "@/instrumentation.tsx";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { StrictMode, useEffect, lazy, Suspense, useState, useCallback, ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import "./index.css";
import "./types/global.d.ts";
import StartupAnimation from "@/components/StartupAnimation";

// Lazy load route components for better code splitting
const Landing = lazy(() => import("./pages/Landing.tsx"));
const AuthPage = lazy(() => import("./pages/Auth.tsx"));
const Privacy = lazy(() => import("./pages/Privacy.tsx"));
const Terms = lazy(() => import("./pages/Terms.tsx"));
const Contact = lazy(() => import("./pages/Contact.tsx"));
const Pricing = lazy(() => import("./pages/Pricing.tsx"));
const Security = lazy(() => import("./pages/Security.tsx"));
const AppPage = lazy(() => import("./pages/App.tsx"));
const PitchDeck = lazy(() => import("./pages/PitchDeck.tsx"));
const PitchDeckPrint = lazy(() => import("./pages/PitchDeckPrint.tsx"));
const InstagramStories = lazy(() => import("./pages/InstagramStories.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

// Simple loading fallback for route transitions
function RouteLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="animate-pulse text-muted-foreground">Loading...</div>
    </div>
  );
}

// Only initialize Convex if URL is provided
const convexUrl = import.meta.env.VITE_CONVEX_URL;
const convex = convexUrl ? new ConvexReactClient(convexUrl) : null;

// Wrapper that conditionally provides Convex context
function ConvexWrapper({ children }: { children: ReactNode }) {
  if (convex) {
    return <ConvexAuthProvider client={convex}>{children}</ConvexAuthProvider>;
  }
  return <>{children}</>;
}

// Safe sessionStorage access (can fail in some in-app browsers)
function getSessionStorage(key: string): string | null {
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function setSessionStorage(key: string, value: string): void {
  try {
    sessionStorage.setItem(key, value);
  } catch {
    // Silently fail if storage is unavailable
  }
}

function AppWithAnimation() {
  const [showAnimation, setShowAnimation] = useState(() => {
    return getSessionStorage("know-intro-seen") !== "true";
  });
  const location = useLocation();

  const handleAnimationComplete = useCallback(() => {
    setSessionStorage("know-intro-seen", "true");
    setShowAnimation(false);
  }, []);

  // Only show animation on landing page
  const shouldShowAnimation = showAnimation && location.pathname === "/";

  return (
    <>
      {shouldShowAnimation && <StartupAnimation onComplete={handleAnimationComplete} />}
      <Suspense fallback={<RouteLoading />}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/security" element={<Security />} />
          <Route path="/app" element={<AppPage />} />
          <Route path="/pitch" element={<PitchDeck />} />
          <Route path="/pitch/print" element={<PitchDeckPrint />} />
          <Route path="/stories" element={<InstagramStories />} />
          <Route path="/auth" element={<AuthPage redirectAfterAuth="/" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}



// Allowed origins for postMessage communication (vly.ai development environment)
const ALLOWED_ORIGINS = ["https://vly.ai", "https://www.vly.ai", "http://localhost:3000"];

function RouteSyncer() {
  const location = useLocation();
  useEffect(() => {
    // Only send route changes if embedded in an allowed parent frame
    if (window.parent !== window) {
      try {
        // Send to parent - the parent's origin will be validated by the browser
        // Send to each allowed origin
        for (const allowedOrigin of ALLOWED_ORIGINS) {
          window.parent.postMessage(
            { type: "iframe-route-change", path: location.pathname },
            allowedOrigin,
          );
        }
      } catch {
        // Silently fail if cross-origin restrictions prevent message
      }
    }
  }, [location.pathname]);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      // Validate the origin of incoming messages
      if (!ALLOWED_ORIGINS.includes(event.origin)) {
        return;
      }

      // Validate message structure before acting
      if (
        event.data &&
        typeof event.data === "object" &&
        event.data.type === "navigate" &&
        typeof event.data.direction === "string"
      ) {
        if (event.data.direction === "back") window.history.back();
        else if (event.data.direction === "forward") window.history.forward();
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return null;
}


// Skip-to-content link for keyboard users
function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-foreground focus:text-background focus:rounded-lg focus:text-sm"
    >
      Skip to content
    </a>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <InstrumentationProvider>
      <ConvexWrapper>
        <BrowserRouter>
          <SkipToContent />
          <RouteSyncer />
          <div id="main-content">
            <AppWithAnimation />
          </div>
        </BrowserRouter>
        <Toaster />
      </ConvexWrapper>
    </InstrumentationProvider>
    <Analytics />
    <SpeedInsights />
  </StrictMode>,
);
