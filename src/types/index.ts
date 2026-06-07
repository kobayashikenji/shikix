// 原作ミュージカルそのもの（劇団四季版・ブロードウェイ版など、上演主体をまたいだ抽象的な「作品」エンティティ）
export interface Work {
  id: string
  title: string                                          // 邦題
  titleEn: string                                        // 原題
  createdYear: string                                    // 初演年（原作ミュージカル誕生年）
  tonyAwards?: { year: string; result: string }[]        // トニー賞 受賞・ノミネート歴
  overseasProductions?: { region: string; period: string }[] // 海外公演実績
}

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
  workId?: string         // Workへの参照（原作ミュージカルが存在する場合）
  heroBg: string          // Tailwind bg class
  accentColor: string     // hex for inline use
  synopsis: string
  castIds: string[]
  currentlyRunning: boolean
  openDate: string
  closeDate?: string     // 上演終了日（過去公演アーカイブ用）
  songs?: string[]
}

export interface Run {
  id: string
  showId: string          // Showへの参照
  theaterId: string       // Theaterへの参照
  periodStart: string
  periodEnd?: string      // 上演中の場合は省略
  note?: string           // 例: '初演', '凱旋公演', '北海道ツアー'
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
  favoriteCastIds: string[]      // この観劇でお気に入りだったキャスト（複数選択可）
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

// 開発チームへの応援メッセージ
export interface Cheer {
  id: string
  name: string
  message: string
  postedAt: string
}

export interface User {
  id: string
  name: string
  initial: string
  color: string
}
