'use client'

import { useState, useCallback } from 'react'
import type { WorkItem } from '@/lib/queries'
import GalleryImage from './GalleryImage'
import Lightbox from './Lightbox'
import styles from './ImageGallery.module.css'

interface ImageGalleryProps {
  images: WorkItem[]
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const open = useCallback((index: number) => setActiveIndex(index), [])
  const close = useCallback(() => setActiveIndex(null), [])
  const prev = useCallback(
    () => setActiveIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length)),
    [images.length]
  )
  const next = useCallback(
    () => setActiveIndex((i) => (i === null ? null : (i + 1) % images.length)),
    [images.length]
  )

  if (images.length === 0) {
    return <p className={styles.empty}>No work items yet.</p>
  }

  return (
    <>
      <ul className={styles.grid} role="list">
        {images.map((item, index) => (
          <li key={item._id}>
            <GalleryImage item={item} onClick={() => open(index)} />
          </li>
        ))}
      </ul>

      {activeIndex !== null && (
        <Lightbox
          images={images}
          currentIndex={activeIndex}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </>
  )
}
