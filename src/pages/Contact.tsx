import { Link } from "react-router";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "feedback",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      // Send to Notion webhook (or any other endpoint)
      const webhookUrl = import.meta.env.VITE_NOTION_WEBHOOK_URL;

      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            timestamp: new Date().toISOString(),
          }),
        });
      }

      // Also send email notification via mailto fallback
      // In production, you'd use a proper email service

      setStatus("success");
      setFormData({ name: "", email: "", type: "feedback", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border/40">
        <div className="container mx-auto px-6 py-6 max-w-4xl flex items-center justify-between">
          <Link to="/" className="text-lg font-mono font-medium hover:opacity-70 transition-opacity">
            [know]
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-6 py-12 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-light mb-2">Contact Us</h1>
        <p className="text-muted-foreground mb-12">We'd love to hear from you</p>

        {/* Founders Section */}
        <section className="mb-16">
          <h2 className="text-xl font-medium mb-6">Meet the Founders</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Satyam */}
            <div className="bg-card border border-border/50 rounded-xl p-6 hover:border-border transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400/20 to-emerald-400/5 border border-emerald-400/20 flex items-center justify-center text-2xl font-light text-emerald-400">
                  S
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium">Satyam Dave</h3>
                  <p className="text-emerald-400 text-sm mb-2">CEO & Co-founder</p>
                  <ul className="text-sm text-muted-foreground space-y-1 mb-4">
                    <li>Ex-Microsoft · AI Product Manager</li>
                    <li>Ex-Verkada · Solutions Engineer</li>
                    <li>Purdue University '26</li>
                  </ul>
                  <a
                    href="https://www.linkedin.com/in/satyamvdave/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    Connect on LinkedIn
                  </a>
                </div>
              </div>
            </div>

            {/* Udaya */}
            <div className="bg-card border border-border/50 rounded-xl p-6 hover:border-border transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400/20 to-emerald-400/5 border border-emerald-400/20 flex items-center justify-center text-2xl font-light text-emerald-400">
                  U
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium">Udaya Vijay Anand</h3>
                  <p className="text-emerald-400 text-sm mb-2">CTO & Co-founder</p>
                  <ul className="text-sm text-muted-foreground space-y-1 mb-4">
                    <li>Ex-KPMG · Cyber Defense Engineer</li>
                    <li>Ex-DBS Bank · Security Automation</li>
                    <li>Purdue University '26</li>
                  </ul>
                  <a
                    href="https://www.linkedin.com/in/udaya-vijay-anand/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    Connect on LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Company LinkedIn */}
          <div className="mt-6 text-center">
            <a
              href="https://www.linkedin.com/company/useknow/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              Follow [know] on LinkedIn
            </a>
          </div>
        </section>

        {/* Contact Form Section */}
        <section>
          <h2 className="text-xl font-medium mb-2">Send us a Message</h2>
          <p className="text-muted-foreground text-sm mb-6">
            Have feedback, questions, or just want to say hi? We'd love to hear from you.
          </p>

          {status === "success" ? (
            <div className="bg-emerald-400/10 border border-emerald-400/20 rounded-xl p-8 text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-400/20 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Message Sent!</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Thank you for reaching out. We'll get back to you soon.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-background border border-border/50 rounded-lg focus:outline-none focus:border-emerald-400/50 transition-colors placeholder:text-muted-foreground/50"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-background border border-border/50 rounded-lg focus:outline-none focus:border-emerald-400/50 transition-colors placeholder:text-muted-foreground/50"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-medium mb-2">
                  What's this about?
                </label>
                <select
                  id="type"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-border/50 rounded-lg focus:outline-none focus:border-emerald-400/50 transition-colors text-foreground"
                >
                  <option value="feedback">Product Feedback</option>
                  <option value="bug">Bug Report</option>
                  <option value="feature">Feature Request</option>
                  <option value="partnership">Partnership Inquiry</option>
                  <option value="press">Press / Media</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-border/50 rounded-lg focus:outline-none focus:border-emerald-400/50 transition-colors placeholder:text-muted-foreground/50 resize-none"
                  placeholder="Tell us what's on your mind..."
                />
              </div>

              {status === "error" && (
                <div className="text-red-400 text-sm">
                  Something went wrong. Please try again or email us directly at{" "}
                  <a href="mailto:founders@useknow.io" className="underline">
                    founders@useknow.io
                  </a>
                </div>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full md:w-auto px-8 py-3 bg-foreground text-background rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {status === "sending" ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          )}
        </section>

        {/* Direct Contact */}
        <section className="mt-16 pt-12 border-t border-border/40">
          <h2 className="text-xl font-medium mb-6">Prefer Email?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <a
              href="mailto:founders@useknow.io"
              className="flex items-center gap-4 p-4 bg-card border border-border/50 rounded-xl hover:border-border transition-colors group"
            >
              <div className="w-10 h-10 rounded-full bg-emerald-400/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="font-medium group-hover:text-emerald-400 transition-colors">founders@useknow.io</p>
                <p className="text-sm text-muted-foreground">For general inquiries</p>
              </div>
            </a>
            <a
              href="mailto:hello@useknow.io"
              className="flex items-center gap-4 p-4 bg-card border border-border/50 rounded-xl hover:border-border transition-colors group"
            >
              <div className="w-10 h-10 rounded-full bg-emerald-400/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <p className="font-medium group-hover:text-emerald-400 transition-colors">hello@useknow.io</p>
                <p className="text-sm text-muted-foreground">For support & feedback</p>
              </div>
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8 mt-12">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Know Technologies, Inc.</p>
            <div className="flex gap-6">
              <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
              <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
