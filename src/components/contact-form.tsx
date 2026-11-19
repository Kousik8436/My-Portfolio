"use client";

import { useRef, useState, type FormEvent } from "react";
import { FiCheckCircle, FiSend } from "react-icons/fi";

type Fields = { name: string; email: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

export function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [errorMessage, setErrorMessage] = useState("");
  const sending = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    if (data.get("website")) return;
    const fields: Fields = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
    };
    const nextErrors: Errors = {};
    if (!fields.name) nextErrors.name = "Please enter your name.";
    if (!fields.email) nextErrors.email = "Please enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
      nextErrors.email = "Please enter a valid email address.";
    if (!fields.message) nextErrors.message = "Please add a message.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setStatus("idle");
      form
        .querySelector<HTMLElement>(`[name="${Object.keys(nextErrors)[0]}"]`)
        ?.focus();
      return;
    }
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (!serviceId || !templateId || !publicKey) {
      setErrorMessage(
        "The contact form is temporarily unavailable. Please connect with me on LinkedIn.",
      );
      setStatus("error");
      return;
    }
    sending.current = true;
    setStatus("sending");
    try {
      const { default: emailjs } = await import("@emailjs/browser");
      await emailjs.send(
        serviceId,
        templateId,
        { ...fields, from_name: fields.name, reply_to: fields.email },
        {
          publicKey,
          blockHeadless: true,
          limitRate: { id: "portfolio-contact", throttle: 30000 },
        },
      );
      form.reset();
      setStatus("success");
    } catch {
      setErrorMessage(
        "Your message couldn’t be sent. Please try again in a moment, or connect with me on LinkedIn.",
      );
      setStatus("error");
    } finally {
      sending.current = false;
    }
  }

  function clearError(field: keyof Fields) {
    if (errors[field])
      setErrors((current) => ({ ...current, [field]: undefined }));
    if (status === "success" || status === "error") setStatus("idle");
  }

  return (
    <form
      ref={formRef}
      className="contact-form"
      data-spotlight
      onSubmit={submit}
      noValidate
      aria-label="Contact Kousik Maity"
      aria-busy={status === "sending"}
    >
      <div className="form-heading">
        <h3>Have something in mind?</h3>
        <p>I’d love to hear about it.</p>
      </div>
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="contact-name">
            Your name <span aria-hidden="true">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            autoComplete="name"
            placeholder="Alex Morgan"
            required
            maxLength={100}
            onChange={() => clearError("name")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name ? (
            <span className="field-error" id="name-error">
              {errors.name}
            </span>
          ) : null}
        </div>
        <div className="form-field">
          <label htmlFor="contact-email">
            Email address <span aria-hidden="true">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="alex@company.com"
            required
            maxLength={254}
            onChange={() => clearError("email")}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email ? (
            <span className="field-error" id="email-error">
              {errors.email}
            </span>
          ) : null}
        </div>
      </div>
      <div className="form-field">
        <label htmlFor="contact-message">
          Your message <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          placeholder="Tell me about your project, an opportunity, or just say hello…"
          required
          maxLength={5000}
          onChange={() => clearError("message")}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message ? (
          <span className="field-error" id="message-error">
            {errors.message}
          </span>
        ) : null}
      </div>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="contact-website">Leave this field empty</label>
        <input
          id="contact-website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <div className="form-submit-row">
        <button
          className="button button-light"
          type="submit"
          disabled={status === "sending"}
        >
          <FiSend aria-hidden="true" />
          {status === "sending" ? "Sending message…" : "Send message"}
        </button>
        <span className="form-note">A conversation starts with hello.</span>
      </div>
      <div aria-live="polite" aria-atomic="true">
        {status === "success" ? (
          <p className="form-status success">
            <FiCheckCircle aria-hidden="true" />
            Thank you! Your message has been sent.
          </p>
        ) : status === "error" ? (
          <p className="form-status error" role="alert">
            {errorMessage}
          </p>
        ) : null}
      </div>
    </form>
  );
}
