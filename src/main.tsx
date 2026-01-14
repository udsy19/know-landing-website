import { Toaster } from "@/components/ui/sonner";
import { VlyToolbar } from "../vly-toolbar-readonly.tsx";
import { InstrumentationProvider } from "@/instrumentation.tsx";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";
import { Analytics } from "@vercel/analytics/react";
import { StrictMode, useEffect, lazy, Suspense, useState, useCallback, ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import "./index.css";
import "./types/global.d.ts";
import StartupAnimation from "@/components/StartupAnimation";

// Lazy load route components for better code splitting
const Landing = lazy(() => import("./pages/Landing.tsx"));
const AuthPage = lazy(() => import("./pages/Auth.tsx"));
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

// Check if this is the first visit in this session
const hasSeenAnimation = sessionStorage.getItem("know-intro-seen") === "true";

function AppWithAnimation() {
  const [showAnimation, setShowAnimation] = useState(!hasSeenAnimation);
  const location = useLocation();

  const handleAnimationComplete = useCallback(() => {
    sessionStorage.setItem("know-intro-seen", "true");
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
        window.parent.postMessage(
          { type: "iframe-route-change", path: location.pathname },
          "*", // Browser restricts this based on iframe sandbox
        );
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

      if (event.data?.type === "navigate") {
        if (event.data.direction === "back") window.history.back();
        if (event.data.direction === "forward") window.history.forward();
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return null;
}


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {import.meta.env.DEV && <VlyToolbar />}
    <InstrumentationProvider>
      <ConvexWrapper>
        <BrowserRouter>
          <RouteSyncer />
          <AppWithAnimation />
        </BrowserRouter>
        <Toaster />
      </ConvexWrapper>
    </InstrumentationProvider>
    <Analytics />
  </StrictMode>,
);
