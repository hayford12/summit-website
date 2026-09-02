import { useNavigate } from 'react-router-dom'
import { SECTORS } from '../data/sectors'
import { T } from '../styles/tokens'
import { SectionLabel, DiagnosticCTABanner } from '../components/UI'
import SEO from '../components/SEO'

export default function SectorsPage() {
  const navigate = useNavigate()
  const go = (path) => { navigate(path); window.scrollTo({ top: 0 }) }

  return (
    <main style={{ paddingTop: 72 }}>
      <SEO
        title="Sectors We Serve"
        description="Summit serves Banking & Financial Services, Insurance, Public Sector, Private Enterprises, and SMEs across Ghana with context-specific transformation interventions."
        canonical="/sectors"
      />
      <section style={{ background: T.navy, padding: '80px 0 64px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
          <SectionLabel>Where We Work</SectionLabel>
          <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 'var(--h1)', color: '#fff', lineHeight: 1.08, maxWidth: 700, marginBottom: 24 }}>
            Sectors We Serve
          </h1>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.7)', maxWidth: 580, lineHeight: 1.75 }}>
            Context-specific interventions grounded in each sector's real operating environment.
          </p>
        </div>
      </section>

      <section style={{ background: '#fff', padding: '80px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
            {SECTORS.map((s, i) => (
              <button
                key={s.slug}
                onClick={() => go(`/sectors/${s.slug}`)}
                style={{ background: i % 2 === 0 ? T.warm : '#fff', border: 'none', cursor: 'pointer', textAlign: 'left', padding: '40px', display: 'flex', alignItems: 'center', gap: 48, transition: 'all 0.2s', borderLeft: '4px solid transparent' }}
                onMouseEnter={e => { e.currentTarget.style.borderLeftColor = T.teal; e.currentTarget.style.boxShadow = '0 2px 16px rgba(16,42,67,0.06)' }}
                onMouseLeave={e => { e.currentTarget.style.borderLeftColor = 'transparent'; e.currentTarget.style.boxShadow = '' }}
              >
                <span style={{ fontSize: 48, flexShrink: 0 }}>{s.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 20, color: T.navy, marginBottom: 8 }}>{s.label}</div>
                  <div style={{ fontSize: 14, color: '#4A6073', lineHeight: 1.65, maxWidth: 600 }}>{s.landscape}</div>
                </div>
                <div style={{ fontSize: 12, color: T.teal, fontWeight: 700, fontFamily: 'Manrope, sans-serif', flexShrink: 0 }}>Explore →</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <DiagnosticCTABanner onNav={go} />
    </main>
  )
}
