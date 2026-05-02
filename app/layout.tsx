import type { Metadata } from "next";
import Script from "next/script";
import localFont from "next/font/local";
import Link from "next/link";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://qr.esstudio.nl";
const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "QR Code Generator | Free, Logo, WiFi, vCard, UTM",
    template: "%s | Free QR Code Generator",
  },
  description:
    "Free online QR code generator. Create QR codes for URLs, WiFi, vCards, SMS, email, phone numbers and plain text. Customize colors, embed a logo, add UTM tracking. No sign-up.",
  applicationName: "QR Code Generator",
  keywords: [
    "QR code generator",
    "free QR code generator",
    "WiFi QR code",
    "vCard QR code",
    "URL QR code",
    "QR code with logo",
    "UTM QR code",
    "SMS QR code",
    "email QR code",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "QR Code Generator",
    url: "/",
    title: "QR Code Generator | Free, Logo, WiFi, vCard, UTM",
    description:
      "Free online QR code generator. WiFi, vCard, URL, SMS, email and phone QR codes with logo, color and UTM customization.",
  },
  twitter: {
    card: "summary_large_image",
    title: "QR Code Generator | Free, Logo, WiFi, vCard, UTM",
    description:
      "Free online QR code generator. WiFi, vCard, URL, SMS, email and phone with logo and UTM support.",
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: '#000000',
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "QR Code Generator",
  url: SITE_URL,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web",
  browserRequirements: "Requires JavaScript",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "URL QR codes with UTM tracking",
    "WiFi QR codes (WPA/WEP/open)",
    "vCard / contact QR codes",
    "SMS, email and phone QR codes",
    "Custom colors and embedded logo",
    "PNG and SVG export",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="border-b">
          <div className="container max-w-screen-lg mx-auto px-4 py-3 flex flex-wrap gap-4 items-center justify-between">
            <Link href="/" className="font-semibold">QR Code Generator</Link>
            <nav className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <Link href="/wifi-qr-code-generator" className="hover:text-foreground">WiFi</Link>
              <Link href="/vcard-qr-code-generator" className="hover:text-foreground">vCard</Link>
              <Link href="/url-qr-code-generator" className="hover:text-foreground">URL</Link>
              <Link href="/calendar-event-qr-code-generator" className="hover:text-foreground">Event</Link>
              <Link href="/google-maps-qr-code-generator" className="hover:text-foreground">Location</Link>
              <Link href="/bitcoin-qr-code-generator" className="hover:text-foreground">Bitcoin</Link>
              <Link href="/menu-qr-code-generator" className="hover:text-foreground">Menu</Link>
              <Link href="/pdf-qr-code-generator" className="hover:text-foreground">PDF</Link>
            </nav>
          </div>
        </header>
        {children}
        <footer className="border-t mt-16">
          <div className="container max-w-screen-lg mx-auto px-4 py-6 text-sm text-muted-foreground space-y-4">
            <nav className="flex flex-wrap gap-x-4 gap-y-1">
              <Link href="/about" className="hover:text-foreground">About</Link>
              <Link href="/privacy" className="hover:text-foreground">Privacy</Link>
              <Link href="/terms" className="hover:text-foreground">Terms</Link>
              <Link href="/wifi-qr-code-generator" className="hover:text-foreground">WiFi</Link>
              <Link href="/vcard-qr-code-generator" className="hover:text-foreground">vCard</Link>
              <Link href="/url-qr-code-generator" className="hover:text-foreground">URL</Link>
              <Link href="/calendar-event-qr-code-generator" className="hover:text-foreground">Event</Link>
              <Link href="/google-maps-qr-code-generator" className="hover:text-foreground">Location</Link>
              <Link href="/bitcoin-qr-code-generator" className="hover:text-foreground">Bitcoin</Link>
              <Link href="/paypal-qr-code-generator" className="hover:text-foreground">PayPal</Link>
              <Link href="/spotify-qr-code-generator" className="hover:text-foreground">Spotify</Link>
              <Link href="/app-store-qr-code-generator" className="hover:text-foreground">App Store</Link>
              <Link href="/menu-qr-code-generator" className="hover:text-foreground">Menu</Link>
              <Link href="/pdf-qr-code-generator" className="hover:text-foreground">PDF</Link>
              <Link href="/email-qr-code-generator" className="hover:text-foreground">Email</Link>
              <Link href="/sms-qr-code-generator" className="hover:text-foreground">SMS</Link>
              <Link href="/phone-qr-code-generator" className="hover:text-foreground">Phone</Link>
            </nav>
            <div className="flex flex-wrap gap-4 justify-between">
              <p>&copy; {new Date().getFullYear()} QR Code Generator. Free to use.</p>
              <p>
                QR codes are generated entirely in your browser. No tracking of
                the QR contents.
              </p>
            </div>
          </div>
        </footer>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {ADSENSE_CLIENT && (
          <Script
            async
            strategy="lazyOnload"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
            crossOrigin="anonymous"
          />
        )}
      </body>
    </html>
  );
}
