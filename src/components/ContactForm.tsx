'use client'

import { useState, type FormEvent } from 'react'
import styles from './ContactForm.module.css'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    // Honeypot check
    if (data.get('website')) return

    const payload = {
      name: data.get('name'),
      email: data.get('email'),
      projectType: data.get('projectType'),
      budget: data.get('budget'),
      message: data.get('message'),
    }

    setStatus('submitting')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className={styles.success}>
        <h2>Message sent!</h2>
        <p>Thanks for reaching out. I&apos;ll get back to you soon.</p>
      </div>
    )
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        aria-hidden="true"
        className={styles.honeypot}
        autoComplete="off"
      />

      <div className={styles.field}>
        <label htmlFor="name">Name *</label>
        <input id="name" name="name" type="text" required placeholder="Your name" />
      </div>

      <div className={styles.field}>
        <label htmlFor="email">Email *</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="your@email.com"
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="projectType">Project Type</label>
        <select id="projectType" name="projectType">
          <option value="">Select a type…</option>
          <option value="Branding">Branding</option>
          <option value="Packaging">Packaging</option>
          <option value="Illustration">Illustration</option>
          <option value="Merch">Merch</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className={styles.field}>
        <label htmlFor="budget">Budget Range</label>
        <select id="budget" name="budget">
          <option value="">Not sure yet</option>
          <option value="Under $1k">Under $1k</option>
          <option value="$1k–$5k">$1k–$5k</option>
          <option value="$5k–$10k">$5k–$10k</option>
          <option value="$10k+">$10k+</option>
        </select>
      </div>

      <div className={styles.field}>
        <label htmlFor="message">Message *</label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder="Tell me about your project…"
        />
      </div>

      {status === 'error' && (
        <p className={styles.error}>
          Something went wrong. Please try again or email{' '}
          <a href="mailto:info@zacharykiernan.com">info@zacharykiernan.com</a>.
        </p>
      )}

      <button type="submit" className={styles.submit} disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  )
}
