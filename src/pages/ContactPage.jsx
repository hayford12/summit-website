import { useState, useCallback, memo } from 'react'
import { T } from '../styles/tokens'
import { SectionLabel, BtnPrimary } from '../components/UI'
import SEO from '../components/SEO'

const PRACTICE_AREAS = [
  'Strategy Execution & Performance',
  'Digital Transformation & IT',
  'Operational Excellence',
  'Customer & Citizen Experience',
  'Leadership & Capability',
  'Resilience, Risk & Governance',
  'SME Growth',
  'Other',
]

// ── Defined OUTSIDE ContactPage so it never gets recreated on re-render ───────
const inputStyle = (err) => ({
  width: '100%', padding: '12px 16px',
  border: `1.5px solid ${err ? T.error : T.lightGray}`,
  fontFamily: 'Source Sans 3, sans-serif', fontSize: 15,
  color: T.ink, outline: 'none', background: '#fff',
  transition: 'border-color 0.2s', boxSizing: 'border-box',
})

const Field = memo(({ label, required, error, children }) => (
  <div style={{ marginBottom: 20 }}>
    <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: T.navy, marginBottom: 6, letterSpacing: '0.02em' }}>
      {label}{required && <span style={{ color: T.error }}> *</span>}
    </label>
    {children}
    {error && <div role="alert" style={{ fontSize: 12, color: T.error, marginTop: 6 }}>{error}</div>}
  </div>
))

// ── The form is its own isolated component — state changes don't affect the page ──
const DiagnosticForm = memo(() => {
  const [form, setForm] = useState({
    name: '', email: '', org: '', title: '', phone: '', area: '', challenge: '', consent: false,
  })
  const [errors, setErrors] = useState({})
  const [sent, setSent]         = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // useCallback so these handlers are stable references — no re-renders on keystroke
  const set = useCallback((key, val) => setForm(f => ({ ...f, [key]: val })), [])

  const validate = useCallback(() => {
    const e = {}
    if (!form.name.trim())     e.name     = 'Full name is required.'
    if (!form.email.trim())    e.email    = 'Work email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email address.'
    if (!form.org.trim())      e.org      = 'Organisation is required.'
    if (!form.area)            e.area     = 'Please select a practice area.'
    if (!form.challenge.trim()) e.challenge = 'Please describe your challenge or focus.'
    else if (form.challenge.length > 1000) e.challenge = 'Please limit to 1,000 characters.'
    if (!form.consent)         e.consent  = 'You must provide consent to proceed.'
    return e
  }, [form])

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length > 0) return
    setSubmitting(true)

    // ── Formspree integration ──────────────────────────────────────────────
    // 1. Go to https://formspree.io and sign up with the target email
    // 2. Create a new form — you'll get an ID like: https://formspree.io/f/xyzabcde
    // 3. Replace YOUR_FORMSPREE_ID below with just the ID part (e.g. xyzabcde)
    const FORMSPREE_ID = 'xeaqakyg'

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name:      form.name,
          email:     form.email,
          org:       form.org,
          title:     form.title,
          phone:     form.phone,
          area:      form.area,
          challenge: form.challenge,
          _subject:  `Diagnostic Request — ${form.org} (${form.name})`,
        }),
      })
      if (res.ok) {
        setSent(true)
      } else {
        const data = await res.json()
        alert(data?.errors?.[0]?.message || 'Submission failed. Please try again or email us directly.')
      }
    } catch {
      alert('Network error. Please check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }, [form, validate])

  if (sent) {
    return (
      <div style={{ textAlign: 'center', padding: '48px 0' }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: T.mist, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: 28, color: T.teal }}>✓</div>
        <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, color: T.navy, fontSize: 24, marginBottom: 12 }}>Request Received</h2>
        <p style={{ fontSize: 15, color: '#4A6073', lineHeight: 1.7 }}>
          A Summit practitioner will be in touch within two business days to arrange your diagnostic conversation.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Diagnostic intake form">
      <style>{`
        .form-row-2col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        @media (max-width: 768px) {
          .form-row-2col {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
      <div className="form-row-2col">
        <Field label="Full Name" required error={errors.name}>
          <input
            style={inputStyle(errors.name)}
            placeholder="Your full name"
            value={form.name}
            onChange={e => set('name', e.target.value)}
            aria-required="true"
            autoComplete="name"
          />
        </Field>
        <Field label="Official Work Email" required error={errors.email}>
          <input
            type="email"
            style={inputStyle(errors.email)}
            placeholder="you@organisation.com"
            value={form.email}
            onChange={e => set('email', e.target.value)}
            aria-required="true"
            autoComplete="email"
          />
        </Field>
      </div>

      <Field label="Organisation / Institution" required error={errors.org}>
        <input
          style={inputStyle(errors.org)}
          placeholder="Your organisation"
          value={form.org}
          onChange={e => set('org', e.target.value)}
          aria-required="true"
          autoComplete="organization"
        />
      </Field>

      <div className="form-row-2col">
        <Field label="Designation / Job Title" error={errors.title}>
          <input
            style={inputStyle(false)}
            placeholder="Your role"
            value={form.title}
            onChange={e => set('title', e.target.value)}
            autoComplete="organization-title"
          />
        </Field>
        <Field label="Direct Telephone" error={errors.phone}>
          <input
            type="tel"
            style={inputStyle(false)}
            placeholder="+233 ..."
            value={form.phone}
            onChange={e => set('phone', e.target.value)}
            autoComplete="tel"
          />
        </Field>
      </div>

      <Field label="Primary Practice Area" required error={errors.area}>
        <select
          style={{ ...inputStyle(errors.area), background: '#fff' }}
          value={form.area}
          onChange={e => set('area', e.target.value)}
          aria-required="true"
        >
          <option value="">Select a practice area</option>
          {PRACTICE_AREAS.map(a => <option key={a} value={a}>{a}</option>)}
        </select>
      </Field>

      <Field label="Transformation Focus / Challenge" required error={errors.challenge}>
        <textarea
          rows={5}
          style={{ ...inputStyle(errors.challenge), resize: 'vertical' }}
          placeholder="Describe the challenge, change, or ambition you'd like to explore..."
          value={form.challenge}
          onChange={e => set('challenge', e.target.value)}
          aria-required="true"
          maxLength={1000}
        />
        <div style={{ fontSize: 11, color: form.challenge.length > 900 ? T.error : T.gray, marginTop: 4 }}>
          {form.challenge.length}/1,000 characters
        </div>
      </Field>

      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <input
            type="checkbox"
            id="consent"
            checked={form.consent}
            onChange={e => set('consent', e.target.checked)}
            style={{ marginTop: 3, accentColor: T.teal, width: 16, height: 16, flexShrink: 0 }}
            aria-required="true"
          />
          <label htmlFor="consent" style={{ fontSize: 12, color: '#4A6073', lineHeight: 1.6, cursor: 'pointer' }}>
            I consent to Summit Performance and Transformation Consult Limited processing my personal data for the purpose of this enquiry, in accordance with Ghana's{' '}
            <strong>Data Protection Act 2012 (Act 843)</strong> and Summit's Privacy Policy.
          </label>
        </div>
        {errors.consent && (
          <div role="alert" style={{ fontSize: 12, color: T.error, marginTop: 6, paddingLeft: 26 }}>{errors.consent}</div>
        )}
      </div>

      <BtnPrimary type="submit" disabled={submitting} style={{ width: '100%', textAlign: 'center' }}>
        {submitting ? 'Submitting…' : 'Submit Diagnostic Request'}
      </BtnPrimary>
    </form>
  )
})

// ── Page shell — purely static, never re-renders due to form state ─────────────
export default function ContactPage() {
  return (
    <main style={{ paddingTop: 72 }}>
      <SEO
        title="Request a Diagnostic Conversation"
        description="Start a confidential diagnostic conversation with a Summit practitioner. We respond within two business days."
        canonical="/contact"
      />
      {/* Hero */}
      <section style={{ background: T.navy, padding: 'clamp(40px, 8vw, 80px) 0 clamp(32px, 6vw, 64px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px, 5vw, 32px)' }}>
          <SectionLabel>Start Here</SectionLabel>
          <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 'var(--h1)', color: '#fff', lineHeight: 1.08, maxWidth: 700, marginBottom: 24 }}>
            Let's Define Your Next<br />Transformation Milestone.
          </h1>
          <p style={{ fontSize: 'clamp(15px, 4vw, 18px)', color: 'rgba(255,255,255,0.7)', maxWidth: 560, lineHeight: 1.75 }}>
            Request a confidential diagnostic conversation. We respond within two business days.
          </p>
        </div>
      </section>

      <section style={{ background: '#fff', padding: 'clamp(40px, 8vw, 80px) 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px, 5vw, 32px)' }}>
          <div className='contact-grid' style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 80, alignItems: 'start' }}>

            {/* Contact info — static, never re-renders */}
            <div>
              <SectionLabel>Contact Information</SectionLabel>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {[
                  ['📞', 'Telephone', '+233 552 244 854\n+233 248 396 933\n+233 262 940 594'],
                  ['✉️', 'Email',     'info@summitperformanceconsult.com'],
                  ['🌐', 'Website',   'www.summitperformanceconsult.com'],
                  ['📍', 'Office',    'No. 12 Sowah Close\nAmbassadorial Enclave, East Legon\nAccra, Ghana\nDigital Address: GA-332-4333'],
                ].map(([icon, label, value]) => (
                  <div key={label} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    <span style={{ fontSize: 18, flexShrink: 0 }}>{icon}</span>
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: T.gold, fontFamily: 'Manrope, sans-serif', marginBottom: 4 }}>{label}</div>
                      <div style={{ fontSize: 14, color: T.ink, lineHeight: 1.7, whiteSpace: 'pre-line', wordBreak: 'break-word' }}>{value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Isolated form component */}
            <div style={{ background: T.warm, padding: 'clamp(24px, 5vw, 40px)' }}>
              <DiagnosticForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
