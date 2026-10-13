import type { Candle, ChartInterval, Ticker } from '@/types/market'

const BASE_URL = 'https://api.binance.com'

export const WATCHLIST = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'SOLUSDT', 'SUIUSDT', 'HYPEUSDT']

interface BinanceTicker24h {
  symbol: string
  lastPrice: string
  priceChangePercent: string
  quoteVolume: string
}

// [openTime, open, high, low, close, ...field lain yang tidak dipakai]
type BinanceKline = [number, string, string, string, string, ...unknown[]]

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

export async function getKlines(
  symbol: string,
  interval: ChartInterval,
  limit = 500,
): Promise<Candle[]> {
  const query = new URLSearchParams({ symbol, interval, limit: String(limit) })
  const response = await fetch(`${BASE_URL}/api/v3/klines?${query}`)

  if (!response.ok) {
    throw new Error(`Gagal memuat data chart (HTTP ${response.status})`)
  }

  const data: BinanceKline[] = await response.json()

  return data.map((kline) => ({
    time: Math.floor(kline[0] / 1000),
    open: Number(kline[1]),
    high: Number(kline[2]),
    low: Number(kline[3]),
    close: Number(kline[4]),
  }))
}
