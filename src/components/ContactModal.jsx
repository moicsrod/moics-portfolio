import React, { useCallback, useEffect, useRef, useState } from "react";
import { Check, Copy, Mail, Loader2 } from "lucide-react";

const EMAIL = "moiserod04@gmail.com";
const PROJECT_SCOPES = [
  "UI/UX Design",
  "Design System",
  "Full-time Role",
  "Freelance Project",
  "Other",
];

const API_ENDPOINT = "https://35aao305p7.execute-api.us-east-2.amazonaws.com/sendContactEmail";

export default function ContactModal({ isOpen, onClose }) {
  const [copyStatus, setCopyStatus] = useState("idle");
  const [isClosing, setIsClosing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("idle"); // "idle" | "success" | "error"

  const closeTimer = useRef(null);
  const isClosingRef = useRef(false);

  const closeModal = useCallback(() => {
    if (isClosingRef.current) return;
    isClosingRef.current = true;
    setIsClosing(true);
    closeTimer.current = window.setTimeout(() => {
      isClosingRef.current = false;
      setIsClosing(false);
      setSubmitStatus("idle");
      onClose();
    }, 250);
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return undefined;

    isClosingRef.current = false;
    setIsClosing(false);
    setSubmitStatus("idle");
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    const formElement = event.currentTarget;
    const formData = new FormData(formElement);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("scope"),
      message: `Project Scope: ${formData.get("scope")}\n\n${formData.get("message")}`,
    };

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Error en el envío del formulario");
      }

      setSubmitStatus("success");
      formElement.reset();
      window.setTimeout(() => {
        closeModal();
      }, 1800);
    } catch (error) {
      console.error(error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
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
            className="font-['Boldonse',sans-serif] uppercase text-[#090909] select-none whitespace-nowrap m-0"
            style={{
              fontSize: "clamp(24px, 3.8vw, 36px)",
              lineHeight: "1.1",
              fontWeight: 400,
              marginBottom: "20px",
            }}
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
            <Mail className="h-5 w-5 shrink-0 text-[#090909]" aria-hidden="true" />
            <span className="font-semibold text-[#090909]">{EMAIL}</span>
          </div>
          <button type="button" onClick={copyEmail} aria-live="polite">
            {copyStatus === "copied" ? (
              <>
                <Check className="h-4 w-4" aria-hidden="true" />
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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
            />
          </label>
          <label>
            <span>Project Scope</span>
            <select name="scope" defaultValue="" required disabled={isSubmitting}>
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
              disabled={isSubmitting}
            />
          </label>

          {submitStatus === "success" && (
            <p className="col-span-full m-0 text-center text-sm font-semibold text-[#090909]">
              Message sent successfully! I will reply soon.
            </p>
          )}

          {submitStatus === "error" && (
            <p className="col-span-full m-0 text-center text-sm font-semibold text-[#ff2964]">
              Could not send message. Please try copying the email above.
            </p>
          )}

          <button
            className="contact-submit flex items-center justify-center gap-2"
            type="submit"
            disabled={isSubmitting || submitStatus === "success"}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Sending...</span>
              </>
            ) : submitStatus === "success" ? (
              <span>Message Sent!</span>
            ) : (
              <span>Send Message</span>
            )}
          </button>
        </form>
      </section>
    </div>
  );
}