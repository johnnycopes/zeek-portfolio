'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Navigation.module.css'

interface NavigationProps {
  instagramUrl?: string
  logoUrl?: string
}

export default function Navigation({ instagramUrl, logoUrl }: NavigationProps) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    const val = menuOpen ? 'hidden' : ''
    document.body.style.overflow = val
    document.documentElement.style.overflow = val
    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} aria-label="Zachary Kiernan — Home">
          {logoUrl && (
            <Image
              src={logoUrl}
              alt="Zachary Kiernan"
              fill
              sizes="250px"
            />
          )}
        </Link>

        <nav className={styles.nav}>
          <Link href="/work" className={pathname === '/work' ? styles.active : undefined}>
            Work
          </Link>
          <Link href="/about" className={pathname === '/about' ? styles.active : undefined}>
            About
          </Link>
          {instagramUrl && (
            <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          )}
          <Link
            href="/contact"
            className={pathname === '/contact' ? styles.active : undefined}
          >
            Contact
          </Link>
        </nav>

        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen : ''}`} />
        </button>
      </div>

      <div className={`${styles.overlay} ${menuOpen ? styles.overlayOpen : ''}`}>
        <nav className={styles.overlayNav}>
          <Link href="/work">Work</Link>
          <Link href="/about">About</Link>
          {instagramUrl && (
            <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          )}
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  )
}
