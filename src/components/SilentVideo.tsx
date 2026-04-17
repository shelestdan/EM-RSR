'use client'

import { useEffect, useRef } from 'react'

interface Props {
  src: string
  className?: string
  style?: React.CSSProperties
  /** objectPosition equivalent: x offset 0–1 (default 0.5 = center) */
  xOffset?: number
}

/**
 * Renders video frames to <canvas> instead of <video>.
 * Browser video overlay UI (Yandex assistant, Chrome PiP, etc.)
 * does NOT appear on canvas elements — only on <video> elements.
 * The actual <video> is hidden off-screen at -9999px.
 */
export default function SilentVideo({ src, className = '', style, xOffset = 0.5 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Create hidden video off-screen — no browser ever shows UI on it
    const video = document.createElement('video')
    video.src = src
    video.autoplay = true
    video.muted = true
    video.loop = true
    video.playsInline = true
    video.setAttribute('playsinline', '')
    video.style.cssText = 'position:fixed;left:-9999px;top:-9999px;width:1px;height:1px;opacity:0;pointer-events:none;'
    document.body.appendChild(video)

    const ctx = canvas.getContext('2d')
    let raf: number
    let alive = true

    function resize() {
      if (!canvas) return
      const dpr = window.devicePixelRatio || 1
      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr
    }

    function draw() {
      if (!alive || !ctx || !canvas) return

      if (video.readyState >= 2) {
        const cw = canvas.width
        const ch = canvas.height
        const vw = video.videoWidth
        const vh = video.videoHeight

        if (vw && vh) {
          // object-cover: scale to fill, then crop with xOffset
          const scale = Math.max(cw / vw, ch / vh)
          const sw = vw * scale
          const sh = vh * scale

          // xOffset 0 = left edge, 1 = right edge
          const dx = -(sw - cw) * xOffset
          const dy = -(sh - ch) * 0.5 // always center vertically

          ctx.clearRect(0, 0, cw, ch)
          ctx.drawImage(video, dx, dy, sw, sh)
        }
      }

      raf = requestAnimationFrame(draw)
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    video.play().then(draw).catch(() => {
      // autoplay blocked — draw first frame on user interaction
      document.addEventListener('pointerdown', () => video.play().then(draw), { once: true })
    })

    return () => {
      alive = false
      cancelAnimationFrame(raf)
      ro.disconnect()
      video.pause()
      document.body.removeChild(video)
    }
  }, [src, xOffset])

  return <canvas ref={canvasRef} className={className} style={style} />
}
