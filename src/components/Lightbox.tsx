'use client'

import { useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import type { WorkItem } from '@/lib/queries'
import { urlFor } from '@/lib/image'
import styles from './Lightbox.module.css'

interface LightboxProps {
  images: WorkItem[]
  currentIndex: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export default function Lightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const current = images[currentIndex]

  // Preload adjacent images
  useEffect(() => {
    const preload = (idx: number) => {
      if (idx < 0 || idx >= images.length) return
      const img = new window.Image()
      img.src = urlFor(images[idx].image).width(1600).height(1200).fit('max').url()
    }
    preload(currentIndex - 1)
    preload(currentIndex + 1)
  }, [currentIndex, images])

  // Focus the close button on open
  useEffect(() => {
    closeButtonRef.current?.focus()
  }, [])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    },
    [onClose, onPrev, onNext]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  const src = urlFor(current.image).width(1600).height(1200).fit('max').url()
  const total = images.length

  return createPortal(
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={`Image ${currentIndex + 1} of ${total}`}
      onClick={onClose}
    >
      <button
        ref={closeButtonRef}
        className={styles.close}
        onClick={onClose}
        aria-label="Close lightbox"
      >
        ×
      </button>

      <button
        className={`${styles.arrow} ${styles.arrowLeft}`}
        onClick={(e) => { e.stopPropagation(); onPrev() }}
        aria-label="Previous image"
      >
        ‹
      </button>

      <div className={styles.imageWrap} onClick={(e) => e.stopPropagation()}>
        <Image
          key={current._id}
          src={src}
          alt={current.title ?? 'Portfolio work by Zachary Kiernan'}
          width={1600}
          height={1200}
          className={styles.image}
          placeholder={current.image.lqip ? 'blur' : 'empty'}
          blurDataURL={current.image.lqip}
          priority
        />
      </div>

      <button
        className={`${styles.arrow} ${styles.arrowRight}`}
        onClick={(e) => { e.stopPropagation(); onNext() }}
        aria-label="Next image"
      >
        ›
      </button>

      <div
        className={styles.caption}
        aria-live="polite"
        onClick={(e) => e.stopPropagation()}
      >
        <span className={styles.counter}>
          {currentIndex + 1} / {total}
        </span>
      </div>
    </div>,
    document.body
  )
}
