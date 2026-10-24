import React, { useCallback, useEffect, useRef, useState } from "react";
import { Check, Copy, Mail, Send } from "lucide-react";

const EMAIL = "moiserod04@gmail.com";
const PROJECT_SCOPES = [
  "UI/UX Design",
  "Design System",
  "Full-time Role",
  "Freelance Project",
  "Other",
];

export default function ContactModal({ isOpen, onClose }) {
  const [copyStatus, setCopyStatus] = useState("idle");
  const [isClosing, setIsClosing] = useState(false);
  const closeTimer = useRef(null);
  const isClosingRef = useRef(false);

  const closeModal = useCallback(() => {
    if (isClosingRef.current) return;
    isClosingRef.current = true;
    setIsClosing(true);
    closeTimer.current = window.setTimeout(() => {
      isClosingRef.current = false;
      setIsClosing(false);
      onClose();
    }, 250);
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return undefined;

    isClosingRef.current = false;
    setIsClosing(false);
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeModal();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal, isOpen]);

  const copyTimer = useRef(null);

  useEffect(
    () => () => window.clearTimeout(copyTimer.current),
    [],
  );
  useEffect(
    () => () => window.clearTimeout(closeTimer.current),
    [],
  );

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopyStatus("copied");
      copyTimer.current = window.setTimeout(() => setCopyStatus("idle"), 1800);
    } catch {
      const emailInput = document.createElement("textarea");
      emailInput.value = EMAIL;
      emailInput.setAttribute("readonly", "");
      emailInput.style.position = "fixed";
      emailInput.style.opacity = "0";
      document.body.appendChild(emailInput);
      emailInput.select();

      try {
        if (!document.execCommand("copy")) {
          throw new Error("The browser rejected the clipboard copy request.");
        }
        setCopyStatus("copied");
        copyTimer.current = window.setTimeout(() => setCopyStatus("idle"), 1800);
      } catch {
        setCopyStatus("failed");
        copyTimer.current = window.setTimeout(() => setCopyStatus("idle"), 2500);
      } finally {
        emailInput.remove();
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const subject = `${formData.get("scope")}: ${formData.get("name")}`;
    const body = [
      `Name: ${formData.get("name")}`,
      `Email: ${formData.get("email")}`,
      `Project scope: ${formData.get("scope")}`,
      "",
      formData.get("message"),
    ].join("\n");

    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div
      className="contact-modal-overlay"
      style={{
        display: isOpen || isClosing ? "flex" : "none",
        pointerEvents: isOpen && !isClosing ? "auto" : "none",
        opacity: isOpen && !isClosing ? 1 : 0,
      }}
      aria-hidden={!isOpen && !isClosing}
    >
      <button
        className="contact-modal-backdrop"
        type="button"
        aria-label="Close contact dialog"
        onClick={closeModal}
      />
      <section
        className="contact-modal"
        style={{
          opacity: isOpen && !isClosing ? 1 : 0,
          transform: isOpen && !isClosing
            ? "translateY(0) scale(1)"
            : "translateY(12px) scale(0.96)",
        }}
        role="dialog"
        aria-modal={isOpen}
        aria-labelledby="contact-modal-title"
      >
        <button
          className="contact-modal-close"
          type="button"
          aria-label="Close"
          onClick={closeModal}
        >
          ×
        </button>

        <div className="contact-modal-header">
          <h2
            id="contact-modal-title"
            className="design-title font-['Boldonse',sans-serif]"
          >
            LET&apos;S WORK TOGETHER
          </h2>
          <p className="contact-modal-subtitle">
            Available globally for freelance projects and full-time UI/UX design
            roles. Let&apos;s build something cool.
          </p>
        </div>

        <div className="contact-email-copy">
          <div className="flex min-w-0 items-center gap-3">
            <Mail className="h-5 w-5 shrink-0 text-[#00D2AA]" aria-hidden="true" />
            <span className="font-medium text-white">{EMAIL}</span>
          </div>
          <button type="button" onClick={copyEmail} aria-live="polite">
            {copyStatus === "copied" ? (
              <>
                <Check className="h-4 w-4 text-[#00D2AA]" aria-hidden="true" />
                Copied!
              </>
            ) : copyStatus === "failed" ? (
              "Copy failed"
            ) : (
              <>
                <Copy className="h-4 w-4" aria-hidden="true" />
                COPY
              </>
            )}
          </button>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            <span>Your Name</span>
            <input
              name="name"
              type="text"
              placeholder="e.g. Satoshi Nakamoto"
              autoComplete="name"
              required
            />
          </label>
          <label>
            <span>Your Email</span>
            <input
              name="email"
              type="email"
              placeholder="name@domain.com"
              autoComplete="email"
              required
            />
          </label>
          <label>
            <span>Project Scope</span>
            <select name="scope" defaultValue="" required>
              <option value="" disabled>Select a project scope</option>
              {PROJECT_SCOPES.map((scope) => (
                <option key={scope} value={scope}>
                  {scope}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>Message</span>
            <textarea
              name="message"
              rows="3"
              placeholder="Tell me about your idea, timeline and goals..."
              required
            />
          </label>
          <button className="contact-submit" type="submit">
            <Send className="h-5 w-5" aria-hidden="true" />
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
}
