'use client'
import { ShoppingCart, Check } from 'lucide-react'
import { useCart } from '@/hooks/useCart'
import { Product } from '@/types'
import { useRouter } from 'next/navigation'

export default function AddToCartButton({ product, briefing }: { product: Product; briefing?: Record<string, string> }) {
  const { addItem, items } = useCart()
  const router = useRouter()
  const inCart = items.some(i => i.product.id === product.id)

  const handleClick = () => {
    if (inCart) { router.push('/checkout'); return }
    addItem(product, briefing)
  }

  return (
    <button onClick={handleClick} className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${inCart ? 'bg-[#22c55e]/15 text-[#22c55e] border border-[#22c55e]/30 hover:bg-[#22c55e]/20' : 'btn-gold'}`}>
      {inCart ? <><Check className="w-5 h-5" /> Vai al checkout</> : <><ShoppingCart className="w-5 h-5" /> Aggiungi al carrello</>}
    </button>
  )
}
