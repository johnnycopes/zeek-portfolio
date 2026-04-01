import Link from 'next/link'
import styles from './not-found.module.css'

export default function NotFound() {
  return (
    <main className={styles.main}>
      <div className={styles.inner}>
        <p className={styles.code}>404</p>
        <h1 className={styles.heading}>This page wandered off.</h1>
        <p className={styles.body}>
          Looks like this page got lost in the sketchbook. Let&apos;s get you
          back on track.
        </p>
        <Link href="/" className={styles.link}>
          ← Back to home
        </Link>
      </div>
    </main>
  )
}
