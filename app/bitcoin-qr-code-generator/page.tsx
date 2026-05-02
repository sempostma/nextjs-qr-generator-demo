import { Metadata } from 'next'
import NichePage from '@/components/niche-page'

export const metadata: Metadata = {
  title: 'Bitcoin QR Code Generator – BIP-21 Address QR',
  description: 'Free Bitcoin QR code generator. Encode an address with optional amount, label and message. BIP-21 compatible — works with most wallets.',
  alternates: { canonical: '/bitcoin-qr-code-generator' },
  openGraph: {
    title: 'Bitcoin QR Code Generator – BIP-21 Address QR',
    description: 'Free Bitcoin QR code generator with address, amount, label and message.',
    url: '/bitcoin-qr-code-generator',
  },
}

export default function Page() {
  return (
    <NichePage
      type="bitcoin"
      lockType
      h1="Bitcoin QR Code Generator"
      intro="Generate a Bitcoin payment QR code. Scan with any major wallet — Cash App, BlueWallet, Muun, Wallet of Satoshi, Sparrow, Electrum and many others recognize the format and pre-fill the amount."
      body={
        <>
          <h2>What format is used?</h2>
          <p>
            We encode a <a href="https://github.com/bitcoin/bips/blob/master/bip-0021.mediawiki" target="_blank" rel="noopener">BIP-21</a> URI:
          </p>
          <pre><code>bitcoin:bc1q...?amount=0.001&amp;label=Coffee&amp;message=Order%20%231234</code></pre>
          <ul>
            <li><strong>address</strong>: the recipient&rsquo;s Bitcoin address — legacy (1...), SegWit (3...) or native SegWit (bc1...).</li>
            <li><strong>amount</strong>: in BTC (decimal). Wallets pre-fill this on the send screen.</li>
            <li><strong>label</strong>: a short name for the payee — wallets display this so the user knows who they&rsquo;re paying.</li>
            <li><strong>message</strong>: order or invoice reference, attached to the transaction in the wallet&rsquo;s history.</li>
          </ul>
          <h2>Use cases</h2>
          <ul>
            <li>Tip jars at cafés and busking pitches.</li>
            <li>Donation QR codes for charities and content creators.</li>
            <li>Merch tables and physical point-of-sale.</li>
            <li>Invoices on printed receipts.</li>
          </ul>
          <h2>Security tips</h2>
          <ul>
            <li>Always double-check the address matches your wallet before printing — you can&rsquo;t change a static QR after the fact.</li>
            <li>For high-value or recurring use, consider Lightning addresses or BOLT-12 invoices instead of on-chain Bitcoin URIs.</li>
            <li>Test with a small payment before printing at scale.</li>
          </ul>
        </>
      }
      faqs={[
        {
          q: 'Does this work with Lightning?',
          a: 'This generator uses the on-chain bitcoin: scheme. For Lightning invoices, encode the lnbc... string as a plain-text QR using the Plain Text generator.',
        },
        {
          q: 'Is the amount mandatory?',
          a: 'No. Leave it blank for &ldquo;pay-what-you-want&rdquo; tip-jar style payments. Fill it in for fixed-price items so the customer can&rsquo;t under-pay by mistake.',
        },
        {
          q: 'Is my address stored anywhere?',
          a: 'No. Generation happens entirely in your browser; nothing is uploaded to a server.',
        },
        {
          q: 'Why does my wallet not recognize the QR?',
          a: 'Some older wallets only accept the bare address. Try generating without amount/label/message for maximum compatibility.',
        },
      ]}
    />
  )
}
