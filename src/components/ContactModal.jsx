import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy, Mail, Send, X } from "lucide-react";

const EMAIL = "moiserod04@gmail.com";
const PROJECT_SCOPES = [
  "UI/UX Design",
  "Design System",
  "Full-time Role",
  "Freelance Project",
  "Other",
];

export default function ContactModal({ onClose }) {
  const [copyStatus, setCopyStatus] = useState("idle");

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopyStatus("copied");
      window.setTimeout(() => setCopyStatus("idle"), 1800);
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
        window.setTimeout(() => setCopyStatus("idle"), 1800);
      } catch {
        setCopyStatus("failed");
        window.setTimeout(() => setCopyStatus("idle"), 2500);
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
    <motion.div
      className="contact-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <button
        className="contact-modal-backdrop"
        type="button"
        aria-label="Close contact dialog"
        onClick={onClose}
      />
      <section
        className="contact-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
      >
        <button
          className="contact-modal-close"
          type="button"
          aria-label="Close"
          onClick={onClose}
        >
          <X aria-hidden="true" />
        </button>
        <p className="contact-modal-kicker">
          <span aria-hidden="true" />
          GET IN TOUCH
        </p>
        <h2 id="contact-modal-title">Let&apos;s Work Together</h2>
        <p className="contact-modal-subtitle">
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
    </motion.div>
  );
}
