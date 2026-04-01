import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { client } from '@/lib/sanity'
import { aboutQuery, type Service, type AboutContent } from '@/lib/queries'
import { urlFor } from '@/lib/image'
import { ServiceCard } from '@/components/ServiceCard'
import styles from './page.module.css'

export const metadata = {
  title: 'About — Zachary Kiernan',
}

interface AboutData {
  about: AboutContent | null
  services: Service[]
}

export default async function AboutPage() {
  const data: AboutData = await client
    .fetch(aboutQuery)
    .catch(() => ({ about: null, services: [] }))

  const { about, services } = data
  const headshotSrc = about?.headshot
    ? urlFor(about.headshot).width(800).height(1000).fit('crop').url()
    : null

  return (
    <main className={styles.main}>
      <div className={styles.inner}>
        {/* Bio section */}
        <section className={styles.bio}>
          {headshotSrc && (
            <div className={styles.headshotWrap}>
              <Image
                src={headshotSrc}
                alt="Zachary Kiernan"
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className={styles.headshot}
                placeholder={about?.headshot?.lqip ? 'blur' : 'empty'}
                blurDataURL={about?.headshot?.lqip}
              />
            </div>
          )}
          <div className={styles.bioText}>
            <h1>About</h1>
            {about?.bio ? (
              <div className={styles.bodyText}>
                <PortableText value={about.bio as Parameters<typeof PortableText>[0]['value']} />
              </div>
            ) : (
              <p className={styles.placeholder}>Bio coming soon.</p>
            )}
          </div>
        </section>

        {/* Services */}
        {services.length > 0 && (
          <section className={styles.services}>
            <h2>Services</h2>
            <ul className={styles.servicesGrid} role="list">
              {services.map((service) => (
                <li key={service._id}>
                  <ServiceCard service={service} />
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Client list */}
        {about?.clients && about.clients.length > 0 && (
          <section className={styles.clients}>
            <h2>Clients</h2>
            <p className={styles.clientList}>{about.clients.join(', ')}</p>
          </section>
        )}
      </div>
    </main>
  )
}
