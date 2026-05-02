import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="container max-w-screen-md mx-auto px-4 py-20 text-center">
      <p className="text-sm uppercase tracking-wide text-muted-foreground">404</p>
      <h1 className="text-3xl font-bold mt-2 mb-4">Page not found</h1>
      <p className="text-muted-foreground mb-8">
        The QR code you&rsquo;re looking for must have wandered off. Try one of these instead:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto text-left">
        <Link href="/" className="rounded-md border p-3 hover:bg-accent hover:text-accent-foreground">Free QR generator</Link>
        <Link href="/wifi-qr-code-generator" className="rounded-md border p-3 hover:bg-accent hover:text-accent-foreground">WiFi QR code</Link>
        <Link href="/vcard-qr-code-generator" className="rounded-md border p-3 hover:bg-accent hover:text-accent-foreground">vCard QR code</Link>
        <Link href="/url-qr-code-generator" className="rounded-md border p-3 hover:bg-accent hover:text-accent-foreground">URL QR code</Link>
        <Link href="/calendar-event-qr-code-generator" className="rounded-md border p-3 hover:bg-accent hover:text-accent-foreground">Calendar event QR</Link>
        <Link href="/menu-qr-code-generator" className="rounded-md border p-3 hover:bg-accent hover:text-accent-foreground">Restaurant menu QR</Link>
      </div>
    </main>
  )
}
