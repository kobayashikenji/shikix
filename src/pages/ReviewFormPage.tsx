import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Send, Loader2, LogIn, Heart } from 'lucide-react'
import { SHOWS, CASTS } from '../data/mock'
import { useReviews } from '../hooks/useReviews'
import { useAuth } from '../hooks/useAuth'
import { StarRating } from '../components/StarRating'

export function ReviewFormPage() {
  const { id } = useParams<{ id: string }>()
  const nav = useNavigate()
  const { addReview } = useReviews()
  const { isLoggedIn } = useAuth()

  const show = SHOWS.find(s => s.id === id)
  const casts = show ? (show.castIds.map(cid => CASTS.find(c => c.id === cid)).filter(Boolean) as typeof CASTS) : []

  const [rating, setRating] = useState(0)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [seat, setSeat] = useState('')
  const [favoriteCastIds, setFavoriteCastIds] = useState<string[]>([])

  const toggleFavoriteCast = (castId: string) => {
    setFavoriteCastIds(prev => prev.includes(castId) ? prev.filter(id => id !== castId) : [...prev, castId])
  }

  const [submitting, setSubmitting] = useState(false)
  const canSubmit = rating > 0 && title.trim() && body.trim()

  const handleSubmit = async () => {
    if (!show || !canSubmit || submitting) return
    setSubmitting(true)
    try {
      await addReview({
        showId: show.id,
        userId: '',        // useReviews 内で上書き
        userName: 'あなた',
        userInitial: 'あ',
        userColor: '#00a07e',
        date, rating, title: title.trim(), body: body.trim(), seat,
        isFavorite: false,
        likeCount: 0,
        favoriteCastIds,
      })
      nav(`/shows/${show.id}`, { replace: true })
    } catch (e) {
      console.error(e)
      setSubmitting(false)
    }
  }

  if (!show) return null

  if (!isLoggedIn) {
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
        <div className="card text-center py-12 space-y-3">
          <LogIn size={32} className="mx-auto text-gray-300" />
          <p className="font-bold text-gray-900">ログインが必要です</p>
          <p className="text-sm text-gray-400 leading-relaxed">
            レビューの投稿にはログインが必要です。<br />
            マイページからログインしてください。
          </p>
          <button onClick={() => nav('/my')} className="btn-primary text-sm">マイページへ</button>
        </div>
      </div>
    )
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
        <div className="card space-y-3">
          <h3 className="text-sm font-bold text-gray-700">お気に入りのキャスト（任意・複数選択可）</h3>
          <div className="flex flex-wrap gap-2">
            {casts.map(cast => {
              const role = cast.roles.find(r => r.showId === show.id)
              const selected = favoriteCastIds.includes(cast.id)
              return (
                <button
                  key={cast.id}
                  type="button"
                  onClick={() => toggleFavoriteCast(cast.id)}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm border transition-colors
                    ${selected
                      ? 'bg-rose-50 border-rose-200 text-rose-600'
                      : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-gray-300'}`}
                >
                  <Heart size={14} className={selected ? 'fill-rose-500 text-rose-500' : 'text-gray-300'} />
                  <span className="font-bold">{cast.name}</span>
                  {role?.roleName && <span className="text-xs opacity-70">（{role.roleName}）</span>}
                </button>
              )
            })}
          </div>
        </div>
      )}

      <button onClick={handleSubmit} disabled={!canSubmit || submitting}
        className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-base transition-all
          ${canSubmit && !submitting
            ? 'bg-shiki-red hover:bg-teal-700 text-white active:scale-95'
            : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}>
        {submitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
        {submitting ? '投稿中…' : 'レビューを投稿する'}
      </button>
    </div>
  )
}
