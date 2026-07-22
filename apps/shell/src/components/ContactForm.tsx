'use client';

import { FormEvent, useState } from 'react';
import { z } from 'zod';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';

const leadSchema = z.object({
  fullName: z.string().min(2, 'Enter your full name'),
  corporateEmail: z.string().email('Use a valid corporate email'),
  industrySector: z.string().min(2, 'Select an industry sector'),
  message: z.string().max(5000).optional(),
});

const SECTORS = [
  'Banking',
  'NBFC',
  'Fintech',
  'Insurance',
  'Payments',
  'Other BFSI',
];

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setFieldErrors({});

    const form = new FormData(e.currentTarget);
    const payload = {
      fullName: String(form.get('fullName') || ''),
      corporateEmail: String(form.get('corporateEmail') || ''),
      industrySector: String(form.get('industrySector') || ''),
      message: String(form.get('message') || '') || undefined,
    };

    const parsed = leadSchema.safeParse(payload);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        if (i.path[0]) errs[String(i.path[0])] = i.message;
      });
      setFieldErrors(errs);
      return;
    }

    setStatus('loading');
    try {
      const res = await fetch(`${API_BASE}/api/v1/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Request failed (${res.status})`);
      }
      setStatus('success');
      e.currentTarget.reset();
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Unable to submit');
    }
  }

  return (
    <section id="contact" className="section-pad bg-white">
      <div className="site-container">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="section-eyebrow">Contact</p>
          <h2 className="section-title mt-3">Request an enterprise demo</h2>
          <p className="section-lead">
            Tell us about your institution. Our solutions team will follow up with a tailored
            Decision Core, Credit Bureau, or AIOps walkthrough.
          </p>
        </div>

        <form onSubmit={onSubmit} className="mx-auto max-w-lg space-y-4" noValidate>
          <Field label="Full name" name="fullName" error={fieldErrors.fullName} required />
          <Field
            label="Corporate email"
            name="corporateEmail"
            type="email"
            error={fieldErrors.corporateEmail}
            required
          />
          <div>
            <label htmlFor="industrySector" className="mb-1.5 block text-sm font-medium text-ink">
              Industry sector
            </label>
            <select
              id="industrySector"
              name="industrySector"
              required
              defaultValue=""
              className="field-input"
            >
              <option value="" disabled>
                Select sector
              </option>
              {SECTORS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            {fieldErrors.industrySector && (
              <p className="mt-1 text-sm text-red-500">{fieldErrors.industrySector}</p>
            )}
          </div>
          <div>
            <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="field-input"
              placeholder="What are you looking to evaluate?"
            />
          </div>

          <button type="submit" disabled={status === 'loading'} className="btn-primary disabled:opacity-50">
            {status === 'loading' ? 'Submitting…' : 'Submit inquiry'}
          </button>

          {status === 'success' && (
            <p className="text-sm text-brand" role="status">
              Thank you — your inquiry has been received.
            </p>
          )}
          {error && (
            <p className="text-sm text-red-500" role="alert">
              {error}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = 'text',
  error,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  error?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
      </label>
      <input id={name} name={name} type={type} required={required} className="field-input" />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
