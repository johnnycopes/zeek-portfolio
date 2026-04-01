import { client } from '@/lib/sanity'
import { workItemsQuery, type WorkItem } from '@/lib/queries'
import ImageGallery from '@/components/ImageGallery'
import { CustomCursor } from '@/components/CustomCursor'
import styles from './page.module.css'

export const metadata = {
  title: 'Work — Zachary Kiernan',
}

export default async function WorkPage() {
  const images: WorkItem[] = await client
    .fetch(workItemsQuery)
    .catch(() => [])

  return (
    <main className={styles.main}>
      <CustomCursor variant="eye" />
      <div className={styles.inner}>
        <h1 className={styles.heading}>Work</h1>
        <ImageGallery images={images} />
      </div>
    </main>
  )
}
