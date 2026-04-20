import { Metadata } from 'next'
import { PRODUCTS, CATEGORIES } from '@/lib/data'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const product = PRODUCTS.find(p => p.slug === slug)
  if (!product) return {}
  const category = CATEGORIES.find(c => c.id === product.category_id)
  const url = `https://gabryshop-digitale.vercel.app/prodotto/${slug}`
  const title = `${product.name} — ${category?.name || 'Servizi Digitali'} | GabryShop`
  const description = `${product.description} Consegna in ${product.delivery_time}. €${product.price}${product.original_price ? ` (scontato da €${product.original_price})` : ''}. ${product.includes?.slice(0,2).join(', ')}.`
  const image = product.images?.[0] || '/og-image.png'

  return {
    title,
    description,
    keywords: [
      product.name.toLowerCase(),
      category?.name.toLowerCase() || '',
      'servizi digitali', 'gabryshop',
      `${product.name.toLowerCase()} prezzo`,
      `acquistare ${product.name.toLowerCase()}`,
    ].filter(Boolean),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      images: [{
        url: image,
        width: 1200, height: 630,
        alt: product.name,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    other: {
      'product:price:amount': String(product.price),
      'product:price:currency': 'EUR',
    },
  }
}
