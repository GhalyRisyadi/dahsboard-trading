import type { Ticker } from '@/types/market'

const WS_BASE_URL = 'wss://stream.binance.com:9443/stream'
const RECONNECT_DELAY_MS = 3000

interface BinanceTickerEvent {
  s: string
  c: string
  P: string
  q: string
}

interface CombinedStreamMessage {
  stream: string
  data?: BinanceTickerEvent
}

export interface TickerStreamHandlers {
  onTicker: (ticker: Ticker) => void
  onStatusChange: (connected: boolean) => void
}

export function connectTickerStream(symbols: string[], handlers: TickerStreamHandlers): () => void {
  const streams = symbols.map((symbol) => `${symbol.toLowerCase()}@ticker`).join('/')
  const url = `${WS_BASE_URL}?streams=${streams}`

  let socket: WebSocket | null = null
  let reconnectTimer: ReturnType<typeof setTimeout> | null = null
  let stopped = false

  function open() {
    socket = new WebSocket(url)

    socket.onopen = () => handlers.onStatusChange(true)

    socket.onmessage = (event: MessageEvent<string>) => {
      const message: CombinedStreamMessage = JSON.parse(event.data)
      const data = message.data
      if (!data) return

      handlers.onTicker({
        symbol: data.s,
        price: Number(data.c),
        change24h: Number(data.P),
        volume24h: Number(data.q),
      })
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
