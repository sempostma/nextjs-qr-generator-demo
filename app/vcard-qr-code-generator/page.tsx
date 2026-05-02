import { Metadata } from 'next'
import NichePage from '@/components/niche-page'

export const metadata: Metadata = {
  title: 'vCard QR Code Generator – Digital Business Card',
  description:
    'Create a free vCard QR code for your business card. Scan to instantly save name, phone, email, organization and address to a phone&rsquo;s contacts.',
  alternates: { canonical: '/vcard-qr-code-generator' },
  openGraph: {
    title: 'vCard QR Code Generator – Digital Business Card',
    description: 'Create a free vCard QR code for your business card.',
    url: '/vcard-qr-code-generator',
  },
}

export default function Page() {
  return (
    <NichePage
      type="contact"
      lockType
      h1="vCard QR Code Generator"
      intro="Turn your business card into a tap-and-save digital contact. Scan once and the recipient&rsquo;s phone offers to add your name, phone, email, organization and address straight to its contacts."
      body={
        <>
          <h2>What is a vCard QR code?</h2>
          <p>
            A vCard QR code encodes a <code>VCARD</code> file — the same format used by Apple Contacts, Google Contacts and Outlook. When scanned, the phone recognizes it as contact data and prompts the user to save it.
          </p>
          <h2>Best uses</h2>
          <ul>
            <li>Print on the back of business cards so prospects skip manual typing.</li>
            <li>Stick on laptop lids and conference badges.</li>
            <li>Embed in email signatures and slide decks.</li>
            <li>Add to estate-agent yard signs, market-stall banners and trade-show booths.</li>
          </ul>
          <h2>Tips for high scan rates</h2>
          <ul>
            <li>Keep fields short — long addresses bloat the QR code and make it harder to scan from a distance.</li>
            <li>Use error-correction level <strong>H</strong> if you add a logo, so up to 30% of the code can be obscured.</li>
            <li>Print at minimum 2&nbsp;cm × 2&nbsp;cm. Bigger is always more reliable.</li>
          </ul>
        </>
      }
      faqs={[
        {
          q: 'Will the contact be saved automatically?',
          a: 'No — phones always show a confirmation dialog before saving. The user has to tap “Add Contact”.',
        },
        {
          q: 'Why does my QR code look very dense?',
          a: 'vCards contain a lot of structured fields. Leave optional fields blank, drop the prefix/fax, and the QR code becomes simpler and easier to scan.',
        },
        {
          q: 'Can I update the contact info later?',
          a: 'Not directly — the data is baked into the QR code. If you need editable contact info, point a URL QR code at a public contact page instead.',
        },
        {
          q: 'Is my contact information stored anywhere?',
          a: 'No. Generation happens entirely in your browser; nothing is uploaded.',
        },
      ]}
    />
  )
}
