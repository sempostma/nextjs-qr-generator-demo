import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About',
  description: 'About the free, privacy-first QR Code Generator. No accounts, no tracking of QR contents, open source.',
  alternates: { canonical: '/about' },
}

export default function About() {
  return (
    <main className="container max-w-screen-md mx-auto px-4 py-10 prose prose-neutral">
      <h1>About this QR Code Generator</h1>
      <p>
        This site is a free, browser-based QR code generator. The whole tool
        runs in your browser using the open-source{' '}
        <a href="https://github.com/soldair/node-qrcode" target="_blank" rel="noopener">
          node-qrcode
        </a>{' '}
        library — your input is never uploaded to a server.
      </p>

      <h2>What it does</h2>
      <ul>
        <li>Generates QR codes for URLs (with UTM tracking), WiFi networks, vCards, calendar events, locations, Bitcoin addresses, plain text, SMS, email and phone numbers.</li>
        <li>Supports custom colors, transparent backgrounds and embedded logos.</li>
        <li>Exports as PNG, SVG or UTF-8 art.</li>
        <li>Forces high error-correction automatically when you embed a logo so the code stays scannable.</li>
      </ul>

      <h2>What it does not do</h2>
      <ul>
        <li>Track who scans your QR codes (use UTM parameters and your own analytics for that).</li>
        <li>Store anything you type. Refresh the page and your work is gone.</li>
        <li>Charge per scan. Static QR codes never expire.</li>
      </ul>

      <h2>How we keep it free</h2>
      <p>
        The site is supported by Google AdSense advertising. Ads are clearly
        labeled and never intermixed with the QR code itself. See our{' '}
        <Link href="/privacy">privacy policy</Link> for details on how ad
        partners process data.
      </p>

      <h2>Open source</h2>
      <p>
        The full source code is available on GitHub. Bug reports, feature
        requests and pull requests are welcome.
      </p>

      <h2>Contact</h2>
      <p>
        For bug reports, feature requests or DMCA / abuse notices, please open
        an issue on the GitHub repository.
      </p>
    </main>
  )
}
