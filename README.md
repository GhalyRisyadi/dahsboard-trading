# Crypto Dashboard

Dashboard cryptocurrency berbasis Vue 3 untuk melihat harga pasar dan chart candlestick secara live. Aplikasi ini menggunakan data publik Binance. Fitur sinyal saat ini hanya menampilkan data contoh dan bukan rekomendasi trading.

## Fitur

- **Market:** daftar harga BTCUSDT, ETHUSDT, BNBUSDT, SOLUSDT, SUIUSDT, dan HYPEUSDT dengan harga terakhir, perubahan 24 jam, dan volume.
- **Data live:** data awal diambil melalui Binance REST API, lalu diperbarui melalui Binance WebSocket dengan percobaan sambung ulang otomatis.
- **Chart candlestick:** pilih pair dari tabel market dan lihat chart dengan interval 1m, 5m, 15m, 1h, 4h, atau 1d.
- **Signals:** contoh daftar sinyal BUY, SELL, dan HOLD dengan waktu, timeframe, tingkat keyakinan, serta alasan.
- **Portfolio:** halaman navigasi sudah tersedia, tetapi saat ini hanya berupa placeholder.

## Teknologi

- Vue 3 dengan Composition API dan `<script setup>`
- TypeScript
- Vite
- Vue Router untuk navigasi
- Pinia untuk state aplikasi
- Tailwind CSS untuk styling
- `lightweight-charts` untuk chart candlestick
- Binance REST API dan WebSocket untuk data market

## Persyaratan

- Node.js `^22.18.0` atau `>=24.12.0` (sesuai `engines` di `package.json`)
- npm
- Koneksi internet untuk mengambil data dari Binance

## Menjalankan aplikasi

```sh
npm install
npm run dev
```

Buka URL lokal yang ditampilkan Vite di terminal.

## Perintah yang tersedia

```sh
npm run dev         # Jalankan server pengembangan
npm run type-check  # Periksa tipe TypeScript dan komponen Vue
npm run build       # Type-check dan buat build produksi
npm run build-only  # Buat build produksi tanpa type-check terpisah
npm run preview     # Sajikan hasil build secara lokal
npm run lint        # Jalankan oxlint dan ESLint
```

> Catatan: skrip lint saat ini menjalankan linter dengan opsi `--fix`, sehingga dapat mengubah file yang terdeteksi perlu diperbaiki.

## Struktur kode

```text
src/
├── components/ui/      # Komponen UI bersama: kartu, tabel, badge harga
├── features/market/    # Tabel ticker dan chart
├── features/signals/   # Daftar sinyal dan badge BUY/SELL/HOLD
├── layouts/            # Layout dashboard dan navigasi
├── router/             # Konfigurasi rute
├── services/           # Integrasi Binance dan sumber data sinyal
├── stores/             # State market dan signals dengan Pinia
├── types/              # Tipe data TypeScript
└── views/              # Halaman Market, Signals, dan Portfolio
```

Data mengalir dari `services/` ke `stores/`, lalu digunakan oleh komponen di `features/` dan halaman di `views/`. `router/index.ts` memetakan URL ke halaman, sementara `DashboardLayout.vue` menyediakan navigasi bersama.

## Batasan saat ini

- Data sinyal di `src/services/signals.ts` adalah data contoh; belum ada backend/model AI.
- Halaman Portfolio belum memiliki fungsi pengelolaan aset.
- Aplikasi hanya menampilkan data market; tidak melakukan transaksi atau mengelola akun exchange.
- Data market memerlukan akses internet dan ketersediaan layanan Binance.
