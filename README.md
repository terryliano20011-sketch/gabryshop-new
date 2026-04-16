# GabryShop — E-commerce Digitale

Stack: Next.js 15 + TypeScript + Tailwind + Supabase + PayPal + Resend

## Setup rapido

### 1. Installa dipendenze
```bash
npm install
```

### 2. Copia .env.local e compila i valori
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
NEXT_PUBLIC_PAYPAL_CLIENT_ID=AYour...
PAYPAL_CLIENT_SECRET=EYour...
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=noreply@tuodominio.it
NEXT_PUBLIC_SITE_URL=https://gabryshop.vercel.app
NEXT_PUBLIC_WHATSAPP_NUMBER=393401234567
```

### 3. Crea il DB Supabase
Esegui `supabase/schema.sql` nel SQL Editor di Supabase.

### 4. Avvia in locale
```bash
npm run dev
```

### 5. Deploy su Vercel
```bash
npx vercel --prod
```

## Coupon test: GABRY10 (10% sconto)

## Admin: /admin (aggiungere protezione auth in produzione)

Vedi README completo nel file per dettagli struttura e design system.
