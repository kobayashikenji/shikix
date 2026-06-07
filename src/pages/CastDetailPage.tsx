import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, CalendarDays, Clock, Heart } from 'lucide-react'
import { CASTS, SHOWS } from '../data/mock'
import { useReviews } from '../hooks/useReviews'
import { ReviewCard } from '../components/ReviewCard'

function formatPeriod(start: string, end?: string): string {
  const fmt = (d: string) => {
    const [y, m] = d.split('-')
    return `${y}年${parseInt(m)}月`
  }
  return end ? `${fmt(start)} 〜 ${fmt(end)}` : `${fmt(start)} 〜 現在`
}

function isRecent(_start: string, end?: string): boolean {
  const now = new Date('2026-06-01')
  const endDate = end ? new Date(end) : now
  const monthsAgo = (now.getTime() - endDate.getTime()) / (1000 * 60 * 60 * 24 * 30)
  return monthsAgo < 18 // 18ヶ月以内
}

export function CastDetailPage() {
  const { id } = useParams<{ id: string }>()
  const nav = useNavigate()
  const { reviews, toggleFavorite } = useReviews()

  const cast = CASTS.find(c => c.id === id)
  if (!cast) return <div className="text-center py-20 text-gray-400">キャストが見つかりません</div>

  const reviewsWithCast = reviews.filter(r => r.favoriteCastIds.includes(cast.id))

  // 直近の出演作品：periodStartの降順でソート
  const sortedRoles = [...cast.roles].sort(
    (a, b) => new Date(b.periodStart).getTime() - new Date(a.periodStart).getTime()
  )

  const currentRoles = sortedRoles.filter(r => !r.periodEnd)
  const pastRoles    = sortedRoles.filter(r => !!r.periodEnd)

  return (
    <div className="space-y-5">
      <div className="pt-4">
        <button onClick={() => nav(-1)} className="btn-ghost -ml-2 flex items-center gap-1 text-sm mb-3">
          <ArrowLeft size={16} /> 戻る
        </button>

        {/* プロフィールカード */}
        <div className="card flex items-center gap-4">
          <div className="w-16 h-16 flex items-center justify-center bg-gray-50 rounded-xl flex-shrink-0 border border-gray-100 text-4xl">
            🎭
          </div>
          <div>
            <h2 className="text-xl font-black text-gray-900">{cast.name}</h2>
            <p className="text-sm text-gray-400">{cast.nameKana}</p>
            {reviewsWithCast.length > 0 && (
              <div className="flex items-center gap-1.5 mt-1 text-rose-500">
                <Heart size={16} className="fill-rose-500" />
                <span className="font-bold">{reviewsWithCast.length}件</span>
                <span className="text-xs text-gray-400">のお気に入り登録</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 現在出演中 */}
      {currentRoles.length > 0 && (
        <section>
          <h3 className="font-bold text-sm text-gray-700 mb-2 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block animate-pulse" />
            現在出演中
          </h3>
          <div className="space-y-2">
            {currentRoles.map(role => {
              const show = SHOWS.find(s => s.id === role.showId)
              if (!show) return null
              return (
                <button key={role.showId} onClick={() => nav(`/shows/${show.id}`)}
                  className="w-full card text-left flex items-center gap-3 border border-green-100 hover:shadow-md transition-all active:scale-[0.99]">
                  <div className="w-12 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100" style={{ aspectRatio: '2/3' }}>
                    <img src={show.image} alt={show.title} className="w-full h-full object-cover object-center" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-black text-base text-gray-900">{show.title}</p>
                    <p className="text-sm text-shiki-accent font-medium">{role.roleName}</p>
                    <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                      <CalendarDays size={11} />
                      {formatPeriod(role.periodStart)}
                    </p>
                  </div>
                  <span className="badge bg-green-50 text-green-700 flex-shrink-0">上演中</span>
                </button>
              )
            })}
          </div>
        </section>
      )}

      {/* 直近・過去の出演 */}
      {pastRoles.length > 0 && (
        <section>
          <h3 className="font-bold text-sm text-gray-700 mb-3 flex items-center gap-1.5">
            <Clock size={14} className="text-gray-400" />
            過去の出演作品
          </h3>
          {/* タイムライン */}
          <div className="relative pl-5">
            <div className="absolute left-1.5 top-2 bottom-2 w-px bg-gray-200" />
            <div className="space-y-4">
              {pastRoles.map((role, i) => {
                const show = SHOWS.find(s => s.id === role.showId)
                if (!show) return null
                const recent = isRecent(role.periodStart, role.periodEnd)
                return (
                  <div key={`${role.showId}-${i}`} className="relative">
                    {/* タイムラインドット */}
                    <div className={`absolute -left-5 top-3 w-3 h-3 rounded-full border-2 border-white
                      ${recent ? 'bg-shiki-accent' : 'bg-gray-300'}`} />
                    <button
                      onClick={() => nav(`/shows/${show.id}`)}
                      className="w-full card text-left flex items-center gap-3 hover:shadow-md transition-all active:scale-[0.99]"
                    >
                      <div className="w-10 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100" style={{ aspectRatio: '2/3' }}>
                        <img src={show.image} alt={show.title} className="w-full h-full object-cover object-center" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm text-gray-900">{show.title}</p>
                        <p className="text-xs text-shiki-accent">{role.roleName}</p>
                        <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                          <CalendarDays size={10} />
                          {formatPeriod(role.periodStart, role.periodEnd)}
                        </p>
                      </div>
                      {recent && (
                        <span className="badge bg-teal-50 text-teal-600 flex-shrink-0 text-[10px]">直近</span>
                      )}
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* このキャストへのレビュー */}
      <section>
        <h3 className="font-bold text-sm text-gray-700 mb-2">このキャストへのレビュー（{reviewsWithCast.length}件）</h3>
        {reviewsWithCast.length === 0 ? (
          <div className="card text-center py-8 text-gray-400 text-sm">評価がまだありません</div>
        ) : (
          <div className="space-y-3">
            {reviewsWithCast.map(r => {
              const show = SHOWS.find(s => s.id === r.showId)
              return (
                <ReviewCard key={r.id} review={r}
                  showTitle={show?.title}
                  onToggleFavorite={toggleFavorite} />
              )
            })}
          </div>
        )}
      </section>
      <div className="h-4" />
    </div>
  )
}
