import { Metadata } from 'next'
import NichePage from '@/components/niche-page'

export const metadata: Metadata = {
  title: 'Restaurant Menu QR Code Generator – Free',
  description:
    'Free QR code generator for restaurant menus, wine lists and drink lists. Print on tables, bar runners and takeaway menus. Customize colors and add a logo.',
  alternates: { canonical: '/menu-qr-code-generator' },
  openGraph: {
    title: 'Restaurant Menu QR Code Generator – Free',
    description: 'Free QR code generator for restaurant menus and drink lists.',
    url: '/menu-qr-code-generator',
  },
}

export default function Page() {
  return (
    <NichePage
      type="url"
      lockType
      path="/menu-qr-code-generator"
      breadcrumbName="Restaurant menu"
      h1="Restaurant Menu QR Code Generator"
      intro="Generate a free QR code for your restaurant, café or bar menu. Diners scan with their phone camera and your menu opens instantly — no app, no sign-up, no per-scan fee."
      body={
        <>
          <h2>How to set up a menu QR code</h2>
          <ol>
            <li>Upload your menu somewhere public (Google Drive shareable link, your own website, a free PDF host, etc.).</li>
            <li>Paste the URL above.</li>
            <li>Match your brand by changing the QR colors and adding your logo.</li>
            <li>Export as SVG for crisp print on table tents, posters and laminated cards.</li>
          </ol>
          <h2>Where to place the QR</h2>
          <ul>
            <li>Table tents and table edges — large enough to scan from a seated position (~3 cm).</li>
            <li>Door stickers so passers-by can browse the menu before walking in.</li>
            <li>Takeaway bags, receipts and loyalty cards.</li>
            <li>Bar runners and drink coasters.</li>
          </ul>
          <h2>Tips for restaurants</h2>
          <ul>
            <li>Host the menu as HTML rather than PDF when possible — it loads faster on mobile data and is easier to update.</li>
            <li>Use UTM parameters (e.g. <code>utm_source=table-tent</code>) so you can see how often menus are scanned.</li>
            <li>Re-print the QR if you change the menu URL. Static QR codes can&rsquo;t be re-pointed.</li>
          </ul>
        </>
      }
      faqs={[
        {
          q: 'Do I need a special menu app?',
          a: 'No. A QR code is just a link. Any web page or PDF will do.',
        },
        {
          q: 'Will I be charged per scan?',
          a: 'Never. This is a static QR code generator — once printed, the QR works forever, with no per-scan or subscription fees.',
        },
        {
          q: 'Should I use PDF or a web page?',
          a: 'Web pages render faster and reflow on small screens. PDFs are fine when you already have a beautifully designed menu and just want to share it.',
        },
        {
          q: 'How big should I print it?',
          a: 'For a table-tent placement, 2.5–3 cm square is plenty. For wall placement at 1–2 m distance, aim for 5–8 cm.',
        },
      ]}
    />
  )
}
