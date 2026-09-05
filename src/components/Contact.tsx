"use client";

import React, { useState, useEffect, useRef } from "react";
import anime from "animejs";
import { SectionHeading } from "./ui/SectionHeading";
import { CONTACT_INFO, PORTFOLIO_INFO } from "@/data/portfolioData";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Copy, 
  ArrowUpRight,
  Sparkles,
  MessageSquare,
  Loader2,
  AlertCircle
} from "lucide-react";
import { LinkedinIcon } from "./ui/Icons";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [isActivationNotice, setIsActivationNotice] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (prefersReducedMotion) {
              anime.set(el.querySelectorAll(".anime-contact-item"), { opacity: 1, translateY: 0 });
            } else {
              anime({
                targets: el.querySelectorAll(".anime-contact-item"),
                opacity: [0, 1],
                translateY: [24, 0],
                delay: anime.stagger(90, { start: 100 }),
                duration: 650,
                easing: "easeOutQuad",
              });
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("sending");
    setErrorMessage(null);

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${CONTACT_INFO.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          "Full Name": formData.name,
          "Email Address": formData.email,
          "Subject / Role": formData.subject || "Portfolio Inquiry / Engineering Opportunity",
          "Message": formData.message,
          _subject: `[Portfolio Inquiry] ${formData.subject ? formData.subject : 'New Direct Message'} — from ${formData.name}`,
          _replyto: formData.email,
          _template: "box",
          _captcha: "false",
          _autoresponse: `Hi ${formData.name},\n\nThank you for reaching out through my portfolio website! I have received your message regarding "${formData.subject || 'your inquiry'}" and will review it and reply as soon as possible.\n\nBest regards,\nHardik Jariwala\nFull-Stack .NET & Angular Software Engineer\nSurat, Gujarat, India`,
        }),
      });

      const result = await response.json().catch(() => null);

      if (response.ok) {
        const needsActivation = result?.message?.toLowerCase().includes("activation");
        if (needsActivation) {
          setIsActivationNotice(true);
        }
        setStatus("success");
      } else {
        throw new Error(result?.message || "Failed to submit message.");
      }
    } catch (err: any) {
      console.error("Direct form submission error:", err);
      setStatus("error");
      setErrorMessage(
        "Could not send directly from browser. You can click below to send via your email client or retry."
      );
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-t border-[var(--border-subtle)] relative"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          badge="Get in Touch"
          title="Let's Discuss Engineering Opportunities"
          subtitle="Interested in discussing full-stack .NET and Angular engineering roles, enterprise systems, or technical collaborations? Feel free to reach out directly."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Contact Information & Channels (Left 5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="anime-contact-item p-6 rounded-2xl glass-card border border-[var(--border-subtle)] space-y-4">
              <h3 className="text-base font-bold text-[var(--text-main)] flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[var(--accent-cyan)]" />
                Direct Communication Channels
              </h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Connect via email, phone, or LinkedIn. Feel free to reach out directly or submit the inquiry form below.
              </p>

              {/* Email */}
              <div className="p-3.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center justify-between gap-3 group">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-2 rounded-lg bg-[var(--badge-strong-bg)] text-[var(--accent-cyan)] shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-[10px] font-mono text-[var(--text-subtle)] uppercase">Email Address</div>
                    <div className="text-xs font-mono text-[var(--text-main)] truncate">
                      {CONTACT_INFO.email}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(CONTACT_INFO.email, "email")}
                  className="p-2 rounded-lg hover:bg-[var(--bg-surface-elevated)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors shrink-0"
                  title="Copy email"
                >
                  {copiedField === "email" ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Phone */}
              <div className="p-3.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center justify-between gap-3 group">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-2 rounded-lg bg-[var(--badge-hands-bg)] text-[var(--accent-indigo)] shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-[10px] font-mono text-[var(--text-subtle)] uppercase">Phone / Mobile</div>
                    <div className="text-xs font-mono text-[var(--text-main)] truncate">
                      {CONTACT_INFO.phone}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(CONTACT_INFO.phone, "phone")}
                  className="p-2 rounded-lg hover:bg-[var(--bg-surface-elevated)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors shrink-0"
                  title="Copy phone"
                >
                  {copiedField === "phone" ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Location */}
              <div className="p-3.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-[var(--text-subtle)] uppercase">Location</div>
                  <div className="text-xs font-mono text-[var(--text-main)]">
                    {CONTACT_INFO.location}
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links Cards */}
            <div className="space-y-3.5">
              <a
                href={CONTACT_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="anime-contact-item p-4 rounded-xl glass-card border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)]/40 transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5">
                  <LinkedinIcon className="w-4 h-4 text-[var(--accent-cyan)]" />
                  <span className="text-xs font-semibold text-[var(--text-main)]">Connect on LinkedIn</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-[var(--accent-cyan)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              {/* GitHub Redirection and logo commented out as requested */}
              {/* <a
                href={CONTACT_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="anime-contact-item p-4 rounded-xl glass-card border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)]/40 transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5">
                  <GithubIcon className="w-4 h-4 text-[var(--accent-cyan)]" />
                  <span className="text-xs font-semibold text-[var(--text-main)]">GitHub</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-[var(--accent-cyan)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a> */}
            </div>
          </div>

          {/* Interactive Contact Form (Right 7 Cols) */}
          <div className="lg:col-span-7">
            <div className="anime-contact-item p-6 sm:p-8 rounded-2xl glass-card border border-[var(--border-subtle)] space-y-6">
              <div>
                <h3 className="text-xl font-bold text-[var(--text-main)] mb-1">
                  Send a Direct Message
                </h3>
                <p className="text-xs text-[var(--text-muted)]">
                  Fill out the fields below to send a message directly to Hardik's inbox.
                </p>
              </div>

              {status === "success" ? (
                <div className="p-6 sm:p-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3 animate-in zoom-in-95 duration-200">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h4 className="text-lg font-bold text-[var(--text-main)]">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-[var(--text-main)]">{formData.name || "there"}</strong>. Your inquiry has been dispatched directly to{" "}
                    <span className="text-[var(--accent-cyan)] font-mono font-semibold">{CONTACT_INFO.email}</span>. Hardik will review and get back to you shortly.
                  </p>
                  {isActivationNotice && (
                    <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] font-mono text-left max-w-md mx-auto">
                      💡 <strong>Note for Hardik:</strong> FormSubmit sent a one-time confirmation to <strong>{CONTACT_INFO.email}</strong>. Please check your inbox and click "Activate Form" once to complete setup.
                    </div>
                  )}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setStatus("idle");
                        setIsActivationNotice(false);
                        setFormData({ name: "", email: "", subject: "", message: "" });
                      }}
                      className="px-5 py-2.5 rounded-lg text-xs font-semibold bg-[var(--bg-surface-elevated)] hover:bg-[var(--bg-surface)] text-[var(--text-main)] border border-[var(--border-subtle)] transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="contact-name"
                        className="text-xs font-mono text-[var(--text-subtle)] block"
                      >
                        Your Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. John Smith"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] focus:border-[var(--accent-cyan)] text-xs text-[var(--text-main)] placeholder-[var(--text-subtle)] focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="contact-email"
                        className="text-xs font-mono text-[var(--text-subtle)] block"
                      >
                        Email Address *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. john@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] focus:border-[var(--accent-cyan)] text-xs text-[var(--text-main)] placeholder-[var(--text-subtle)] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-subject"
                      className="text-xs font-mono text-[var(--text-subtle)] block"
                    >
                      Subject / Role Title
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Full-Stack .NET & Angular SDE Opportunity"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] focus:border-[var(--accent-cyan)] text-xs text-[var(--text-main)] placeholder-[var(--text-subtle)] focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-message"
                      className="text-xs font-mono text-[var(--text-subtle)] block"
                    >
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Write your message or role details here..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] focus:border-[var(--accent-cyan)] text-xs text-[var(--text-main)] placeholder-[var(--text-subtle)] focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {status === "error" && (
                    <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-2.5 text-xs text-rose-300">
                      <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <p>{errorMessage}</p>
                        <button
                          type="button"
                          onClick={() => {
                            const mailtoUrl = `mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(
                              formData.subject || `Inquiry from ${formData.name}`
                            )}&body=${encodeURIComponent(
                              `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
                            )}`;
                            window.location.href = mailtoUrl;
                          }}
                          className="text-[var(--accent-cyan)] underline font-mono text-[11px] hover:opacity-80"
                        >
                          Click here to send via mail app fallback →
                        </button>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium text-xs bg-[var(--accent-cyan)] text-slate-950 hover:bg-cyan-400 transition-all duration-200 shadow-md shadow-cyan-500/20 disabled:opacity-50"
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Sending to Inbox...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Message Directly</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
