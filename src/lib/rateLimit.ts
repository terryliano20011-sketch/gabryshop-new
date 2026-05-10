const attempts = new Map<string, { count: number; firstAttempt: number }>()

export function checkRateLimit(ip: string, maxAttempts = 5, windowMs = 60 * 60 * 1000): boolean {
  const now = Date.now()
  const entry = attempts.get(ip)

  if (!entry || now - entry.firstAttempt > windowMs) {
    attempts.set(ip, { count: 1, firstAttempt: now })
    return true // OK
  }

  if (entry.count >= maxAttempts) return false // BLOCCATO

  entry.count++
  return true // OK
}

export function checkOrderRateLimit(ip: string): boolean {
  return checkRateLimit(ip, 5, 60 * 60 * 1000) // max 5 ordini/ora per IP
}

export function checkAdminRateLimit(ip: string): boolean {
  return checkRateLimit(ip, 5, 15 * 60 * 1000) // max 5 tentativi/15min
}
