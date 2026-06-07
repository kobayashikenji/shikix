import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Heart } from 'lucide-react'
import { CASTS, SHOWS } from '../data/mock'
import { useReviews } from '../hooks/useReviews'

export function CastsPage() {
  const nav = useNavigate()
  const { reviews } = useReviews()
  const [query, setQuery] = useState('')

  const castFavoriteCount = (castId: string) =>
    reviews.filter(r => r.favoriteCastIds.includes(castId)).length

  const filtered = CASTS.filter(c => {
    const q = query.toLowerCase()
    return !q || c.name.includes(q) || c.nameKana.includes(q)
  })

  return (
    <div className="space-y-4">
      <div className="pt-4">
        <h1 className="text-2xl font-black mb-3 text-gray-900">キャスト</h1>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={query} onChange={e => setQuery(e.target.value)}
            placeholder="キャスト名を検索…"
            className="w-full bg-white border border-gray-200 rounded-full py-2.5 pl-9 pr-4 text-sm
                       text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-shiki-red/30 focus:border-shiki-red/50" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {filtered.map(cast => {
          const favCount = castFavoriteCount(cast.id)
          return (
            <button key={cast.id} onClick={() => nav(`/casts/${cast.id}`)}
              className="card text-left hover:shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]">
              <div className="text-4xl mb-2 text-center">🎭</div>
              <p className="font-bold text-sm text-center text-gray-900">{cast.name}</p>
              <p className="text-[10px] text-gray-400 text-center mb-2">{cast.nameKana}</p>
              {favCount > 0 ? (
                <div className="flex items-center justify-center gap-1 text-rose-500">
                  <Heart size={12} className="fill-rose-500" />
                  <p className="text-xs font-bold">{favCount}件のお気に入り</p>
                </div>
              ) : (
                <p className="text-xs text-gray-400 text-center">お気に入り登録なし</p>
              )}
              <div className="mt-2 space-y-0.5">
                {cast.roles.map(r => {
                  const s = SHOWS.find(sh => sh.id === r.showId)
                  return s ? (
                    <p key={r.showId} className="text-[10px] text-shiki-accent truncate">
                      {s.imageEmoji} {r.roleName}
                    </p>
                  ) : null
                })}
              </div>
            </button>
          )
        })}
      </div>
      <div className="h-4" />
    </div>
  )
}
