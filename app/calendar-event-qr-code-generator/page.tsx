import { Metadata } from 'next'
import NichePage from '@/components/niche-page'

export const metadata: Metadata = {
  title: 'Calendar Event QR Code Generator – Free vEvent',
  description: 'Free calendar event QR code generator. Scan to add an event with title, location, time and description directly to iOS, Android or Outlook calendars.',
  alternates: { canonical: '/calendar-event-qr-code-generator' },
  openGraph: {
    title: 'Calendar Event QR Code Generator – Free vEvent',
    description: 'Free calendar event QR code generator. Scan to add an event to a calendar.',
    url: '/calendar-event-qr-code-generator',
  },
}

export default function Page() {
  return (
    <NichePage
      type="event"
      lockType
      h1="Calendar Event QR Code Generator"
      intro="Turn an event into a single tap. Scan the QR code and the phone offers to add the event — title, location, start, end and description — straight to the user&rsquo;s calendar app."
      body={
        <>
          <h2>Where to use a calendar QR code</h2>
          <ul>
            <li>Wedding invitations and save-the-dates.</li>
            <li>Conference and meetup posters.</li>
            <li>Webinar landing pages.</li>
            <li>Restaurant ticketed events and pop-ups.</li>
            <li>Sports and concert tickets.</li>
          </ul>
          <h2>What format is used?</h2>
          <p>
            We encode a <code>VEVENT</code> block — the standard{' '}
            <a href="https://datatracker.ietf.org/doc/html/rfc5545" target="_blank" rel="noopener">RFC 5545 iCalendar</a>{' '}
            format. It&rsquo;s recognized natively by iOS Calendar, Google
            Calendar (Android), and Outlook.
          </p>
          <h2>Tips</h2>
          <ul>
            <li>Use the <em>All-day</em> toggle for date-only events — phones display them differently.</li>
            <li>For best compatibility, keep the title under 75 characters and the description under 250.</li>
            <li>The location field accepts free-form text — a street address works best so the calendar app can offer directions.</li>
            <li>Times are stored in UTC for portability; the user&rsquo;s phone will display them in their local time zone.</li>
          </ul>
        </>
      }
      faqs={[
        {
          q: 'Will the event be added automatically?',
          a: 'No. The phone always asks the user to confirm. They can edit fields before saving.',
        },
        {
          q: 'Can I include a video link?',
          a: 'Yes — drop the meeting URL into the description field. Most calendar apps make URLs tappable when displayed.',
        },
        {
          q: 'Does this work for recurring events?',
          a: 'The encoded format is a single event. For a series, generate one QR per occurrence or link to a public calendar URL using the URL QR generator.',
        },
        {
          q: 'What if my time zone is not UTC?',
          a: 'You enter the event in your local time. We convert to UTC before encoding so phones in other zones display the right local time.',
        },
      ]}
    />
  )
}
