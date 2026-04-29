'use client'

import { useEffect, useRef, useState } from 'react'

interface Props {
  src: string
  fallbackSrc?: string
  className?: string
  style?: React.CSSProperties
  /** objectPosition equivalent: x offset 0–1 (default 0.5 = center) */
  xOffset?: number
  playbackRate?: number
  fit?: 'cover' | 'contain'
}

/**
 * Renders video frames to <canvas> instead of <video>.
 * Browser video overlay UI (Yandex assistant, Chrome PiP, etc.)
 * does NOT appear on canvas elements — only on <video> elements.
 * The actual <video> is hidden off-screen at -9999px.
 */
export default function SilentVideo({
  src,
  fallbackSrc,
  className = '',
  style,
  xOffset = 0.5,
  playbackRate = 1,
  fit = 'cover',
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [videoReady, setVideoReady] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Create hidden video off-screen — no browser ever shows UI on it
    const video = document.createElement('video')
    video.src = src
    video.autoplay = true
    video.muted = true
    video.loop = true
    video.preload = 'auto'
    video.playbackRate = playbackRate
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
          const scaleBase = fit === 'contain' ? Math.min(cw / vw, ch / vh) : Math.max(cw / vw, ch / vh)
          const scale = scaleBase
          const sw = vw * scale
          const sh = vh * scale

          const dx =
            fit === 'contain'
              ? (cw - sw) * xOffset
              : -(sw - cw) * xOffset
          const dy =
            fit === 'contain'
              ? (ch - sh) * 0.5
              : -(sh - ch) * 0.5
          setVideoReady(true)

          ctx.clearRect(0, 0, cw, ch)
          ctx.drawImage(video, dx, dy, sw, sh)
        }
      }

      raf = requestAnimationFrame(draw)
    }

    function drawFirstFrame() {
      if (!alive || !ctx || !canvas) return
      const cw = canvas.width
      const ch = canvas.height
      const vw = video.videoWidth
      const vh = video.videoHeight
      if (!cw || !ch || !vw || !vh) return

      const scaleBase = fit === 'contain' ? Math.min(cw / vw, ch / vh) : Math.max(cw / vw, ch / vh)
      const scale = scaleBase
      const sw = vw * scale
      const sh = vh * scale
      const dx =
        fit === 'contain'
          ? (cw - sw) * xOffset
          : -(sw - cw) * xOffset
      const dy =
        fit === 'contain'
          ? (ch - sh) * 0.5
          : -(sh - ch) * 0.5

      setVideoReady(true)

      ctx.clearRect(0, 0, cw, ch)
      ctx.drawImage(video, dx, dy, sw, sh)
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    video.addEventListener('loadeddata', drawFirstFrame)
    const onError = () => setVideoReady(false)
    video.addEventListener('error', onError)
    video.load()

    video.play().then(draw).catch(() => {
      // autoplay blocked — draw first frame on user interaction
      document.addEventListener('pointerdown', () => video.play().then(draw).catch(() => drawFirstFrame()), { once: true })
    })

    return () => {
      alive = false
      cancelAnimationFrame(raf)
      ro.disconnect()
      video.removeEventListener('loadeddata', drawFirstFrame)
      video.removeEventListener('error', onError)
      video.pause()
      document.body.removeChild(video)
    }
  }, [fit, playbackRate, src, xOffset])

  return (
    <>
      {fallbackSrc && !videoReady ? (
        <img
          src={fallbackSrc}
          alt=""
          aria-hidden="true"
          className={className}
          style={{
            ...style,
            objectFit: fit,
            objectPosition: fit === 'contain' ? '50% 50%' : `${xOffset * 100}% 50%`,
          }}
        />
      ) : null}
      <canvas ref={canvasRef} className={className} style={{ ...style, opacity: videoReady ? 1 : 0 }} />
    </>
  )
}
