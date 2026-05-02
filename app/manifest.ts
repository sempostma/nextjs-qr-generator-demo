import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'QR Code Generator',
    short_name: 'QR Gen',
    description:
      'Free QR code generator for URLs, WiFi, vCards, calendar events, locations, Bitcoin, SMS, email and phone numbers.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
    categories: ['utilities', 'productivity'],
  }
}
