import type { MetadataRoute } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://qr.esstudio.nl'

const niche = [
  '/wifi-qr-code-generator',
  '/vcard-qr-code-generator',
  '/url-qr-code-generator',
  '/menu-qr-code-generator',
  '/email-qr-code-generator',
  '/sms-qr-code-generator',
  '/phone-qr-code-generator',
  '/calendar-event-qr-code-generator',
  '/google-maps-qr-code-generator',
  '/bitcoin-qr-code-generator',
  '/paypal-qr-code-generator',
  '/spotify-qr-code-generator',
  '/app-store-qr-code-generator',
  '/pdf-qr-code-generator',
]

const info = ['/about', '/privacy', '/terms']

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    ...niche.map((path) => ({
      url: `${SITE_URL}${path}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...info.map((path) => ({
      url: `${SITE_URL}${path}`,
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    })),
  ]
}
