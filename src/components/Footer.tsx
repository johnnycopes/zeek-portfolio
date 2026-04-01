import type { SiteSettings } from '@/lib/queries'
import styles from './Footer.module.css'

interface FooterProps {
  settings: SiteSettings | null
}

export default function Footer({ settings }: FooterProps) {
  const year = new Date().getFullYear()
  const copyright = settings?.copyright ?? `© ${year} Zachary Kiernan`
  const socialLinks = settings?.socialLinks ?? []

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.copyright}>{copyright}</p>
        {socialLinks.length > 0 && (
          <nav className={styles.social} aria-label="Social links">
            {socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.platform}
              >
                {link.platform}
              </a>
            ))}
          </nav>
        )}
      </div>
    </footer>
  )
}
