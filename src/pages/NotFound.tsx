import { Link } from "react-router";
import { motion } from "framer-motion";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

export default function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col bg-background text-foreground"
    >
      <SiteHeader />

      <main className="flex-1 flex flex-col items-center justify-center px-6">
        <h1 className="text-6xl font-light mb-4">404</h1>
        <p className="text-lg text-muted-foreground mb-8">Page not found</p>
        <Link
          to="/"
          className="text-sm px-6 py-3 bg-foreground text-background rounded-full font-medium hover:opacity-90 transition-opacity"
        >
          Back to Home
        </Link>
      </main>

      <SiteFooter />
    </motion.div>
  );
}
