import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { SERVICES } from '../data/services'
import { FOUR_D, INSIGHTS } from '../data/insights'
import { IMG } from '../data/images'
import { T } from '../styles/tokens'
import { SectionLabel, GoldRule, BtnPrimary, BtnOutline, DiagnosticCTABanner } from '../components/UI'
import SEO from '../components/SEO'

// ── Count-up hook ────────────────────────────────────────────────────────────
function useCountUp(target, duration = 1800, active = false) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!active) return
    let start = null
    const num = parseInt(target.replace(/\D/g, '')) || 0
    const step = ts => {
      if (!start) start = ts
      const p = Math.min((ts - start) / duration, 1)
      setVal(Math.floor((1 - Math.pow(1 - p, 3)) * num))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [active, target, duration])
  return val
}

// ── Reveal on scroll ─────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, direction = 'up' }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.disconnect() }
    }, { threshold: 0.12 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  const tx = { up:'translateY(28px)', left:'translateX(-28px)', right:'translateX(28px)' }
  return (
    <div ref={ref} style={{ opacity:inView?1:0, transform:inView?'none':tx[direction], transition:`opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s` }}>
      {children}
    </div>
  )
}

const STATS = [
  { num:'50+', label:'Engagements delivered' },
  { num:'8+',  label:'Years in practice' },
  { num:'6',   label:'Service lines' },
  { num:'5',   label:'Sectors served' },
]

const SERVICE_IMAGES = [
  IMG.services.strategy, IMG.services.digital, IMG.services.operations,
  IMG.services.cx, IMG.services.leadership, IMG.services.risk,
]

const INSIGHT_COLORS = [T.teal, T.navy, T.gold]

export default function HomePage() {
  const navigate = useNavigate()
  const go = path => { navigate(path); window.scrollTo({ top: 0 }) }

  // Stats count-up
  const statsRef = useRef(null)
  const [statsInView, setStatsInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStatsInView(true); obs.disconnect() } }, { threshold: 0.3 })
    if (statsRef.current) obs.observe(statsRef.current)
    return () => obs.disconnect()
  }, [])
  const counts = STATS.map(s => useCountUp(s.num, 1800, statsInView))

  // 4D active step
  const [activeStep, setActiveStep] = useState(0)

  return (
    <main>
      <SEO
        title="Strategy Execution \& Transformation"
        description="Summit partners with financial institutions, public sector bodies, and growing enterprises across Ghana to close the gap between strategic ambition and operational performance."
        canonical="/"
      />
      {/* ── 1. HERO ── */}
      <section className='hero-section' style={{ minHeight:'100vh', display:'flex', alignItems:'center', paddingTop:72, position:'relative', overflow:'hidden' }}>
        <style>{`
          @keyframes fadeUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
          @keyframes kenBurns { from{transform:scale(1.06)} to{transform:scale(1)} }
        `}</style>
        {/* Background image */}
        <div style={{ position:'absolute', inset:0 }}>
          <img src={IMG.hero} alt="" loading="eager" style={{ width:'100%', height:'100%', objectFit:'cover', animation:'kenBurns 10s ease forwards' }} />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(105deg, rgba(16,42,67,0.97) 45%, rgba(16,42,67,0.72) 70%, rgba(0,124,131,0.45) 100%)' }} />
          <div style={{ position:'absolute', top:0, right:'38%', bottom:0, width:2, background:`linear-gradient(to bottom, transparent, ${T.gold}55, transparent)` }} />
        </div>

        <div className='hero-content' style={{ maxWidth:1200, margin:'0 auto', padding:'80px 32px', position:'relative', zIndex:2, width:'100%' }}>
          <div style={{ animation:'fadeUp 0.7s ease 0.1s both' }}>
            <SectionLabel>Ghana's Performance & Transformation Consultancy</SectionLabel>
          </div>
          <h1 style={{ fontFamily:'Manrope,sans-serif', fontWeight:800, color:'#fff', fontSize:'clamp(2.6rem,5.5vw,4.5rem)', lineHeight:1.05, maxWidth:640, marginBottom:28, letterSpacing:'-0.03em', animation:'fadeUp 0.7s ease 0.25s both' }}>
            From Strategy<br />to <span style={{ color:T.gold }}>Measurable Results.</span>
          </h1>
          <p style={{ fontSize:18, color:'rgba(255,255,255,0.75)', maxWidth:520, lineHeight:1.8, marginBottom:40, animation:'fadeUp 0.7s ease 0.4s both' }}>
            Summit partners with financial institutions, public sector bodies, and growing enterprises across Ghana to close the gap between strategic ambition and operational performance.
          </p>
          <div className='btn-stack-mobile' style={{ display:'flex', gap:16, flexWrap:'wrap', animation:'fadeUp 0.7s ease 0.55s both' }}>
            <BtnPrimary onClick={() => go('/contact')}>Request a Diagnostic Conversation</BtnPrimary>
            <BtnOutline light onClick={() => go('/services')}>Explore Our Services</BtnOutline>
          </div>

          {/* Animated stats */}
          <div ref={statsRef} className='hero-stats' style={{ display:'flex', gap:56, marginTop:80, paddingTop:40, borderTop:'1px solid rgba(255,255,255,0.15)', flexWrap:'wrap' }}>
            {STATS.map((s, i) => (
              <div key={s.label} style={{ animation: statsInView ? `fadeUp 0.6s ease ${i * 0.1}s both` : 'none' }}>
                <div className='hero-stat-number' style={{ fontFamily:'Manrope,sans-serif', fontWeight:800, fontSize:42, color:T.gold, lineHeight:1 }}>
                  {statsInView ? (s.num.includes('+') ? `${counts[i]}+` : counts[i]) : '0'}
                </div>
                <div style={{ fontSize:12, color:'rgba(255,255,255,0.5)', marginTop:4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. ABOUT SPLIT ── */}
      <section style={{ background:'#fff', overflow:'hidden' }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <div className='about-split' style={{ display:'grid', gridTemplateColumns:'1fr 1fr', alignItems:'stretch' }}>
            <Reveal direction="left">
              <div className='about-image' style={{ position:'relative', overflow:'hidden', minHeight:520 }}>
                <img src={IMG.about} alt="Summit consulting team" style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center top', transition:'transform 0.6s ease' }}
                  loading="lazy" onMouseEnter={e => e.target.style.transform = 'scale(1.04)'}
                  onMouseLeave={e => e.target.style.transform = 'scale(1)'} />
                <div style={{ position:'absolute', bottom:32, left:32, background:T.gold, padding:'16px 24px' }}>
                  <div style={{ fontFamily:'Manrope,sans-serif', fontWeight:800, fontSize:28, color:T.navy, lineHeight:1 }}>8+</div>
                  <div style={{ fontSize:12, fontWeight:600, color:T.navy, marginTop:2 }}>Years of Practice</div>
                </div>
              </div>
            </Reveal>
            <Reveal direction="right">
              <div className='about-text' style={{ padding:'64px 56px', background:T.warm, height:'100%' }}>
                <SectionLabel>Who We Are</SectionLabel>
                <h2 style={{ fontFamily:'Manrope,sans-serif', fontWeight:800, fontSize:'clamp(1.75rem,3vw,2.4rem)', color:T.navy, lineHeight:1.15, marginBottom:8 }}>
                  We close the execution gap.
                </h2>
                <GoldRule />
                <p style={{ fontSize:16, color:'#4A6073', lineHeight:1.85, marginBottom:20 }}>
                  Summit was founded on a single observation: Ghanaian institutions have the ambition to transform, but too many transformation programmes fail not from lack of strategy, but from failure to execute.
                </p>
                <p style={{ fontSize:16, color:'#4A6073', lineHeight:1.85, marginBottom:32 }}>
                  We combine senior practitioner expertise with structured methodology and hands-on implementation — grounded in genuine understanding of Ghana's institutional environment.
                </p>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:2, marginBottom:36 }}>
                  {[[T.navy,'Strategy','Execution Architecture'],[T.teal,'Digital','Adoption & ROI'],[T.gold,'Operations','Process & Efficiency'],[T.navy,'People','Leadership & Capability']].map(([c,t,d]) => (
                    <div key={t} style={{ background:'#fff', padding:'14px 18px', borderTop:`3px solid ${c}` }}>
                      <div style={{ fontFamily:'Manrope,sans-serif', fontWeight:800, fontSize:13, color:T.navy, marginBottom:2 }}>{t}</div>
                      <div style={{ fontSize:12, color:'#4A6073' }}>{d}</div>
                    </div>
                  ))}
                </div>
                <BtnOutline onClick={() => go('/about')}>Our Full Story</BtnOutline>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 3. SERVICES with image cards ── */}
      <section style={{ background:T.warm, padding:'96px 0' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 32px' }}>
          <Reveal>
            <SectionLabel>What We Do</SectionLabel>
            <h2 style={{ fontFamily:'Manrope,sans-serif', fontWeight:800, fontSize:'clamp(1.8rem,3.5vw,2.75rem)', color:T.navy, marginBottom:8 }}>
              Six transformation priorities.
            </h2>
            <GoldRule />
          </Reveal>
          <div className='services-grid' style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:3 }}>
            {SERVICES.map((s, i) => <ServiceImageCard key={s.slug} s={s} i={i} img={SERVICE_IMAGES[i]} onNav={() => go(`/services/${s.slug}`)} />)}
          </div>
        </div>
      </section>

      {/* ── 4. 4D INTERACTIVE ── */}
      <section style={{ background:'#fff', padding:'96px 0' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 32px' }}>
          <Reveal>
            <SectionLabel>Our Method</SectionLabel>
            <h2 style={{ fontFamily:'Manrope,sans-serif', fontWeight:800, fontSize:'clamp(1.8rem,3.5vw,2.75rem)', color:T.navy, marginBottom:8 }}>
              The Summit 4D™ Methodology
            </h2>
            <GoldRule />
          </Reveal>
          <div className='fourd-grid' style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:2, marginTop:40 }}>
            <div style={{ display:'flex', flexDirection:'column', gap:2 }}>
              {FOUR_D.map((d, i) => (
                <button key={d.name} onClick={() => setActiveStep(i)}
                  style={{ textAlign:'left', border:'none', cursor:'pointer', padding:'24px 28px', background:activeStep===i?d.color:T.warm, borderLeft:`4px solid ${activeStep===i?d.color:'transparent'}`, transition:'all 0.3s' }}>
                  <span style={{ fontFamily:'Manrope,sans-serif', fontWeight:700, fontSize:10, letterSpacing:'0.2em', color:activeStep===i?'rgba(255,255,255,0.6)':d.color, display:'block', marginBottom:4 }}>{d.num}</span>
                  <span style={{ fontFamily:'Manrope,sans-serif', fontWeight:800, fontSize:20, color:activeStep===i?'#fff':T.navy }}>{d.name}</span>
                </button>
              ))}
            </div>
            <div className='fourd-panel' style={{ background:FOUR_D[activeStep].color, padding:'48px 40px', transition:'background 0.4s', display:'flex', flexDirection:'column', justifyContent:'center' }}>
              <div className='fourd-ghost' style={{ fontFamily:'Manrope,sans-serif', fontWeight:800, fontSize:72, color:'rgba(255,255,255,0.08)', lineHeight:0.9, marginBottom:20 }}>{FOUR_D[activeStep].name}</div>
              <p style={{ fontSize:18, color:'rgba(255,255,255,0.9)', lineHeight:1.8, marginBottom:28 }}>{FOUR_D[activeStep].items[0]}</p>
              <div style={{ fontSize:11, fontWeight:700, letterSpacing:'0.12em', color:'rgba(255,255,255,0.45)', fontFamily:'Manrope,sans-serif' }}>{FOUR_D[activeStep].gate}</div>
            </div>
          </div>
          <div style={{ display:'flex', gap:8, marginTop:20, justifyContent:'center' }}>
            {FOUR_D.map((_, i) => (
              <button key={i} onClick={() => setActiveStep(i)} style={{ width:activeStep===i?28:8, height:8, borderRadius:4, background:activeStep===i?T.gold:T.lightGray, border:'none', cursor:'pointer', transition:'all 0.3s', padding:0 }} />
            ))}
          </div>
          <div style={{ textAlign:'center', marginTop:36 }}>
            <BtnOutline onClick={() => go('/approach')}>Explore the Full Methodology</BtnOutline>
          </div>
        </div>
      </section>

      {/* ── 5. PROMISE with background image ── */}
      <section style={{ padding:'96px 0', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0 }}>
          <img src={IMG.promise} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} loading="lazy" />
          <div style={{ position:'absolute', inset:0, background:'rgba(247,245,240,0.94)' }} />
        </div>
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 32px', position:'relative', zIndex:1 }}>
          <div className='promise-grid' style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:80, alignItems:'center' }}>
            <Reveal>
              <SectionLabel>The Summit Promise</SectionLabel>
              <h2 style={{ fontFamily:'Manrope,sans-serif', fontWeight:800, fontSize:'clamp(1.8rem,3vw,2.6rem)', color:T.navy, lineHeight:1.15 }}>
                We leave with results.<br />Not just reports.
              </h2>
              <GoldRule />
              <div style={{ position:'relative', padding:'28px 32px 28px 40px', background:'#fff', borderLeft:`4px solid ${T.gold}`, marginBottom:32, boxShadow:'0 4px 24px rgba(16,42,67,0.07)' }}>
                <div style={{ fontSize:72, fontFamily:'Georgia,serif', color:T.gold, lineHeight:0.5, position:'absolute', top:20, left:14, opacity:0.3 }}>"</div>
                <p style={{ fontSize:17, color:T.ink, lineHeight:1.8, fontStyle:'italic', position:'relative' }}>
                  We define success before we start, and we measure it. No vague outcomes. No shifting goalposts.
                </p>
              </div>
              <BtnPrimary onClick={() => go('/contact')}>Start a Diagnostic Conversation</BtnPrimary>
            </Reveal>
            <div style={{ display:'flex', flexDirection:'column', gap:3 }}>
              {[[T.navy,'Diagnosis first','We never propose a solution before we understand the root cause.'],[T.teal,'Context-specific design','No imported frameworks. Every intervention is built for your organisation.'],[T.gold,'Embedded delivery','We implement alongside your team — not at arm\'s length.'],[T.navy,'Measurable KPIs','Every engagement defines success metrics before work begins.'],[T.teal,'Capability transfer','Our exit criteria: your team can sustain the change without us.']].map(([c,t,d], i) => (
                <Reveal key={t} delay={i * 0.07}>
                  <div style={{ background:'#fff', padding:'16px 22px', borderLeft:`3px solid ${c}`, display:'flex', gap:14, alignItems:'flex-start', boxShadow:'0 2px 8px rgba(16,42,67,0.05)' }}>
                    <div style={{ width:8, height:8, borderRadius:'50%', background:c, marginTop:5, flexShrink:0 }} />
                    <div>
                      <div style={{ fontFamily:'Manrope,sans-serif', fontWeight:700, color:T.navy, marginBottom:2, fontSize:14 }}>{t}</div>
                      <div style={{ fontSize:13, color:'#4A6073', lineHeight:1.55 }}>{d}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. INSIGHTS with thumbnails ── */}
      <section style={{ background:'#fff', padding:'96px 0' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 32px' }}>
          <Reveal>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:48, flexWrap:'wrap', gap:16 }}>
              <div>
                <SectionLabel>Thought Leadership</SectionLabel>
                <h2 style={{ fontFamily:'Manrope,sans-serif', fontWeight:800, fontSize:'clamp(1.8rem,3.5vw,2.75rem)', color:T.navy }}>Latest Insights</h2>
                <GoldRule />
              </div>
              <BtnOutline onClick={() => go('/insights')}>All Insights</BtnOutline>
            </div>
          </Reveal>
          <div className='insights-grid' style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24 }}>
            {INSIGHTS.map((ins, i) => <InsightCard key={ins.slug} ins={ins} i={i} img={IMG.insights[i]} color={INSIGHT_COLORS[i]} onNav={() => go(`/insights/${ins.slug}`)} />)}
          </div>
        </div>
      </section>

      {/* ── 7. CTA BANNER with image ── */}
      <section style={{ position:'relative', padding:'112px 0', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0 }}>
          <img src={IMG.ctaBg} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} loading="lazy" />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg, rgba(16,42,67,0.97) 50%, rgba(0,124,131,0.88) 100%)' }} />
        </div>
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 32px', position:'relative', zIndex:1, textAlign:'center' }}>
          <Reveal>
            <div style={{ width:48, height:3, background:T.gold, margin:'0 auto 32px' }} />
            <h2 style={{ fontFamily:'Manrope,sans-serif', fontWeight:800, fontSize:'clamp(1.8rem,3.5vw,2.75rem)', color:'#fff', marginBottom:16, lineHeight:1.15 }}>
              Where is your strategy<br />falling short of execution?
            </h2>
            <p style={{ color:'rgba(255,255,255,0.65)', fontSize:17, maxWidth:520, margin:'0 auto 36px', lineHeight:1.75 }}>
              A focused, no-obligation diagnostic conversation. We respond within two business days.
            </p>
            <BtnPrimary onClick={() => go('/contact')} style={{ fontSize:16, padding:'16px 40px' }}>
              Request a Diagnostic Conversation
            </BtnPrimary>
          </Reveal>
        </div>
      </section>
    </main>
  )
}

// ── Service image card ────────────────────────────────────────────────────────
function ServiceImageCard({ s, i, img, onNav }) {
  const [hov, setHov] = useState(false)
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} style={{ opacity:inView?1:0, transform:inView?'none':'translateY(24px)', transition:`opacity 0.55s ease ${i*0.08}s, transform 0.55s ease ${i*0.08}s` }}>
      <button onClick={onNav} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        style={{ width:'100%', textAlign:'left', border:'none', cursor:'pointer', padding:0, position:'relative', overflow:'hidden', display:'block', height:280 }}>
        <img src={img} alt={s.title} style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', transform:hov?'scale(1.07)':'scale(1)', transition:'transform 0.55s ease' }} loading="lazy" />
        <div style={{ position:'absolute', inset:0, background: hov ? `linear-gradient(to top, ${s.color}ee, ${s.color}88 60%, ${s.color}22 100%)` : 'linear-gradient(to top, rgba(16,42,67,0.92), rgba(16,42,67,0.45) 65%, rgba(16,42,67,0.08) 100%)', transition:'background 0.45s ease' }} />
        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:3, background:s.color }} />
        <div style={{ position:'absolute', inset:0, padding:'24px', display:'flex', flexDirection:'column', justifyContent:'flex-end' }}>
          <div style={{ fontSize:10, fontWeight:700, letterSpacing:'0.14em', textTransform:'uppercase', color:'rgba(255,255,255,0.6)', marginBottom:6, fontFamily:'Manrope,sans-serif' }}>{s.eyebrow}</div>
          <h3 style={{ fontFamily:'Manrope,sans-serif', fontWeight:800, fontSize:16, color:'#fff', marginBottom: hov ? 8 : 0, lineHeight:1.3, transition:'margin 0.3s' }}>{s.title}</h3>
          <p style={{ fontSize:13, color:'rgba(255,255,255,0.82)', lineHeight:1.6, maxHeight:hov?'72px':'0', overflow:'hidden', transition:'max-height 0.4s ease, opacity 0.4s ease', opacity:hov?1:0 }}>{s.summary}</p>
          <div style={{ fontSize:12, fontWeight:700, color:T.gold, fontFamily:'Manrope,sans-serif', marginTop:10, display:'flex', alignItems:'center', gap:6 }}>
            <span style={{ width:20, height:2, background:T.gold, display:'inline-block' }} />
            Explore
          </div>
        </div>
      </button>
    </div>
  )
}

// ── Insight card with thumbnail ───────────────────────────────────────────────
function InsightCard({ ins, i, img, color, onNav }) {
  const [hov, setHov] = useState(false)
  return (
    <div style={{ transform:hov?'translateY(-6px)':'translateY(0)', transition:'transform 0.25s ease, box-shadow 0.25s ease', boxShadow:hov?'0 12px 40px rgba(16,42,67,0.12)':'0 2px 8px rgba(16,42,67,0.04)' }}>
      <button onClick={onNav} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        style={{ width:'100%', textAlign:'left', border:'none', cursor:'pointer', background:'#fff', padding:0, display:'block' }}>
        <div style={{ height:200, overflow:'hidden', position:'relative' }}>
          <img src={img} alt={ins.title} style={{ width:'100%', height:'100%', objectFit:'cover', transform:hov?'scale(1.06)':'scale(1)', transition:'transform 0.5s ease' }} loading="lazy" />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(16,42,67,0.45), transparent)' }} />
          <div style={{ position:'absolute', top:16, left:16, background:color, padding:'4px 12px', fontSize:10, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'#fff', fontFamily:'Manrope,sans-serif' }}>{ins.category}</div>
        </div>
        <div style={{ padding:'22px' }}>
          <h3 style={{ fontFamily:'Manrope,sans-serif', fontWeight:700, fontSize:16, color:T.navy, lineHeight:1.35, marginBottom:16 }}>{ins.title}</h3>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <span style={{ fontSize:12, color:T.gray }}>{ins.date} · {ins.read} read</span>
            <span style={{ fontSize:12, color, fontWeight:700, fontFamily:'Manrope,sans-serif', transform:hov?'translateX(4px)':'translateX(0)', transition:'transform 0.2s', display:'inline-block' }}>Read →</span>
          </div>
        </div>
      </button>
    </div>
  )
}
