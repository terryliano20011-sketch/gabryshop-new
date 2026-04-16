export default function PrivacyPage() {
  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-white mb-4" style={{fontFamily:'Playfair Display,serif'}}>Privacy Policy</h1>
      <p className="text-[#8888aa] text-sm mb-10">Ultimo aggiornamento: Gennaio 2025</p>

      <div className="space-y-8 text-[#8888aa] leading-relaxed">
        {[
          { title: '1. Titolare del trattamento', content: 'Il titolare del trattamento dei dati personali è GabryShop (info@gabryshop.it). Per qualsiasi questione relativa alla privacy, puoi contattarci all\'indirizzo email indicato.' },
          { title: '2. Dati raccolti', content: 'Raccogliamo i seguenti dati: nome e cognome, indirizzo email, partita IVA (se fornita), dati relativi agli ordini effettuati. Non raccogliamo dati di pagamento: questi sono gestiti direttamente da PayPal.' },
          { title: '3. Finalità del trattamento', content: 'I dati sono trattati per: processare gli ordini e inviare i prodotti digitali acquistati, inviare email transazionali legate all\'ordine, rispondere a richieste di supporto, adempiere a obblighi fiscali e contabili.' },
          { title: '4. Conservazione dei dati', content: 'I dati degli ordini sono conservati per 10 anni come previsto dalla normativa fiscale italiana. I dati degli account sono conservati fino alla cancellazione dell\'account da parte dell\'utente.' },
          { title: '5. Diritti dell\'interessato', content: 'Hai il diritto di accedere ai tuoi dati, correggerli, cancellarli e opporti al loro trattamento. Per esercitare questi diritti, contattaci a info@gabryshop.it.' },
          { title: '6. Cookie', content: 'Utilizziamo solo cookie tecnici essenziali per il funzionamento del sito. Non utilizziamo cookie di profilazione o di terze parti per la pubblicità.' },
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
