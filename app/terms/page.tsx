import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of service for the free QR Code Generator.',
  alternates: { canonical: '/terms' },
}

export default function Terms() {
  return (
    <main className="container max-w-screen-md mx-auto px-4 py-10 prose prose-neutral">
      <h1>Terms of Service</h1>
      <p>
        <em>Last updated: {new Date().toISOString().slice(0, 10)}</em>
      </p>

      <h2>Acceptance</h2>
      <p>By using this site, you agree to these terms. If you do not, please do not use the site.</p>

      <h2>The service</h2>
      <p>
        We provide a free, browser-based tool for generating QR codes. The
        service is provided &ldquo;as is&rdquo; without warranty of any kind.
        QR code generation runs in your browser; we do not guarantee
        uninterrupted availability of the website itself.
      </p>

      <h2>Acceptable use</h2>
      <p>You agree not to use the service to:</p>
      <ul>
        <li>Encode content that is illegal in your jurisdiction.</li>
        <li>Encode malware, phishing or other malicious URLs.</li>
        <li>Impersonate another person or organization.</li>
        <li>Attempt to abuse, overload or reverse-engineer the site.</li>
      </ul>

      <h2>Generated content</h2>
      <p>
        QR codes you generate are yours to use under any license you choose.
        You are solely responsible for the content you encode and where you
        display it. We do not review or moderate the content of generated QR
        codes because, by design, we never see it.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, we disclaim all liability for
        damages arising from your use of the service, including indirect,
        incidental and consequential damages.
      </p>

      <h2>Changes</h2>
      <p>We may update these terms from time to time. Material changes will be reflected in the &ldquo;last updated&rdquo; date above.</p>
    </main>
  )
}
