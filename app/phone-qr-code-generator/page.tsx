import { Metadata } from 'next'
import NichePage from '@/components/niche-page'

export const metadata: Metadata = {
  title: 'Phone Number QR Code Generator – Tap to Call',
  description:
    'Free QR code generator for phone numbers. Scan to start a call without typing the number. Great for posters, business cards and signage.',
  alternates: { canonical: '/phone-qr-code-generator' },
  openGraph: {
    title: 'Phone Number QR Code Generator – Tap to Call',
    description: 'Free QR code generator for phone numbers — scan to call.',
    url: '/phone-qr-code-generator',
  },
}

export default function Page() {
  return (
    <NichePage
      type="phone"
      lockType
      path="/phone-qr-code-generator"
      breadcrumbName="Phone"
      h1="Phone QR Code Generator"
      intro="Encode a phone number as a QR code. When scanned, the phone opens the dialer with the number pre-filled — one tap to call."
      body={
        <>
          <h2>How it works</h2>
          <p>
            We encode a <code>tel:</code> URI. Modern iOS and Android camera apps recognize the scheme and offer to call directly from the scan preview.
          </p>
          <h2>Best uses</h2>
          <ul>
            <li>Taxi and rideshare stickers.</li>
            <li>Estate-agent yard signs and shop windows.</li>
            <li>Service-business vans and trade vehicles.</li>
            <li>Reception desks in hotels and clinics.</li>
          </ul>
          <h2>Tip: combine with vCard</h2>
          <p>
            If you also want the contact saved (not just called), use the{' '}
            <a href="/vcard-qr-code-generator">vCard QR code generator</a> instead — it lets the user save the full contact card to their phone.
          </p>
        </>
      }
      faqs={[
        {
          q: 'Should I include the country code?',
          a: 'Yes — phones may interpret a local number wrongly when scanned abroad. Use international format with a leading +.',
        },
        {
          q: 'Will the call start automatically?',
          a: 'No. The phone always asks the user to confirm before placing the call.',
        },
        {
          q: 'Does it work for extensions?',
          a: 'You can use the comma character (,) to insert a one-second pause, e.g. +14155551234,,789, but support is patchy. For complex IVR menus, link to a vCard instead.',
        },
      ]}
    />
  )
}
