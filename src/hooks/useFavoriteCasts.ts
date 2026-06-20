import { useState, useEffect, useCallback } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../lib/firebase'

// レビューのお気に入り（useReviews.ts）と同様、ローカルストレージのみで永続化する
// 端末ローカルな個人設定。userIdをキーにすることで匿名/ログインユーザーを区別する。
export function useFavoriteCasts() {
  const [userId, setUserId] = useState<string | null>(null)
  const [favoriteCastIds, setFavoriteCastIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      if (user) {
        setUserId(user.uid)
        const stored = localStorage.getItem(`shiki-fav-cast-${user.uid}`)
        setFavoriteCastIds(stored ? new Set(JSON.parse(stored) as string[]) : new Set())
      } else {
        setUserId(null)
        setFavoriteCastIds(new Set())
      }
    })
    return unsub
  }, [])

  const isFavoriteCast = useCallback(
    (castId: string) => favoriteCastIds.has(castId),
    [favoriteCastIds]
  )

  const toggleFavoriteCast = useCallback((castId: string) => {
    setFavoriteCastIds(prev => {
      const next = new Set(prev)
      if (next.has(castId)) next.delete(castId)
      else next.add(castId)
      if (userId) localStorage.setItem(`shiki-fav-cast-${userId}`, JSON.stringify([...next]))
      return next
    })
  }, [userId])

  return { favoriteCastIds, isFavoriteCast, toggleFavoriteCast }
}
