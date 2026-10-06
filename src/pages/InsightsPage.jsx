import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { INSIGHTS } from '../data/insights'
import { T } from '../styles/tokens'
import { SectionLabel, BtnOutline } from '../components/UI'
import SEO from '../components/SEO'
import { IMG } from '../data/images'

const CATEGORIES = ['All', 'Thought Leadership', 'Framework', 'Case Brief']
const CARD_COLORS = [T.teal, T.navy, T.gold]

export default function InsightsPage() {
  const navigate = useNavigate()
  const go = (path) => { navigate(path); window.scrollTo({ top: 0 }) }
  const [filter, setFilter] = useState('All')

  const filtered = filter === 'All' ? INSIGHTS : INSIGHTS.filter(i => i.category === filter)

  return (
    <main style={{ paddingTop: 72 }}>
      <SEO
        title="Insights"
        description="Frameworks, case briefs, and thought leadership from Summit practitioners — covering strategy execution, digital transformation, operational excellence, and leadership in Ghana."
        canonical="/insights"
      />
      <section style={{ background: T.navy, padding: '80px 0 64px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
          <SectionLabel>Thought Leadership</SectionLabel>
          <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 'var(--h1)', color: '#fff', lineHeight: 1.08, maxWidth: 700, marginBottom: 24 }}>
            Insights
          </h1>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.7)', maxWidth: 580, lineHeight: 1.75 }}>
            Frameworks, case briefs, and thought leadership from Summit's practitioners.
          </p>
        </div>
      </section>

      <section style={{ background: '#fff', padding: '64px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>

          {/* Filter tabs */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 40 }} role="tablist" aria-label="Filter by category">
            {CATEGORIES.map(c => (
              <button
                key={c}
                role="tab"
                aria-selected={filter === c}
                onClick={() => setFilter(c)}
                style={{
                  padding: '8px 20px',
                  border: `2px solid ${filter === c ? T.teal : T.lightGray}`,
                  background: filter === c ? T.teal : 'transparent',
                  color: filter === c ? '#fff' : T.gray,
                  cursor: 'pointer', fontFamily: 'Manrope, sans-serif',
                  fontWeight: 600, fontSize: 13, transition: 'all 0.2s',
                }}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Featured insight — always the first item of the active filter, so it never shows a piece outside the selected category */}
          {filtered.length > 0 && (
            <div style={{ background: T.warm, padding: '40px', borderLeft: `4px solid ${T.teal}`, marginBottom: 48 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: T.teal, fontFamily: 'Manrope, sans-serif', marginBottom: 8 }}>Featured</div>
              <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 24, color: T.navy, marginBottom: 12, lineHeight: 1.3 }}>
                {filtered[0].title}
              </h2>
              <p style={{ fontSize: 15, color: '#4A6073', lineHeight: 1.7, maxWidth: 640, marginBottom: 20 }}>{filtered[0].summary}</p>
              <BtnOutline onClick={() => go(`/insights/${filtered[0].slug}`)} style={{ fontSize: 13, padding: '10px 20px' }}>
                Read Insight
              </BtnOutline>
            </div>
          )}

          {/* Cards grid */}
          <div className='insights-grid' style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
            {filtered.map((ins, i) => (
              <button
                key={ins.slug}
                onClick={() => go(`/insights/${ins.slug}`)}
                style={{ background: '#fff', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0, display: 'block',
                  boxShadow: '0 2px 8px rgba(16,42,67,0.06)', transition: 'transform 0.25s ease, box-shadow 0.25s ease' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(16,42,67,0.12)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 2px 8px rgba(16,42,67,0.06)' }}
              >
                {/* Thumbnail */}
                <div style={{ height: 180, overflow: 'hidden', position: 'relative' }}>
                  <img src={IMG.insights[ins.slug] || IMG.insightFallback} alt={ins.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                    onMouseLeave={e => e.target.style.transform = 'scale(1)'} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(16,42,67,0.4), transparent)' }} />
                  <div style={{ position: 'absolute', top: 14, left: 14, background: CARD_COLORS[i % 3], padding: '4px 10px', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff', fontFamily: 'Manrope, sans-serif' }}>{ins.category}</div>
                </div>
                <div style={{ padding: '20px' }}>
                  <div style={{ fontSize: 12, color: T.gray, marginBottom: 10 }}>{ins.read} read · {ins.date}</div>
                  <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 15, color: T.navy, lineHeight: 1.35, marginBottom: 12 }}>{ins.title}</div>
                  <div style={{ fontSize: 12, color: CARD_COLORS[i % 3], fontWeight: 700, fontFamily: 'Manrope, sans-serif' }}>Read →</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
