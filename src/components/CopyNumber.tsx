'use client'

import { useState, useCallback } from 'react'

interface CopyNumberProps {
  value: string
  className?: string
}

/**
 * Renders a number that copies itself to clipboard on click.
 * Shows "Скопировано ✓" feedback for 1.8s after copying.
 */
export default function CopyNumber({ value, className = '' }: CopyNumberProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(value)
      } else {
        // Fallback for old browsers / restricted contexts
        const el = document.createElement('textarea')
        el.value = value
        el.style.position = 'fixed'
        el.style.opacity = '0'
        document.body.appendChild(el)
        el.select()
        document.execCommand('copy')
        document.body.removeChild(el)
      }
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // Silent fail — number is still readable on screen
    }
  }, [value])

  return (
    <button
      type="button"
      onClick={(e) => handleCopy(e)}
      title={copied ? 'Скопировано!' : 'Скопировать номер'}
      aria-label={copied ? 'Скопировано!' : `Скопировать номер ${value}`}
      className={`cursor-pointer select-text text-left transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3E5854] ${className}`}
    >
      {copied ? (
        <span className="text-[#3E5854]">Скопировано ✓</span>
      ) : (
        value
      )}
    </button>
  )
}
