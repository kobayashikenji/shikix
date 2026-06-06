export interface Show {
  id: string
  title: string
  titleEn: string
  genre: 'ミュージカル' | 'ストレートプレイ' | 'ファミリーミュージカル'
  theater: string
  imageEmoji: string
  image: string           // path to production photo
  officialUrl: string     // 劇団四季公式ページ
  theaterId: string       // Theaterへの参照
  heroBg: string          // Tailwind bg class
  accentColor: string     // hex for inline use
  synopsis: string
  castIds: string[]
  currentlyRunning: boolean
  openDate: string
  songs?: string[]
}

export interface Cast {
  id: string
  name: string
  nameKana: string
  roles: { showId: string; roleName: string; periodStart: string; periodEnd?: string }[]
}

export interface Review {
  id: string
  showId: string
  userId: string
  userName: string
  userInitial: string
  userColor: string
  date: string
  postedAt: string
  rating: number
  castRatings: { castId: string; rating: number; comment: string }[]
  title: string
  body: string
  seat: string
  isFavorite: boolean
  likeCount: number
}

export interface CafeSpot {
  name: string
  category: string
  walkMin: number
  priceRange: '¥' | '¥¥' | '¥¥¥'
  features: string[]      // 例: ['Wi-Fi', 'コンセント', '広い']
  mapUrl: string
}

export interface Theater {
  id: string
  name: string
  address: string
  nearestStation: string
  area: string            // ホテル検索キーワード
  prefecture: string      // 都道府県（じゃらんエリア用）
  mapUrl: string
  cafes: CafeSpot[]
}

export interface User {
  id: string
  name: string
  initial: string
  color: string
}
