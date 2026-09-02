import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { SERVICES } from '../data/services'
import { SECTORS } from '../data/sectors'
import { T } from '../styles/tokens'
import { BtnPrimary } from './UI'

const NAV_LINKS = [
  { label: 'About',    path: '/about' },
  { label: 'Approach', path: '/approach' },
  {
    label: 'Services', path: '/services',
    children: SERVICES.map(s => ({ label: s.title, path: `/services/${s.slug}` })),
  },
  {
    label: 'Sectors', path: '/sectors',
    children: SECTORS.map(s => ({ label: s.label, path: `/sectors/${s.slug}` })),
  },
  { label: 'Insights', path: '/insights' },
  { label: 'Contact',  path: '/contact' },
]

export default function Nav() {
  const navigate   = useNavigate()
  const location   = useLocation()
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [dropdown,  setDropdown]  = useState(null)
  const closeTimer  = useRef(null)

  const isHome = location.pathname === '/'

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setMenuOpen(false); setDropdown(null) }, [location])

  const go = useCallback((path) => { navigate(path); window.scrollTo({ top: 0 }) }, [navigate])

  // Open immediately, close with a delay so the gap between button and menu is bridgeable
  const handleMouseEnter = useCallback((label) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setDropdown(label)
  }, [])

  const handleMouseLeave = useCallback(() => {
    closeTimer.current = setTimeout(() => setDropdown(null), 120)
  }, [])

  // Cancels the close timer when the mouse enters the dropdown panel itself
  const handleDropdownEnter = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }, [])

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: (!isHome || scrolled) ? 'rgba(16,42,67,0.97)' : 'transparent',
        backdropFilter: 'blur(8px)',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : 'none',
        transition: 'background 0.3s, border 0.3s',
        height: 'var(--nav-h)', display: 'flex', alignItems: 'center',
      }}
    >
      <div style={{
        maxWidth: 1200, margin: '0 auto', padding: '0 32px',
        width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <button
          onClick={() => go('/')}
          aria-label="Summit — Home"
          style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0 }}
        >
          <img
            src="/summit_logo_white.png"
            alt="Summit Performance & Transformation Consult"
            style={{ height: 48, width: 'auto', display: 'block' }}
          />
        </button>

        {/* Desktop links */}
        <div className="desktop-nav-links" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          {NAV_LINKS.map(link => (
            <div
              key={link.label}
              style={{ position: 'relative' }}
              onMouseEnter={() => link.children && handleMouseEnter(link.label)}
              onMouseLeave={() => link.children && handleMouseLeave()}
            >
              <button
                onClick={() => go(link.path)}
                aria-haspopup={link.children ? 'true' : undefined}
                aria-expanded={dropdown === link.label ? 'true' : undefined}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'rgba(255,255,255,0.82)', fontSize: 14, fontWeight: 600,
                  fontFamily: 'Manrope, sans-serif', letterSpacing: '0.02em',
                  display: 'flex', alignItems: 'center', gap: 4, padding: '8px 0',
                  position: 'relative',
                }}
              >
                {link.label}
                {link.children && (
                  <span style={{
                    fontSize: 9,
                    transform: dropdown === link.label ? 'rotate(180deg)' : 'rotate(0)',
                    transition: 'transform 0.2s ease',
                    display: 'inline-block',
                  }}>▾</span>
                )}
                {/* Active underline */}
                <span style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, height: 2,
                  background: T.gold,
                  transform: location.pathname.startsWith(link.path) && link.path !== '/'
                    ? 'scaleX(1)' : location.pathname === '/' && link.path === '/'
                    ? 'scaleX(1)' : 'scaleX(0)',
                  transformOrigin: 'left',
                  transition: 'transform 0.25s ease',
                }} />
              </button>

              {/* Dropdown panel */}
              {link.children && dropdown === link.label && (
                <div
                  role="menu"
                  onMouseEnter={handleDropdownEnter}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    position: 'absolute', top: '100%', left: 0,
                    minWidth: 300,
                    background: '#fff',
                    boxShadow: '0 12px 40px rgba(16,42,67,0.2)',
                    // No marginTop — flush against the nav bar to eliminate the gap
                    zIndex: 200,
                    // Invisible top padding bridges the visual gap without a gap in hit area
                    paddingTop: 8, paddingBottom: 8,
                    borderTop: `3px solid ${T.teal}`,
                  }}
                >
                  {/* Link to the hub page itself */}
                  <button
                    role="menuitem"
                    onClick={() => { go(link.path); setDropdown(null) }}
                    style={{
                      display: 'block', width: '100%', textAlign: 'left',
                      padding: '10px 20px 10px 20px', fontSize: 12, color: T.teal,
                      fontWeight: 700, background: T.mist, border: 'none',
                      cursor: 'pointer', fontFamily: 'Manrope, sans-serif',
                      letterSpacing: '0.06em', textTransform: 'uppercase',
                      marginBottom: 4,
                    }}
                  >
                    View All {link.label} →
                  </button>

                  {link.children.map(c => (
                    <button
                      key={c.path}
                      role="menuitem"
                      onClick={() => { go(c.path); setDropdown(null) }}
                      style={{
                        display: 'block', width: '100%', textAlign: 'left',
                        padding: '9px 20px', fontSize: 13, color: T.ink,
                        fontWeight: 600, background: 'none', border: 'none',
                        cursor: 'pointer', fontFamily: 'Manrope, sans-serif',
                        transition: 'background 0.15s, color 0.15s',
                        borderLeft: '3px solid transparent',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = T.mist
                        e.currentTarget.style.color = T.teal
                        e.currentTarget.style.borderLeftColor = T.teal
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = ''
                        e.currentTarget.style.color = T.ink
                        e.currentTarget.style.borderLeftColor = 'transparent'
                      }}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          <BtnPrimary onClick={() => go('/contact')} style={{ padding: '10px 20px', fontSize: 13 }}>
            Request a Diagnostic
          </BtnPrimary>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          style={{
            display: 'none', background: 'none', border: 'none',
            color: '#fff', fontSize: 24, cursor: 'pointer',
          }}
          className="mobile-hamburger"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div style={{
          position: 'absolute', top: 'var(--nav-h)', left: 0, right: 0,
          background: T.navy, padding: '24px 20px',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          maxHeight: 'calc(100vh - 72px)', overflowY: 'auto',
        }}>
          {NAV_LINKS.map(l => (
            <div key={l.label}>
              <button
                onClick={() => go(l.path)}
                style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  color: '#fff', padding: '14px 0', fontSize: 16,
                  borderBottom: '1px solid rgba(255,255,255,0.08)',
                  background: 'none', border: 'none',
                  borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.08)',
                  borderBottomStyle: 'solid',
                  cursor: 'pointer', fontFamily: 'Manrope, sans-serif', fontWeight: 600,
                }}
              >
                {l.label}
              </button>
              {/* Mobile sub-links for Services and Sectors */}
              {l.children && l.children.map(c => (
                <button
                  key={c.path}
                  onClick={() => go(c.path)}
                  style={{
                    display: 'block', width: '100%', textAlign: 'left',
                    color: 'rgba(255,255,255,0.6)', padding: '10px 0 10px 16px',
                    fontSize: 13, borderBottom: '1px solid rgba(255,255,255,0.04)',
                    background: 'none', border: 'none', borderBottomStyle: 'solid',
                    borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.04)',
                    cursor: 'pointer', fontFamily: 'Manrope, sans-serif', fontWeight: 500,
                  }}
                >
                  — {c.label}
                </button>
              ))}
            </div>
          ))}
          <BtnPrimary onClick={() => go('/contact')} style={{ marginTop: 20, width: '100%' }}>
            Request a Diagnostic
          </BtnPrimary>
        </div>
      )}
    </nav>
  )
}
