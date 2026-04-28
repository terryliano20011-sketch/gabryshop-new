'use client'
import { MessageCircle } from 'lucide-react'

export default function WhatsAppButton() {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '393518435322'
  const message = encodeURIComponent('Ciao! Vorrei maggiori informazioni sui vostri servizi digitali.')
  const url = `https://wa.me/${number}?text=${message}`

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position:'fixed', bottom:'24px', right:'24px', zIndex:9990,
        width:'52px', height:'52px', borderRadius:'50%',
        background:'#25D366', display:'flex', alignItems:'center',
        justifyContent:'center', boxShadow:'0 4px 20px rgba(37,211,102,0.4)',
        transition:'transform 0.3s ease', textDecoration:'none'
      }}
      aria-label="Contattaci su WhatsApp"
    >
      <MessageCircle style={{width:'26px', height:'26px', color:'white'}}/>
    </a>
  )
}
