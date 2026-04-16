import Link from 'next/link'
import { ArrowRight, CheckCircle, Shield, Zap, Star } from 'lucide-react'
import { CATEGORIES, PRODUCTS } from '@/lib/data'
import ProductCard from '@/components/product/ProductCard'

export default function Home() {
  const featured = PRODUCTS.filter(p => p.is_bestseller).slice(0, 3)
  return (
    <div className="pt-20">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#c9a96e]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#7c6af0]/5 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#c9a96e]/30 bg-[#c9a96e]/5 text-[#c9a96e] text-sm font-medium mb-8 animate-fade-up">
              <Zap className="w-4 h-4" /> Prodotti digitali · Consegna 24-48h
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 animate-fade-up" style={{fontFamily:'Playfair Display,serif',animationDelay:'100ms'}}>
              Il tuo business<br /><span className="text-gold">digitale, subito.</span>
            </h1>
            <p className="text-lg sm:text-xl text-[#8888aa] max-w-2xl mx-auto leading-relaxed mb-10 animate-fade-up" style={{animationDelay:'200ms'}}>
              Siti web, menu digitali, automazioni, app mobile e fogli Excel professionali. Tutto ciò di cui hai bisogno per crescere online.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{animationDelay:'300ms'}}>
              <Link href="#categorie" className="btn-gold px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 text-base">
                Scopri i servizi <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/chi-siamo" className="px-8 py-4 rounded-xl font-semibold border border-white/10 text-white hover:border-white/20 hover:bg-white/5 transition-all flex items-center justify-center text-base">
                Chi siamo
              </Link>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-sm text-[#8888aa] animate-fade-up" style={{animationDelay:'400ms'}}>
              <div className="flex items-center gap-2"><Shield className="w-4 h-4 text-[#c9a96e]" /> Pagamenti sicuri PayPal</div>
              <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-[#c9a96e]" /> Consegna 24-48 ore</div>
              <div className="flex items-center gap-2"><Star className="w-4 h-4 text-[#c9a96e] fill-[#c9a96e]" /> +200 clienti soddisfatti</div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIE */}
      <section id="categorie" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4" style={{fontFamily:'Playfair Display,serif'}}>Cosa offriamo</h2>
            <p className="text-[#8888aa] text-lg max-w-xl mx-auto">Tutto il digitale di cui hai bisogno, in un unico posto.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {CATEGORIES.map((cat, i) => (
              <Link key={cat.id} href={`/categoria/${cat.slug}`} className="luxury-card rounded-2xl overflow-hidden group animate-fade-up" style={{animationDelay:`${i*80}ms`}}>
                <div className="relative h-32 overflow-hidden" style={{background:'#1a1a24'}}>
                  {cat.image && <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-60" />}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-3 left-3 text-2xl">{cat.icon}</div>
                </div>
                <div className="p-4">
                  <h3 className="text-white font-semibold mb-1" style={{fontFamily:'Playfair Display,serif'}}>{cat.name}</h3>
                  <p className="text-[#8888aa] text-xs leading-relaxed mb-2">{cat.description}</p>
                  <div className="text-xs font-medium flex items-center gap-1" style={{color:cat.color}}>{cat.product_count} prodotti <ArrowRight className="w-3 h-3" /></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* COME FUNZIONA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4" style={{fontFamily:'Playfair Display,serif'}}>Come funziona</h2>
            <p className="text-[#8888aa] text-lg">Semplice come 1, 2, 3.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {step:'01',title:'Scegli il servizio',desc:'Esplora le categorie e trova il prodotto digitale perfetto per te. Ogni prodotto include una descrizione dettagliata.',icon:'🛒',color:'#c9a96e'},
              {step:'02',title:'Acquista in sicurezza',desc:'Inserisci i tuoi dati e paga tramite PayPal. Accettiamo tutte le carte di credito, in totale sicurezza.',icon:'💳',color:'#7c6af0'},
              {step:'03',title:'Ricevi subito',desc:'Dopo il pagamento ricevi email con link download o verrai contattato. Consegna garantita entro 24-48 ore.',icon:'📬',color:'#10b981'},
            ].map((item, i) => (
              <div key={item.step} className="luxury-card rounded-2xl p-8 text-center animate-fade-up" style={{animationDelay:`${i*150}ms`}}>
                <div className="text-4xl mb-4">{item.icon}</div>
                <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{color:item.color}}>Step {item.step}</div>
                <h3 className="text-xl font-bold text-white mb-3" style={{fontFamily:'Playfair Display,serif'}}>{item.title}</h3>
                <p className="text-[#8888aa] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODOTTI EVIDENZA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-white mb-2" style={{fontFamily:'Playfair Display,serif'}}>I più popolari</h2>
              <p className="text-[#8888aa]">I prodotti preferiti dai nostri clienti.</p>
            </div>
            <Link href="/categoria/siti-web" className="hidden sm:flex items-center gap-2 text-sm text-[#c9a96e] hover:text-white transition-colors">
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

      {/* STATS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[{number:'+200',label:'Clienti soddisfatti'},{number:'98%',label:'Tasso soddisfazione'},{number:'24h',label:'Tempo medio consegna'}].map((s,i)=>(
              <div key={s.label} className="luxury-card rounded-2xl p-8 text-center animate-fade-up" style={{animationDelay:`${i*100}ms`}}>
                <div className="text-5xl font-bold text-gold mb-2" style={{fontFamily:'Playfair Display,serif'}}>{s.number}</div>
                <div className="text-[#8888aa] text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="luxury-card rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#c9a96e]/5 to-[#7c6af0]/5" />
            <div className="relative">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4" style={{fontFamily:'Playfair Display,serif'}}>Pronto a crescere?</h2>
              <p className="text-[#8888aa] text-lg mb-8 max-w-xl mx-auto">Inizia oggi con uno dei nostri servizi digitali professionali. Rimborso garantito entro 7 giorni.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="#categorie" className="btn-gold px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2">
                  Inizia ora <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/contatti" className="px-8 py-4 rounded-xl font-semibold border border-white/10 text-white hover:border-white/20 hover:bg-white/5 transition-all flex items-center justify-center">
                  Hai domande?
                </Link>
              </div>
              <div className="flex items-center justify-center gap-2 mt-6 text-xs text-[#8888aa]">
                <CheckCircle className="w-4 h-4 text-[#22c55e]" /> Rimborso garantito 7 giorni · Nessuna sorpresa
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
