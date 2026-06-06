import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Send } from 'lucide-react'
import { SHOWS, CASTS } from '../data/mock'
import { useReviews } from '../hooks/useReviews'
import { StarRating } from '../components/StarRating'
import type { Review } from '../types'

export function ReviewFormPage() {
  const { id } = useParams<{ id: string }>()
  const nav = useNavigate()
  const { addReview } = useReviews()

  const show = SHOWS.find(s => s.id === id)
  if (!show) return null

  const casts = show.castIds.map(cid => CASTS.find(c => c.id === cid)).filter(Boolean) as typeof CASTS

  const [rating, setRating] = useState(0)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [seat, setSeat] = useState('')
  const [castRatings, setCastRatings] = useState<{ castId: string; rating: number; comment: string }[]>(
    casts.map(c => ({ castId: c.id, rating: 0, comment: '' }))
  )

  const updateCastRating = (castId: string, field: 'rating' | 'comment', value: string | number) => {
    setCastRatings(prev => prev.map(cr => cr.castId === castId ? { ...cr, [field]: value } : cr))
  }

  const canSubmit = rating > 0 && title.trim() && body.trim()

  const handleSubmit = () => {
    if (!canSubmit) return
    const review: Review = {
      id: `r${Date.now()}`,
      showId: show.id,
      userId: 'u1',
      userName: 'あなた',
      postedAt: new Date().toISOString(),
      date, rating, title: title.trim(), body: body.trim(), seat,
      isFavorite: false,
      castRatings: castRatings.filter(cr => cr.rating > 0 || cr.comment),
    }
    addReview(review)
    nav(`/shows/${show.id}`, { replace: true })
  }

  return (
    <div className="space-y-5 pb-8">
      <div className="flex items-center gap-2 pt-1">
        <button onClick={() => nav(-1)} className="btn-ghost p-2 -ml-2">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 className="font-black text-lg leading-tight text-gray-900">レビューを書く</h2>
          <p className="text-xs text-shiki-accent">{show.title}</p>
        </div>
      </div>

      <div className="card space-y-3">
        <label className="text-sm font-bold text-gray-700">総合評価 <span className="text-rose-400">*</span></label>
        <div className="flex justify-center">
          <StarRating value={rating} size={40} interactive onChange={setRating} />
        </div>
        {rating > 0 && (
          <p className="text-center text-xs text-gray-400">
            {['', 'もう少し…', 'まずまず', 'よかった', 'とても良かった', '最高！'][rating]}
          </p>
        )}
      </div>

      <div className="card space-y-3">
        <label className="text-sm font-bold text-gray-700">観劇情報</label>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-gray-500 mb-1">観劇日 <span className="text-rose-400">*</span></p>
            <input type="date" value={date} onChange={e => setDate(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-900
                         focus:outline-none focus:ring-2 focus:ring-shiki-red/30 focus:border-shiki-red/50" />
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">座席</p>
            <input value={seat} onChange={e => setSeat(e.target.value)}
              placeholder="例: 1階E列10番"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-900
                         placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-shiki-red/30 focus:border-shiki-red/50" />
          </div>
        </div>
      </div>

      <div className="card space-y-3">
        <div>
          <label className="text-sm font-bold text-gray-700 block mb-1">
            タイトル <span className="text-rose-400">*</span>
          </label>
          <input value={title} onChange={e => setTitle(e.target.value)}
            placeholder="一言で感想を"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-900
                       placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-shiki-red/30 focus:border-shiki-red/50" />
        </div>
        <div>
          <label className="text-sm font-bold text-gray-700 block mb-1">
            感想 <span className="text-rose-400">*</span>
          </label>
          <textarea value={body} onChange={e => setBody(e.target.value)}
            rows={5} placeholder="公演の感想を自由に書いてください…"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-900
                       placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-shiki-red/30 focus:border-shiki-red/50 resize-none" />
          <p className="text-right text-xs text-gray-400 mt-1">{body.length}文字</p>
        </div>
      </div>

      {casts.length > 0 && (
        <div className="card space-y-4">
          <h3 className="text-sm font-bold text-gray-700">キャスト別評価（任意）</h3>
          {casts.map(cast => {
            const role = cast.roles.find(r => r.showId === show.id)
            const cr = castRatings.find(c => c.castId === cast.id)!
            return (
              <div key={cast.id} className="space-y-2 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-sm text-gray-900">{cast.name}</p>
                    <p className="text-xs text-shiki-accent">{role?.roleName}</p>
                  </div>
                  <StarRating value={cr.rating} size={22} interactive
                    onChange={v => updateCastRating(cast.id, 'rating', v)} />
                </div>
                <input value={cr.comment} onChange={e => updateCastRating(cast.id, 'comment', e.target.value)}
                  placeholder="このキャストへのコメント（任意）"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-900
                             placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-shiki-red/30 focus:border-shiki-red/50" />
              </div>
            )
          })}
        </div>
      )}

      <button onClick={handleSubmit} disabled={!canSubmit}
        className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-base transition-all
          ${canSubmit
            ? 'bg-shiki-red hover:bg-teal-700 text-white active:scale-95'
            : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}>
        <Send size={18} />
        レビューを投稿する
      </button>
    </div>
  )
}
