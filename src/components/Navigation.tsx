'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Navigation.module.css'

export default function Navigation() {
  const pathname = usePathname()
  const isHomepage = pathname === '/'
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const solid = !isHomepage || scrolled

  return (
    <header
      className={`${styles.header} ${solid ? styles.solid : styles.transparent}`}
    >
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          Z. Kiernan
        </Link>

        <nav className={styles.nav}>
          <Link href="/work" className={pathname === '/work' ? styles.active : ''}>
            Work
          </Link>
          <Link href="/about" className={pathname === '/about' ? styles.active : ''}>
            About
          </Link>
          <Link
            href="/contact"
            className={pathname === '/contact' ? styles.active : ''}
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

      {menuOpen && (
        <div className={styles.overlay}>
          <nav className={styles.overlayNav}>
            <Link href="/work">Work</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
      )}
    </header>
  )
}
