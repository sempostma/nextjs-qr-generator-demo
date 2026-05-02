import { Metadata } from 'next'
import NichePage from '@/components/niche-page'

export const metadata: Metadata = {
  title: 'PayPal QR Code Generator – Free PayPal.Me QR',
  description: 'Generate a free PayPal QR code from your PayPal.Me link. Customers scan and pay you instantly.',
  alternates: { canonical: '/paypal-qr-code-generator' },
  openGraph: {
    title: 'PayPal QR Code Generator – Free',
    description: 'Generate a PayPal QR code from your PayPal.Me link.',
    url: '/paypal-qr-code-generator',
  },
}

export default function Page() {
  return (
    <NichePage
      type="url"
      lockType
      path="/paypal-qr-code-generator"
      breadcrumbName="PayPal"
      h1="PayPal QR Code Generator"
      intro="Get paid faster — print or display a PayPal.Me QR code so customers can pay you with a tap. Works with personal and business PayPal accounts at no cost to either side."
      body={
        <>
          <h2>How to set up your PayPal QR code</h2>
          <ol>
            <li>Sign in to PayPal and visit <a href="https://www.paypal.com/paypalme/grab" target="_blank" rel="noopener">paypal.com/paypalme/grab</a> to claim your <code>PayPal.Me/yourname</code> link if you haven&rsquo;t already.</li>
            <li>Paste it into the URL field above. To pre-fill an amount, append it to the URL: <code>PayPal.Me/yourname/15</code>.</li>
            <li>Tweak the QR colors to match your brand and add your logo.</li>
            <li>Export as SVG for crisp print quality on signage and receipts.</li>
          </ol>
          <h2>Where to use it</h2>
          <ul>
            <li>Market stalls and pop-up shops.</li>
            <li>Service providers — therapists, photographers, tutors.</li>
            <li>Donation jars for charities, buskers and creators.</li>
            <li>Invoices, receipts and email signatures.</li>
          </ul>
          <h2>PayPal&rsquo;s own QR codes</h2>
          <p>
            PayPal also offers built-in QR codes inside the mobile app for in-person payments. Those generate a code linked to a specific transaction and require both parties to use the PayPal app. PayPal.Me QR codes — what this generator produces — work for any payer with a PayPal account, no app required.
          </p>
        </>
      }
      faqs={[
        {
          q: 'Is there a fee for being paid via QR code?',
          a: 'For personal &ldquo;Friends &amp; Family&rdquo; payments inside the same country, PayPal usually charges no fee. Business payments incur PayPal&rsquo;s standard fees. Check PayPal&rsquo;s current pricing for your country.',
        },
        {
          q: 'Can I pre-fill the amount?',
          a: 'Yes — append it to the URL like <code>PayPal.Me/yourname/15</code>. The customer can still adjust the amount if you allow it.',
        },
        {
          q: 'Does the customer need a PayPal account?',
          a: 'In most regions, yes — to pay via PayPal.Me they need a PayPal account or to create one during checkout.',
        },
      ]}
    />
  )
}
