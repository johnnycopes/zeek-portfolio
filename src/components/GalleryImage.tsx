import Image from 'next/image'
import type { WorkItem } from '@/lib/queries'
import { urlFor } from '@/lib/image'
import styles from './GalleryImage.module.css'

interface GalleryImageProps {
  item: WorkItem
  onClick: () => void
}

export default function GalleryImage({ item, onClick }: GalleryImageProps) {
  const src = urlFor(item.image).width(800).height(600).fit('crop').url()

  return (
    <button className={styles.cell} onClick={onClick} aria-label={`View ${item.title}`}>
      <div className={styles.imageWrap}>
        <Image
          src={src}
          alt={item.title ?? 'Portfolio work by Zachary Kiernan'}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
          className={styles.image}
          placeholder={item.image.lqip ? 'blur' : 'empty'}
          blurDataURL={item.image.lqip}
        />
      </div>
    </button>
  )
}
