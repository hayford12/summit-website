import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Nav from './components/Nav'
import Footer from './components/Footer'

import HomePage          from './pages/HomePage'
import AboutPage         from './pages/AboutPage'
import ApproachPage      from './pages/ApproachPage'
import ServicesPage      from './pages/ServicesPage'
import ServiceDetailPage from './pages/ServiceDetailPage'
import SectorsPage       from './pages/SectorsPage'
import SectorDetailPage  from './pages/SectorDetailPage'
import InsightsPage      from './pages/InsightsPage'
import InsightDetailPage from './pages/InsightDetailPage'
import ContactPage       from './pages/ContactPage'
import LegalPage         from './pages/LegalPage'
import NotFoundPage      from './pages/NotFoundPage'

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Nav />
      <Routes>
        <Route path="/"                       element={<HomePage />} />
        <Route path="/about"                  element={<AboutPage />} />
        <Route path="/approach"               element={<ApproachPage />} />
        <Route path="/services"               element={<ServicesPage />} />
        <Route path="/services/:slug"         element={<ServiceDetailPage />} />
        <Route path="/sectors"                element={<SectorsPage />} />
        <Route path="/sectors/:slug"          element={<SectorDetailPage />} />
        <Route path="/insights"               element={<InsightsPage />} />
        <Route path="/insights/:slug"         element={<InsightDetailPage />} />
        <Route path="/contact"                element={<ContactPage />} />
        <Route path="/legal/:type"            element={<LegalPage />} />
        <Route path="*"                       element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  )
}
