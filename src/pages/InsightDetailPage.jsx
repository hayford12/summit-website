import { useNavigate, useParams } from 'react-router-dom'
import { INSIGHTS } from '../data/insights'
import { T } from '../styles/tokens'
import { DiagnosticCTABanner } from '../components/UI'
import SEO from '../components/SEO'
import { IMG } from '../data/images'
import NotFoundPage from './NotFoundPage'

export default function InsightDetailPage() {
  const { slug }  = useParams()
  const navigate  = useNavigate()
  const go = (path) => { navigate(path); window.scrollTo({ top: 0 }) }

  const ins = INSIGHTS.find(i => i.slug === slug)
  if (!ins) return <NotFoundPage />

  return (
    <main style={{ paddingTop: 72 }}>
      <SEO
        title={ins.title}
        description={ins.summary}
        canonical={`/insights/${ins.slug}`}
        type="article"
      />
      <section style={{ position: 'relative', padding: '80px 0 64px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src={IMG.insights[ins.slug] || IMG.insightFallback} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(16,42,67,0.88)' }} />
        </div>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'flex', gap: 12, marginBottom: 20, alignItems: 'center' }}>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: T.gold, fontFamily: 'Manrope, sans-serif' }}>{ins.category}</span>
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>·</span>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{ins.read} read · {ins.date}</span>
          </div>
          <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 'var(--h2)', color: '#fff', lineHeight: 1.15, marginBottom: 24 }}>
            {ins.title}
          </h1>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.65)', lineHeight: 1.75 }}>{ins.summary}</p>
        </div>
      </section>

      <section style={{ background: '#fff', padding: '64px 0' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 32px' }}>
          <article style={{ fontSize: 16, color: T.ink, lineHeight: 1.85, maxWidth: '68ch' }}>
            {ins.body.map(section => (
              <div key={section.heading} style={{ marginBottom: 40 }}>
                <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 22, color: T.navy, margin: '0 0 16px' }}>{section.heading}</h2>
                <p>{section.content}</p>
              </div>
            ))}
          </article>

          {/* Author */}
          <div style={{ marginTop: 48, paddingTop: 32, borderTop: `1px solid ${T.lightGray}` }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', overflow: 'hidden', border: `2px solid ${T.gold}` }}>
                  <img src={IMG.authorPhotos[ins.author] || IMG.authorFallback} alt={ins.author} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                </div>
              <div>
                <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, color: T.navy, fontSize: 14 }}>{ins.author}</div>
                <div style={{ fontSize: 12, color: T.gray }}>Summit Performance & Transformation Consult</div>
              </div>
            </div>
          </div>

          {/* Back link */}
          <div style={{ marginTop: 48 }}>
            <button
              onClick={() => go('/insights')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: T.teal, fontWeight: 700, fontFamily: 'Manrope, sans-serif', fontSize: 14, display: 'flex', alignItems: 'center', gap: 6, padding: 0 }}
            >
              ← Back to Insights
            </button>
          </div>
        </div>
      </section>

      <DiagnosticCTABanner onNav={go} />
    </main>
  )
}
