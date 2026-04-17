import Link from 'next/link'
import { ArrowRight, CheckCircle, Shield, Zap, Star } from 'lucide-react'
import { CATEGORIES, PRODUCTS } from '@/lib/data'
import ProductCard from '@/components/product/ProductCard'

export default function Home() {
  const featured = PRODUCTS.filter(p => p.is_bestseller).slice(0, 3)
  return (
    <div className="pt-20">

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background gradient mesh */}
        <div className="absolute inset-0">
          <div className="absolute inset-0" style={{background:"radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201,169,110,0.12) 0%, transparent 70%)"}} />
          <div className="absolute bottom-0 left-0 right-0 h-px" style={{background:"linear-gradient(to right, transparent, rgba(201,169,110,0.3), transparent)"}} />
        </div>

        {/* Floating orbs */}
        <div className="absolute top-32 left-16 w-72 h-72 rounded-full opacity-20 blur-3xl" style={{background:"radial-gradient(circle, #c9a96e, transparent)"}} />
        <div className="absolute bottom-32 right-16 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{background:"radial-gradient(circle, #7c6af0, transparent)"}} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-5xl mx-auto text-center">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-medium mb-10"
              style={{borderColor:"rgba(201,169,110,0.3)",background:"rgba(201,169,110,0.06)",color:"#c9a96e"}}>
              <Zap className="w-4 h-4" />
              Prodotti digitali · Consegna garantita 24-48h
            </div>

            {/* Headline */}
            <h1 className="font-bold text-white leading-[1.1] mb-8"
              style={{fontFamily:"Playfair Display,serif",fontSize:"clamp(3rem,8vw,6rem)"}}>
              Il tuo business<br />
              <span className="text-gold">digitale, subito.</span>
            </h1>

            <p className="text-xl text-[#8888aa] max-w-2xl mx-auto leading-relaxed mb-12">
              Siti web, menu digitali, automazioni, app mobile e fogli Excel professionali.
              Tutto ciò di cui hai bisogno per crescere online.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link href="#categorie" className="btn-gold px-10 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 text-lg">
                Scopri i servizi <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/chi-siamo"
                className="px-10 py-4 rounded-xl font-semibold flex items-center justify-center text-lg transition-all"
                style={{border:"1px solid rgba(255,255,255,0.12)",color:"white"}}>
                Chi siamo
              </Link>
            </div>

            {/* Trust row */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm" style={{color:"#8888aa"}}>
              <div className="flex items-center gap-2"><Shield className="w-4 h-4" style={{color:"#c9a96e"}} /> Pagamenti sicuri PayPal</div>
              <div className="flex items-center gap-2"><Zap className="w-4 h-4" style={{color:"#c9a96e"}} /> Consegna 24-48 ore</div>
              <div className="flex items-center gap-2"><Star className="w-4 h-4" style={{color:"#c9a96e",fill:"#c9a96e"}} /> +200 clienti soddisfatti</div>
              <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4" style={{color:"#22c55e"}} /> Rimborso 7 giorni</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CATEGORIE ═══ */}
      <section id="categorie" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{color:"#c9a96e"}}>I nostri servizi</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4" style={{fontFamily:"Playfair Display,serif"}}>Cosa offriamo</h2>
            <p className="text-[#8888aa] text-lg max-w-xl mx-auto">Tutto il digitale di cui hai bisogno, in un unico posto.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {CATEGORIES.map((cat, i) => (
              <Link key={cat.id} href={`/categoria/${cat.slug}`}
                className="luxury-card rounded-2xl overflow-hidden group"
                style={{animationDelay:`${i*80}ms`}}>
                <div className="relative h-36 overflow-hidden" style={{background:"#1a1a24"}}>
                  {cat.image && (
                    <img src={cat.image} alt={cat.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      style={{opacity:0.5}} />
                  )}
                  <div className="absolute inset-0" style={{background:"linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 100%)"}} />
                  <div className="absolute bottom-3 left-3 text-2xl">{cat.icon}</div>
                  <div className="absolute top-3 right-3 text-xs font-semibold px-2 py-1 rounded-full"
                    style={{background:`${cat.color}20`,color:cat.color,border:`1px solid ${cat.color}40`}}>
                    {cat.product_count} prodotti
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-white font-semibold mb-1" style={{fontFamily:"Playfair Display,serif"}}>{cat.name}</h3>
                  <p className="text-[#8888aa] text-xs leading-relaxed mb-3">{cat.description}</p>
                  <div className="text-xs font-semibold flex items-center gap-1" style={{color:cat.color}}>
                    Scopri <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ COME FUNZIONA ═══ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{color:"#c9a96e"}}>Processo semplice</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4" style={{fontFamily:"Playfair Display,serif"}}>Come funziona</h2>
            <p className="text-[#8888aa] text-lg">Semplice come 1, 2, 3.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Connector line desktop */}
            <div className="hidden md:block absolute top-16 left-1/3 right-1/3 h-px" style={{background:"linear-gradient(to right, transparent, rgba(201,169,110,0.4), transparent)"}} />

            {[
              {step:"01",title:"Scegli il servizio",desc:"Esplora le categorie e trova il prodotto digitale perfetto. Ogni prodotto include una lista dettagliata di cosa è incluso.",icon:"🛒",color:"#c9a96e"},
              {step:"02",title:"Acquista in sicurezza",desc:"Inserisci i tuoi dati e paga tramite PayPal. Carte di credito, debito e saldo PayPal. Transazione 100% sicura.",icon:"💳",color:"#7c6af0"},
              {step:"03",title:"Ricevi subito",desc:"Ricevi email con link download entro 24-48 ore. Per prodotti personalizzati ti contatteremo direttamente.",icon:"📬",color:"#10b981"},
            ].map((item, i) => (
              <div key={item.step} className="luxury-card rounded-2xl p-8 text-center relative">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-5"
                  style={{background:`${item.color}12`,border:`1px solid ${item.color}25`}}>
                  {item.icon}
                </div>
                <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{color:item.color}}>Step {item.step}</div>
                <h3 className="text-xl font-bold text-white mb-3" style={{fontFamily:"Playfair Display,serif"}}>{item.title}</h3>
                <p className="text-[#8888aa] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PRODOTTI POPOLARI ═══ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{color:"#c9a96e"}}>Top prodotti</p>
              <h2 className="text-4xl font-bold text-white" style={{fontFamily:"Playfair Display,serif"}}>I più popolari</h2>
              <p className="text-[#8888aa] mt-2">I prodotti preferiti dai nostri clienti.</p>
            </div>
            <Link href="/categoria/siti-web" className="hidden sm:flex items-center gap-2 text-sm transition-colors" style={{color:"#c9a96e"}}>
              Vedi tutti <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((p, i) => (
              <ProductCard key={p.id} product={{...p, category: CATEGORIES.find(c=>c.id===p.category_id)}} delay={i*100} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {number:"+200",label:"Clienti soddisfatti",icon:"🎯"},
              {number:"98%",label:"Tasso soddisfazione",icon:"⭐"},
              {number:"24h",label:"Consegna media",icon:"⚡"},
              {number:"7gg",label:"Rimborso garantito",icon:"🛡️"},
            ].map((s,i)=>(
              <div key={s.label} className="luxury-card rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">{s.icon}</div>
                <div className="text-4xl font-bold text-gold mb-1" style={{fontFamily:"Playfair Display,serif"}}>{s.number}</div>
                <div className="text-[#8888aa] text-xs">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA FINALE ═══ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="luxury-card rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0" style={{background:"radial-gradient(ellipse at center, rgba(201,169,110,0.08) 0%, transparent 70%)"}} />
            <div className="relative">
              <div className="text-4xl mb-4">🚀</div>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4" style={{fontFamily:"Playfair Display,serif"}}>Pronto a crescere?</h2>
              <p className="text-[#8888aa] text-lg mb-10 max-w-xl mx-auto">
                Inizia oggi con uno dei nostri servizi digitali professionali. Risultati garantiti o rimborso entro 7 giorni.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="#categorie" className="btn-gold px-10 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 text-lg">
                  Inizia ora <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/contatti"
                  className="px-10 py-4 rounded-xl font-semibold flex items-center justify-center text-lg transition-all"
                  style={{border:"1px solid rgba(255,255,255,0.12)",color:"white"}}>
                  Hai domande?
                </Link>
              </div>
              <div className="flex items-center justify-center gap-2 mt-8 text-sm" style={{color:"#8888aa"}}>
                <CheckCircle className="w-4 h-4" style={{color:"#22c55e"}} />
                Rimborso garantito 7 giorni · Nessuna sorpresa · Tutto digitale
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
