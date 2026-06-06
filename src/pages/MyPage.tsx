import { useNavigate } from 'react-router-dom'
import { CalendarDays, Heart, Theater, Star, TrendingUp } from 'lucide-react'
import { useReviews } from '../hooks/useReviews'
import { SHOWS } from '../data/mock'
import { ReviewCard } from '../components/ReviewCard'


export function MyPage() {
  const nav = useNavigate()
  const { myReviews, reviews, toggleFavorite } = useReviews()

  const favorites = reviews.filter(r => r.isFavorite)
  const totalShows = new Set(myReviews.map(r => r.showId)).size
  const avgMyRating = myReviews.length
    ? myReviews.reduce((s, r) => s + r.rating, 0) / myReviews.length
    : 0

  const showFreq = myReviews.reduce<Record<string, number>>((acc, r) => {
    acc[r.showId] = (acc[r.showId] ?? 0) + 1
    return acc
  }, {})
  const mostVisited = Object.entries(showFreq).sort((a, b) => b[1] - a[1])[0]
  const mostVisitedShow = mostVisited ? SHOWS.find(s => s.id === mostVisited[0]) : null

  return (
    <div className="space-y-5">
      <div className="pt-4">
        <h1 className="text-2xl font-black mb-1 text-gray-900">マイページ</h1>
        <p className="text-sm text-gray-400">あなたの観劇記録</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="card text-center">
          <Theater size={28} className="mx-auto text-shiki-accent mb-1" />
          <p className="text-3xl font-black text-gray-900">{myReviews.length}</p>
          <p className="text-xs text-gray-400">レビュー数</p>
        </div>
        <div className="card text-center">
          <CalendarDays size={28} className="mx-auto text-blue-400 mb-1" />
          <p className="text-3xl font-black text-gray-900">{totalShows}</p>
          <p className="text-xs text-gray-400">鑑賞作品数</p>
        </div>
        <div className="card text-center">
          <Star size={28} className="mx-auto text-amber-400 mb-1" />
          <p className="text-3xl font-black text-gray-900">{avgMyRating > 0 ? avgMyRating.toFixed(1) : '—'}</p>
          <p className="text-xs text-gray-400">平均評価</p>
        </div>
        <div className="card text-center">
          <Heart size={28} className="mx-auto text-rose-400 mb-1" />
          <p className="text-3xl font-black text-gray-900">{favorites.length}</p>
          <p className="text-xs text-gray-400">お気に入り</p>
        </div>
      </div>

      {mostVisitedShow && (
        <div className="card flex items-center gap-3">
          <TrendingUp size={20} className="text-gray-400 flex-shrink-0" />
          <div>
            <p className="text-xs text-gray-400">よく観る公演</p>
            <p className="font-bold text-gray-900">{mostVisitedShow.imageEmoji} {mostVisitedShow.title}</p>
          </div>
          <span className="ml-auto text-gray-600 font-bold">{mostVisited![1]}回</span>
        </div>
      )}

      {myReviews.length === 0 ? (
        <div className="card text-center py-12 space-y-3">
          <p className="text-4xl">📝</p>
          <p className="font-bold text-gray-900">まだレビューがありません</p>
          <p className="text-sm text-gray-400">公演を見てレビューを書いてみましょう</p>
          <button onClick={() => nav('/')} className="btn-primary text-sm">
            公演一覧へ
          </button>
        </div>
      ) : (
        <>
          {favorites.length > 0 && (
            <section>
              <h3 className="font-bold mb-2 flex items-center gap-1 text-gray-700">
                <Heart size={16} className="text-rose-400 fill-rose-400" />
                お気に入りレビュー
              </h3>
              <div className="space-y-3">
                {favorites.map(r => {
                  const show = SHOWS.find(s => s.id === r.showId)
                  return (
                    <ReviewCard key={r.id} review={r}
                      showTitle={show?.title}
                      onToggleFavorite={toggleFavorite} />
                  )
                })}
              </div>
            </section>
          )}

          <section>
            <h3 className="font-bold mb-2 text-gray-700">自分のレビュー</h3>
            <div className="space-y-3">
              {myReviews.map(r => {
                const show = SHOWS.find(s => s.id === r.showId)
                return (
                  <button key={r.id} onClick={() => nav(`/shows/${r.showId}`)} className="w-full text-left">
                    <ReviewCard review={r} showTitle={show?.title} onToggleFavorite={toggleFavorite} />
                  </button>
                )
              })}
            </div>
          </section>
        </>
      )}
      <p className="text-[11px] text-gray-400 text-center leading-relaxed px-4 pb-2">
        本アプリは劇団四季（株式会社四季）とは一切関係のない、個人の非公式アプリです。
      </p>
      <div className="h-4" />
    </div>
  )
}
