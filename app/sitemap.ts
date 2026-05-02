import type { MetadataRoute } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://qr.esstudio.nl'

const paths = [
  '',
  '/wifi-qr-code-generator',
  '/vcard-qr-code-generator',
  '/url-qr-code-generator',
  '/menu-qr-code-generator',
  '/email-qr-code-generator',
  '/sms-qr-code-generator',
  '/phone-qr-code-generator',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return paths.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: path === '' ? 1 : 0.8,
  }))
}
