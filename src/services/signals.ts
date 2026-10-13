import type { Signal } from '@/types/signals'

// DATA CONTOH. Belum ada model AI. Nanti fungsi ini diganti dengan pemanggilan
// ke backend, selama bentuk datanya tetap sama dengan interface Signal.
export async function getSignals(): Promise<Signal[]> {
  const now = Date.now()
  const minute = 60_000

  return [
    {
      id: 'sample-1',
      symbol: 'BTCUSDT',
      side: 'BUY',
      confidence: 78,
      timeframe: '1h',
      reason: 'Contoh: harga menembus rata-rata pergerakan dengan volume naik',
      createdAt: now - 4 * minute,
    },
    {
      id: 'sample-2',
      symbol: 'ETHUSDT',
      side: 'HOLD',
      confidence: 55,
      timeframe: '15m',
      reason: 'Contoh: harga bergerak menyamping, belum ada arah jelas',
      createdAt: now - 18 * minute,
    },
    {
      id: 'sample-3',
      symbol: 'SOLUSDT',
      side: 'SELL',
      confidence: 71,
      timeframe: '4h',
      reason: 'Contoh: momentum melemah setelah kenaikan tajam',
      createdAt: now - 47 * minute,
    },
  ]
}
