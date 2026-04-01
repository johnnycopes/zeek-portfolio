'use client'

import { useEffect, useRef } from 'react'
import styles from './CustomCursor.module.css'

interface CustomCursorProps {
  variant: 'eye' | 'pencil'
}

export function CustomCursor({ variant }: CustomCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = cursorRef.current
    if (!el) return

    const move = (e: MouseEvent) => {
      el.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
    }

    document.addEventListener('mousemove', move)
    return () => document.removeEventListener('mousemove', move)
  }, [])

  return (
    <div
      ref={cursorRef}
      className={`${styles.cursor} ${styles[variant]}`}
      aria-hidden="true"
    >
      {variant === 'eye' ? '◎' : '✏'}
    </div>
  )
}
