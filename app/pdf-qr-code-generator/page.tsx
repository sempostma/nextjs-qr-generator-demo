import { Metadata } from 'next'
import NichePage from '@/components/niche-page'

export const metadata: Metadata = {
  title: 'PDF QR Code Generator – Link to PDF Files',
  description: 'Free PDF QR code generator. Link to a hosted PDF — datasheet, manual, brochure, menu — and let people download or view it on their phone.',
  alternates: { canonical: '/pdf-qr-code-generator' },
  openGraph: {
    title: 'PDF QR Code Generator – Link to PDF Files',
    description: 'Free PDF QR code generator that links to a hosted PDF document.',
    url: '/pdf-qr-code-generator',
  },
}

export default function Page() {
  return (
    <NichePage
      type="url"
      lockType
      h1="PDF QR Code Generator"
      intro="Print less, share more. Generate a QR code that opens any PDF — manual, brochure, datasheet, menu, contract — straight on the user&rsquo;s phone."
      body={
        <>
          <h2>How it works</h2>
          <p>
            PDFs aren&rsquo;t encoded directly in the QR code (the file is far too
            big). Instead, you host the PDF online and the QR points at the
            URL. Modern phones open the PDF in their browser&rsquo;s built-in
            viewer.
          </p>
          <h2>Where to host the PDF for free</h2>
          <ul>
            <li>Your own website (best — full control).</li>
            <li>Google Drive (set sharing to &ldquo;Anyone with the link&rdquo; and copy the direct PDF view URL).</li>
            <li>Dropbox (use the <code>?dl=0</code> URL for inline view, <code>?dl=1</code> to force download).</li>
            <li>GitHub or GitLab Pages — free static hosting for technical docs.</li>
          </ul>
          <h2>Common use cases</h2>
          <ul>
            <li>Product manuals on packaging — saves printing in 30 languages.</li>
            <li>Restaurant menus and wine lists.</li>
            <li>Real estate property brochures on yard signs.</li>
            <li>Event programs and conference agendas.</li>
            <li>Construction and equipment safety datasheets.</li>
          </ul>
          <h2>Tips</h2>
          <ul>
            <li>Optimize the PDF first (compress images, embed fonts only as needed). A 50 MB PDF is painful on mobile data.</li>
            <li>Make sure the host returns <code>Content-Type: application/pdf</code> so the browser opens it instead of downloading silently.</li>
            <li>Use UTM parameters to see how often each PDF is accessed.</li>
            <li>Static QR codes can&rsquo;t be re-pointed — use a redirect URL you control if you anticipate updating the PDF.</li>
          </ul>
        </>
      }
      faqs={[
        {
          q: 'Can a QR code contain a PDF directly?',
          a: 'Technically you could base64-encode a tiny PDF, but it would generate a massive, unscannable QR. Always link to a hosted file instead.',
        },
        {
          q: 'Will the user need an app?',
          a: 'No. iOS and Android both render PDFs natively in the browser. Some Android phones download first, then offer to open.',
        },
        {
          q: 'How do I update the PDF without reprinting the QR?',
          a: 'Point the QR at a stable URL on your own site, then change the file at that URL whenever you need to publish a new version.',
        },
      ]}
    />
  )
}
