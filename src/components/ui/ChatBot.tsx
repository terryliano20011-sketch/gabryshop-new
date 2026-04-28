'use client'
import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Bot, Minimize2 } from 'lucide-react'

type Message = { role: 'user' | 'assistant'; text: string }

const QUICK_REPLIES = [
  'Che servizi offrite?',
  'Quanto costa un sito web?',
  'Tempi di consegna?',
  'Come funziona il pagamento?',
]

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [minimized, setMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: 'Ciao! 👋 Sono Gabry AI, il tuo assistente virtuale. Come posso aiutarti oggi?' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showBubble, setShowBubble] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Mostra bubble dopo 15 secondi
    const t = setTimeout(() => setShowBubble(true), 15000)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = async (text: string) => {
    if (!text.trim() || loading) return
    setInput('')
    setShowBubble(false)

    const userMsg: Message = { role: 'user', text }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.text }))
        })
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', text: data.message }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', text: 'Errore di connessione. Contattami su WhatsApp: +39 351 843 5322 🙏' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Bubble messaggio */}
      {showBubble && !open && (
        <div onClick={() => { setOpen(true); setShowBubble(false) }} style={{
          position:'fixed', bottom:'90px', right:'88px', zIndex:9998,
          background:'#0d0d18', border:'1px solid rgba(201,169,110,0.25)',
          borderRadius:'16px 16px 4px 16px', padding:'12px 16px',
          cursor:'pointer', maxWidth:'220px', boxShadow:'0 8px 32px rgba(0,0,0,0.4)',
          animation:'slideIn 0.4s cubic-bezier(0.16,1,0.3,1)'
        }}>
          <p style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'13px',color:'white',margin:0,lineHeight:1.5}}>
            👋 Hai domande sui nostri servizi? Sono qui!
          </p>
          <button onClick={e=>{e.stopPropagation();setShowBubble(false)}} style={{
            position:'absolute',top:'-8px',right:'-8px',width:'20px',height:'20px',
            borderRadius:'50%',background:'rgba(120,120,155,0.8)',border:'none',
            color:'white',fontSize:'10px',cursor:'pointer',display:'flex',
            alignItems:'center',justifyContent:'center'
          }}>×</button>
        </div>
      )}

      {/* Chat window */}
      {open && (
        <div style={{
          position:'fixed', bottom:'90px', right:'88px', zIndex:9999,
          width:'360px', maxWidth:'calc(100vw - 32px)',
          background:'#0d0d18', border:'1px solid rgba(201,169,110,0.15)',
          borderRadius:'20px', boxShadow:'0 24px 80px rgba(0,0,0,0.6)',
          display:'flex', flexDirection:'column',
          height: minimized ? 'auto' : '500px',
          animation:'slideUp 0.4s cubic-bezier(0.16,1,0.3,1)',
          overflow:'hidden'
        }}>

          {/* Header */}
          <div style={{
            padding:'16px 20px', background:'linear-gradient(135deg,#1a1a2e,#2d1b4e)',
            display:'flex', alignItems:'center', justifyContent:'space-between',
            flexShrink:0
          }}>
            <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
              <div style={{
                width:'36px',height:'36px',borderRadius:'50%',
                background:'linear-gradient(135deg,#c9a96e,#7c6af0)',
                display:'flex',alignItems:'center',justifyContent:'center',
                flexShrink:0
              }}>
                <Bot size={18} style={{color:'white'}}/>
              </div>
              <div>
                <div style={{fontFamily:'Outfit,system-ui,sans-serif',color:'white',fontSize:'14px',fontWeight:600}}>Gabry AI</div>
                <div style={{display:'flex',alignItems:'center',gap:'5px'}}>
                  <div style={{width:'6px',height:'6px',borderRadius:'50%',background:'#4ade80'}}/>
                  <span style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'11px',color:'rgba(160,160,200,0.7)'}}>Online ora</span>
                </div>
              </div>
            </div>
            <div style={{display:'flex',gap:'8px'}}>
              <button onClick={() => setMinimized(m => !m)} style={{
                background:'rgba(255,255,255,0.08)',border:'none',borderRadius:'8px',
                width:'28px',height:'28px',display:'flex',alignItems:'center',
                justifyContent:'center',cursor:'pointer',color:'rgba(200,200,220,0.7)'
              }}><Minimize2 size={13}/></button>
              <button onClick={() => setOpen(false)} style={{
                background:'rgba(255,255,255,0.08)',border:'none',borderRadius:'8px',
                width:'28px',height:'28px',display:'flex',alignItems:'center',
                justifyContent:'center',cursor:'pointer',color:'rgba(200,200,220,0.7)'
              }}><X size={13}/></button>
            </div>
          </div>

          {!minimized && (
            <>
              {/* Messages */}
              <div style={{flex:1,overflowY:'auto',padding:'16px',display:'flex',flexDirection:'column',gap:'10px'}}>
                {messages.map((msg, i) => (
                  <div key={i} style={{
                    display:'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                    gap:'8px', alignItems:'flex-end'
                  }}>
                    {msg.role === 'assistant' && (
                      <div style={{
                        width:'26px',height:'26px',borderRadius:'50%',flexShrink:0,
                        background:'linear-gradient(135deg,#c9a96e,#7c6af0)',
                        display:'flex',alignItems:'center',justifyContent:'center'
                      }}>
                        <Bot size={13} style={{color:'white'}}/>
                      </div>
                    )}
                    <div style={{
                      maxWidth:'75%', padding:'10px 14px', borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                      background: msg.role === 'user' ? 'linear-gradient(135deg,#c9a96e,#b8924a)' : 'rgba(255,255,255,0.06)',
                      border: msg.role === 'user' ? 'none' : '1px solid rgba(255,255,255,0.07)',
                      fontFamily:'Outfit,system-ui,sans-serif',
                      fontSize:'13px', lineHeight:1.6,
                      color: msg.role === 'user' ? '#08060a' : 'rgba(210,210,230,0.92)',
                    }}>
                      {msg.text}
                    </div>
                  </div>
                ))}

                {loading && (
                  <div style={{display:'flex',alignItems:'flex-end',gap:'8px'}}>
                    <div style={{width:'26px',height:'26px',borderRadius:'50%',background:'linear-gradient(135deg,#c9a96e,#7c6af0)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                      <Bot size={13} style={{color:'white'}}/>
                    </div>
                    <div style={{padding:'12px 16px',background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'16px 16px 16px 4px',display:'flex',gap:'4px',alignItems:'center'}}>
                      {[0,1,2].map(j => (
                        <div key={j} style={{width:'5px',height:'5px',borderRadius:'50%',background:'rgba(201,169,110,0.6)',animation:`bounce 1s ease-in-out ${j*0.15}s infinite`}}/>
                      ))}
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef}/>
              </div>

              {/* Quick replies */}
              {messages.length <= 1 && (
                <div style={{padding:'0 16px 12px',display:'flex',flexWrap:'wrap',gap:'6px'}}>
                  {QUICK_REPLIES.map(q => (
                    <button key={q} onClick={() => send(q)} style={{
                      padding:'6px 12px',background:'rgba(201,169,110,0.08)',
                      border:'1px solid rgba(201,169,110,0.2)',borderRadius:'100px',
                      fontFamily:'Outfit,system-ui,sans-serif',fontSize:'11px',
                      color:'#c9a96e',cursor:'pointer',fontWeight:500,
                      transition:'all 0.2s',whiteSpace:'nowrap'
                    }}>{q}</button>
                  ))}
                </div>
              )}

              {/* Input */}
              <div style={{
                padding:'12px 16px',borderTop:'1px solid rgba(255,255,255,0.05)',
                display:'flex',gap:'8px',alignItems:'center',flexShrink:0
              }}>
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && send(input)}
                  placeholder="Scrivi un messaggio..."
                  disabled={loading}
                  style={{
                    flex:1, padding:'10px 14px',
                    background:'rgba(255,255,255,0.04)',
                    border:'1px solid rgba(255,255,255,0.08)',
                    borderRadius:'100px', color:'white',
                    fontFamily:'Outfit,system-ui,sans-serif',
                    fontSize:'13px', outline:'none',
                  }}
                />
                <button onClick={() => send(input)} disabled={!input.trim() || loading} style={{
                  width:'38px',height:'38px',borderRadius:'50%',
                  background: input.trim() ? 'linear-gradient(135deg,#c9a96e,#b8924a)' : 'rgba(255,255,255,0.05)',
                  border:'none',cursor: input.trim() ? 'pointer' : 'default',
                  display:'flex',alignItems:'center',justifyContent:'center',
                  flexShrink:0,transition:'all 0.2s'
                }}>
                  <Send size={15} style={{color: input.trim() ? '#08060a' : 'rgba(120,120,155,0.4)'}}/>
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Toggle button */}
      <button onClick={() => { setOpen(o => !o); setShowBubble(false) }} style={{
        position:'fixed', bottom:'24px', right:'88px', zIndex:9997,
        width:'52px', height:'52px', borderRadius:'50%',
        background: open ? 'rgba(120,120,155,0.3)' : 'linear-gradient(135deg,#7c6af0,#c9a96e)',
        border:'none', cursor:'pointer',
        display:'flex', alignItems:'center', justifyContent:'center',
        boxShadow:'0 4px 20px rgba(124,106,240,0.4)',
        transition:'all 0.3s cubic-bezier(0.16,1,0.3,1)',
      }}>
        {open ? <X size={20} style={{color:'white'}}/> : <MessageCircle size={22} style={{color:'white'}}/>}
      </button>

      <style>{`
        @keyframes slideUp { from{transform:translateY(20px);opacity:0} to{transform:translateY(0);opacity:1} }
        @keyframes slideIn { from{transform:translateX(20px);opacity:0} to{transform:translateX(0);opacity:1} }
        @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
      `}</style>
    </>
  )
}
