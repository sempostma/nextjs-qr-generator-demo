# QR Code Generator

A free, open-source QR code generator that runs entirely in the browser. Demo: [qr.esstudio.nl](https://qr.esstudio.nl).

## Features

- **QR types**: URL (with UTM tracking), WiFi, vCard / contact, calendar event (vEvent), location (geo: URI or Google Maps), Bitcoin (BIP-21), plain text, SMS, email, phone.
- **Customization**: foreground / background colors, transparent backgrounds, embedded logo with auto error-correction H, scale, margin.
- **Export**: PNG (raster), SVG (vector), UTF-8 (terminal art).
- **Privacy**: every QR code is generated client-side — nothing is uploaded.
- **SEO landing pages** (14): WiFi, vCard, URL, calendar event, location/Google Maps, Bitcoin, menu, PDF, PayPal, Spotify, App Store, email, SMS, phone.
- **AdSense-ready compliance pages**: `/privacy`, `/terms`, `/about`, custom `404`, PWA manifest.

## Local development

```bash
npm install
npm run dev
```

## Environment variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL used in metadata, sitemap and robots. Defaults to `https://qr.esstudio.nl`. |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | Google AdSense publisher ID (e.g. `ca-pub-1234567890`). When unset, all `<AdSlot>`s render nothing in production. |

Drop these in `.env.local` for development.

## Deploying for free

You don't need a paid domain — every option below gives you a free HTTPS URL that Google can index.

| Host | Free URL example | Notes |
| --- | --- | --- |
| **Vercel** | `your-project.vercel.app` | Recommended. Native Next.js. Push to GitHub → import in Vercel → done. |
| **Netlify** | `your-project.netlify.app` | Works out of the box with the Next.js runtime. |
| **Cloudflare Pages** | `your-project.pages.dev` | Use the `@cloudflare/next-on-pages` adapter. |

Once deployed, set `NEXT_PUBLIC_SITE_URL` to the assigned URL so canonical tags, sitemap and JSON-LD use the right host.

If/when you buy a real domain, point a CNAME at the host and update the env var — no code changes needed.

## Monetization (Google AdSense)

The app has ad slots wired up but no ads load until you provide a publisher ID:

1. Apply for [Google AdSense](https://adsense.google.com).
2. Once approved, copy your publisher ID (`ca-pub-XXXXXXXXXXXXXXXX`).
3. Add `NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX` to your hosting environment.
4. In AdSense, create ad units for each placement (`home-top`, `home-mid`, `niche-top`, `niche-mid`) and replace the `slot` prop on each `<AdSlot>` with the real slot ID returned by AdSense — or pass slot IDs via env vars and read them in the components.
5. Add the AdSense `ads.txt` line to `public/ads.txt`.

The `<AdSlot>` component renders a labeled placeholder in development so you can see where ads will appear, and renders nothing in production until the publisher ID is set — so the app stays clean during AdSense review.

## SEO

Out of the box this build ships:

- A keyword-targeted homepage and seven niche landing pages.
- `app/sitemap.ts` and `app/robots.ts` (Next 14 file-based metadata).
- JSON-LD `WebApplication` schema in the layout, `FAQPage` schema on every niche page.
- Per-page `<title>`, `<meta description>`, OpenGraph and canonical tags.
- Internal cross-linking between the homepage and niche pages, and from the global header.

Submit `${NEXT_PUBLIC_SITE_URL}/sitemap.xml` to Google Search Console after deploy.

## License

MIT
