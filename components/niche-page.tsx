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
}

export default function NichePage({
  type,
  lockType = false,
  h1,
  intro,
  body,
  faqs,
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

  return (
    <main className="container max-w-screen-lg mx-auto px-4 py-8 font-[family-name:var(--font-geist-sans)]">
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </main>
  )
}
