'use client'

import { useState, useEffect, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Mail, MessageSquare, Phone, User, Globe, Wifi, Type, Calendar, MapPin, Bitcoin, LocateFixed, Loader2 } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const MapPicker = dynamic(() => import('@/components/map-picker'), {
  ssr: false,
  loading: () => (
    <div className="rounded-md border h-[280px] flex items-center justify-center text-sm text-muted-foreground">
      Loading map…
    </div>
  ),
})

const InputField = ({
  id,
  label,
  placeholder,
  type = "text",
  value,
  onChange
}: {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
}) => (
  <div className="space-y-2">
    <Label htmlFor={id}>{label}</Label>
    <Input
      type={type}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
)

export type QRType = 'url' | 'wifi' | 'contact' | 'event' | 'geo' | 'bitcoin' | 'plaintext' | 'sms' | 'email' | 'phone'

interface QRInputsProps {
  onChange: (encodedResult: string) => void
  name: string
  defaultOption?: QRType
  lockOption?: boolean
}

// Escape characters per WiFi QR spec: \, ;, ,, ", :
const escapeWifi = (s: string) => s.replace(/([\\;,":])/g, '\\$1')

export default function QRInputs({ name, onChange, defaultOption = 'url', lockOption = false }: QRInputsProps) {
  const [selectedOption, setSelectedOption] = useState<QRType>(defaultOption)
  const [encodedResult, setEncodedResult] = useState("")

  const [url, setUrl] = useState("")
  const [utmParams, setUtmParams] = useState({
    source: "",
    medium: "",
    campaign: "",
    term: "",
    content: ""
  })

  const [wifi, setWifi] = useState({
    ssid: "",
    password: "",
    encryption: "WPA",
    hidden: false,
  })

  const [contact, setContact] = useState({
    prefix: "",
    lastName: "",
    firstName: "",
    fullName: "",
    title: "",
    organization: "",
    telOther: "",
    telMobile: "",
    fax: "",
    email: "",
    address: ""
  })

  const [plainText, setPlainText] = useState("")

  const [sms, setSms] = useState({
    number: "",
    message: "",
    format: ""
  })

  const [email, setEmail] = useState({
    address: "",
    subject: "",
    body: ""
  })

  const [phoneNumber, setPhoneNumber] = useState("")

  const [event, setEvent] = useState({
    title: "",
    location: "",
    description: "",
    start: "",
    end: "",
    allDay: false,
  })

  const [geo, setGeo] = useState({
    latitude: "",
    longitude: "",
    street: "",
    city: "",
    postalCode: "",
    country: "",
    mode: "maps" as "geo" | "maps",
  })

  const formatGeoAddress = () => {
    const cityLine = [geo.postalCode, geo.city].filter(Boolean).join(' ')
    return [geo.street, cityLine, geo.country].filter(Boolean).join(', ')
  }

  const [geoStatus, setGeoStatus] = useState<{ kind: 'idle' | 'loading' | 'error' | 'success'; message?: string }>({ kind: 'idle' })

  const useMyLocation = () => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      setGeoStatus({ kind: 'error', message: 'Geolocation is not available in this browser.' })
      return
    }
    setGeoStatus({ kind: 'loading' })
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude.toFixed(6)
        const lng = pos.coords.longitude.toFixed(6)
        setGeo((prev) => ({ ...prev, latitude: lat, longitude: lng }))
        setGeoStatus({ kind: 'success', message: `Pinned to ${lat}, ${lng}` })
      },
      (err) => {
        const message =
          err.code === err.PERMISSION_DENIED
            ? 'Permission denied — allow location access in your browser to use this.'
            : err.code === err.POSITION_UNAVAILABLE
            ? 'Position unavailable. Try entering an address instead.'
            : err.code === err.TIMEOUT
            ? 'Timed out. Try again.'
            : 'Could not get your location.'
        setGeoStatus({ kind: 'error', message })
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 }
    )
  }

  const [bitcoin, setBitcoin] = useState({
    address: "",
    amount: "",
    label: "",
    message: "",
  })

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const tabValue = useMemo(() => isOpen ? 'utm' : undefined, [isOpen])

  const generateVCard = () => {
    if (!contact.firstName && !contact.lastName && !contact.fullName && !contact.email && !contact.telMobile && !contact.telOther && !contact.organization) {
      return ''
    }
    return `BEGIN:VCARD
VERSION:3.0
N:${contact.lastName};${contact.firstName};;${contact.prefix}
FN:${contact.fullName || `${contact.firstName} ${contact.lastName}`.trim()}
PREFIX:${contact.prefix}
TITLE:${contact.title}
ORG:${contact.organization}
TEL;other:${contact.telOther}
TEL;mobile:${contact.telMobile}
FAX:${contact.fax}
EMAIL:${contact.email}
ADR:;;${contact.address}
END:VCARD`
  }

  const generateWifi = () => {
    if (!wifi.ssid) return ''
    const T = wifi.encryption === 'nopass' ? 'nopass' : wifi.encryption
    const S = escapeWifi(wifi.ssid)
    const P = wifi.encryption === 'nopass' ? '' : escapeWifi(wifi.password)
    const H = wifi.hidden ? 'true' : 'false'
    return `WIFI:T:${T};S:${S};${P ? `P:${P};` : ''}H:${H};;`
  }

  const addUtmParams = (baseUrl: string) => {
    if (!baseUrl) return ''
    const params = new URLSearchParams()

    if (utmParams.source) params.append('utm_source', utmParams.source)
    if (utmParams.medium) params.append('utm_medium', utmParams.medium)
    if (utmParams.campaign) params.append('utm_campaign', utmParams.campaign)
    if (utmParams.term) params.append('utm_term', utmParams.term)
    if (utmParams.content) params.append('utm_content', utmParams.content)

    const paramsString = params.toString()
    if (!paramsString) return baseUrl

    return baseUrl.includes('?')
      ? `${baseUrl}&${paramsString}`
      : `${baseUrl}?${paramsString}`
  }

  const generateEmailFormat = () => {
    if (!email.address) return ''
    const subject = encodeURIComponent(email.subject)
    const body = encodeURIComponent(email.body)
    return `mailto:${email.address}?subject=${subject}&body=${body}`
  }

  // vEvent escape: \ , ; and newlines
  const escapeIcal = (s: string) => s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n')

  const formatIcalDate = (input: string, allDay: boolean) => {
    if (!input) return ''
    if (allDay) {
      // input is yyyy-mm-dd
      return input.replace(/-/g, '')
    }
    // input is yyyy-mm-ddThh:mm
    const d = new Date(input)
    if (isNaN(d.getTime())) return ''
    const pad = (n: number) => n.toString().padStart(2, '0')
    return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`
  }

  const generateEvent = () => {
    if (!event.title || !event.start) return ''
    const dtStart = formatIcalDate(event.start, event.allDay)
    const dtEnd = event.end ? formatIcalDate(event.end, event.allDay) : dtStart
    if (!dtStart) return ''
    const dateParam = event.allDay ? ';VALUE=DATE' : ''
    const lines = ['BEGIN:VEVENT', `SUMMARY:${escapeIcal(event.title)}`]
    if (event.location) lines.push(`LOCATION:${escapeIcal(event.location)}`)
    if (event.description) lines.push(`DESCRIPTION:${escapeIcal(event.description)}`)
    lines.push(`DTSTART${dateParam}:${dtStart}`)
    lines.push(`DTEND${dateParam}:${dtEnd}`)
    lines.push('END:VEVENT')
    return lines.join('\n')
  }

  const generateGeo = () => {
    const hasCoords = !!geo.latitude && !!geo.longitude
    const address = formatGeoAddress()
    const hasAddress = !!address
    if (!hasCoords && !hasAddress) return ''

    if (geo.mode === 'maps') {
      const target = hasCoords
        ? hasAddress
          ? `${geo.latitude},${geo.longitude} (${address})`
          : `${geo.latitude},${geo.longitude}`
        : address
      return `https://maps.google.com/?q=${encodeURIComponent(target)}`
    }

    if (hasCoords) {
      const q = hasAddress ? `?q=${encodeURIComponent(address)}` : ''
      return `geo:${geo.latitude},${geo.longitude}${q}`
    }
    // Address-only fallback. Android maps app resolves geo:0,0?q=ADDRESS;
    // not all iOS clients do, so we encode for best-effort compatibility.
    return `geo:0,0?q=${encodeURIComponent(address)}`
  }

  const generateBitcoin = () => {
    if (!bitcoin.address) return ''
    const params = new URLSearchParams()
    if (bitcoin.amount) params.append('amount', bitcoin.amount)
    if (bitcoin.label) params.append('label', bitcoin.label)
    if (bitcoin.message) params.append('message', bitcoin.message)
    const qs = params.toString()
    return `bitcoin:${bitcoin.address}${qs ? `?${qs}` : ''}`
  }

  const updateEncodedResult = () => {
    switch (selectedOption) {
      case 'url':
        setEncodedResult(addUtmParams(url))
        break
      case 'wifi':
        setEncodedResult(generateWifi())
        break
      case 'contact':
        setEncodedResult(generateVCard())
        break
      case 'plaintext':
        setEncodedResult(plainText)
        break
      case 'sms':
        setEncodedResult(sms.number ? `smsto:${sms.number}:${sms.message}` : '')
        break
      case 'email':
        setEncodedResult(generateEmailFormat())
        break
      case 'phone':
        setEncodedResult(phoneNumber ? `tel:${phoneNumber}` : '')
        break
      case 'event':
        setEncodedResult(generateEvent())
        break
      case 'geo':
        setEncodedResult(generateGeo())
        break
      case 'bitcoin':
        setEncodedResult(generateBitcoin())
        break
      default:
        setEncodedResult('')
    }
  }

  useEffect(() => {
    onChange(encodedResult)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [encodedResult])

  useEffect(() => {
    updateEncodedResult()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption, url, utmParams, wifi, contact, plainText, sms, email, phoneNumber, event, geo, bitcoin])

  const handleContactChange = (field: keyof typeof contact) => (value: string) => {
    setContact(prev => ({ ...prev, [field]: value }))
  }

  const handleSmsChange = (field: keyof Omit<typeof sms, 'format'>) => (value: string) => {
    setSms(prev => {
      const newState = { ...prev, [field]: value }
      return {
        ...newState,
        format: newState.number ? `smsto:${newState.number}:${newState.message}` : ''
      }
    })
  }

  const handleUtmChange = (field: keyof typeof utmParams) => (value: string) => {
    setUtmParams(prev => ({ ...prev, [field]: value }))
  }

  const handleEmailChange = (field: keyof typeof email) => (value: string) => {
    setEmail(prev => ({ ...prev, [field]: value }))
  }

  const handleWifiChange = <K extends keyof typeof wifi>(field: K) => (value: typeof wifi[K]) => {
    setWifi(prev => ({ ...prev, [field]: value }))
  }

  const handleEventChange = <K extends keyof typeof event>(field: K) => (value: typeof event[K]) => {
    setEvent(prev => ({ ...prev, [field]: value }))
  }

  const handleGeoChange = <K extends keyof typeof geo>(field: K) => (value: typeof geo[K]) => {
    setGeo(prev => ({ ...prev, [field]: value }))
  }

  const handleBitcoinChange = (field: keyof typeof bitcoin) => (value: string) => {
    setBitcoin(prev => ({ ...prev, [field]: value }))
  }

  const options: { value: QRType; label: string; icon: typeof Globe }[] = [
    { value: "url", label: "URL", icon: Globe },
    { value: "wifi", label: "WiFi", icon: Wifi },
    { value: "contact", label: "Contact", icon: User },
    { value: "event", label: "Event", icon: Calendar },
    { value: "geo", label: "Location", icon: MapPin },
    { value: "bitcoin", label: "Bitcoin", icon: Bitcoin },
    { value: "plaintext", label: "Plain Text", icon: Type },
    { value: "sms", label: "SMS", icon: MessageSquare },
    { value: "email", label: "Email", icon: Mail },
    { value: "phone", label: "Phone", icon: Phone },
  ]

  return (
    <div className="">
      {/* Hidden input for encoded result */}
      <input type="hidden" name={name} value={encodedResult} />

      {!lockOption && (
        <RadioGroup
          value={selectedOption}
          onValueChange={(v) => setSelectedOption(v as QRType)}
          className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-4"
        >
          {options.map((option) => {
            const Icon = option.icon
            return (
              <div key={option.value}>
                <RadioGroupItem
                  value={option.value}
                  id={option.value}
                  className="peer sr-only"
                />
                <Label
                  htmlFor={option.value}
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <Icon className="mb-3 h-6 w-6" />
                  <span className="text-sm font-medium">{option.label}</span>
                </Label>
              </div>
            )
          })}
        </RadioGroup>
      )}

      <div className="mt-4">
        {/* URL Section */}
        <div style={{ display: selectedOption === 'url' ? 'block' : 'none' }}>
          <InputField
            id="url"
            label="Enter URL"
            placeholder="https://example.com"
            value={url}
            onChange={setUrl}
          />
          <div className="mt-4">
            <Accordion value={tabValue} type="single">
              <AccordionItem value='utm'>
                <AccordionTrigger onClick={() => setIsOpen(!isOpen)}>Tracking (UTM)</AccordionTrigger>
                <AccordionContent forceMount={true} hidden={!isOpen}>

                  <div className="grid grid-cols-2 gap-4">
                    <div className='space-y-2'>
                      <InputField
                        id="utm-source"
                        label="Source"
                        placeholder="For example: facebook"
                        value={utmParams.source}
                        onChange={handleUtmChange('source')}
                      />
                      <p id="utm_source_explain" className='text-[0.8rem] text-muted-foreground'>Identifies which site sent the traffic.</p>
                    </div>
                    <div className='space-y-2'>
                      <InputField
                        id="utm-medium"
                        label="Medium"
                        placeholder="For example: cpc"
                        value={utmParams.medium}
                        onChange={handleUtmChange('medium')}
                      />
                      <p id="utm_medium_explain" className='text-[0.8rem] text-muted-foreground'>Identifies what type of link was used, such as email or pay-per-click advertising.</p>
                    </div>
                    <div className='space-y-2'>
                      <InputField
                        id="utm-campaign"
                        label="Campaign"
                        placeholder="For example: spring_sale"
                        value={utmParams.campaign}
                        onChange={handleUtmChange('campaign')}
                      />
                      <p id="utm_campaign_explain" className='text-[0.8rem] text-muted-foreground'>Identifies a specific product promotion or strategic campaign.</p>
                    </div>
                    <div className='space-y-2'>
                      <InputField
                        id="utm-term"
                        label="Term"
                        placeholder="For example: running+shoes"
                        value={utmParams.term}
                        onChange={handleUtmChange('term')}
                      />
                      <p id="utm_term_explain" className='text-[0.8rem] text-muted-foreground'>Identifies search terms.</p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <InputField
                      id="utm-content"
                      label="Content"
                      placeholder="For example: logolink"
                      value={utmParams.content}
                      onChange={handleUtmChange('content')}
                    />
                    <p id="utm_content_explain" className='text-[0.8rem] text-muted-foreground'>Identifies what specifically was clicked, such as a banner ad or text link. Often used for A/B testing and content-targeted ads.</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* WiFi Section */}
        <div className="space-y-4" style={{ display: selectedOption === 'wifi' ? 'block' : 'none' }}>
          <InputField
            id="wifi-ssid"
            label="Network name (SSID)"
            placeholder="MyHomeWiFi"
            value={wifi.ssid}
            onChange={handleWifiChange('ssid')}
          />
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="wifi-encryption">Encryption</Label>
              <Select value={wifi.encryption} onValueChange={handleWifiChange('encryption')}>
                <SelectTrigger id="wifi-encryption">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="WPA">WPA / WPA2 / WPA3</SelectItem>
                  <SelectItem value="WEP">WEP</SelectItem>
                  <SelectItem value="nopass">No password</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {wifi.encryption !== 'nopass' && (
              <InputField
                id="wifi-password"
                label="Password"
                placeholder="Network password"
                type="text"
                value={wifi.password}
                onChange={handleWifiChange('password')}
              />
            )}
          </div>
          <div className="flex gap-2 items-center">
            <Switch
              id="wifi-hidden"
              checked={wifi.hidden}
              onCheckedChange={handleWifiChange('hidden')}
            />
            <Label htmlFor="wifi-hidden">Hidden network</Label>
          </div>
          <p className="text-[0.8rem] text-muted-foreground">
            Compatible with iOS, Android and most modern phones. Scan to join the WiFi network instantly without typing the password.
          </p>
        </div>

        {/* Contact Section */}
        <div className="space-y-4" style={{ display: selectedOption === 'contact' ? 'block' : 'none' }}>
          <div className="grid grid-cols-2 gap-4">
            <InputField id="prefix" label="Prefix" placeholder="Mr." value={contact.prefix} onChange={handleContactChange('prefix')} />
            <InputField id="first-name" label="First Name" placeholder="" value={contact.firstName} onChange={handleContactChange('firstName')} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <InputField id="last-name" label="Last Name" placeholder="" value={contact.lastName} onChange={handleContactChange('lastName')} />
            <InputField id="full-name" label="Full Name" placeholder="" value={contact.fullName} onChange={handleContactChange('fullName')} />
          </div>
          <InputField id="title" label="Title" placeholder="" value={contact.title} onChange={handleContactChange('title')} />
          <InputField id="organization" label="Organization" placeholder="" value={contact.organization} onChange={handleContactChange('organization')} />
          <div className="grid grid-cols-2 gap-4">
            <InputField id="tel-other" label="Telephone (Other)" placeholder="" type="tel" value={contact.telOther} onChange={handleContactChange('telOther')} />
            <InputField id="tel-mobile" label="Telephone (Mobile)" placeholder="" type="tel" value={contact.telMobile} onChange={handleContactChange('telMobile')} />
          </div>
          <InputField id="fax" label="Fax" placeholder="" type="tel" value={contact.fax} onChange={handleContactChange('fax')} />
          <InputField id="email" label="Email" placeholder="johndoe@example.com" type="email" value={contact.email} onChange={handleContactChange('email')} />
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              placeholder=""
              className="min-h-[100px]"
              value={contact.address}
              onChange={(e) => handleContactChange('address')(e.target.value)}
            />
          </div>
        </div>

        {/* Plain Text Section */}
        <div className="space-y-2" style={{ display: selectedOption === 'plaintext' ? 'block' : 'none' }}>
          <Label htmlFor="plaintext">Enter your text</Label>
          <Textarea
            id="plaintext"
            placeholder="Type your message here..."
            className="min-h-[150px]"
            value={plainText}
            onChange={(e) => setPlainText(e.target.value)}
          />
        </div>

        {/* SMS Section */}
        <div className="space-y-4" style={{ display: selectedOption === 'sms' ? 'block' : 'none' }}>
          <InputField id="sms-number" label="Recipient's Phone Number" placeholder="+1 555 123 4567" type="tel" value={sms.number} onChange={handleSmsChange('number')} />
          <div className="space-y-2">
            <Label htmlFor="sms-message">Message Content</Label>
            <Textarea
              id="sms-message"
              placeholder="Hello"
              className="min-h-[100px]"
              value={sms.message}
              onChange={(e) => handleSmsChange('message')(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sms-format">SMS Format</Label>
            <Input id="sms-format" value={sms.format} readOnly className="bg-muted" />
          </div>
        </div>

        {/* Email Section */}
        <div className="space-y-4" style={{ display: selectedOption === 'email' ? 'block' : 'none' }}>
          <InputField id="email-address" label="Recipient's Email Address" placeholder="john@example.com" type="email" value={email.address} onChange={handleEmailChange('address')} />
          <InputField id="email-subject" label="Email Subject" placeholder="Enter the subject of your email" value={email.subject} onChange={handleEmailChange('subject')} />
          <div className="space-y-2">
            <Label htmlFor="email-body">Email Body</Label>
            <Textarea
              id="email-body"
              placeholder="Compose your email message here..."
              className="min-h-[150px]"
              value={email.body}
              onChange={(e) => handleEmailChange('body')(e.target.value)}
            />
          </div>
        </div>

        {/* Phone Section */}
        <div style={{ display: selectedOption === 'phone' ? 'block' : 'none' }}>
          <InputField id="phone-number" label="Enter Phone Number" placeholder="+1 (555) 123-4567" type="tel" value={phoneNumber} onChange={setPhoneNumber} />
        </div>

        {/* Event Section */}
        <div className="space-y-4" style={{ display: selectedOption === 'event' ? 'block' : 'none' }}>
          <InputField id="event-title" label="Event title" placeholder="Birthday party" value={event.title} onChange={handleEventChange('title')} />
          <InputField id="event-location" label="Location" placeholder="123 Main St, Springfield" value={event.location} onChange={handleEventChange('location')} />
          <div className="space-y-2">
            <Label htmlFor="event-description">Description</Label>
            <Textarea
              id="event-description"
              placeholder="Bring snacks!"
              className="min-h-[80px]"
              value={event.description}
              onChange={(e) => handleEventChange('description')(e.target.value)}
            />
          </div>
          <div className="flex gap-2 items-center">
            <Switch
              id="event-allday"
              checked={event.allDay}
              onCheckedChange={(v) => {
                handleEventChange('allDay')(v)
                handleEventChange('start')('')
                handleEventChange('end')('')
              }}
            />
            <Label htmlFor="event-allday">All-day event</Label>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <InputField
              id="event-start"
              label="Start"
              placeholder=""
              type={event.allDay ? 'date' : 'datetime-local'}
              value={event.start}
              onChange={handleEventChange('start')}
            />
            <InputField
              id="event-end"
              label="End"
              placeholder=""
              type={event.allDay ? 'date' : 'datetime-local'}
              value={event.end}
              onChange={handleEventChange('end')}
            />
          </div>
          <p className="text-[0.8rem] text-muted-foreground">
            Generates a vEvent QR code. Scanning prompts the user to add the event to their calendar (iOS, Android and most calendar apps).
          </p>
        </div>

        {/* Geo / Location Section */}
        <div className="space-y-4" style={{ display: selectedOption === 'geo' ? 'block' : 'none' }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <InputField id="geo-street" label="Street &amp; number" placeholder="350 5th Ave" value={geo.street} onChange={handleGeoChange('street')} />
            <InputField id="geo-city" label="City" placeholder="New York" value={geo.city} onChange={handleGeoChange('city')} />
            <InputField id="geo-postal" label="Postal code" placeholder="10118" value={geo.postalCode} onChange={handleGeoChange('postalCode')} />
            <InputField id="geo-country" label="Country" placeholder="United States" value={geo.country} onChange={handleGeoChange('country')} />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-[0.8rem] text-muted-foreground">
              Tap or drag the pin on the map to drop the QR code on an exact location.
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={useMyLocation}
              disabled={geoStatus.kind === 'loading'}
            >
              {geoStatus.kind === 'loading' ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <LocateFixed className="h-4 w-4" />
              )}
              <span className="ml-2">Use my location</span>
            </Button>
          </div>

          <MapPicker
            lat={geo.latitude ? parseFloat(geo.latitude) : null}
            lng={geo.longitude ? parseFloat(geo.longitude) : null}
            onChange={(lat, lng) => {
              setGeo((prev) => ({ ...prev, latitude: lat.toFixed(6), longitude: lng.toFixed(6) }))
              setGeoStatus({ kind: 'idle' })
            }}
          />

          {geoStatus.kind === 'error' && (
            <p className="text-[0.8rem] text-destructive">{geoStatus.message}</p>
          )}

          <div className="space-y-2">
            <Label htmlFor="geo-mode">Open in</Label>
            <Select value={geo.mode} onValueChange={(v) => handleGeoChange('mode')(v as 'geo' | 'maps')}>
              <SelectTrigger id="geo-mode">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="maps">Google Maps (recommended — works on iOS &amp; Android)</SelectItem>
                <SelectItem value="geo">Native maps app (geo: URI — Android-first)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Accordion type="single" collapsible>
            <AccordionItem value="advanced-coords" className="border-b-0">
              <AccordionTrigger className="text-sm py-2">Coordinates {geo.latitude && geo.longitude ? `(${geo.latitude}, ${geo.longitude})` : ''}</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <InputField id="geo-lat" label="Latitude" placeholder="40.748817" value={geo.latitude} onChange={handleGeoChange('latitude')} />
                  <InputField id="geo-lng" label="Longitude" placeholder="-73.985428" value={geo.longitude} onChange={handleGeoChange('longitude')} />
                </div>
                <p className="text-[0.8rem] text-muted-foreground mt-2">
                  These update automatically when you click on the map or use the location button.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Bitcoin Section */}
        <div className="space-y-4" style={{ display: selectedOption === 'bitcoin' ? 'block' : 'none' }}>
          <InputField id="btc-address" label="Bitcoin address" placeholder="bc1q…" value={bitcoin.address} onChange={handleBitcoinChange('address')} />
          <div className="grid grid-cols-2 gap-4">
            <InputField id="btc-amount" label="Amount (BTC, optional)" placeholder="0.001" value={bitcoin.amount} onChange={handleBitcoinChange('amount')} />
            <InputField id="btc-label" label="Label (optional)" placeholder="Coffee shop" value={bitcoin.label} onChange={handleBitcoinChange('label')} />
          </div>
          <InputField id="btc-message" label="Message (optional)" placeholder="Order #1234" value={bitcoin.message} onChange={handleBitcoinChange('message')} />
          <p className="text-[0.8rem] text-muted-foreground">
            BIP-21 compatible. Most Bitcoin wallets recognize the format and pre-fill amount and recipient.
          </p>
        </div>
      </div>
    </div>
  )
}
