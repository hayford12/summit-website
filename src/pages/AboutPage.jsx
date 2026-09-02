import { useNavigate } from 'react-router-dom'
import { CORE_VALUES } from '../data/insights'
import { T } from '../styles/tokens'
import { SectionLabel, GoldRule, DiagnosticCTABanner } from '../components/UI'
import SEO from '../components/SEO'
import { IMG } from '../data/images'

export default function AboutPage() {
  const navigate = useNavigate()
  const go = (path) => { navigate(path); window.scrollTo({ top: 0 }) }

  return (
    <main style={{ paddingTop: 72 }}>
      <SEO
        title="About Us"
        description="Summit is an Accra-based management consulting firm founded to close the gap between strategic intent and operational execution across Ghana's institutions."
        canonical="/about"
      />
      {/* Hero */}
      <section style={{ background: T.navy, padding: '80px 0 64px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
          <SectionLabel>About Summit</SectionLabel>
          <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 'var(--h1)', color: '#fff', lineHeight: 1.08, maxWidth: 700, marginBottom: 24 }}>
            We close the execution gap.
          </h1>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.7)', maxWidth: 580, lineHeight: 1.75 }}>
            Summit Performance and Transformation Consult Limited is an Accra-based management consulting firm operating across strategy execution, operational excellence, digital transformation, and leadership capability.
          </p>
        </div>
      </section>

      {/* Who We Are + Execution Gap */}
      <section style={{ background: '#fff', padding: '80px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80 }}>
            <div>
              <SectionLabel>Who We Are</SectionLabel>
              <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 'var(--h2)', color: T.navy, marginBottom: 8 }}>Our Story</h2>
              <GoldRule />
              <p style={{ fontSize: 16, color: '#4A6073', lineHeight: 1.8, marginBottom: 16 }}>
                Summit was founded on a single observation: Ghanaian institutions have the ambition to transform, but too many transformation programmes fail not from lack of strategy, but from failure to execute.
              </p>
              <p style={{ fontSize: 16, color: '#4A6073', lineHeight: 1.8 }}>
                We built Summit to be the firm that bridges that gap — combining senior practitioner expertise with structured methodology and hands-on implementation, grounded in genuine understanding of Ghana's institutional environment.
              </p>
            </div>
            <div style={{ background: T.warm, padding: '40px', borderLeft: `4px solid ${T.gold}` }}>
              <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: T.gold, marginBottom: 16 }}>The Execution Gap</div>
              <p style={{ fontSize: 16, color: T.ink, lineHeight: 1.8, marginBottom: 16 }}>
                Most organisations can write a strategy. Few can execute it. The gap between intent and reality is where value is lost — in stalled initiatives, misaligned teams, underutilised technology, and measurement frameworks that don't track what matters.
              </p>
              <p style={{ fontSize: 16, color: T.ink, lineHeight: 1.8 }}>
                Summit exists to close that gap. Not with more reports. With embedded, measurable change.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section style={{ background: T.navy, padding: '80px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }}>
            {[
              ['Vision', "To be Ghana's most trusted partner for strategy execution and organisational transformation — the firm that turns ambition into measurable results."],
              ['Mission', 'To close the gap between strategic intent and operational performance for Ghanaian institutions through rigorous diagnosis, disciplined implementation, and embedded capability transfer.'],
            ].map(([t, d]) => (
              <div key={t} style={{ borderLeft: `4px solid ${T.gold}`, paddingLeft: 32 }}>
                <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: T.gold, marginBottom: 12 }}>{t}</div>
                <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.82)', lineHeight: 1.75 }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Six Core Values */}
      <section style={{ background: '#fff', padding: '80px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
          <SectionLabel>What We Stand For</SectionLabel>
          <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 'var(--h2)', color: T.navy, marginBottom: 8 }}>Six Core Values</h2>
          <GoldRule />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2 }}>
            {CORE_VALUES.map((v, i) => {
              const colors = [T.navy, T.teal, T.gold, T.teal, T.navy, T.gold]
              return (
                <div key={v.name} style={{ background: T.warm, padding: '32px', borderTop: `3px solid ${colors[i]}` }}>
                  <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 17, color: T.navy, marginBottom: 8 }}>{v.name}</div>
                  <div style={{ fontSize: 14, color: '#4A6073', lineHeight: 1.65 }}>{v.desc}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Summit Promise */}
      <section style={{ background: T.mist, padding: '80px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
          <SectionLabel>Our Commitment</SectionLabel>
          <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 'var(--h2)', color: T.navy, marginBottom: 8 }}>The Summit Promise</h2>
          <div style={{ width: 48, height: 3, background: T.gold, margin: '16px auto 32px' }} />
          <p style={{ fontSize: 18, color: T.ink, maxWidth: 680, margin: '0 auto', lineHeight: 1.8, fontStyle: 'italic' }}>
            "We leave every engagement having transferred the capability, embedded the process, and moved the metrics — so that Summit's exit is a mark of success, not a return to the status quo."
          </p>
        </div>
      </section>

      {/* Leadership */}
      <section style={{ background: '#fff', padding: '80px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
          <SectionLabel>Our Team</SectionLabel>
          <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 'var(--h2)', color: T.navy, marginBottom: 8 }}>Senior Leadership</h2>
          <GoldRule />
          <div className='leadership-grid' style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 32 }}>
            {[
              { name: '[Name]', role: 'Managing Director & Principal Consultant', bio: 'A practitioner with senior leadership experience across strategy execution and transformation in Ghana\'s financial sector.' },
              { name: '[Name]', role: 'Director, Digital Transformation', bio: 'Technology and business change specialist with a track record in digital strategy and IT-enabled transformation across West Africa.' },
              { name: '[Name]', role: 'Director, Operational Excellence', bio: 'Process redesign and operational improvement expert with extensive experience in banking and public sector operations.' },
            ].map((l, idx) => (
              <div key={l.role} style={{ borderTop: `3px solid ${T.gold}`, paddingTop: 24 }}>
                <div style={{ width: 88, height: 88, borderRadius: '50%', overflow: 'hidden', marginBottom: 16, border: `3px solid ${T.gold}` }}>
                  <img src={IMG.leaders[idx]} alt={l.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                </div>
                <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 17, color: T.navy, marginBottom: 4 }}>{l.name}</div>
                <div style={{ fontSize: 13, color: T.teal, fontWeight: 600, marginBottom: 12 }}>{l.role}</div>
                <div style={{ fontSize: 14, color: '#4A6073', lineHeight: 1.65 }}>{l.bio}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Standards */}
      <section style={{ background: T.warm, padding: '80px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
          <SectionLabel>Governance</SectionLabel>
          <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 'var(--h2)', color: T.navy, marginBottom: 8 }}>Professional Standards & Governance</h2>
          <GoldRule />
          <p style={{ fontSize: 16, color: '#4A6073', lineHeight: 1.8, maxWidth: 700 }}>
            Summit operates under Ghana's Companies Act 2019 (Act 992). Our data practices comply with the Ghana Data Protection Act 2012 (Act 843). We adhere to professional standards aligned with international management consulting practice, and we carry professional indemnity insurance on all client engagements.
          </p>
        </div>
      </section>

      <DiagnosticCTABanner onNav={go} />
    </main>
  )
}
// NOTE: import IMG at top of file to use images
