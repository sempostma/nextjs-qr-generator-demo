import Link from 'next/link'
import QRCodeGenerator from './qr-code-generator'
import AdSlot from '@/components/ad-slot'
import { Wifi, User, Globe, Utensils, Mail, MessageSquare, Phone, Calendar, MapPin, Bitcoin, FileText, DollarSign, Music, Smartphone } from 'lucide-react'

const niches = [
  { href: '/wifi-qr-code-generator', label: 'WiFi QR code', desc: 'Share your network — guests scan to join, no typing.', icon: Wifi },
  { href: '/vcard-qr-code-generator', label: 'vCard QR code', desc: 'Digital business card — scan to save your contact.', icon: User },
  { href: '/url-qr-code-generator', label: 'URL QR code', desc: 'Link to any web page, with optional UTM tracking.', icon: Globe },
  { href: '/calendar-event-qr-code-generator', label: 'Event QR code', desc: 'Add an event to a calendar with one scan.', icon: Calendar },
  { href: '/google-maps-qr-code-generator', label: 'Location QR code', desc: 'Drop a pin in Google Maps or the native maps app.', icon: MapPin },
  { href: '/bitcoin-qr-code-generator', label: 'Bitcoin QR code', desc: 'BIP-21 payment QR with amount and label.', icon: Bitcoin },
  { href: '/menu-qr-code-generator', label: 'Menu QR code', desc: 'For restaurants, cafés and bars — one scan to the menu.', icon: Utensils },
  { href: '/pdf-qr-code-generator', label: 'PDF QR code', desc: 'Manual, brochure, contract — share PDFs instantly.', icon: FileText },
  { href: '/paypal-qr-code-generator', label: 'PayPal QR code', desc: 'Get paid with a PayPal.Me link.', icon: DollarSign },
  { href: '/spotify-qr-code-generator', label: 'Spotify QR code', desc: 'Share a track, album or playlist.', icon: Music },
  { href: '/app-store-qr-code-generator', label: 'App Store QR code', desc: 'Drive app installs from offline channels.', icon: Smartphone },
  { href: '/email-qr-code-generator', label: 'Email QR code', desc: 'Pre-fill recipient, subject and body in one tap.', icon: Mail },
  { href: '/sms-qr-code-generator', label: 'SMS QR code', desc: 'Pre-fill a text message to a number.', icon: MessageSquare },
  { href: '/phone-qr-code-generator', label: 'Phone QR code', desc: 'Tap to call — perfect for service businesses.', icon: Phone },
]

const howToJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to make a QR code',
  description: 'Generate a free, custom QR code for a URL, WiFi network, vCard, calendar event, location, Bitcoin payment, SMS, email or phone number.',
  totalTime: 'PT1M',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Pick the QR type',
      text: 'Choose the type of content the QR will encode — URL, WiFi, vCard, calendar event, location, Bitcoin, plain text, SMS, email or phone.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Fill in the fields',
      text: 'Enter the relevant fields for the chosen type. The QR code re-renders live as you type — there is no submit step.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Customize appearance',
      text: 'Optionally change foreground / background colors, scale, margin, transparency, and upload a logo to embed in the center.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Download',
      text: 'Click the Download button to save as PNG, or right-click the QR canvas to copy or save as SVG.',
    },
  ],
}

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <main className="container max-w-screen-lg mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Free QR Code Generator</h1>
        <p className="mb-6 text-lg text-muted-foreground">
          Generate QR codes for URLs, WiFi networks, vCards, SMS, email and phone numbers. Customize colors, embed a logo,
          add UTM tracking — all in your browser, no sign-up.
        </p>

        <AdSlot slot="home-top" className="mb-6" />

        <QRCodeGenerator />

        <AdSlot slot="home-mid" className="my-10" />

        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Pick the right QR type</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {niches.map(({ href, label, desc, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="block rounded-md border p-4 hover:bg-accent hover:text-accent-foreground transition-colors h-full"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="h-5 w-5" />
                    <span className="font-semibold">{label}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Why use this generator?</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>100% free, no sign-up, no watermark, no per-scan fees.</li>
            <li>Customizable colors, transparent backgrounds, embedded logos.</li>
            <li>UTM tracking parameters baked into URL QR codes for marketing campaigns.</li>
            <li>High error-correction support so your QR code stays scannable even when partially obscured.</li>
            <li>Generated entirely in your browser — your data never leaves your device.</li>
            <li>PNG and SVG export — SVG stays sharp at any print size.</li>
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">How to make a QR code</h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Pick the QR type that matches your content (URL, WiFi, vCard, etc.).</li>
            <li>Fill in the relevant fields. The QR code re-renders live as you type.</li>
            <li>Tweak colors, scale, margin and optionally upload a logo.</li>
            <li>Right-click the QR code to save it, or click the area to copy to clipboard.</li>
          </ol>
        </section>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
        />
      </main>
    </div>
  )
}
