import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for the QR Code Generator. We do not store any of the data you enter — QR codes are generated entirely in your browser.',
  alternates: { canonical: '/privacy' },
  robots: { index: true, follow: true },
}

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://qr.esstudio.nl'

export default function Privacy() {
  return (
    <main className="container max-w-screen-md mx-auto px-4 py-10 prose prose-neutral">
      <h1>Privacy Policy</h1>
      <p>
        <em>Last updated: {new Date().toISOString().slice(0, 10)}</em>
      </p>

      <h2>Who we are</h2>
      <p>
        This site (<a href={SITE}>{SITE.replace(/^https?:\/\//, '')}</a>) is a free QR code generator.
        It runs entirely in your browser and does not require an account.
      </p>

      <h2>What data we process</h2>
      <p>
        <strong>QR code contents.</strong> Anything you type into the generator
        (URLs, WiFi passwords, contact details, etc.) stays in your browser.
        We do not transmit, store or log it on any server we control.
      </p>
      <p>
        <strong>Logs.</strong> Like every web host, our hosting provider may
        record standard request metadata (IP address, user-agent, requested
        URL, timestamp) for security and abuse prevention. We do not associate
        these logs with the contents of any QR code you generate.
      </p>

      <h2>Cookies and third-party services</h2>
      <p>
        We use the following third-party services. Each one may set its own
        cookies and process data under its own privacy policy:
      </p>
      <ul>
        <li>
          <strong>Google Analytics 4</strong> measures aggregate visitor
          counts, traffic sources and which pages are viewed. We enable IP
          anonymization and use Google Consent Mode v2: in the EEA, UK and
          Switzerland, analytics and advertising cookies default to{' '}
          <em>denied</em> until you opt in. You can review and change
          preferences in your browser at any time. Read Google&rsquo;s policy
          at{' '}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">
            policies.google.com/privacy
          </a>
          .
        </li>
        <li>
          <strong>Google AdSense</strong> serves ads on this site. AdSense uses
          cookies and similar technologies to personalize ads, measure
          performance, and prevent fraud. The same Consent Mode v2 default
          applies — EEA / UK / Swiss visitors see non-personalized ads unless
          they opt in. You can opt out of personalized advertising globally
          at{' '}
          <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener">
            Google Ads Settings
          </a>
          . Read the policy at{' '}
          <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener">
            policies.google.com/technologies/ads
          </a>
          .
        </li>
        <li>
          <strong>Hosting / CDN.</strong> We rely on a hosting provider to
          serve the static files of this site. The provider may process the
          standard request metadata mentioned above.
        </li>
      </ul>

      <h2>Your rights</h2>
      <p>
        Because we do not collect identifiable user data ourselves, there is no
        account or profile to access, correct or delete on this site. For data
        held by our advertising and hosting partners, please refer to their
        privacy policies linked above. EU/UK visitors retain all rights granted
        under GDPR, including the right to lodge a complaint with their local
        data protection authority.
      </p>

      <h2>Children</h2>
      <p>
        This site is suitable for all audiences and does not knowingly collect
        any data from children under 13.
      </p>

      <h2>Changes</h2>
      <p>
        We may update this policy. Material changes will be reflected in the
        &ldquo;last updated&rdquo; date above.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy can be sent to the email address on the{' '}
        <a href="/about">About page</a>.
      </p>
    </main>
  )
}
