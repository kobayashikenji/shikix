import { useNavigate } from 'react-router-dom'
import { MapPin, MessageSquare } from 'lucide-react'
import { StarRating } from './StarRating'
import type { Show } from '../types'

interface Props {
  show: Show
  reviewCount: number
  avgRating: number
}

export function ShowCard({ show, reviewCount, avgRating }: Props) {
  const nav = useNavigate()
  return (
    <div
      onClick={() => nav(`/shows/${show.id}`)}
      className="card cursor-pointer hover:shadow-md transition-all active:scale-[0.99] flex gap-4"
    >
      {/* 縦長サムネイル (2:3) */}
      <div className="w-20 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100" style={{ aspectRatio: '2/3' }}>
        <img src={show.image} alt={show.title} className="w-full h-full object-cover object-center" />
      </div>

      {/* テキスト情報 */}
      <div className="flex-1 min-w-0 py-1">
        <div className="flex items-center gap-1.5 mb-1">
          <span className={`badge text-[10px] ${show.currentlyRunning ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
            {show.currentlyRunning ? '上演中' : '上演終了'}
          </span>
          <span className="badge text-[10px] bg-teal-50 text-teal-700">{show.genre}</span>
        </div>
        <h3 className="font-bold text-base leading-tight text-gray-900">{show.title}</h3>
        <p className="text-[11px] text-gray-400 mb-1.5">{show.titleEn}</p>
        <div className="flex items-center gap-1 text-[11px] text-gray-400 mb-2">
          <MapPin size={11} />
          <span className="truncate">{show.theater}</span>
        </div>
        <div className="flex items-center gap-2">
          {avgRating > 0 ? (
            <>
              <StarRating value={avgRating} size={12} />
              <span className="text-sm font-bold text-amber-500">{avgRating.toFixed(1)}</span>
            </>
          ) : (
            <span className="text-xs text-gray-400">まだレビューなし</span>
          )}
          <div className="flex items-center gap-1 text-gray-400 text-[11px] ml-auto">
            <MessageSquare size={11} />
            <span>{reviewCount}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
