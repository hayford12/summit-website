import { useNavigate } from 'react-router-dom'
import { SERVICES } from '../data/services'
import { SECTORS } from '../data/sectors'
import { T } from '../styles/tokens'

const COMPANY_LINKS = [
  { label: 'About Us',           path: '/about' },
  { label: 'Our 4D™ Approach',  path: '/approach' },
  { label: 'Insights',           path: '/insights' },
  { label: 'Contact',            path: '/contact' },
  { label: 'Privacy Policy',     path: '/legal/privacy' },
  { label: 'Terms of Engagement',path: '/legal/terms' },
  { label: 'Accessibility',      path: '/legal/accessibility' },
]

export default function Footer() {
  const navigate = useNavigate()
  const go = (path) => { navigate(path); window.scrollTo({ top: 0 }) }

  const LinkBtn = ({ label, path }) => (
    <button
      onClick={() => go(path)}
      style={{
        display: 'block', background: 'none', border: 'none', cursor: 'pointer',
        textAlign: 'left', fontSize: 12, color: 'rgba(255,255,255,0.48)',
        marginBottom: 8, fontFamily: 'inherit', padding: 0,
        transition: 'color 0.15s',
      }}
      onMouseEnter={e => e.currentTarget.style.color = '#fff'}
      onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.48)'}
    >
      {label}
    </button>
  )

  return (
    <footer style={{ background: T.darkNavy, padding: '64px 0 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
        <div className='footer-grid' style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, marginBottom: 48 }}>

          {/* Brand + contact */}
          <div>
            <img
              src="/summit_logo_white.png"
              alt="Summit Performance & Transformation Consult"
              style={{ height: 64, width: 'auto', marginBottom: 20 }}
            />
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', lineHeight: 1.9 }}>
              <div>No. 12 Sowah Close, Ambassadorial Enclave</div>
              <div>East Legon, Accra, Ghana</div>
              <div>Digital Address: GA-332-4333</div>
              <div>P.O. Box DT2720, Adenta, Accra, Ghana</div>
              <div style={{ marginTop: 8 }}>+233 552 244 854 / +233 248 396 933</div>
              <div>+233 262 940 594</div>
              <div>info@summitperformanceconsult.com</div>
              <div>www.summitperformanceconsult.com</div>
            </div>
          </div>

          {/* Services */}
          <div>
            <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: T.gold, marginBottom: 16 }}>
              Services
            </div>
            {SERVICES.map(s => (
              <LinkBtn key={s.slug} label={s.title.split('&')[0].trim()} path={`/services/${s.slug}`} />
            ))}
          </div>

          {/* Sectors */}
          <div>
            <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: T.gold, marginBottom: 16 }}>
              Sectors
            </div>
            {SECTORS.map(s => (
              <LinkBtn key={s.slug} label={s.label.split('—')[0].trim()} path={`/sectors/${s.slug}`} />
            ))}
          </div>

          {/* Company */}
          <div>
            <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: T.gold, marginBottom: 16 }}>
              Company
            </div>
            {COMPANY_LINKS.map(l => (
              <LinkBtn key={l.path} label={l.label} path={l.path} />
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.28)' }}>
            © {new Date().getFullYear()} Summit Performance and Transformation Consult Limited. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 20 }}>
            {[['Privacy Policy', '/legal/privacy'], ['Terms of Engagement', '/legal/terms'], ['Accessibility', '/legal/accessibility']].map(([l, p]) => (
              <button
                key={p} onClick={() => go(p)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: 'rgba(255,255,255,0.28)', fontFamily: 'inherit', transition: 'color 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.28)'}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
