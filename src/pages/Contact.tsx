import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

export default function Contact() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "feedback",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const steps = [
    { field: "name", label: "What's your name?", placeholder: "Jane Smith", type: "text", required: true },
    { field: "email", label: "What's your email?", placeholder: "jane@company.com", type: "email", required: true },
    { field: "type", label: "What's this about?", type: "select", required: true },
    { field: "message", label: "What's on your mind?", placeholder: "Tell us anything...", type: "textarea", required: true },
  ];

  const typeOptions = [
    { value: "feedback", label: "Product Feedback" },
    { value: "bug", label: "Bug Report" },
    { value: "feature", label: "Feature Request" },
    { value: "partnership", label: "Partnership" },
    { value: "press", label: "Press / Media" },
    { value: "other", label: "Other" },
  ];

  const updateForm = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (status === "error") setStatus("idle");
  };

  const handleNext = () => {
    const currentStep = steps[step];
    const value = formData[currentStep.field as keyof typeof formData];

    if (currentStep.required && !value.trim()) {
      setStatus("error");
      setErrorMessage("Please fill this in");
      return;
    }

    setStatus("idle");
    if (step < steps.length - 1) {
      setStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && steps[step].type !== "textarea") {
      e.preventDefault();
      handleNext();
    }
  };

  const handleSubmit = async () => {
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
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  const resetForm = () => {
    setStep(0);
    setStatus("idle");
    setFormData({ name: "", email: "", type: "feedback", message: "" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SiteHeader />

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-lg">
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 15, delay: 0.1 }}
                  className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center"
                >
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                <h2 className="text-2xl md:text-3xl font-light mb-3">Message sent, {formData.name.split(' ')[0]}</h2>
                <p className="text-muted-foreground mb-8">We'll get back to you soon.</p>
                <button
                  onClick={resetForm}
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  Send another message →
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Header */}
                <div className="text-center mb-10">
                  <h1 className="text-3xl md:text-4xl font-light mb-2">Get in touch</h1>
                  <p className="text-muted-foreground">We'd love to hear from you</p>
                </div>

                {/* Progress indicator */}
                <div className="flex items-center justify-center gap-2 mb-10">
                  {steps.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i <= step ? "w-8 bg-primary" : "w-3 bg-border/50"
                      }`}
                    />
                  ))}
                </div>

                {/* Step content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label className="block text-lg md:text-xl font-light mb-4 text-center">
                      {steps[step].label}
                    </label>

                    {steps[step].type === "textarea" ? (
                      <textarea
                        autoFocus
                        id="contact-field"
                        aria-label={steps[step].label}
                        value={formData[steps[step].field as keyof typeof formData]}
                        onChange={(e) => updateForm(steps[step].field, e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && e.metaKey) handleNext();
                        }}
                        placeholder={steps[step].placeholder}
                        disabled={status === "sending"}
                        rows={4}
                        className="w-full px-5 py-4 text-base bg-background border border-border rounded-2xl outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/40 resize-none"
                      />
                    ) : steps[step].type === "select" ? (
                      <div className="grid grid-cols-2 gap-3">
                        {typeOptions.map((option) => (
                          <motion.button
                            key={option.value}
                            type="button"
                            onClick={() => updateForm("type", option.value)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                              formData.type === option.value
                                ? "border-primary bg-primary/10 text-primary"
                                : "border-border hover:border-border/80 text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            {option.label}
                          </motion.button>
                        ))}
                      </div>
                    ) : (
                      <input
                        autoFocus
                        id="contact-field"
                        aria-label={steps[step].label}
                        type={steps[step].type}
                        value={formData[steps[step].field as keyof typeof formData]}
                        onChange={(e) => updateForm(steps[step].field, e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={steps[step].placeholder}
                        disabled={status === "sending"}
                        className="w-full px-5 py-4 text-base bg-background border border-border rounded-full outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/40"
                      />
                    )}

                    {status === "error" && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-3 text-sm text-red-500 text-center"
                      >
                        {errorMessage}
                      </motion.p>
                    )}

                    {/* Navigation */}
                    <div className="flex items-center justify-between mt-8">
                      <button
                        onClick={() => step > 0 && setStep(prev => prev - 1)}
                        disabled={step === 0 || status === "sending"}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-0 disabled:cursor-default"
                      >
                        ← Back
                      </button>

                      <motion.button
                        onClick={handleNext}
                        disabled={status === "sending"}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
                      >
                        {status === "sending" ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                            />
                            Sending...
                          </>
                        ) : step === steps.length - 1 ? (
                          "Send Message"
                        ) : (
                          <>
                            Next
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </>
                        )}
                      </motion.button>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Alternative contact */}
                <div className="mt-16 pt-8 border-t border-border/40">
                  <p className="text-center text-sm text-muted-foreground mb-4">Or reach out directly</p>
                  <div className="flex items-center justify-center gap-6">
                    <a
                      href="mailto:founders@useknow.io"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      founders@useknow.io
                    </a>
                    <a
                      href="https://www.linkedin.com/company/useknow/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      LinkedIn
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
