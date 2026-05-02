import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import QRCodeGenerator from '@/app/qr-code-generator'
import AdSlot from '@/components/ad-slot'
import { QRType } from '@/app/inputs'

interface FAQ {
  q: string
  a: string
}

interface NichePageProps {
  type: QRType
  lockType?: boolean
  h1: string
  intro: string
  body: React.ReactNode
  faqs: FAQ[]
  /** path of this page, e.g. /wifi-qr-code-generator */
  path: string
  /** human-readable name for breadcrumb */
  breadcrumbName: string
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://qr.esstudio.nl'

export default function NichePage({
  type,
  lockType = false,
  h1,
  intro,
  body,
  faqs,
  path,
  breadcrumbName,
}: NichePageProps) {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'QR Code Generator',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: breadcrumbName,
        item: `${SITE_URL}${path}`,
      },
    ],
  }

  return (
    <main className="container max-w-screen-lg mx-auto px-4 py-8 font-[family-name:var(--font-geist-sans)]">
      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-muted-foreground">
        <ol className="flex items-center gap-1">
          <li>
            <Link href="/" className="hover:text-foreground">QR Code Generator</Link>
          </li>
          <li className="flex items-center gap-1">
            <ChevronRight className="h-3 w-3" aria-hidden />
            <span aria-current="page">{breadcrumbName}</span>
          </li>
        </ol>
      </nav>

      <h1 className="text-3xl font-bold mb-4">{h1}</h1>
      <p className="mb-6 text-lg text-muted-foreground">{intro}</p>

      <AdSlot slot="niche-top" className="mb-6" />

      <QRCodeGenerator defaultType={type} lockType={lockType} />

      <AdSlot slot="niche-mid" className="my-10" />

      <section className="prose prose-neutral max-w-none mt-10">{body}</section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Frequently asked questions</h2>
        <div className="space-y-6">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold">{f.q}</h3>
              <p className="text-muted-foreground mt-1">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <AdSlot slot="niche-bottom" className="mt-12" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </main>
  )
}
