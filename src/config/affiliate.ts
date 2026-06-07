/**
 * アフィリエイト設定
 *
 * 各サービスのアフィリエイトIDをここで管理します。
 * IDが空文字の場合、アフィリエイトパラメータは付与されません。
 *
 * ── 登録方法 ──────────────────────────────────────
 * A8.net (ぴあ / e+ / じゃらん など)
 *   → https://www.a8.net/  でメディア登録
 *   → 各広告主プログラムに参加申請
 *   → 発行されたトラッキングURLを使用
 *
 * 楽天アフィリエイト (楽天トラベル)
 *   → https://affiliate.rakuten.co.jp/  に登録
 *   → サイト審査通過後、アフィリエイトリンクを発行
 *   → affiliate_id (数字) を下記に設定
 *
 * バリューコマース (ローソンチケットなど)
 *   → https://www.valuecommerce.ne.jp/  に登録
 *   → プログラム参加後、sid を取得
 * ─────────────────────────────────────────────────
 */

export const AFFILIATE = {
  /** チケットぴあ: A8.net 経由のトラッキングURL末尾パラメータ */
  pia: '',
  // 例: 'a00000000000'  → URLに &a8=xxx の形で付与

  /** ローソンチケット: バリューコマース sid */
  ltike: '',
  // 例: '1234567'

  /** イープラス: A8.net 経由 */
  eplus: '',

  /** 楽天トラベル: 楽天アフィリエイト affiliate_id */
  rakuten: '',
  // 例: '3f0f2b45.c5fd0000.3f0f2b46.10140000'

  /** じゃらん: A8.net 経由 afid */
  jalan: '',
  // 例: 'a00000000000'

  /**
   * ko-fi / FANBOX などの投げ銭URL
   * どちらか使う方を入力（両方でも可）
   */
  kofi: '',
  // 例: 'https://ko-fi.com/yourname'

  fanbox: '',
  // 例: 'https://yourname.fanbox.cc'
}

/** チケットぴあ検索URL */
export function piaUrl(showTitle: string): string {
  const base = `https://ticket.pia.jp/pia/event/search?searchWord=${encodeURIComponent('劇団四季 ' + showTitle)}`
  return AFFILIATE.pia ? `${base}&a8=${AFFILIATE.pia}` : base
}

/** ローソンチケット検索URL */
export function ltikeUrl(showTitle: string): string {
  const base = `https://l-tike.com/search/?keyword=${encodeURIComponent('劇団四季 ' + showTitle)}`
  return AFFILIATE.ltike ? `${base}&sid=${AFFILIATE.ltike}` : base
}

/** イープラス検索URL */
export function eplusUrl(showTitle: string): string {
  const base = `https://eplus.jp/sf/word/?key=${encodeURIComponent('劇団四季 ' + showTitle)}`
  return AFFILIATE.eplus ? `${base}&af=${AFFILIATE.eplus}` : base
}

/** 楽天トラベル検索URL */
export function rakutenHotelUrl(area: string): string {
  const base = `https://travel.rakuten.co.jp/hotel/search/?f_cd=&f_keyword=${encodeURIComponent(area)}`
  return AFFILIATE.rakuten ? `${base}&af=${AFFILIATE.rakuten}` : base
}

/** じゃらん検索URL */
export function jalanUrl(area: string): string {
  const base = `https://www.jalan.net/yad/?keyword=${encodeURIComponent(area)}`
  return AFFILIATE.jalan ? `${base}&afid=${AFFILIATE.jalan}` : base
}
