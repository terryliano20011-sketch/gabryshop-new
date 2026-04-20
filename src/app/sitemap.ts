import { MetadataRoute } from 'next'
import { PRODUCTS, CATEGORIES } from '@/lib/data'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://gabryshop-digitale.vercel.app'
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/chi-siamo`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/contatti`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/termini`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ]

  const categoryPages: MetadataRoute.Sitemap = CATEGORIES.map(cat => ({
    url: `${base}/categoria/${cat.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  const productPages: MetadataRoute.Sitemap = PRODUCTS.map(p => ({
    url: `${base}/prodotto/${p.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...categoryPages, ...productPages]
}
