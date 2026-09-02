import { useNavigate } from 'react-router-dom'
import { FOUR_D, ENGAGEMENT_MODELS } from '../data/insights'
import { T } from '../styles/tokens'
import { SectionLabel, GoldRule, BtnOutline, DiagnosticCTABanner } from '../components/UI'
import SEO from '../components/SEO'

export default function ApproachPage() {
  const navigate = useNavigate()
  const go = (path) => { navigate(path); window.scrollTo({ top: 0 }) }

  return (
    <main style={{ paddingTop: 72 }}>
      <SEO
        title="Our 4D™ Methodology"
        description="The Summit 4D™ Methodology — Diagnose, Design, Deliver, Embed. A disciplined, evidence-based engagement model that moves from diagnosis to embedded change."
        canonical="/approach"
      />
      <section style={{ background: T.navy, padding: '80px 0 64px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
          <SectionLabel>How We Work</SectionLabel>
          <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 'var(--h1)', color: '#fff', lineHeight: 1.08, maxWidth: 700, marginBottom: 24 }}>
            The Summit 4D™ Methodology
          </h1>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.7)', maxWidth: 580, lineHeight: 1.75 }}>
            A disciplined, evidence-based engagement model that moves from diagnosis to embedded change — with governance gates at every stage.
          </p>
        </div>
      </section>

      {/* Full 4D breakdown */}
      <section style={{ background: '#fff', padding: '80px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
          {FOUR_D.map((d, i) => (
            <div key={d.name} className='grid-2col' style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 64, marginBottom: i < 3 ? 64 : 0, paddingBottom: i < 3 ? 64 : 0, borderBottom: i < 3 ? `1px solid ${T.lightGray}` : 'none', alignItems: 'start' }}>
              <div style={{ borderLeft: `4px solid ${d.color}`, paddingLeft: 24 }}>
                <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 11, letterSpacing: '0.2em', color: d.color, marginBottom: 8 }}>{d.num}</div>
                <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 40, color: T.navy, lineHeight: 1, marginBottom: 16 }}>{d.name}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: d.color, fontFamily: 'Manrope, sans-serif', letterSpacing: '0.06em' }}>{d.gate}</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {d.items.map(item => (
                  <div key={item} style={{ background: T.warm, padding: '20px', borderLeft: `3px solid ${d.color}` }}>
                    <div style={{ fontSize: 14, color: T.ink, lineHeight: 1.6 }}>{item}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quality gates */}
      <section style={{ background: T.navy, padding: '80px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
          <SectionLabel>Quality Gates</SectionLabel>
          <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 'var(--h2)', color: '#fff', marginBottom: 8 }}>Four gates. Zero ambiguity.</h2>
          <GoldRule />
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.65)', maxWidth: 560, lineHeight: 1.75, marginBottom: 48 }}>
            Every Summit engagement is governed by four quality gates. No phase begins until the prior gate is signed off — jointly by Summit and the client.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0 }}>
            {FOUR_D.map((d, i) => (
              <div key={d.gate} style={{ background: 'rgba(255,255,255,0.05)', borderTop: `3px solid ${d.color}`, padding: '28px 24px' }}>
                <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 11, letterSpacing: '0.2em', color: d.color, marginBottom: 8 }}>Gate {i + 1}</div>
                <div style={{ color: '#fff', fontSize: 15, fontWeight: 600, fontFamily: 'Manrope, sans-serif' }}>{d.gate.split(': ')[1]}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement models */}
      <section style={{ background: '#fff', padding: '80px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
          <SectionLabel>How We Engage</SectionLabel>
          <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 'var(--h2)', color: T.navy, marginBottom: 8 }}>Four Engagement Models</h2>
          <GoldRule />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 2 }}>
            {ENGAGEMENT_MODELS.map((m, i) => {
              const colors = [T.teal, T.navy, T.gold, T.teal]
              return (
                <div key={m.title} style={{ background: T.warm, padding: '36px', borderBottom: `3px solid ${colors[i]}` }}>
                  <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 18, color: T.navy, marginBottom: 12 }}>{m.title}</div>
                  <div style={{ fontSize: 15, color: '#4A6073', lineHeight: 1.7, marginBottom: 24 }}>{m.desc}</div>
                  <BtnOutline onClick={() => go('/contact')} style={{ fontSize: 13, padding: '10px 20px' }}>
                    Request a Conversation
                  </BtnOutline>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <DiagnosticCTABanner onNav={go} />
    </main>
  )
}
