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
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      setFormData({ name: "", email: "", type: "feedback", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  const founders = [
    {
      name: "Satyam Dave",
      role: "CEO & Co-founder",
      linkedin: "https://www.linkedin.com/in/satyamvdave/",
      experience: ["Ex-Microsoft", "Ex-Verkada", "Purdue '26"],
    },
    {
      name: "Udaya Vijay Anand",
      role: "CTO & Co-founder",
      linkedin: "https://www.linkedin.com/in/udaya-vijay-anand/",
      experience: ["Ex-KPMG", "Ex-DBS Bank", "Purdue '26"],
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border/40">
        <div className="container mx-auto px-6 py-6 max-w-5xl flex items-center justify-between">
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

      {/* Main Content */}
      <main className="container mx-auto px-6 py-16 max-w-5xl">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Side - Info */}
          <div>
            <h1 className="text-4xl md:text-5xl font-light mb-4">Get in touch</h1>
            <p className="text-muted-foreground text-lg mb-12">
              Have feedback, questions, or want to partner? We'd love to hear from you.
            </p>

            {/* Contact Methods */}
            <div className="space-y-6 mb-12">
              <a
                href="mailto:founders@useknow.io"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center group-hover:bg-emerald-400/20 transition-colors">
                  <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email us</p>
                  <p className="font-medium group-hover:text-emerald-400 transition-colors">founders@useknow.io</p>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/company/useknow/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-full bg-blue-400/10 border border-blue-400/20 flex items-center justify-center group-hover:bg-blue-400/20 transition-colors">
                  <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Follow us</p>
                  <p className="font-medium group-hover:text-blue-400 transition-colors">LinkedIn</p>
                </div>
              </a>
            </div>

            {/* Founders */}
            <div>
              <p className="text-sm text-muted-foreground mb-4">THE TEAM</p>
              <div className="space-y-4">
                {founders.map((founder) => (
                  <a
                    key={founder.name}
                    href={founder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 rounded-xl border border-border/50 hover:border-border hover:bg-muted/30 transition-all group"
                  >
                    <div>
                      <p className="font-medium group-hover:text-emerald-400 transition-colors">{founder.name}</p>
                      <p className="text-sm text-muted-foreground">{founder.role}</p>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      {founder.experience.map((exp, i) => (
                        <span key={i} className="px-2 py-1 rounded-full bg-muted/50">{exp}</span>
                      ))}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div>
            {status === "success" ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-16 h-16 rounded-full bg-emerald-400/20 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-light mb-2">Message sent</h3>
                  <p className="text-muted-foreground mb-6">
                    Thanks for reaching out. We'll get back to you soon.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    Send another message →
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm text-muted-foreground mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-muted/30 border border-border/50 rounded-xl focus:outline-none focus:border-emerald-400/50 focus:bg-muted/50 transition-all placeholder:text-muted-foreground/50"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm text-muted-foreground mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-muted/30 border border-border/50 rounded-xl focus:outline-none focus:border-emerald-400/50 focus:bg-muted/50 transition-all placeholder:text-muted-foreground/50"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="type" className="block text-sm text-muted-foreground mb-2">
                    Topic
                  </label>
                  <select
                    id="type"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-4 py-3 bg-muted/30 border border-border/50 rounded-xl focus:outline-none focus:border-emerald-400/50 focus:bg-muted/50 transition-all text-foreground"
                  >
                    <option value="feedback">Product Feedback</option>
                    <option value="bug">Bug Report</option>
                    <option value="feature">Feature Request</option>
                    <option value="partnership">Partnership</option>
                    <option value="press">Press / Media</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm text-muted-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-muted/30 border border-border/50 rounded-xl focus:outline-none focus:border-emerald-400/50 focus:bg-muted/50 transition-all placeholder:text-muted-foreground/50 resize-none"
                    placeholder="What's on your mind?"
                  />
                </div>

                {status === "error" && (
                  <div className="p-4 rounded-xl bg-red-400/10 border border-red-400/20 text-red-400 text-sm">
                    {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full py-4 bg-foreground text-background rounded-xl font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {status === "sending" ? (
                    <>
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    "Send message"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8 mt-auto">
        <div className="container mx-auto px-6 max-w-5xl">
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
