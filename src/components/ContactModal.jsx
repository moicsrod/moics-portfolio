import React, { useCallback, useEffect, useRef, useState } from "react";
import { Check, Copy, Mail, Send, X } from "lucide-react";

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
          <X aria-hidden="true" />
        </button>
        <h2
          id="contact-modal-title"
          className="font-['Boldonse',sans-serif] text-3xl uppercase tracking-tight text-white sm:text-4xl"
        >
          LET&apos;S WORK TOGETHER
        </h2>
        <p className="contact-modal-subtitle mt-2 mb-6 font-['Poppins',sans-serif] text-base leading-relaxed text-[#c6c6c6]">
          Available globally for Freelance projects and Full-time UI/UX Designer
          roles. Let&apos;s build something impactful together.
        </p>

        <div className="contact-email-copy">
          <Mail aria-hidden="true" />
          <span>{EMAIL}</span>
          <button type="button" onClick={copyEmail} aria-live="polite">
            {copyStatus === "copied" ? (
              <>
                <Check aria-hidden="true" />
                Copied!
              </>
            ) : copyStatus === "failed" ? (
              "Copy failed"
            ) : (
              <>
                <Copy aria-hidden="true" />
                COPY
              </>
            )}
          </button>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            <span>Your Name</span>
            <input name="name" type="text" autoComplete="name" required />
          </label>
          <label>
            <span>Your Email</span>
            <input name="email" type="email" autoComplete="email" required />
          </label>
          <label>
            <span>Project Scope</span>
            <select name="scope" defaultValue="" required>
              <option value="" disabled>
                Select a project scope
              </option>
              {PROJECT_SCOPES.map((scope) => (
                <option key={scope} value={scope}>
                  {scope}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>Message</span>
            <textarea name="message" rows="4" required />
          </label>
          <button className="contact-submit" type="submit">
            <Send aria-hidden="true" />
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
}
