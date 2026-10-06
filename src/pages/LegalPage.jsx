import { useParams } from 'react-router-dom'
import { T } from '../styles/tokens'
import SEO from '../components/SEO'
import NotFoundPage from './NotFoundPage'

const LEGAL_CONTENT = {
  privacy: {
    title: 'Privacy Policy',
    subtitle: 'How Summit collects, uses, and protects your personal data',
    sections: [
      { heading: 'Data Controller', body: 'Summit Performance and Transformation Consult Limited, No. 12 Sowah Close, Ambassadorial Enclave, East Legon, Accra, Ghana. Email: info@summitperformanceconsult.com' },
      { heading: 'Legal Basis', body: "This policy is issued in compliance with Ghana's Data Protection Act 2012 (Act 843) and the Data Protection Commission's guidelines." },
      { heading: 'Data We Collect', body: 'We collect data you provide directly via our contact and diagnostic intake form: full name, work email, organisation, job title, telephone number, and your stated challenge or transformation focus.' },
      { heading: 'How We Use Your Data', body: 'To respond to your enquiry; to arrange diagnostic conversations where requested; to send relevant Summit insights where you have consented; to fulfil our contractual obligations.' },
      { heading: 'Data Retention', body: 'Enquiry data is retained for 24 months from the date of submission unless an engagement commences. You may request deletion at any time by contacting us.' },
      { heading: 'Your Rights', body: 'Under Act 843, you have the right to access, correct, and request deletion of your personal data. Contact: info@summitperformanceconsult.com' },
      { heading: 'Security', body: 'Data is transmitted over TLS 1.3. Form submissions are restricted from public access. Administrator access is protected by strong authentication. Automated retention and deletion rules are applied.' },
    ],
  },
  terms: {
    title: 'Terms of Engagement',
    subtitle: "The terms governing Summit's professional consulting engagements",
    sections: [
      { heading: 'Governing Law', body: "These terms are governed by the laws of Ghana." },
      { heading: 'Scope', body: 'These Terms of Engagement apply to all consulting services provided by Summit Performance and Transformation Consult Limited.' },
      { heading: 'Confidentiality', body: "Summit treats all client information as strictly confidential. We will not disclose client information to third parties without written consent, except as required by law." },
      { heading: 'Intellectual Property', body: "Methodologies, frameworks, and tools developed by Summit prior to an engagement remain Summit's intellectual property. Client-specific deliverables transfer to the client upon receipt of final payment." },
      { heading: 'Liability', body: "Summit's liability in any engagement is limited to the fees paid for the specific service phase in which a dispute arises." },
      { heading: 'Payment', body: 'Invoices are payable within 14 days of issue unless otherwise agreed in writing.' },
      { heading: 'Amendments', body: 'These terms may be updated. The version in effect at the commencement of each engagement applies to that engagement.' },
    ],
  },
  accessibility: {
    title: 'Accessibility Statement',
    subtitle: "Summit's commitment to WCAG 2.2 AA conformance",
    sections: [
      { heading: 'Our Commitment', body: 'Summit Performance and Transformation Consult Limited is committed to making this website accessible to all users, including those with disabilities.' },
      { heading: 'Standard', body: 'We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.2 Level AA.' },
      { heading: 'Implementation', body: 'This site implements: full keyboard navigation; visible focus states using #007C83; ARIA labels on interactive elements; semantic HTML5 landmarks; logical heading hierarchy; descriptive image alt text; accessible form labels and error messages; sufficient colour contrast; and reduced-motion consideration.' },
      { heading: 'Known Issues', body: 'We are actively working to identify and resolve any remaining accessibility gaps. If you encounter a barrier, please contact us.' },
      { heading: 'Feedback', body: 'If you experience any accessibility issues, please contact: info@summitperformanceconsult.com or +233 552 244 854' },
      { heading: 'Last Reviewed', body: 'August 2026' },
    ],
  },
}

export default function LegalPage() {
  const { type } = useParams()
  const content  = LEGAL_CONTENT[type]
  if (!content) return <NotFoundPage />

  return (
    <main style={{ paddingTop: 72 }}>
      <SEO
        title={content.title}
        description={content.subtitle}
        canonical={`/legal/${type}`}
      />
      <section style={{ background: T.navy, padding: '80px 0 64px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
          <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 'var(--h1)', color: '#fff', lineHeight: 1.08, marginBottom: 16 }}>{content.title}</h1>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>{content.subtitle}</p>
        </div>
      </section>

      <section style={{ background: '#fff', padding: '80px 0' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 32px' }}>
          {content.sections.map((s, i) => (
            <div key={s.heading} style={{ marginBottom: 36, paddingBottom: 36, borderBottom: i < content.sections.length - 1 ? `1px solid ${T.lightGray}` : 'none' }}>
              <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 18, color: T.navy, marginBottom: 10 }}>{s.heading}</h2>
              <p style={{ fontSize: 15, color: '#4A6073', lineHeight: 1.8 }}>{s.body}</p>
            </div>
          ))}
          <p style={{ fontSize: 13, color: T.gray, marginTop: 24 }}>
            Summit Performance and Transformation Consult Limited · Registered in Ghana (Companies Act 2019, Act 992) · info@summitperformanceconsult.com
          </p>
        </div>
      </section>
    </main>
  )
}
