import { useState, useEffect, useCallback } from 'react'
import {
  collection, query, orderBy, limit,
  onSnapshot, addDoc, serverTimestamp,
} from 'firebase/firestore'
import { db } from '../lib/firebase'
import type { Cheer } from '../types'

const CHEERS_COL = 'cheers'

export function useCheers() {
  const [cheers, setCheers]   = useState<Cheer[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const q = query(collection(db, CHEERS_COL), orderBy('postedAt', 'desc'), limit(20))
    const unsub = onSnapshot(q, snapshot => {
      const data = snapshot.docs.map(d => {
        const raw = d.data()
        return {
          ...raw,
          id: d.id,
          postedAt: raw.postedAt?.toDate?.()?.toISOString() ?? raw.postedAt ?? '',
        } as Cheer
      })
      setCheers(data)
      setLoading(false)
    })
    return unsub
  }, [])

  const addCheer = useCallback(async (name: string, message: string) => {
    await addDoc(collection(db, CHEERS_COL), {
      name: name.trim() || '匿名さん',
      message: message.trim(),
      postedAt: serverTimestamp(),
    })
  }, [])

  return { cheers, loading, addCheer }
}
