import { Link } from "react-router";

export default function SiteFooter() {
  return (
    <footer className="border-t border-border/40 py-8">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Know Technologies, Inc.</p>
          <nav className="flex gap-6" aria-label="Footer navigation">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">Terms</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
