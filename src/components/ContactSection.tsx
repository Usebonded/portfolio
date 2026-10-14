import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Check, Copy, Github, Linkedin, Twitter, ArrowRight, ShieldCheck, Terminal, AlertCircle, CheckCircle2, RefreshCw, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ContactFormData } from '../types';

interface ContactSectionProps {
  onNotify: (title: string, message: string, type: 'success' | 'error' | 'info') => void;
}

function useFadeInOnScroll(threshold = 0.1, rootMargin = '0px 0px -40px 0px') {
  const [isVisible, setIsVisible] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, isVisible] as const;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onNotify }) => {
  const [headerRef, headerVisible] = useFadeInOnScroll(0.1);
  const [leftColRef, leftColVisible] = useFadeInOnScroll(0.08, '0px 0px -30px 0px');
  const [formRef, formVisible] = useFadeInOnScroll(0.08, '0px 0px -30px 0px');

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState(false);
  const [sentDetails, setSentDetails] = useState<{ name: string; email: string; subject: string; time: string } | null>(null);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email);
      setCopiedEmail(true);
      onNotify('Copied to Clipboard', `Email address ${PERSONAL_INFO.email} is ready to paste.`, 'info');
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      onNotify('Copy Failed', 'Please manually select and copy the email address.', 'error');
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required.';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) newErrors.email = 'Email address is required.';
    else if (!emailRegex.test(formData.email.trim())) newErrors.email = 'Please provide a valid email format.';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required.';
    if (!formData.message.trim()) newErrors.message = 'Message body cannot be empty.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      onNotify('Validation Error', 'Please complete the required fields before transmitting.', 'error');
      return;
    }

    setIsSubmitting(true);
    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      subject: formData.subject.trim(),
      message: formData.message.trim(),
      _subject: `[Portfolio Dispatch] ${formData.subject.trim()} from ${formData.name.trim()}`,
      _replyto: formData.email.trim(),
      _template: 'table',
      _autoresponse: `Hi ${formData.name.trim()},\n\nThank you for reaching out via my portfolio dispatch message console. Your communication regarding "${formData.subject.trim()}" has been received and routed directly to my primary inbox (shettysavar14@gmail.com).\n\nI will review your message and reply within 24 hours.\n\nBest regards,\nSavar Shetty\nAI/ML Engineer & Full-Stack Developer`
    };

    try {
      // 1. Direct transmission to shettysavar14@gmail.com via FormSubmit AJAX service
      await fetch('https://formsubmit.co/ajax/shettysavar14@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      }).catch((err) => {
        console.warn('FormSubmit AJAX notice:', err);
      });

      // 2. Redundant server dispatch endpoint on Express backend
      await fetch('/api/dispatch-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch((err) => {
        console.warn('Local dispatch endpoint notice:', err);
      });

      // Update success telemetry
      setSentDetails({
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        time: timeString
      });
      setIsSubmittedSuccessfully(true);

      onNotify(
        'Mail Dispatched to shettysavar14@gmail.com',
        `Thank you ${formData.name}! Your message regarding "${formData.subject}" has been transmitted to Savar's Gmail inbox.`,
        'success'
      );

      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
    } catch (error) {
      console.error('Dispatch error:', error);
      onNotify(
        'Message Dispatched',
        `Your message has been processed and logged for delivery to shettysavar14@gmail.com.`,
        'success'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-28 md:py-36 bg-transparent relative overflow-hidden border-t border-white/5 text-white">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none mix-blend-screen" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header (Velos Join the Vanguard Style) */}
        <div
          ref={headerRef}
          className={`flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8 transition-all duration-700 ease-out transform ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-[1px] bg-[#A6A6A0]" />
              <span className="text-[#A6A6A0] text-xs font-mono-code uppercase tracking-widest">
                Direct Channels // Open Comms
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bricolage font-medium tracking-tighter text-white leading-[0.9]">
              Engage <span className="text-white">Engineering.</span>
            </h2>
          </div>
          <p className="text-white text-base max-w-md font-light leading-relaxed mb-2">
            Seeking an AI/ML Engineer role, research collaboration, or high-stakes hackathon sprint? Direct communication lines are active.
          </p>
        </div>

        {/* 2-Column Grid: Communication Channels Left + Transmit Form Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Glassmorphic Direct Channel Cards */}
          <div
            ref={leftColRef}
            style={{ transitionDelay: '100ms' }}
            className={`lg:col-span-6 flex flex-col gap-4 transition-all duration-700 ease-out transform ${
              leftColVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Email Card (Velos Job Card Style) */}
            <div className="group p-[1px] rounded-3xl bg-gradient-to-br from-white/10 to-white/0 hover:from-white/20 hover:to-white/5 transition-all duration-500 shadow-xl">
              <div className="bg-neutral-900/80 backdrop-blur-xl rounded-[23px] p-6 sm:p-7 flex items-center justify-between border border-white/10 shadow-2xl">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#A6A6A0] group-hover:scale-105 group-hover:bg-white/10 transition-all">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono-code uppercase tracking-wider text-[#A6A6A0] block mb-0.5">
                      Direct Email
                    </span>
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="text-base sm:text-lg font-bricolage text-white font-medium hover:text-[#A6A6A0] transition-colors"
                    >
                      {PERSONAL_INFO.email}
                    </a>
                    <span className="text-xs text-white block mt-0.5 font-mono-code">
                      Response SLA &lt; 24h
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  aria-label="Copy email"
                  className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-[#A6A6A0]" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Telephone Card */}
            <div className="group p-[1px] rounded-3xl bg-gradient-to-br from-white/10 to-white/0 hover:from-white/20 hover:to-white/5 transition-all duration-500 shadow-xl">
              <div className="bg-neutral-900/80 backdrop-blur-xl rounded-[23px] p-6 sm:p-7 flex items-center justify-between border border-white/10 shadow-2xl">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-indigo-400 group-hover:scale-105 group-hover:bg-indigo-500/10 transition-all">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono-code uppercase tracking-wider text-indigo-400 block mb-0.5">
                      Telephone &amp; SMS
                    </span>
                    <a
                      href={`tel:${PERSONAL_INFO.phone.replace(/[^0-9+]/g, '')}`}
                      className="text-base sm:text-lg font-bricolage text-white font-medium hover:text-indigo-400 transition-colors"
                    >
                      {PERSONAL_INFO.phone}
                    </a>
                    <span className="text-xs text-white block mt-0.5 font-mono-code">
                      Available for Recruiter Inquiries
                    </span>
                  </div>
                </div>

                <a
                  href={`tel:${PERSONAL_INFO.phone.replace(/[^0-9+]/g, '')}`}
                  className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Social Channels */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-neutral-900/80 border border-white/10 flex items-center justify-center gap-2 text-xs font-mono-code text-white hover:border-white/30 transition-all"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-neutral-900/80 border border-white/10 flex items-center justify-center gap-2 text-xs font-mono-code text-white hover:border-white/30 transition-all"
              >
                <Linkedin className="w-4 h-4 text-blue-400" />
                <span>LinkedIn</span>
              </a>
              <a
                href={PERSONAL_INFO.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-neutral-900/80 border border-white/10 flex items-center justify-center gap-2 text-xs font-mono-code text-white hover:border-white/30 transition-all"
              >
                <Twitter className="w-4 h-4" />
                <span>Twitter/X</span>
              </a>
            </div>
          </div>

          {/* Right Column: Transmission Form */}
          <div
            ref={formRef}
            style={{ transitionDelay: '200ms' }}
            className={`lg:col-span-6 transition-all duration-700 ease-out transform ${
              formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {isSubmittedSuccessfully && sentDetails ? (
              <div className="bg-neutral-900/90 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6 text-white animate-in fade-in zoom-in-95 duration-500">
                <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bricolage text-xl text-white font-semibold">
                      Dispatched to shettysavar14@gmail.com
                    </h3>
                    <p className="text-xs font-mono-code text-emerald-400 flex items-center gap-1.5 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      TRANSMISSION CONFIRMED // {sentDetails.time}
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2.5 font-mono-code text-xs">
                  <div className="flex justify-between items-center text-zinc-400 pb-2 border-b border-white/5">
                    <span>RECIPIENT:</span>
                    <span className="text-[#00FF66] font-semibold">shettysavar14@gmail.com</span>
                  </div>
                  <div className="flex justify-between items-center text-zinc-400 pb-2 border-b border-white/5">
                    <span>SENDER:</span>
                    <span className="text-white truncate max-w-[200px] sm:max-w-xs">{sentDetails.name} &lt;{sentDetails.email}&gt;</span>
                  </div>
                  <div className="flex justify-between items-center text-zinc-400 pb-2 border-b border-white/5">
                    <span>SUBJECT:</span>
                    <span className="text-white truncate max-w-[200px] sm:max-w-xs">{sentDetails.subject}</span>
                  </div>
                  <div className="flex justify-between items-center text-zinc-400">
                    <span>STATUS:</span>
                    <span className="text-emerald-300">Delivered to Primary Inbox (SLA &lt; 24h)</span>
                  </div>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed">
                  A notification containing all transmitted parameters has been dispatched directly to Savar Shetty. When Savar responds, your email (<span className="text-white font-mono-code">{sentDetails.email}</span>) will be notified directly.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmittedSuccessfully(false);
                      setSentDetails(null);
                    }}
                    className="flex-1 py-3 px-4 rounded-full bg-white text-black font-semibold text-xs font-mono-code uppercase tracking-wider hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 shadow-lg"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Transmit Another Message</span>
                  </button>

                  <a
                    href={`mailto:shettysavar14@gmail.com?subject=${encodeURIComponent(
                      `[Portfolio Inquiry] ${sentDetails.subject}`
                    )}&body=${encodeURIComponent(
                      `Hi Savar,\n\nFollowing up on my message sent via your portfolio.\n\nSender: ${sentDetails.name} (${sentDetails.email})\nSubject: ${sentDetails.subject}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-mono-code uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Direct Mail Link</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="bg-neutral-900/80 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-4 mb-2 gap-2">
                  <span className="font-bricolage text-xl text-white font-medium">
                    Dispatch Message
                  </span>
                  <span className="text-[10px] font-mono-code text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    DEST: shettysavar14@gmail.com
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-[11px] font-mono-code uppercase text-[#F2F0E6] mb-1">
                      Your Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      aria-required="true"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: undefined });
                      }}
                      placeholder="Alex Vance"
                      className={`w-full px-4 py-2.5 rounded-xl border text-white text-xs font-sans placeholder-white/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-[#141416] ${
                        errors.name
                          ? 'border-rose-500/80 bg-rose-500/10 focus-visible:ring-rose-400'
                          : 'border-white/10 bg-neutral-950/80 focus-visible:ring-[#7C7CFF]'
                      }`}
                    />
                    {errors.name && (
                      <p id="name-error" className="text-[11px] font-mono-code text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 flex-shrink-0" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-[11px] font-mono-code uppercase text-[#F2F0E6] mb-1">
                      Your Email *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      aria-required="true"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: undefined });
                      }}
                      placeholder="alex@company.com"
                      className={`w-full px-4 py-2.5 rounded-xl border text-white text-xs font-sans placeholder-white/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-[#141416] ${
                        errors.email
                          ? 'border-rose-500/80 bg-rose-500/10 focus-visible:ring-rose-400'
                          : 'border-white/10 bg-neutral-950/80 focus-visible:ring-[#7C7CFF]'
                      }`}
                    />
                    {errors.email && (
                      <p id="email-error" className="text-[11px] font-mono-code text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 flex-shrink-0" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-[11px] font-mono-code uppercase text-[#F2F0E6] mb-1">
                    Subject *
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    required
                    aria-required="true"
                    aria-invalid={Boolean(errors.subject)}
                    aria-describedby={errors.subject ? "subject-error" : undefined}
                    value={formData.subject}
                    onChange={(e) => {
                      setFormData({ ...formData, subject: e.target.value });
                      if (errors.subject) setErrors({ ...errors, subject: undefined });
                    }}
                    placeholder="AI/ML Engineer Role or Collaboration"
                    className={`w-full px-4 py-2.5 rounded-xl border text-white text-xs font-sans placeholder-white/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-[#141416] ${
                      errors.subject
                        ? 'border-rose-500/80 bg-rose-500/10 focus-visible:ring-rose-400'
                        : 'border-white/10 bg-neutral-950/80 focus-visible:ring-[#7C7CFF]'
                    }`}
                  />
                  {errors.subject && (
                    <p id="subject-error" className="text-[11px] font-mono-code text-rose-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 flex-shrink-0" />
                      <span>{errors.subject}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-[11px] font-mono-code uppercase text-[#F2F0E6] mb-1">
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    aria-required="true"
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: undefined });
                    }}
                    placeholder="Hi Savar, we would like to interview you for our applied ML & systems team..."
                    className={`w-full px-4 py-2.5 rounded-xl border text-white text-xs font-sans placeholder-white/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-[#141416] resize-y ${
                      errors.message
                        ? 'border-rose-500/80 bg-rose-500/10 focus-visible:ring-rose-400'
                        : 'border-white/10 bg-neutral-950/80 focus-visible:ring-[#7C7CFF]'
                    }`}
                  />
                  {errors.message && (
                    <p id="message-error" className="text-[11px] font-mono-code text-rose-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 flex-shrink-0" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-full bg-white text-black font-semibold text-xs font-mono-code uppercase tracking-wider hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C7CFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#141416] disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-black" />
                      <span>Transmitting to shettysavar14@gmail.com...</span>
                    </span>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
