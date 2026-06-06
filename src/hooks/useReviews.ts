import { useState, useCallback } from 'react'
import type { Review } from '../types'
import { loadReviews, saveReviews } from '../data/mock'

export function useReviews() {
  const [reviews, setReviews] = useState<Review[]>(() => loadReviews())

  const addReview = useCallback((review: Review) => {
    setReviews(prev => {
      const next = [review, ...prev]
      saveReviews(next)
      return next
    })
  }, [])

  const toggleFavorite = useCallback((reviewId: string) => {
    setReviews(prev => {
      const next = prev.map(r =>
        r.id === reviewId ? { ...r, isFavorite: !r.isFavorite } : r
      )
      saveReviews(next)
      return next
    })
  }, [])

  const getByShow = useCallback(
    (showId: string) => reviews.filter(r => r.showId === showId),
    [reviews]
  )

  const avgRating = useCallback(
    (showId: string) => {
      const rs = reviews.filter(r => r.showId === showId)
      if (!rs.length) return 0
      return rs.reduce((s, r) => s + r.rating, 0) / rs.length
    },
    [reviews]
  )

  const myReviews = reviews.filter(r => r.userId === 'u1')

  return { reviews, myReviews, addReview, toggleFavorite, getByShow, avgRating }
}
