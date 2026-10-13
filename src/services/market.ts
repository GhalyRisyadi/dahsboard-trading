import type { Ticker } from '@/types/market'

const BASE_URL = 'https://api.binance.com'

export const WATCHLIST = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'SOLUSDT', 'SUIUSDT', 'HYPEUSDT']

interface BinanceTicker24h {
  symbol: string
  lastPrice: string
  priceChangePercent: string
  quoteVolume: string
}

export async function getTickers(): Promise<Ticker[]> {
  const query = new URLSearchParams({ symbols: JSON.stringify(WATCHLIST) })
  const response = await fetch(`${BASE_URL}/api/v3/ticker/24hr?${query}`)

  if (!response.ok) {
    throw new Error(`Gagal memuat data pasar (HTTP ${response.status})`)
  }

  const data: BinanceTicker24h[] = await response.json()

  return data.map((item) => ({
    symbol: item.symbol,
    price: Number(item.lastPrice),
    change24h: Number(item.priceChangePercent),
    volume24h: Number(item.quoteVolume),
  }))
}
