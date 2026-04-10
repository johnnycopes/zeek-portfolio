'use client'

import { useState } from 'react'
import styles from './ContactForm.module.css'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const SERVICES = [
  'Art Direction',
  'Visual Identity Design',
  'Packaging Design',
  'Web Design',
  'Lettering & Font Design',
  'Photography',
  'Logo Design',
  'Collateral Social Media Design',
]

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [validationMessage, setValidationMessage] = useState('')

  function validate(data: FormData): string {
    const missing: string[] = []
    if (!String(data.get('name') ?? '').trim()) missing.push('name')
    const email = String(data.get('email') ?? '').trim()
    if (!email) {
      missing.push('email')
    } else if (!isValidEmail(email)) {
      return 'Please enter a valid email address.'
    }
    if (!String(data.get('projectDetails') ?? '').trim()) missing.push('project details')
    if (missing.length === 0) return ''
    if (missing.length === 1) return `Please fill in your ${missing[0]}.`
    const last = missing.pop()
    return `Please fill in your ${missing.join(', ')} and ${last}.`
  }

  async function handleSubmit(e: { preventDefault(): void; currentTarget: HTMLFormElement }) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    // Honeypot check
    if (data.get('website')) return

    const msg = validate(data)
    if (msg) {
      setValidationMessage(msg)
      return
    }
    setValidationMessage('')

    const payload = {
      name: data.get('name'),
      email: data.get('email'),
      projectDetails: data.get('projectDetails'),
      company: data.get('company'),
      services: data.getAll('services'),
      projectValue: data.get('projectValue'),
      fixedBudget: data.get('fixedBudget'),
      timeline: data.get('timeline'),
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
        <h2>Thank you!</h2>
        <p>I&apos;ll be in touch soon.</p>
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
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Jane Smith"
          onChange={() => setValidationMessage('')}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="email">Email *</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="jane@example.com"
          onChange={() => setValidationMessage('')}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="projectDetails">Project Details *</label>
        <textarea
          id="projectDetails"
          name="projectDetails"
          rows={6}
          placeholder="e.g. We're launching a new hot sauce brand and need a full visual identity — logo, label design, and brand guidelines."
          onChange={() => setValidationMessage('')}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          placeholder="Acme Co."
        />
      </div>

      <div className={styles.field}>
        <label>Design Services Needed</label>
        <p className={styles.hint}>Select all that apply.</p>
        <div className={styles.checkboxGroup}>
          {SERVICES.map((service) => (
            <label key={service} className={styles.checkboxItem}>
              <input type="checkbox" name="services" value={service} />
              {service}
            </label>
          ))}
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="projectValue">Project Value</label>
        <p className={styles.hint}>If a budget or range is not already established, we will work with you to establish a value on what we create together. </p>
        <select id="projectValue" name="projectValue">
          <option value="">Not sure yet</option>
          <option value="≤ $10,000">≤ $10,000</option>
          <option value="$10,000 – $20,000">$10,000 – $20,000</option>
          <option value="$20,000 – $30,000">$20,000 – $30,000</option>
          <option value="≥ $30,000">≥ $30,000</option>
        </select>
      </div>

      <div className={styles.field}>
        <label htmlFor="fixedBudget">Fixed Max Budget</label>
        <p className={styles.hint}>If you have a fixed budget for the project, please let us know here. We provide small, medium and large branding packages. However, creative process can also be dictated by max budget cost.</p>
        <textarea
          id="fixedBudget"
          name="fixedBudget"
          rows={3}
          placeholder="e.g. $8,500"
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="timeline">Timeline</label>
        <p className={styles.hint}>Do you have a set completion date for the project?</p>
        <textarea
          id="timeline"
          name="timeline"
          rows={3}
          placeholder="e.g. End of Q2 2025"
        />
      </div>

      <div className={styles.submitRow}>
        <button type="submit" className={styles.submit} disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Sending…' : 'Submit'}
        </button>
        {validationMessage && (
          <p className={styles.validationMessage}>{validationMessage}</p>
        )}
        {status === 'error' && (
          <p className={styles.validationMessage}>
            Something went wrong. Please try again or email{' '}
            <a href="mailto:info@zacharykiernan.com">info@zacharykiernan.com</a>.
          </p>
        )}
      </div>
    </form>
  )
}
