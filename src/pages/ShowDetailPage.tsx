import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, MapPin, Pencil, Star, Users, ExternalLink, Ticket } from 'lucide-react'
import { SHOWS, CASTS } from '../data/mock'
import { useReviews } from '../hooks/useReviews'
import { ReviewCard } from '../components/ReviewCard'
import { StarRating } from '../components/StarRating'

export function ShowDetailPage() {
  const { id } = useParams<{ id: string }>()
  const nav = useNavigate()
  const { getByShow, avgRating, toggleFavorite } = useReviews()

  const show = SHOWS.find(s => s.id === id)
  if (!show) return <div className="text-center py-20 text-gray-400">公演が見つかりません</div>

  const reviews = getByShow(show.id)
  const avg = avgRating(show.id)
  const casts = show.castIds.map(cid => CASTS.find(c => c.id === cid)).filter(Boolean) as typeof CASTS

  const castAvg = (castId: string) => {
    const ratings = reviews.flatMap(r => r.castRatings.filter(cr => cr.castId === castId))
    if (!ratings.length) return 0
    return ratings.reduce((s, cr) => s + cr.rating, 0) / ratings.length
  }

  return (
    <div className="space-y-5">
      {/* ヒーロー：ポスター左 + 情報右（Filmarks風） */}
      <div className="relative -mx-4 -mt-4 bg-white border-b border-gray-100">
        <button onClick={() => nav(-1)} className="btn-ghost absolute top-3 left-2 z-10 flex items-center gap-1 text-sm">
          <ArrowLeft size={16} /> 戻る
        </button>
        <div className="flex gap-4 px-4 pt-12 pb-5">
          {/* 縦長ポスター (2:3) */}
          <div className="w-28 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100 shadow-md" style={{ aspectRatio: '2/3' }}>
            <img src={show.image} alt={show.title} className="w-full h-full object-cover object-center" />
          </div>
          {/* タイトル・情報 */}
          <div className="flex-1 min-w-0 pt-1">
            <div className="flex flex-wrap gap-1.5 mb-2">
              <span className={`badge ${show.currentlyRunning ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                {show.currentlyRunning ? '上演中' : '上演終了'}
              </span>
              <span className="badge bg-teal-50 text-teal-700">{show.genre}</span>
            </div>
            <h2 className="text-xl font-black leading-tight text-gray-900 mb-0.5">{show.title}</h2>
            <p className="text-[11px] text-gray-400 mb-2">{show.titleEn}</p>
            <button
              onClick={() => nav(`/theaters/${show.theaterId}`)}
              className="flex items-center gap-1 text-xs text-shiki-accent mb-3 hover:underline"
            >
              <MapPin size={11} /> {show.theater}
            </button>
            {/* 評価 */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl font-black text-amber-500">{avg > 0 ? avg.toFixed(1) : '—'}</span>
              <div>
                <StarRating value={avg} size={14} />
                <p className="text-[10px] text-gray-400 mt-0.5">{reviews.length}件</p>
              </div>
            </div>
            <button
              onClick={() => nav(`/shows/${show.id}/review/new`)}
              className="btn-primary flex items-center gap-1 text-xs py-1.5 px-3"
            >
              <Pencil size={12} /> レビューを書く
            </button>
          </div>
        </div>
        {/* あらすじ */}
        <p className="text-sm text-gray-600 leading-relaxed px-4 pb-5">{show.synopsis}</p>
      </div>

      {/* 評価分布 */}
      <div className="card flex items-center gap-4">
        <div className="text-center">
          <div className="text-4xl font-black text-amber-500">{avg > 0 ? avg.toFixed(1) : '—'}</div>
          <StarRating value={avg} size={16} />
          <p className="text-xs text-gray-400 mt-1">{reviews.length}件のレビュー</p>
        </div>
        <div className="flex-1 space-y-1">
          {[5,4,3,2,1].map(s => {
            const cnt = reviews.filter(r => r.rating === s).length
            const pct = reviews.length ? (cnt / reviews.length) * 100 : 0
            return (
              <div key={s} className="flex items-center gap-2 text-xs">
                <Star size={11} className="text-amber-400 fill-amber-400 flex-shrink-0" />
                <span className="w-3 text-gray-400">{s}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full transition-all" style={{ width: `${pct}%` }} />
                </div>
                <span className="w-6 text-right text-gray-400">{cnt}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* キャスト */}
      {casts.length > 0 && (
        <section>
          <h3 className="font-bold text-sm text-gray-500 mb-2 flex items-center gap-1">
            <Users size={14} /> キャスト
          </h3>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {casts.map(cast => {
              const role = cast.roles.find(r => r.showId === show.id)
              const avg = castAvg(cast.id)
              return (
                <button
                  key={cast.id}
                  onClick={() => nav(`/casts/${cast.id}`)}
                  className="flex-shrink-0 bg-white border border-gray-100 hover:border-gray-200 hover:bg-gray-50
                             transition-colors rounded-xl p-3 text-center w-28 shadow-sm"
                >
                  <div className="text-2xl mb-1">🎭</div>
                  <p className="font-bold text-xs leading-tight text-gray-900">{cast.name}</p>
                  <p className="text-[10px] text-shiki-accent mt-0.5">{role?.roleName}</p>
                  {avg > 0 && (
                    <div className="flex justify-center mt-1">
                      <StarRating value={avg} size={10} />
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </section>
      )}

      {/* チケット購入 */}
      <section>
        <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-1.5">
          <Ticket size={16} className="text-shiki-accent" />
          チケット購入
        </h3>
        {show.currentlyRunning ? (
          <div className="card space-y-3">
            <p className="text-xs text-gray-500">
              各チケットサービスで「劇団四季 {show.title}」を検索できます
            </p>
            {/* ぴあ */}
            <a
              href={`https://ticket.pia.jp/pia/event/search?searchWord=${encodeURIComponent('劇団四季 ' + show.title)}`
                /* アフィリエイトパラメータ: &af=YOUR_PIA_AFFILIATE_ID */}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 active:scale-[0.99] transition-all"
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 font-black text-sm text-white"
                   style={{ background: '#E8192C' }}>
                ぴあ
              </div>
              <div className="flex-1">
                <p className="font-bold text-sm text-gray-900">チケットぴあ</p>
                <p className="text-xs text-gray-400">pia.jp</p>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="badge bg-green-50 text-green-700 text-[10px]">発売中</span>
                <ExternalLink size={14} className="text-gray-300" />
              </div>
            </a>
            {/* ローチケ */}
            <a
              href={`https://l-tike.com/search/?keyword=${encodeURIComponent('劇団四季 ' + show.title)}`
                /* アフィリエイトパラメータ: &af=YOUR_LTIKE_AFFILIATE_ID */}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 active:scale-[0.99] transition-all"
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 font-black text-[11px] text-white leading-tight text-center"
                   style={{ background: '#003087' }}>
                ロー<br/>チケ
              </div>
              <div className="flex-1">
                <p className="font-bold text-sm text-gray-900">ローソンチケット</p>
                <p className="text-xs text-gray-400">l-tike.com</p>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="badge bg-green-50 text-green-700 text-[10px]">発売中</span>
                <ExternalLink size={14} className="text-gray-300" />
              </div>
            </a>
            {/* e+ */}
            <a
              href={`https://eplus.jp/sf/word/?key=${encodeURIComponent('劇団四季 ' + show.title)}`
                /* アフィリエイトパラメータ: &af=YOUR_EPLUS_AFFILIATE_ID */}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 active:scale-[0.99] transition-all"
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 font-black text-sm text-white"
                   style={{ background: '#FF6B2B' }}>
                e+
              </div>
              <div className="flex-1">
                <p className="font-bold text-sm text-gray-900">イープラス</p>
                <p className="text-xs text-gray-400">eplus.jp</p>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="badge bg-green-50 text-green-700 text-[10px]">発売中</span>
                <ExternalLink size={14} className="text-gray-300" />
              </div>
            </a>
            {/* 劇団四季公式 */}
            <a
              href={show.officialUrl}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 active:scale-[0.99] transition-all"
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 font-black text-[10px] text-white leading-tight text-center"
                   style={{ background: '#1a1a2e' }}>
                劇団<br/>四季
              </div>
              <div className="flex-1">
                <p className="font-bold text-sm text-gray-900">劇団四季公式サイト</p>
                <p className="text-xs text-gray-400">shiki.jp</p>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="badge bg-blue-50 text-blue-600 text-[10px]">公式</span>
                <ExternalLink size={14} className="text-gray-300" />
              </div>
            </a>
            <p className="text-[10px] text-gray-400 text-center pt-1">
              ※ リンク先での購入により手数料が発生する場合があります
            </p>
          </div>
        ) : (
          <div className="card text-center py-6 text-gray-400">
            <Ticket size={28} className="mx-auto mb-2 opacity-30" />
            <p className="text-sm">この公演は現在取り扱いがありません</p>
          </div>
        )}
      </section>

      {/* レビュー一覧 */}
      <section>
        <h3 className="font-bold text-gray-900 mb-3">レビュー（{reviews.length}件）</h3>
        {reviews.length === 0 ? (
          <div className="card text-center py-10 text-gray-400">
            <p>まだレビューがありません</p>
            <p className="text-sm mt-1">最初のレビューを書きましょう！</p>
          </div>
        ) : (
          <div className="space-y-3">
            {reviews.map(r => (
              <ReviewCard key={r.id} review={r} onToggleFavorite={toggleFavorite} />
            ))}
          </div>
        )}
      </section>

      <div className="h-4" />
    </div>
  )
}
