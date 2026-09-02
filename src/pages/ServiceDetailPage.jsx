import { useNavigate, useParams } from 'react-router-dom'
import { SERVICES } from '../data/services'
import { T } from '../styles/tokens'
import { SectionLabel, DiagnosticCTABanner } from '../components/UI'
import SEO from '../components/SEO'
import NotFoundPage from './NotFoundPage'

export default function ServiceDetailPage() {
  const { slug } = useParams()
  const navigate  = useNavigate()
  const go = (path) => { navigate(path); window.scrollTo({ top: 0 }) }

  const s = SERVICES.find(x => x.slug === slug)
  if (!s) return <NotFoundPage />

  const related = SERVICES.filter(x => x.slug !== slug).slice(0, 3)

  return (
    <main style={{ paddingTop: 72 }}>
      <SEO
        title={s.title}
        description={`${s.eyebrow} — ${s.summary}`}
        canonical={`/services/${s.slug}`}
      />
      {/* Hero */}
      <section style={{ background: T.navy, padding: '80px 0 64px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
          <SectionLabel>{s.eyebrow}</SectionLabel>
          <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 'var(--h1)', color: '#fff', lineHeight: 1.08, maxWidth: 700, marginBottom: 24 }}>
            {s.title}
          </h1>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.7)', maxWidth: 580, lineHeight: 1.75 }}>{s.summary}</p>
        </div>
      </section>

      {/* Problem statement */}
      <section style={{ background: T.warm, padding: '64px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ maxWidth: 720, borderLeft: `4px solid ${s.color}`, paddingLeft: 32 }}>
            <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: s.color, marginBottom: 12 }}>The Challenge</div>
            <p style={{ fontSize: 17, color: T.ink, lineHeight: 1.8 }}>{s.challenge}</p>
          </div>
        </div>
      </section>

      {/* What we do + Deliverables */}
      <section style={{ background: '#fff', padding: '64px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
          <div className='grid-2col' style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
            <div>
              <SectionLabel>What We Do</SectionLabel>
              <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 'var(--h3)', color: T.navy, marginBottom: 16, lineHeight: 1.3 }}>
                Our approach to {s.title}
              </h2>
              <p style={{ fontSize: 16, color: '#4A6073', lineHeight: 1.8 }}>{s.what}</p>
            </div>
            <div>
              <SectionLabel>Key Deliverables</SectionLabel>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {s.deliverables.map(d => (
                  <div key={d} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', background: T.warm, padding: '14px 16px' }}>
                    <span style={{ color: s.color, fontSize: 14, marginTop: 1, flexShrink: 0 }}>✓</span>
                    <span style={{ fontSize: 14, color: T.ink, lineHeight: 1.5 }}>{d}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Outcomes + Diagnostic focus */}
      <section style={{ background: T.navy, padding: '64px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }}>
            <div>
              <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: T.gold, marginBottom: 16 }}>Intended Outcomes</div>
              {s.outcomes.map(o => (
                <div key={o} style={{ borderLeft: `2px solid ${T.gold}`, paddingLeft: 16, marginBottom: 12, fontSize: 14, color: 'rgba(255,255,255,0.8)', lineHeight: 1.5 }}>{o}</div>
              ))}
            </div>
            <div>
              <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: T.gold, marginBottom: 16 }}>Diagnostic Focus Areas</div>
              {s.focus.map(f => (
                <div key={f} style={{ background: 'rgba(255,255,255,0.06)', padding: '12px 16px', marginBottom: 8, fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>{f}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Personas */}
      <section style={{ background: '#fff', padding: '64px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
          <SectionLabel>Who This Is For</SectionLabel>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {s.personas.map(p => (
              <div key={p} style={{ background: T.mist, padding: '10px 20px', fontSize: 13, color: T.navy, fontWeight: 600, fontFamily: 'Manrope, sans-serif' }}>{p}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Related services */}
      <section style={{ background: T.warm, padding: '64px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
          <SectionLabel>Related Services</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2 }}>
            {related.map(r => (
              <button
                key={r.slug}
                onClick={() => go(`/services/${r.slug}`)}
                style={{ background: '#fff', border: 'none', cursor: 'pointer', textAlign: 'left', padding: '24px', borderBottom: `3px solid ${r.color}`, transition: 'all 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(16,42,67,0.08)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = ''}
              >
                <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 15, color: T.navy, marginBottom: 8, lineHeight: 1.3 }}>{r.title}</div>
                <div style={{ fontSize: 12, color: r.color, fontWeight: 700, fontFamily: 'Manrope, sans-serif' }}>View service →</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <DiagnosticCTABanner onNav={go} />
    </main>
  )
}
