import { client } from '@/lib/sanity'
import { workItemsQuery, type WorkItem } from '@/lib/queries'
import ImageGallery from '@/components/ImageGallery'
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
<ImageGallery images={images} />
    </main>
  )
}
