import { useState } from 'react'
import { T } from '../styles/tokens'

export function SectionLabel({ children, light = false }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16,
      fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 11,
      letterSpacing: '0.18em', textTransform: 'uppercase', color: T.gold,
    }}>
      <span style={{ width: 32, height: 2, background: T.gold, display: 'block', flexShrink: 0 }} />
      {children}
    </div>
  )
}

export function GoldRule() {
  return <div style={{ width: 48, height: 3, background: T.gold, margin: '16px 0 28px' }} />
}

export function BtnPrimary({ children, onClick, type = 'button', disabled = false, style = {} }) {
  const [hov, setHov] = useState(false)
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: disabled ? T.gray : hov ? '#005f65' : T.teal,
        color: '#fff', border: 'none',
        padding: '14px 32px',
        fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 15,
        cursor: disabled ? 'not-allowed' : 'pointer',
        letterSpacing: '0.02em', transition: 'background 0.2s',
        ...style,
      }}
    >
      {children}
    </button>
  )
}

export function BtnOutline({ children, onClick, light = false, style = {} }) {
  const [hov, setHov] = useState(false)
  const borderColor = light ? 'rgba(255,255,255,0.5)' : T.teal
  const textColor   = light ? '#fff' : T.teal
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? T.teal : 'transparent',
        color: hov ? '#fff' : textColor,
        border: `2px solid ${hov ? T.teal : borderColor}`,
        padding: '12px 30px',
        fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 15,
        cursor: 'pointer', letterSpacing: '0.02em', transition: 'all 0.2s',
        ...style,
      }}
    >
      {children}
    </button>
  )
}

export function DiagnosticCTABanner({ onNav }) {
  return (
    <section style={{ background: T.navy, padding: '80px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
        <h2 style={{
          fontFamily: 'Manrope, sans-serif', fontWeight: 800,
          fontSize: 'clamp(1.75rem, 3.5vw, 2.6rem)',
          color: '#fff', marginBottom: 16, lineHeight: 1.15,
        }}>
          Where is your strategy falling short of execution?
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 17, maxWidth: 560, margin: '0 auto 32px', lineHeight: 1.7 }}>
          Schedule a confidential diagnostic conversation with a Summit practitioner. No obligation — just clarity.
        </p>
        <BtnPrimary onClick={() => onNav('/contact')}>Request a Diagnostic Conversation</BtnPrimary>
      </div>
    </section>
  )
}
