import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/lib/sanity'
import { homepageQuery, type SiteSettings, type WorkItem } from '@/lib/queries'
import { urlFor } from '@/lib/image'
import styles from './page.module.css'

interface HomepageData {
  settings: SiteSettings | null
  recentWork: WorkItem[]
}

export default async function HomePage() {
  const data: HomepageData = await client
    .fetch(homepageQuery)
    .catch(() => ({ settings: null, recentWork: [] }))

  const { settings, recentWork } = data
  const heroSrc = settings?.heroImage
    ? urlFor(settings.heroImage).width(1600).height(900).fit('crop').url()
    : null

  return (
    <main>
      {/* Hero */}
      <section className={styles.hero}>
        {heroSrc && (
          <Image
            src={heroSrc}
            alt="Hero background"
            fill
            priority
            className={styles.heroBg}
            placeholder={settings?.heroImage?.lqip ? 'blur' : 'empty'}
            blurDataURL={settings?.heroImage?.lqip}
          />
        )}
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Z. Kiernan</h1>
          {settings?.tagline && (
            <p className={styles.heroTagline}>{settings.tagline}</p>
          )}
          <Link href="/work" className={styles.heroCta}>
            View Work
          </Link>
        </div>
      </section>

      {/* Recent work preview */}
      {recentWork.length > 0 && (
        <section className={styles.preview}>
          <div className={styles.previewInner}>
            <ul className={styles.previewGrid} role="list">
              {recentWork.map((item) => {
                const src = urlFor(item.image).width(600).height(450).fit('crop').url()
                return (
                  <li key={item._id}>
                    <Link href="/work" className={styles.previewItem}>
                      <div className={styles.previewImageWrap}>
                        <Image
                          src={src}
                          alt={item.title ?? 'Portfolio work by Zachary Kiernan'}
                          fill
                          sizes="(max-width: 768px) 100vw, 25vw"
                          className={styles.previewImage}
                          placeholder={item.image.lqip ? 'blur' : 'empty'}
                          blurDataURL={item.image.lqip}
                        />
                      </div>
                    </Link>
                  </li>
                )
              })}
            </ul>
            <Link href="/work" className={styles.viewAll}>
              View all work →
            </Link>
          </div>
        </section>
      )}
    </main>
  )
}
