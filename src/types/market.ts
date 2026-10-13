export interface Ticker {
  symbol: string
  price: number
  change24h: number
  volume24h: number
}

export interface Candle {
  time: number
  open: number
  high: number
  low: number
  close: number
}

export type ChartInterval = '1m' | '5m' | '15m' | '1h' | '4h' | '1d'
