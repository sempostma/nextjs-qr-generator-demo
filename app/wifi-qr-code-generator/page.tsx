import { Metadata } from 'next'
import NichePage from '@/components/niche-page'

export const metadata: Metadata = {
  title: 'WiFi QR Code Generator – Free, No Sign-up',
  description:
    'Create a free WiFi QR code. Guests scan to join your network without typing the password. Supports WPA/WPA2/WPA3, WEP and open networks. PNG/SVG download.',
  alternates: { canonical: '/wifi-qr-code-generator' },
  openGraph: {
    title: 'WiFi QR Code Generator – Free, No Sign-up',
    description:
      'Create a free WiFi QR code. Guests scan to join your network without typing the password.',
    url: '/wifi-qr-code-generator',
  },
}

export default function Page() {
  return (
    <NichePage
      type="wifi"
      lockType
      path="/wifi-qr-code-generator"
      breadcrumbName="WiFi"
      h1="WiFi QR Code Generator"
      intro="Generate a free WiFi QR code in seconds. Guests scan with their phone camera and join your network without typing the password — perfect for cafés, holiday rentals, offices and home networks."
      body={
        <>
          <h2>How to make a WiFi QR code</h2>
          <ol>
            <li>Type your network name (SSID) exactly as it appears on the device.</li>
            <li>Pick the encryption: <strong>WPA / WPA2 / WPA3</strong> for almost all modern routers, <strong>WEP</strong> for older networks, or <strong>No password</strong> for open WiFi.</li>
            <li>Enter the password (skip this for open networks).</li>
            <li>Toggle <em>Hidden network</em> if your SSID isn&apos;t broadcast.</li>
            <li>Customize colors or add a logo, then right-click the QR code to save or copy.</li>
          </ol>
          <h2>Where to use a WiFi QR code</h2>
          <ul>
            <li>Tape one to your guest-room wall or fridge for visitors.</li>
            <li>Print it on a placard for café and restaurant tables.</li>
            <li>Add it to your Airbnb welcome book or hotel keycard sleeve.</li>
            <li>Display it on monitors at events, co-working spaces and conference rooms.</li>
          </ul>
          <h2>Compatibility</h2>
          <p>
            WiFi QR codes use the standard <code>WIFI:</code> URI format and work natively on iOS 11+ (Camera app), Android 10+ (Camera and Settings → Network), and most third-party scanners.
          </p>
        </>
      }
      faqs={[
        {
          q: 'Is the WiFi password stored anywhere?',
          a: 'No. The QR code is generated entirely in your browser — nothing is sent to a server. Once you close the page, the password is gone from this site.',
        },
        {
          q: 'Will the QR code keep working if I change my password?',
          a: 'No. The password is encoded directly in the QR code. If you rotate your password, generate and reprint a new code.',
        },
        {
          q: 'Does it work for hidden networks?',
          a: 'Yes — toggle the “Hidden network” switch so phones know to actively probe for the SSID instead of expecting it in the broadcast list.',
        },
        {
          q: 'Can I add a logo?',
          a: 'Yes. Upload a logo and the generator automatically forces error-correction level H so the code stays scannable even with the center covered.',
        },
        {
          q: 'Does it support WPA3?',
          a: 'Yes. The WPA option works for WPA, WPA2 and WPA3 — modern phones negotiate the strongest protocol the network supports.',
        },
      ]}
    />
  )
}
