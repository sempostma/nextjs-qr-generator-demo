'use client'

import { useEffect, useRef } from 'react'

interface AdSlotProps {
  slot: string
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical'
  layout?: string
  responsive?: boolean
  className?: string
  style?: React.CSSProperties
  label?: boolean
}

declare global {
  interface Window {
    adsbygoogle?: unknown[]
  }
}

const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT

export default function AdSlot({
  slot,
  format = 'auto',
  layout,
  responsive = true,
  className,
  style,
  label = true,
}: AdSlotProps) {
  const insRef = useRef<HTMLModElement | null>(null)
  const pushedRef = useRef(false)

  useEffect(() => {
    if (!ADSENSE_CLIENT) return
    if (pushedRef.current) return
    if (!insRef.current) return
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      pushedRef.current = true
    } catch {
      // ignore - ad blockers, etc.
    }
  }, [])

  if (!ADSENSE_CLIENT) {
    if (process.env.NODE_ENV !== 'production') {
      return (
        <div
          className={`w-full text-xs text-muted-foreground border border-dashed rounded-md p-3 text-center ${className ?? ''}`}
          style={style}
          aria-hidden
        >
          Ad slot · {slot} (set NEXT_PUBLIC_ADSENSE_CLIENT to activate)
        </div>
      )
    }
    return null
  }

  return (
    <div className={className} style={style}>
      {label && (
        <p className="text-[0.7rem] uppercase tracking-wide text-muted-foreground text-center mb-1">
          Advertisement
        </p>
      )}
      <ins
        ref={insRef}
        className="adsbygoogle block"
        style={{ display: 'block', ...style }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-ad-layout={layout}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  )
}
