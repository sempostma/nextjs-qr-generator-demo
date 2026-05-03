'use client'

import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import { useEffect, useMemo } from 'react'
import 'leaflet/dist/leaflet.css'

interface MapPickerProps {
  lat: number | null
  lng: number | null
  onChange: (lat: number, lng: number) => void
  height?: number
}

// Inline pin so we don't ship leaflet's default icon assets — they 404 in
// most bundlers without copying images into /public.
const pinIcon = L.divIcon({
  className: 'qr-map-pin',
  html: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="40" viewBox="0 0 32 40">
    <path d="M16 0C7.2 0 0 7 0 15.6c0 11 16 24.4 16 24.4s16-13.4 16-24.4C32 7 24.8 0 16 0z" fill="#0a0a0a"/>
    <circle cx="16" cy="15.6" r="6" fill="#fff"/>
  </svg>`,
  iconSize: [32, 40],
  iconAnchor: [16, 40],
})

function ClickHandler({ onChange }: { onChange: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onChange(e.latlng.lat, e.latlng.lng)
    },
  })
  return null
}

function Recenter({ lat, lng }: { lat: number | null; lng: number | null }) {
  const map = useMap()
  useEffect(() => {
    if (lat != null && lng != null) {
      map.flyTo([lat, lng], Math.max(map.getZoom(), 13), { duration: 0.6 })
    }
  }, [lat, lng, map])
  return null
}

export default function MapPicker({ lat, lng, onChange, height = 280 }: MapPickerProps) {
  const center = useMemo<[number, number]>(
    () => (lat != null && lng != null ? [lat, lng] : [40.7128, -74.006]),
    [lat, lng]
  )

  return (
    <div className="rounded-md overflow-hidden border" style={{ height }}>
      <MapContainer
        center={center}
        zoom={lat != null && lng != null ? 15 : 3}
        scrollWheelZoom
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ClickHandler onChange={onChange} />
        <Recenter lat={lat} lng={lng} />
        {lat != null && lng != null && (
          <Marker
            position={[lat, lng]}
            icon={pinIcon}
            draggable
            eventHandlers={{
              dragend(e) {
                const m = e.target as L.Marker
                const p = m.getLatLng()
                onChange(p.lat, p.lng)
              },
            }}
          />
        )}
      </MapContainer>
    </div>
  )
}
