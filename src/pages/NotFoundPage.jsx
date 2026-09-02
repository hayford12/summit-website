import { useNavigate } from 'react-router-dom'
import { T } from '../styles/tokens'
import { BtnPrimary, BtnOutline } from '../components/UI'
import SEO from '../components/SEO'

export default function NotFoundPage() {
  const navigate = useNavigate()
  const go = (path) => { navigate(path); window.scrollTo({ top: 0 }) }

  return (
    <main style={{ paddingTop: 72, minHeight: '80vh', display: 'flex', alignItems: 'center', background: T.warm }}>
      <SEO title="Page Not Found" description="The page you are looking for does not exist." canonical="/404" />
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '80px 32px', textAlign: 'center' }}>
        <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 120, color: T.navy, opacity: 0.08, lineHeight: 1 }}>404</div>
        <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 28, color: T.navy, marginBottom: 16 }}>Page not found</h1>
        <p style={{ fontSize: 16, color: '#4A6073', lineHeight: 1.7, marginBottom: 32 }}>
          The page you're looking for doesn't exist or may have moved.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <BtnPrimary onClick={() => go('/')}>Return Home</BtnPrimary>
          <BtnOutline onClick={() => go('/services')}>View Services</BtnOutline>
          <BtnOutline onClick={() => go('/contact')}>Contact Us</BtnOutline>
        </div>
      </div>
    </main>
  )
}
