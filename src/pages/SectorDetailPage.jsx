import { useNavigate, useParams } from 'react-router-dom'
import { SECTORS } from '../data/sectors'
import { SERVICES } from '../data/services'
import { T } from '../styles/tokens'
import { SectionLabel, DiagnosticCTABanner } from '../components/UI'
import SEO from '../components/SEO'
import { IMG } from '../data/images'
import NotFoundPage from './NotFoundPage'

export default function SectorDetailPage() {
  const { slug }  = useParams()
  const navigate  = useNavigate()
  const go = (path) => { navigate(path); window.scrollTo({ top: 0 }) }

  const s = SECTORS.find(x => x.slug === slug)
  if (!s) return <NotFoundPage />

  return (
    <main style={{ paddingTop: 72 }}>
      <SEO
        title={s.label}
        description={`Summit's transformation interventions for ${s.label} in Ghana — ${s.landscape.slice(0, 120)}...`}
        canonical={`/sectors/${s.slug}`}
      />
      <section style={{ position: 'relative', padding: '80px 0 64px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src={IMG.sectors[s.slug] || IMG.hero} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(16,42,67,0.96) 50%, rgba(0,124,131,0.7) 100%)' }} />
        </div>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', position: 'relative', zIndex: 1 }}>
          <SectionLabel>Sector Focus</SectionLabel>
          <div style={{ fontSize: 48, marginBottom: 16 }}>{s.icon}</div>
          <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 'var(--h1)', color: '#fff', lineHeight: 1.08, maxWidth: 700, marginBottom: 24 }}>
            {s.label}
          </h1>
        </div>
      </section>

      <section style={{ background: T.warm, padding: '64px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
          <SectionLabel>Market Context</SectionLabel>
          <p style={{ fontSize: 17, color: T.ink, lineHeight: 1.8, maxWidth: 720, borderLeft: `4px solid ${T.gold}`, paddingLeft: 28 }}>{s.landscape}</p>
        </div>
      </section>

      <section style={{ background: '#fff', padding: '64px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
          <div className='grid-2col' style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }}>
            <div>
              <SectionLabel>Priority Challenges</SectionLabel>
              {s.challenges.map(c => (
                <div key={c} style={{ display: 'flex', gap: 12, marginBottom: 12, background: T.warm, padding: '14px 16px', alignItems: 'flex-start' }}>
                  <span style={{ color: T.gold, fontWeight: 700, marginTop: 1, flexShrink: 0 }}>▸</span>
                  <span style={{ fontSize: 14, color: T.ink, lineHeight: 1.55 }}>{c}</span>
                </div>
              ))}
            </div>
            <div>
              <SectionLabel>Summit's Intervention Areas</SectionLabel>
              {s.interventions.map(v => (
                <div key={v} style={{ display: 'flex', gap: 12, marginBottom: 12, background: T.mist, padding: '14px 16px', alignItems: 'flex-start' }}>
                  <span style={{ color: T.teal, fontWeight: 700, marginTop: 1, flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: 14, color: T.ink, lineHeight: 1.55 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: T.warm, padding: '64px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
          <SectionLabel>Relevant Services</SectionLabel>
          <div className='grid-3col' style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2 }}>
            {SERVICES.slice(0, 3).map(sv => (
              <button
                key={sv.slug}
                onClick={() => go(`/services/${sv.slug}`)}
                style={{ background: '#fff', border: 'none', cursor: 'pointer', textAlign: 'left', padding: '24px', borderBottom: `3px solid ${sv.color}`, transition: 'all 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(16,42,67,0.08)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = ''}
              >
                <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 15, color: T.navy, marginBottom: 8 }}>{sv.title}</div>
                <div style={{ fontSize: 12, color: sv.color, fontWeight: 700, fontFamily: 'Manrope, sans-serif' }}>View service →</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <DiagnosticCTABanner onNav={go} />
    </main>
  )
}
