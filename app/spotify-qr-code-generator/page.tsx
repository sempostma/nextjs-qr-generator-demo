import { Metadata } from 'next'
import NichePage from '@/components/niche-page'

export const metadata: Metadata = {
  title: 'Spotify QR Code Generator – Free Track, Album &amp; Playlist QR',
  description: 'Free Spotify QR code generator. Print on flyers, posters, business cards or wedding programs to share a song, album, playlist or artist.',
  alternates: { canonical: '/spotify-qr-code-generator' },
  openGraph: {
    title: 'Spotify QR Code Generator – Free',
    description: 'Free Spotify QR code generator for songs, albums and playlists.',
    url: '/spotify-qr-code-generator',
  },
}

export default function Page() {
  return (
    <NichePage
      type="url"
      lockType
      h1="Spotify QR Code Generator"
      intro="Share music with a single scan. Generate a QR code from any Spotify link — track, album, playlist, podcast or artist — and print it anywhere your audience will see it."
      body={
        <>
          <h2>How to get the link</h2>
          <ol>
            <li>Open Spotify (web, desktop or mobile).</li>
            <li>Tap or click <em>Share → Copy link</em> on the track, album or playlist.</li>
            <li>Paste it into the URL field above.</li>
          </ol>
          <h2>Use cases</h2>
          <ul>
            <li>Bands sharing their latest single on flyers and merch.</li>
            <li>DJs printing playlist QR codes on event invitations.</li>
            <li>Wedding ceremonies linking to the official playlist.</li>
            <li>Podcasters putting a follow QR on a business card.</li>
            <li>Cafés sharing their in-house playlist.</li>
          </ul>
          <h2>Spotify&rsquo;s own &ldquo;Spotify Codes&rdquo;</h2>
          <p>
            Spotify offers proprietary &ldquo;Spotify Codes&rdquo; — the
            distinctive bar pattern in the app. Those only work inside Spotify&rsquo;s
            own scanner. The QR code this site generates works with any phone
            camera and opens Spotify on devices where the app is installed,
            falling back to the web player otherwise.
          </p>
        </>
      }
      faqs={[
        {
          q: 'Will it open the Spotify app or the website?',
          a: 'On phones with the Spotify app installed, the OS opens it directly. On devices without the app, it falls back to the web player at open.spotify.com.',
        },
        {
          q: 'Does the listener need a Premium account?',
          a: 'No. Free Spotify accounts can listen to most content the QR points at, with the same restrictions that apply on the rest of the platform.',
        },
        {
          q: 'Is this affiliated with Spotify?',
          a: 'No — Spotify is a trademark of Spotify AB. This is just a free URL QR code generator that happens to work great for Spotify links.',
        },
      ]}
    />
  )
}
