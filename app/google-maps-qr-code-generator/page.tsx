import { Metadata } from 'next'
import NichePage from '@/components/niche-page'

export const metadata: Metadata = {
  title: 'Google Maps Location QR Code Generator – Free',
  description: 'Free QR code generator for locations. Scan to open Google Maps or the native maps app at the right place. Latitude/longitude or place name.',
  alternates: { canonical: '/google-maps-qr-code-generator' },
  openGraph: {
    title: 'Google Maps Location QR Code Generator – Free',
    description: 'QR code generator for locations — opens Google Maps or the native maps app.',
    url: '/google-maps-qr-code-generator',
  },
}

export default function Page() {
  return (
    <NichePage
      type="geo"
      lockType
      h1="Google Maps & Location QR Code Generator"
      intro="Print a QR that drops a pin on a specific location. Scan and the user&rsquo;s phone opens Google Maps or the native maps app with directions ready to go."
      body={
        <>
          <h2>Native maps vs. Google Maps URL</h2>
          <p>
            Two formats are supported:
          </p>
          <ul>
            <li>
              <strong>Native (geo: URI)</strong> opens the user&rsquo;s default
              maps app — Apple Maps on iOS, Google Maps or whichever app is set
              as default on Android. Best when the audience is mixed.
            </li>
            <li>
              <strong>Google Maps URL</strong> always opens Google Maps
              (browser or app). Best when you want consistent rendering and
              Google&rsquo;s place data.
            </li>
          </ul>
          <h2>Where to find latitude and longitude</h2>
          <ol>
            <li>Right-click any point in Google Maps on desktop. The first item in the menu is the lat,lng pair — click to copy.</li>
            <li>On mobile Google Maps, long-press the spot until a red pin appears, then tap the coordinates at the top.</li>
          </ol>
          <h2>Use cases</h2>
          <ul>
            <li>Wedding invitations: link to the venue address.</li>
            <li>Real estate signs: drop a pin on the property.</li>
            <li>Trade-show booths: send visitors to the after-party location.</li>
            <li>Tourism: physical signs that lead to nearby points of interest.</li>
          </ul>
        </>
      }
      faqs={[
        {
          q: 'Why does the native option open Apple Maps on my iPhone?',
          a: 'iOS treats geo: URIs as a request for the default maps app, which is Apple Maps. Use the Google Maps URL option if you want everyone to land in Google Maps.',
        },
        {
          q: 'How accurate should my coordinates be?',
          a: 'Six decimal places (≈11 cm) is overkill. Five places (≈1 m) is plenty for most uses. Three places (≈100 m) is fine for &ldquo;point at this neighborhood&rdquo;.',
        },
        {
          q: 'Can I include a place name?',
          a: 'Yes. The optional place name shows up as the marker label in maps that support it.',
        },
      ]}
    />
  )
}
