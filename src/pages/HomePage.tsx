import { useState } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import { ShowCard } from '../components/ShowCard'
import { SHOWS } from '../data/mock'
import { useReviews } from '../hooks/useReviews'

const GENRES = ['すべて', 'ミュージカル', 'ストレートプレイ', 'ファミリーミュージカル'] as const
const STATUS = ['すべて', '上演中', '上演終了'] as const

export function HomePage() {
  const { getByShow, avgRating } = useReviews()
  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState('すべて')
  const [status, setStatus] = useState('すべて')

  const filtered = SHOWS.filter(s => {
    const q = query.toLowerCase()
    if (q && !s.title.includes(q) && !s.theater.includes(q) && !s.titleEn.toLowerCase().includes(q)) return false
    if (genre !== 'すべて' && s.genre !== genre) return false
    if (status === '上演中' && !s.currentlyRunning) return false
    if (status === '上演終了' && s.currentlyRunning) return false
    return true
  })

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-b from-shiki-darker to-transparent pt-4 pb-2 sticky top-0 z-10">
        <h1 className="text-2xl font-black text-gray-900 flex items-center gap-2">
          <img src="/favicon.svg" alt="" className="w-8 h-8" />
          shiki<span className="text-shiki-accent">x</span>
        </h1>
        <p className="text-[11px] text-gray-400 mb-3">劇団四季 非公式レビューアプリ</p>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="公演名・劇場を検索…"
            className="w-full bg-white border border-gray-200 rounded-full py-2.5 pl-9 pr-4 text-sm
                       text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-shiki-red/30 focus:border-shiki-red/50"
          />
        </div>
        <div className="flex gap-2 mt-2 overflow-x-auto pb-1 scrollbar-hide">
          {STATUS.map(s => (
            <button key={s} onClick={() => setStatus(s)}
              className={`badge whitespace-nowrap px-3 py-1 text-xs transition-colors
                ${status === s
                  ? 'bg-shiki-red text-white'
                  : 'bg-white border border-gray-200 text-gray-500 hover:text-gray-900'}`}>
              {s}
            </button>
          ))}
          <div className="w-px bg-gray-200 mx-1" />
          {GENRES.filter(g => g !== 'すべて').map(g => (
            <button key={g} onClick={() => setGenre(genre === g ? 'すべて' : g)}
              className={`badge whitespace-nowrap px-3 py-1 text-xs transition-colors
                ${genre === g
                  ? 'bg-gray-700 text-white'
                  : 'bg-white border border-gray-200 text-gray-500 hover:text-gray-900'}`}>
              {g}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-gray-400">{filtered.length}件の公演</p>

      <div className="space-y-3">
        {filtered.map(show => (
          <ShowCard
            key={show.id}
            show={show}
            reviewCount={getByShow(show.id).length}
            avgRating={avgRating(show.id)}
          />
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <SlidersHorizontal size={40} className="mx-auto mb-3 opacity-30" />
            <p>該当する公演が見つかりません</p>
          </div>
        )}
      </div>
    </div>
  )
}
