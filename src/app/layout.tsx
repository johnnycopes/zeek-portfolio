import type { Metadata } from 'next'
import { DM_Serif_Display, DM_Sans } from 'next/font/google'
import { client } from '@/lib/sanity'
import { siteSettingsQuery, type SiteSettings } from '@/lib/queries'
import Navigation from '@/components/Navigation'
import './globals.css'

const dmSerifDisplay = DM_Serif_Display({
  variable: '--font-dm-serif-display',
  subsets: ['latin'],
  weight: '400',
})

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['400', '500'],
})

export const metadata: Metadata = {
  title: 'Zachary Kiernan — Graphic Designer',
  description:
    'Freelance graphic designer specializing in illustration, lettering, and branding.',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const settings: SiteSettings | null = await client
    .fetch(siteSettingsQuery)
    .catch(() => null)

  const instagramUrl = settings?.socialLinks?.find(
    (l) => l.platform === 'instagram'
  )?.url

  return (
    <html
      lang="en"
      className={`${dmSerifDisplay.variable} ${dmSans.variable}`}
    >
      <body>
        <Navigation instagramUrl={instagramUrl} />
        {children}
      </body>
    </html>
  )
}
