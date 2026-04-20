import * as React from 'react'

interface OrderItem {
  product_name: string
  price: number
  quantity: number
  briefing?: any
}

interface Props {
  customerName: string
  customerEmail: string
  orderId: string
  items: OrderItem[]
  total: number
  status: string
}

export function OrderConfirmationEmail({ customerName, orderId, items, total }: Props) {
  return (
    <html>
      <head>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
      </head>
      <body style={{margin:0,padding:0,background:'#05050a',fontFamily:'Arial,sans-serif'}}>
        <table width="100%" cellPadding={0} cellSpacing={0} style={{background:'#05050a',minHeight:'100vh'}}>
          <tr>
            <td align="center" style={{padding:'40px 20px'}}>
              <table width="600" cellPadding={0} cellSpacing={0} style={{maxWidth:'600px',width:'100%'}}>

                {/* Header */}
                <tr>
                  <td style={{background:'#0d0d18',borderRadius:'20px 20px 0 0',padding:'40px',textAlign:'center',borderBottom:'1px solid rgba(201,169,110,0.15)'}}>
                    <div style={{display:'inline-flex',alignItems:'center',gap:'10px',marginBottom:'8px'}}>
                      <div style={{width:'36px',height:'36px',borderRadius:'10px',background:'linear-gradient(135deg,#c9a96e,#7c6af0)',display:'inline-block',lineHeight:'36px',textAlign:'center',fontSize:'18px',fontWeight:'bold',color:'white'}}>G</div>
                      <span style={{fontFamily:'Georgia,serif',fontSize:'24px',fontWeight:'bold',color:'white'}}>
                        <span style={{color:'#c9a96e'}}>Gabry</span>Shop
                      </span>
                    </div>
                    <div style={{marginTop:'24px'}}>
                      <div style={{fontSize:'40px',marginBottom:'12px'}}>✅</div>
                      <h1 style={{fontFamily:'Georgia,serif',color:'white',fontSize:'28px',fontWeight:'600',margin:'0 0 8px',lineHeight:'1.2'}}>
                        Ordine confermato!
                      </h1>
                      <p style={{color:'rgba(150,150,185,0.8)',fontSize:'15px',margin:0}}>
                        Grazie {customerName}, il tuo ordine è stato ricevuto.
                      </p>
                    </div>
                  </td>
                </tr>

                {/* Body */}
                <tr>
                  <td style={{background:'#0d0d18',padding:'32px 40px'}}>

                    {/* Numero ordine */}
                    <div style={{background:'rgba(201,169,110,0.06)',border:'1px solid rgba(201,169,110,0.15)',borderRadius:'12px',padding:'16px 20px',marginBottom:'28px',textAlign:'center'}}>
                      <div style={{color:'rgba(120,120,155,0.7)',fontSize:'11px',fontWeight:'bold',letterSpacing:'0.15em',textTransform:'uppercase',marginBottom:'6px'}}>Numero ordine</div>
                      <div style={{color:'#c9a96e',fontFamily:'Georgia,serif',fontSize:'18px',fontWeight:'bold'}}>{orderId.slice(0,8).toUpperCase()}</div>
                    </div>

                    {/* Prodotti */}
                    <h2 style={{fontFamily:'Georgia,serif',color:'white',fontSize:'18px',fontWeight:'600',marginBottom:'16px',marginTop:0}}>I tuoi prodotti</h2>
                    <table width="100%" cellPadding={0} cellSpacing={0} style={{marginBottom:'24px'}}>
                      {items.map((item, i) => (
                        <tr key={i}>
                          <td style={{padding:'14px 0',borderBottom:'1px solid rgba(255,255,255,0.05)'}}>
                            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:'12px'}}>
                              <div>
                                <div style={{color:'white',fontSize:'14px',fontWeight:'600',marginBottom:'3px'}}>{item.product_name}</div>
                                <div style={{color:'rgba(120,120,155,0.6)',fontSize:'12px'}}>Quantità: {item.quantity}</div>
                                {item.briefing && Object.keys(item.briefing).length > 0 && (
                                  <div style={{color:'#c9a96e',fontSize:'11px',marginTop:'4px'}}>✏️ Briefing ricevuto</div>
                                )}
                              </div>
                              <div style={{fontFamily:'Georgia,serif',color:'white',fontSize:'18px',fontWeight:'600',whiteSpace:'nowrap'}}>€{item.price}</div>
                            </div>
                          </td>
                        </tr>
                      ))}
                      <tr>
                        <td style={{padding:'16px 0 0'}}>
                          <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline'}}>
                            <span style={{color:'white',fontSize:'15px',fontWeight:'bold'}}>Totale pagato</span>
                            <span style={{fontFamily:'Georgia,serif',color:'#c9a96e',fontSize:'26px',fontWeight:'bold'}}>€{total}</span>
                          </div>
                        </td>
                      </tr>
                    </table>

                    {/* Info consegna */}
                    <div style={{background:'rgba(255,255,255,0.025)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:'12px',padding:'20px',marginBottom:'24px'}}>
                      <h3 style={{fontFamily:'Georgia,serif',color:'white',fontSize:'15px',fontWeight:'600',margin:'0 0 12px'}}>⏱️ Cosa succede adesso?</h3>
                      <table width="100%" cellPadding={0} cellSpacing={0}>
                        {[
                          {n:'1', t:'Conferma ricevuta', d:'Hai ricevuto questa email di conferma'},
                          {n:'2', t:'Lavorazione in corso', d:'Iniziamo a preparare il tuo ordine entro poche ore'},
                          {n:'3', t:'Consegna', d:'Ricevi il file digitale via email entro 24-48 ore'},
                        ].map(step => (
                          <tr key={step.n}>
                            <td style={{padding:'8px 0',verticalAlign:'top'}}>
                              <div style={{display:'flex',gap:'12px',alignItems:'flex-start'}}>
                                <div style={{width:'24px',height:'24px',borderRadius:'50%',background:'rgba(201,169,110,0.12)',border:'1px solid rgba(201,169,110,0.2)',color:'#c9a96e',fontSize:'11px',fontWeight:'bold',textAlign:'center',lineHeight:'24px',flexShrink:0}}>{step.n}</div>
                                <div>
                                  <div style={{color:'white',fontSize:'13px',fontWeight:'600'}}>{step.t}</div>
                                  <div style={{color:'rgba(120,120,155,0.65)',fontSize:'12px'}}>{step.d}</div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </table>
                    </div>

                    {/* CTA */}
                    <div style={{textAlign:'center',marginBottom:'24px'}}>
                      <a href="https://gabryshop-digitale.vercel.app" style={{display:'inline-block',padding:'14px 32px',background:'linear-gradient(135deg,#c9a96e,#b8924a)',color:'#08060a',textDecoration:'none',borderRadius:'100px',fontSize:'14px',fontWeight:'bold'}}>
                        Visita GabryShop →
                      </a>
                    </div>

                    {/* Supporto */}
                    <div style={{textAlign:'center',padding:'20px',background:'rgba(255,255,255,0.02)',borderRadius:'12px'}}>
                      <p style={{color:'rgba(120,120,155,0.65)',fontSize:'13px',margin:'0 0 8px'}}>Hai domande? Contattaci subito:</p>
                      <a href="mailto:terryliano20011@gmail.com" style={{color:'#c9a96e',fontSize:'13px',textDecoration:'none'}}>terryliano20011@gmail.com</a>
                      <span style={{color:'rgba(120,120,155,0.4)',fontSize:'13px',margin:'0 12px'}}>·</span>
                      <a href="https://wa.me/393401234567" style={{color:'#c9a96e',fontSize:'13px',textDecoration:'none'}}>WhatsApp</a>
                    </div>
                  </td>
                </tr>

                {/* Footer */}
                <tr>
                  <td style={{background:'#080810',borderRadius:'0 0 20px 20px',padding:'24px 40px',textAlign:'center',borderTop:'1px solid rgba(255,255,255,0.04)'}}>
                    <p style={{color:'rgba(80,80,110,0.6)',fontSize:'11px',margin:0,lineHeight:'1.6'}}>
                      © 2024 GabryShop · Tutti i diritti riservati<br/>
                      Rimborso garantito 7 giorni · Prodotti 100% digitali
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  )
}
