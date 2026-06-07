import { Heart, CalendarDays, Armchair } from 'lucide-react'
import { StarRating } from './StarRating'
import { CASTS } from '../data/mock'
import type { Review } from '../types'

interface Props {
  review: Review
  showTitle?: string
  onToggleFavorite?: (id: string) => void
}

export function ReviewCard({ review, showTitle, onToggleFavorite }: Props) {
  return (
    <div className="card space-y-3">
      <div className="flex justify-between items-start">
        <div>
          {showTitle && (
            <p className="text-xs text-shiki-accent font-semibold mb-1">{showTitle}</p>
          )}
          <h4 className="font-bold text-base leading-tight text-gray-900">{review.title}</h4>
          <p className="text-xs text-gray-400 mt-0.5">{review.userName}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <StarRating value={review.rating} size={16} />
          <button
            onClick={() => onToggleFavorite?.(review.id)}
            className="text-gray-300 hover:text-rose-400 transition-colors"
          >
            <Heart
              size={18}
              className={review.isFavorite ? 'fill-rose-400 text-rose-400' : ''}
            />
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">{review.body}</p>

      <div className="flex gap-4 text-xs text-gray-400">
        <span className="flex items-center gap-1">
          <CalendarDays size={12} />
          {review.date}
        </span>
        {review.seat && (
          <span className="flex items-center gap-1">
            <Armchair size={12} />
            {review.seat}
          </span>
        )}
      </div>

      {review.favoriteCastIds.length > 0 && (
        <div className="pt-2 border-t border-gray-100 flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-gray-400">お気に入り:</span>
          {review.favoriteCastIds.map(castId => {
            const cast = CASTS.find(c => c.id === castId)
            if (!cast) return null
            return (
              <span key={castId} className="flex items-center gap-1 bg-rose-50 text-rose-600 rounded-full px-2 py-0.5 text-xs">
                <Heart size={10} className="fill-rose-500 text-rose-500" />
                {cast.name}
              </span>
            )
          })}
        </div>
      )}
    </div>
  )
}
