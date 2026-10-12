// types/market.ts
export interface Ticker {
  symbol: string
  price: number
  change24h: number
  volume24h: number
}

// services/market.ts
export async function getTickers(): Promise<Ticker[]> {
  return [
    { symbol: 'BTCUSDT', price: 67000, change24h: 1.2, volume24h: 12000 },
    { symbol: 'ETHUSDT', price: 3200, change24h: -0.4, volume24h: 8000 },
  ]
}
