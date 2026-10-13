import type { Candle, ChartInterval, Ticker } from '@/types/market'

const WS_BASE_URL = 'wss://stream.binance.com:9443/stream'
const RECONNECT_DELAY_MS = 3000

interface CombinedStreamMessage<T> {
  stream: string
  data?: T
}

interface StreamHandlers<T> {
  onData: (data: T) => void
  onStatusChange: (connected: boolean) => void
}

function connectStream<T>(streamNames: string[], handlers: StreamHandlers<T>): () => void {
  const url = `${WS_BASE_URL}?streams=${streamNames.join('/')}`

  let socket: WebSocket | null = null
  let reconnectTimer: ReturnType<typeof setTimeout> | null = null
  let stopped = false

  function open() {
    socket = new WebSocket(url)

    socket.onopen = () => handlers.onStatusChange(true)

    socket.onmessage = (event: MessageEvent<string>) => {
      const message: CombinedStreamMessage<T> = JSON.parse(event.data)
      if (!message.data) return
      handlers.onData(message.data)
    }

    socket.onclose = () => {
      handlers.onStatusChange(false)
      if (!stopped) {
        reconnectTimer = setTimeout(open, RECONNECT_DELAY_MS)
      }
    }

    socket.onerror = () => socket?.close()
  }

  open()

  return () => {
    stopped = true
    if (reconnectTimer) clearTimeout(reconnectTimer)
    socket?.close()
  }
}

interface BinanceTickerEvent {
  s: string
  c: string
  P: string
  q: string
}

export interface TickerStreamHandlers {
  onTicker: (ticker: Ticker) => void
  onStatusChange: (connected: boolean) => void
}

export function connectTickerStream(symbols: string[], handlers: TickerStreamHandlers): () => void {
  const streamNames = symbols.map((symbol) => `${symbol.toLowerCase()}@ticker`)

  return connectStream<BinanceTickerEvent>(streamNames, {
    onData: (data) =>
      handlers.onTicker({
        symbol: data.s,
        price: Number(data.c),
        change24h: Number(data.P),
        volume24h: Number(data.q),
      }),
    onStatusChange: handlers.onStatusChange,
  })
}

interface BinanceKlineEvent {
  k: { t: number; o: string; h: string; l: string; c: string }
}

export interface KlineStreamHandlers {
  onCandle: (candle: Candle) => void
  onStatusChange: (connected: boolean) => void
}

export function connectKlineStream(
  symbol: string,
  interval: ChartInterval,
  handlers: KlineStreamHandlers,
): () => void {
  const streamName = `${symbol.toLowerCase()}@kline_${interval}`

  return connectStream<BinanceKlineEvent>([streamName], {
    onData: (data) =>
      handlers.onCandle({
        time: Math.floor(data.k.t / 1000),
        open: Number(data.k.o),
        high: Number(data.k.h),
        low: Number(data.k.l),
        close: Number(data.k.c),
      }),
    onStatusChange: handlers.onStatusChange,
  })
}
