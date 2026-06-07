import { useState, useEffect, useCallback } from 'react'
import {
  collection, query, orderBy,
  onSnapshot, addDoc, serverTimestamp,
} from 'firebase/firestore'
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth'
import { db, auth } from '../lib/firebase'
import type { Review } from '../types'

const REVIEWS_COL = 'reviews'

export function useReviews() {
  const [reviews, setReviews]     = useState<Review[]>([])
  const [userId, setUserId]       = useState<string | null>(null)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [loading, setLoading]     = useState(true)

  // Anonymous auth
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async user => {
      if (user) {
        setUserId(user.uid)
        const stored = localStorage.getItem(`shiki-fav-${user.uid}`)
        if (stored) setFavorites(new Set(JSON.parse(stored) as string[]))
      } else {
        const { user: anon } = await signInAnonymously(auth)
        setUserId(anon.uid)
      }
    })
    return unsub
  }, [])

  // Firestore リアルタイム同期
  useEffect(() => {
    const q = query(collection(db, REVIEWS_COL), orderBy('postedAt', 'desc'))
    const unsub = onSnapshot(q, snapshot => {
      const data = snapshot.docs.map(d => {
        const raw = d.data()
        return {
          ...raw,
          id: d.id,
          postedAt: raw.postedAt?.toDate?.()?.toISOString() ?? raw.postedAt ?? '',
          // 旧データ（castRatings形式）には favoriteCastIds が存在しないため、空配列で補完
          favoriteCastIds: Array.isArray(raw.favoriteCastIds) ? raw.favoriteCastIds : [],
        } as Review
      })
      setReviews(data)
      setLoading(false)
    })
    return unsub
  }, [])

  // isFavorite をローカルのお気に入りセットとマージ
  const reviewsWithFav = reviews.map(r => ({
    ...r,
    isFavorite: favorites.has(r.id),
  }))

  const myReviews = userId
    ? reviewsWithFav.filter(r => r.userId === userId)
    : []

  const getByShow = useCallback(
    (showId: string) => reviewsWithFav.filter(r => r.showId === showId),
    [reviewsWithFav]
  )

  const avgRating = useCallback(
    (showId: string) => {
      const rs = reviews.filter(r => r.showId === showId)
      if (!rs.length) return 0
      return rs.reduce((s, r) => s + r.rating, 0) / rs.length
    },
    [reviews]
  )

  const addReview = useCallback(async (review: Omit<Review, 'id' | 'postedAt'>) => {
    await addDoc(collection(db, REVIEWS_COL), {
      ...review,
      userId: userId ?? 'anonymous',
      postedAt: serverTimestamp(),
    })
  }, [userId])

  const toggleFavorite = useCallback((reviewId: string) => {
    setFavorites(prev => {
      const next = new Set(prev)
      if (next.has(reviewId)) next.delete(reviewId)
      else next.add(reviewId)
      if (userId) localStorage.setItem(`shiki-fav-${userId}`, JSON.stringify([...next]))
      return next
    })
  }, [userId])

  return { reviews: reviewsWithFav, myReviews, loading, addReview, toggleFavorite, getByShow, avgRating }
}
