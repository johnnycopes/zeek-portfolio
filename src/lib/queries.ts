export interface SanityImageData {
  asset: { _ref: string; url?: string }
  hotspot?: { x: number; y: number; width: number; height: number }
  crop?: { top: number; bottom: number; left: number; right: number }
  lqip?: string
}

export interface WorkItem {
  _id: string
  title: string
  client?: string
  tags?: string[]
  image: SanityImageData
}

export interface Service {
  _id: string
  title: string
  description: string
  order: number
}

export interface SiteSettings {
  heroImage?: SanityImageData
  tagline?: string
  socialLinks?: Array<{ platform: string; url: string }>
  copyright?: string
}

export interface AboutContent {
  headshot?: SanityImageData
  bio?: unknown[] // PortableText blocks
  clients?: string[]
}

export const workItemsQuery = `
  *[_type == "workItem"] | order(order asc) {
    _id,
    title,
    client,
    tags,
    "image": image {
      asset->,
      hotspot,
      crop,
      "lqip": asset->metadata.lqip
    }
  }
`

export const homepageQuery = `
  {
    "settings": *[_type == "siteSettings"][0] {
      heroImage {
        asset->,
        hotspot,
        crop,
        "lqip": asset->metadata.lqip
      },
      tagline
    },
    "recentWork": *[_type == "workItem"] | order(order asc)[0...4] {
      _id,
      title,
      client,
      "image": image {
        asset->,
        hotspot,
        crop,
        "lqip": asset->metadata.lqip
      }
    }
  }
`

export const aboutQuery = `
  {
    "about": *[_type == "about"][0] {
      headshot {
        asset->,
        hotspot,
        crop,
        "lqip": asset->metadata.lqip
      },
      bio,
      clients
    },
    "services": *[_type == "service"] | order(order asc) {
      _id,
      title,
      description,
      order
    }
  }
`

export const siteSettingsQuery = `
  *[_type == "siteSettings"][0] {
    socialLinks[] {
      platform,
      url
    },
    copyright
  }
`
