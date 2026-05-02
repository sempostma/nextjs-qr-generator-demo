import { Metadata } from 'next'
import NichePage from '@/components/niche-page'

export const metadata: Metadata = {
  title: 'SMS QR Code Generator – Pre-filled Text Message',
  description:
    'Free SMS QR code generator. Scan to open a pre-filled text message to a specific number. Perfect for opt-in keywords, support, and short-code campaigns.',
  alternates: { canonical: '/sms-qr-code-generator' },
  openGraph: {
    title: 'SMS QR Code Generator – Pre-filled Text Message',
    description: 'Free SMS QR code generator with pre-filled message body.',
    url: '/sms-qr-code-generator',
  },
}

export default function Page() {
  return (
    <NichePage
      type="sms"
      lockType
      h1="SMS QR Code Generator"
      intro="Make it one tap for someone to text you or sign up for an SMS keyword campaign. The phone opens its messaging app with the recipient and message body already filled in."
      body={
        <>
          <h2>How it works</h2>
          <p>
            We use the <code>SMSTO:</code> URI scheme, which is the most widely supported format across iOS and Android.
          </p>
          <h2>Common uses</h2>
          <ul>
            <li>Opt-in keywords: pre-fill the body with <em>JOIN</em> or <em>YES</em>.</li>
            <li>Support hotlines on product packaging.</li>
            <li>RSVP-by-text on event invitations.</li>
            <li>SMS-based two-way feedback in stores.</li>
          </ul>
        </>
      }
      faqs={[
        {
          q: 'Will the message send automatically?',
          a: 'No — the phone always shows the composed message and requires the user to tap Send.',
        },
        {
          q: 'Should I include the country code?',
          a: 'Yes. Always store the number in international format with a leading +, e.g. +14155551234.',
        },
        {
          q: 'Does this work with short codes?',
          a: 'Yes — the recipient field accepts short codes too, though some carriers handle them differently than long numbers.',
        },
      ]}
    />
  )
}
