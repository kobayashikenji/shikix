import { useNavigate } from 'react-router-dom'
import { Flame, Star, TrendingUp, MessageSquare, ChevronRight } from 'lucide-react'
import { SHOWS } from '../data/mock'
import { useReviews } from '../hooks/useReviews'
import { StarRating } from '../components/StarRating'

export function HotPage() {
  const nav = useNavigate()
  const { reviews, getByShow, avgRating } = useReviews()

  // 人気スコア = 平均評価 × レビュー数
  const scored = SHOWS.map(show => ({
    show,
    reviewCount: getByShow(show.id).length,
    avg: avgRating(show.id),
    score: avgRating(show.id) * getByShow(show.id).length,
  })).sort((a, b) => b.score - a.score)

  const hero = scored[0]
  const ranking = scored.slice(0, 5)

  // 新着レビュー（全公演、最新順）
  const latestReviews = [...reviews]
    .sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime())
    .slice(0, 5)

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="pt-4">
        <h1 className="text-2xl font-black text-gray-900 flex items-center gap-2">
          <Flame size={24} className="text-orange-500 fill-orange-400" />
          Hot
        </h1>
        <p className="text-sm text-gray-400 mt-0.5">話題の公演をチェック</p>
      </div>

      {/* ヒーローバナー（1位） */}
      {hero && hero.reviewCount > 0 && (
        <section>
          <button
            onClick={() => nav(`/shows/${hero.show.id}`)}
            className="w-full rounded-2xl overflow-hidden shadow-md relative active:scale-[0.99] transition-transform"
          >
            {/* 画像 */}
            <div className="w-full" style={{ aspectRatio: '16/9' }}>
              <img
                src={hero.show.image}
                alt={hero.show.title}
                className="w-full h-full object-cover object-center"
              />
            </div>
            {/* グラデーションオーバーレイ */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            {/* バッジ */}
            <div className="absolute top-3 left-3">
              <span className="flex items-center gap-1 bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
                <Flame size={11} className="fill-white" /> 今最も人気
              </span>
            </div>
            {/* テキスト */}
            <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
              <p className="text-white/70 text-xs mb-0.5">{hero.show.titleEn}</p>
              <h2 className="text-white text-xl font-black leading-tight mb-2">{hero.show.title}</h2>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <StarRating value={hero.avg} size={14} />
                  <span className="text-amber-400 font-bold text-sm">{hero.avg.toFixed(1)}</span>
                </div>
                <span className="text-white/60 text-xs flex items-center gap-1">
                  <MessageSquare size={11} /> {hero.reviewCount}件のレビュー
                </span>
              </div>
            </div>
          </button>
        </section>
      )}

      {/* ランキング */}
      <section>
        <h2 className="font-black text-gray-900 flex items-center gap-2 mb-3">
          <TrendingUp size={18} className="text-shiki-accent" />
          人気ランキング
        </h2>
        <div className="card divide-y divide-gray-100 p-0 overflow-hidden">
          {ranking.map(({ show, reviewCount, avg, score }, i) => (
            <button
              key={show.id}
              onClick={() => nav(`/shows/${show.id}`)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 active:bg-gray-100 transition-colors text-left"
            >
              {/* 順位 */}
              <span className={`w-7 text-center font-black text-lg flex-shrink-0 ${
                i === 0 ? 'text-amber-500' :
                i === 1 ? 'text-gray-400' :
                i === 2 ? 'text-orange-700' :
                'text-gray-300'
              }`}>
                {i + 1}
              </span>
              {/* サムネイル */}
              <div className="w-10 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100" style={{ aspectRatio: '2/3' }}>
                <img src={show.image} alt={show.title} className="w-full h-full object-cover object-center" />
              </div>
              {/* 情報 */}
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm text-gray-900 truncate">{show.title}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  {avg > 0 ? (
                    <>
                      <StarRating value={avg} size={11} />
                      <span className="text-xs text-amber-500 font-bold">{avg.toFixed(1)}</span>
                    </>
                  ) : (
                    <span className="text-xs text-gray-400">レビューなし</span>
                  )}
                  <span className="text-xs text-gray-400 flex items-center gap-0.5">
                    <MessageSquare size={10} />{reviewCount}
                  </span>
                </div>
              </div>
              {/* 上演中バッジ */}
              <div className="flex-shrink-0 flex flex-col items-end gap-1">
                {show.currentlyRunning && (
                  <span className="text-[10px] bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-medium">上演中</span>
                )}
                <ChevronRight size={14} className="text-gray-300" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 新着レビュー */}
      <section>
        <h2 className="font-black text-gray-900 flex items-center gap-2 mb-3">
          <MessageSquare size={18} className="text-shiki-accent" />
          新着レビュー
        </h2>
        <div className="space-y-3">
          {latestReviews.map(review => {
            const show = SHOWS.find(s => s.id === review.showId)
            if (!show) return null
            return (
              <button
                key={review.id}
                onClick={() => nav(`/shows/${show.id}`)}
                className="w-full card text-left hover:shadow-md transition-shadow active:scale-[0.99]"
              >
                <div className="flex gap-3">
                  {/* 縦長サムネイル */}
                  <div className="w-10 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100" style={{ aspectRatio: '2/3' }}>
                    <img src={show.image} alt={show.title} className="w-full h-full object-cover object-center" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] text-shiki-accent font-semibold mb-0.5">{show.title}</p>
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-bold text-sm text-gray-900 truncate pr-2">{review.title}</p>
                      <StarRating value={review.rating} size={12} />
                    </div>
                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{review.body}</p>
                    <p className="text-[11px] text-gray-400 mt-1.5">{review.userName} · {review.date}</p>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </section>

      <div className="h-4" />
    </div>
  )
}
