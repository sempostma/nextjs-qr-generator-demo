import { Metadata } from 'next'
import NichePage from '@/components/niche-page'

export const metadata: Metadata = {
  title: 'App Store QR Code Generator – iOS &amp; Google Play',
  description: 'Free QR code generator for app downloads. Link to the App Store, Google Play, or a smart link that detects the user&rsquo;s platform.',
  alternates: { canonical: '/app-store-qr-code-generator' },
  openGraph: {
    title: 'App Store QR Code Generator – iOS &amp; Google Play',
    description: 'Free QR code generator for App Store and Google Play app downloads.',
    url: '/app-store-qr-code-generator',
  },
}

export default function Page() {
  return (
    <NichePage
      type="url"
      lockType
      path="/app-store-qr-code-generator"
      breadcrumbName="App Store"
      h1="App Store QR Code Generator"
      intro="Get more app installs from offline channels. A scannable QR code on a billboard, in-store display, or trade-show booth turns every passer-by into a one-tap download."
      body={
        <>
          <h2>Pick the right URL strategy</h2>
          <ul>
            <li>
              <strong>Direct App Store link.</strong> Best when your audience is
              all on iOS — e.g. an Apple-only product. Get the URL from{' '}
              <a href="https://appstoreconnect.apple.com" target="_blank" rel="noopener">App Store Connect</a> (looks like
              <code>https://apps.apple.com/app/idXXXXXXXXX</code>).
            </li>
            <li>
              <strong>Direct Google Play link.</strong> For Android-only
              audiences. Format:{' '}
              <code>https://play.google.com/store/apps/details?id=com.example.app</code>.
            </li>
            <li>
              <strong>Smart link.</strong> The most common choice. Use a free
              service like Firebase Dynamic Links (sunsetting), Branch, AppsFlyer,
              or your own redirect page that sniffs the User-Agent and forwards to
              the right store.
            </li>
          </ul>
          <h2>Add UTM tracking</h2>
          <p>
            App Store and Google Play both support campaign tracking parameters.
            On Google Play use <code>&amp;referrer=utm_source%3D...</code>; on the
            App Store, attach{' '}
            <a href="https://developer.apple.com/app-store/marketing/guidelines/" target="_blank" rel="noopener">campaign parameters</a> via App Analytics. Tracking offline-to-install attribution is one of the highest-ROI things a QR code can do.
          </p>
          <h2>Best places to put it</h2>
          <ul>
            <li>Out-of-home posters and transit ads.</li>
            <li>Receipt footers and packaging.</li>
            <li>Restaurant table tents (loyalty apps).</li>
            <li>Trade-show booths.</li>
            <li>Stickers in physical retail (delivery apps, ride-share).</li>
          </ul>
        </>
      }
      faqs={[
        {
          q: 'Should I use one QR for both iOS and Android?',
          a: 'Yes — point the QR at a smart link that redirects based on the user&rsquo;s device. Otherwise you&rsquo;ll need two separate QR codes labeled &ldquo;iPhone&rdquo; and &ldquo;Android&rdquo;.',
        },
        {
          q: 'How do I track installs from a QR scan?',
          a: 'Append UTM/campaign parameters to the store URL. Both stores expose campaign attribution in their respective analytics dashboards.',
        },
        {
          q: 'Can the QR code open the app if it is already installed?',
          a: 'Use Universal Links (iOS) or App Links (Android) instead of bare store URLs. The QR code points at your link, and the OS opens the app if installed and falls back to the store if not.',
        },
      ]}
    />
  )
}
