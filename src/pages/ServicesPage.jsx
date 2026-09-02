import { useNavigate } from 'react-router-dom'
import { SERVICES } from '../data/services'
import { T } from '../styles/tokens'
import { SectionLabel, DiagnosticCTABanner } from '../components/UI'
import SEO from '../components/SEO'

export default function ServicesPage() {
  const navigate = useNavigate()
  const go = (path) => { navigate(path); window.scrollTo({ top: 0 }) }

  return (
    <main style={{ paddingTop: 72 }}>
      <SEO
        title="Our Services"
        description="Six service lines — Strategy Execution, Digital Transformation, Operational Excellence, Customer Experience, Leadership & Change, and Risk & Governance — all delivered through the Summit 4D™ methodology."
        canonical="/services"
      />
      <section style={{ background: T.navy, padding: '80px 0 64px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
          <SectionLabel>What We Do</SectionLabel>
          <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 'var(--h1)', color: '#fff', lineHeight: 1.08, maxWidth: 700, marginBottom: 24 }}>
            Six service lines.<br />One methodology.
          </h1>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.7)', maxWidth: 580, lineHeight: 1.75 }}>
            Every Summit service is delivered through the 4D™ methodology. We don't offer services without outcomes.
          </p>
        </div>
      </section>

      <section style={{ background: '#fff', padding: '80px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
          <div className='grid-2col' style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 2 }}>
            {SERVICES.map(s => (
              <button
                key={s.slug}
                onClick={() => go(`/services/${s.slug}`)}
                style={{ background: T.warm, border: 'none', cursor: 'pointer', textAlign: 'left', padding: '40px', borderLeft: `4px solid transparent`, transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderLeftColor = s.color; e.currentTarget.style.boxShadow = '0 4px 24px rgba(16,42,67,0.1)' }}
                onMouseLeave={e => { e.currentTarget.style.background = T.warm; e.currentTarget.style.borderLeftColor = 'transparent'; e.currentTarget.style.boxShadow = '' }}
              >
                <div style={{ fontSize: 32, marginBottom: 16, color: s.color }}>{s.icon}</div>
                <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: s.color, marginBottom: 8 }}>{s.eyebrow}</div>
                <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 18, color: T.navy, marginBottom: 12, lineHeight: 1.3 }}>{s.title}</div>
                <div style={{ fontSize: 14, color: '#4A6073', lineHeight: 1.65, marginBottom: 20 }}>{s.summary}</div>
                <div style={{ fontSize: 12, color: s.color, fontWeight: 700, fontFamily: 'Manrope, sans-serif', letterSpacing: '0.06em' }}>Explore this service →</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <DiagnosticCTABanner onNav={go} />
    </main>
  )
}
