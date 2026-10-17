import type { ChartInterval } from '@/types/market'

export type SignalSide = 'BUY' | 'SELL' | 'HOLD'

export interface Signal {
  id: string
  symbol: string
  side: SignalSide
  // Tingkat keyakinan model, 0 sampai 100. Null kalau sumber sinyal tidak
  // menghasilkan probabilitas, misalnya strategi berbasis aturan.
  confidence: number | null
  timeframe: ChartInterval
  reason: string
  // Waktu sinyal dibuat, dalam milidetik sejak epoch (sama seperti Date.now()).
  createdAt: number
}
