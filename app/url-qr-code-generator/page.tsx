import { Metadata } from 'next'
import NichePage from '@/components/niche-page'

export const metadata: Metadata = {
  title: 'URL QR Code Generator with UTM Tracking – Free',
  description:
    'Create a free URL QR code with built-in UTM tracking parameters for marketing campaigns. Add a logo, change colors, export PNG or SVG.',
  alternates: { canonical: '/url-qr-code-generator' },
  openGraph: {
    title: 'URL QR Code Generator with UTM Tracking – Free',
    description: 'Create a free URL QR code with built-in UTM tracking.',
    url: '/url-qr-code-generator',
  },
}

export default function Page() {
  return (
    <NichePage
      type="url"
      lockType
      h1="URL QR Code Generator"
      intro="Turn any link into a scannable QR code. Append UTM source, medium, campaign, term and content so Google Analytics, GA4 and any other analytics platform can attribute the offline scan back to the campaign."
      body={
        <>
          <h2>Why add UTM parameters?</h2>
          <p>
            A QR code on a flyer, billboard or product label produces traffic that&rsquo;s otherwise impossible to attribute. By appending <code>utm_source</code>, <code>utm_medium</code> and <code>utm_campaign</code> you turn that scan into a tracked acquisition channel.
          </p>
          <h2>Sensible UTM patterns</h2>
          <ul>
            <li><strong>utm_source</strong>: where the code lives — <code>flyer</code>, <code>billboard</code>, <code>tradeshow</code>, <code>packaging</code>.</li>
            <li><strong>utm_medium</strong>: the broad channel — <code>print</code>, <code>ooh</code>, <code>event</code>, <code>qr</code>.</li>
            <li><strong>utm_campaign</strong>: the campaign or product launch — <code>spring_sale_2026</code>.</li>
            <li><strong>utm_content</strong>: useful for A/B-testing two physical creatives that point at the same URL.</li>
          </ul>
          <h2>Static vs. dynamic QR codes</h2>
          <p>
            This generator produces <strong>static</strong> QR codes — the destination is encoded directly. That&rsquo;s the right choice when the target URL is stable. If you need to change the destination after printing, point the QR at a short URL you control (e.g. through your own redirect or a free service) so you can update the redirect target later.
          </p>
        </>
      }
      faqs={[
        {
          q: 'Should the URL include https://?',
          a: 'Yes. Always include the scheme — most camera apps will only treat it as a link when it does.',
        },
        {
          q: 'How long can the URL be?',
          a: 'Technically up to ~2,953 characters, but in practice keep it short. The longer the URL, the denser the QR and the harder it is to scan from a distance.',
        },
        {
          q: 'Will my QR code expire?',
          a: 'No. Static URL QR codes don&rsquo;t expire. They keep working as long as the destination URL keeps working.',
        },
        {
          q: 'Can I track scans?',
          a: 'Indirectly — UTM parameters surface the scan in your analytics tool of choice (GA4, Plausible, Umami, etc.) once the user lands on the page.',
        },
      ]}
    />
  )
}
