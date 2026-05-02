import { Metadata } from 'next'
import NichePage from '@/components/niche-page'

export const metadata: Metadata = {
  title: 'Email QR Code Generator – Pre-filled Subject &amp; Body',
  description:
    'Generate a free email QR code with the recipient address, subject and body pre-filled. Scan and the phone opens its mail app, ready to send.',
  alternates: { canonical: '/email-qr-code-generator' },
  openGraph: {
    title: 'Email QR Code Generator – Pre-filled Subject & Body',
    description: 'Free email QR code with pre-filled subject and body.',
    url: '/email-qr-code-generator',
  },
}

export default function Page() {
  return (
    <NichePage
      type="email"
      lockType
      h1="Email QR Code Generator"
      intro="Make it effortless for someone to email you. The QR code opens their default mail app with the recipient, subject and body already filled in — they just hit send."
      body={
        <>
          <h2>How it works</h2>
          <p>
            The QR encodes a <code>mailto:</code> link with URL-encoded subject and body parameters. Both iOS Mail and Gmail honor pre-filled values, so the recipient only needs to confirm the send.
          </p>
          <h2>Great use cases</h2>
          <ul>
            <li>Customer-support posters: pre-fill the subject as <em>“Support request”</em>.</li>
            <li>Job-application QR codes on flyers: pre-fill <em>“Application: [role]”</em>.</li>
            <li>Feedback collection at events with a templated body the user can edit.</li>
            <li>Inquiry buttons on print catalogues.</li>
          </ul>
        </>
      }
      faqs={[
        {
          q: 'Will the email send automatically?',
          a: 'No. The phone always opens the mail app first so the user can review and tap Send.',
        },
        {
          q: 'How long can the body be?',
          a: 'There is no hard limit, but URL-encoded bodies over a few hundred characters can break older mail clients. Keep it short.',
        },
        {
          q: 'Can I encode multiple recipients?',
          a: 'Standard mailto syntax allows comma-separated recipients, but support is inconsistent. Stick to one address for reliability.',
        },
      ]}
    />
  )
}
