export default function TerminiPage() {
  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-white mb-4" style={{fontFamily:'Playfair Display,serif'}}>Termini di Servizio</h1>
      <p className="text-[#8888aa] text-sm mb-10">Ultimo aggiornamento: Gennaio 2025</p>
      <div className="space-y-8 text-[#8888aa] leading-relaxed">
        {[
          { title: '1. Accettazione dei termini', content: 'Utilizzando GabryShop accetti integralmente i presenti Termini di Servizio. Se non accetti, ti preghiamo di non utilizzare il sito.' },
          { title: '2. Descrizione del servizio', content: 'GabryShop vende prodotti e servizi digitali (file, template, siti web, automazioni). Tutti i prodotti sono di natura digitale e vengono consegnati tramite download o consegna diretta.' },
          { title: '3. Prezzi e pagamenti', content: 'Tutti i prezzi sono espressi in Euro (€) e includono IVA. Il pagamento avviene tramite PayPal. Non conserviamo dati delle carte di credito.' },
          { title: '4. Politica di rimborso', content: 'Offriamo rimborso completo entro 7 giorni dall\'acquisto se non sei soddisfatto del prodotto. Per richiedere il rimborso, contattaci a info@gabryshop.it specificando numero ordine e motivo.' },
          { title: '5. Prodotti personalizzabili', content: 'Per i prodotti che richiedono personalizzazione, ci impegniamo a consegnare entro i tempi indicati su ogni prodotto. Sono incluse fino a 2 revisioni gratuite.' },
          { title: '6. Proprietà intellettuale', content: 'Tutti i prodotti acquistati su GabryShop sono concessi in licenza per uso personale o commerciale (una sola attività). Non è consentita la rivendita o ridistribuzione dei file originali.' },
          { title: '7. Limitazione di responsabilità', content: 'GabryShop non è responsabile per danni indiretti derivanti dall\'uso dei prodotti. La responsabilità massima è limitata all\'importo pagato per il prodotto in questione.' },
          { title: '8. Modifiche ai termini', content: 'Ci riserviamo il diritto di modificare questi termini in qualsiasi momento. Le modifiche saranno comunicate via email agli utenti registrati.' },
        ].map(s => (
          <section key={s.title}>
            <h2 className="text-white font-semibold text-lg mb-3" style={{fontFamily:'Playfair Display,serif'}}>{s.title}</h2>
            <p>{s.content}</p>
          </section>
        ))}
      </div>
    </div>
  )
}
