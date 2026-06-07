import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { CalendarDays, Heart, Theater, Star, TrendingUp, Coffee, ExternalLink, LogIn, LogOut, Loader2, Megaphone, Send } from 'lucide-react'
import { useReviews } from '../hooks/useReviews'
import { useAuth } from '../hooks/useAuth'
import { useCheers } from '../hooks/useCheers'
import { SHOWS } from '../data/mock'
import { ReviewCard } from '../components/ReviewCard'
import { AFFILIATE } from '../config/affiliate'

function authErrorMessage(err: unknown): string {
  const code = err instanceof Error && 'code' in err ? (err as { code: string }).code : ''
  switch (code) {
    case 'auth/invalid-email':
      return 'メールアドレスの形式が正しくありません'
    case 'auth/user-not-found':
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
      return 'メールアドレスまたはパスワードが正しくありません'
    case 'auth/email-already-in-use':
      return 'このメールアドレスはすでに登録されています'
    case 'auth/weak-password':
      return 'パスワードは6文字以上で入力してください'
    case 'auth/too-many-requests':
      return '試行回数が多すぎます。しばらくしてからお試しください'
    case 'auth/popup-closed-by-user':
      return ''
    default:
      return 'エラーが発生しました。もう一度お試しください'
  }
}

export function MyPage() {
  const nav = useNavigate()
  const { myReviews, reviews, toggleFavorite } = useReviews()
  const { user, isLoggedIn, signInWithGoogle, emailSignUp, emailSignIn, resetPassword, signOut } = useAuth()
  const { cheers, addCheer } = useCheers()
  const [signingIn, setSigningIn] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'reset'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authBusy, setAuthBusy] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)
  const [resetSent, setResetSent] = useState(false)

  const [cheerName, setCheerName] = useState('')
  const [cheerMessage, setCheerMessage] = useState('')
  const [cheerSending, setCheerSending] = useState(false)
  const [cheerSent, setCheerSent] = useState(false)

  const handleSendCheer = async (e: FormEvent) => {
    e.preventDefault()
    if (!cheerMessage.trim() || cheerSending) return
    setCheerSending(true)
    try {
      await addCheer(cheerName, cheerMessage)
      setCheerMessage('')
      setCheerSent(true)
      setTimeout(() => setCheerSent(false), 4000)
    } catch (err) {
      console.error(err)
    } finally {
      setCheerSending(false)
    }
  }

  const switchAuthMode = (mode: 'login' | 'signup' | 'reset') => {
    setAuthMode(mode)
    setAuthError(null)
    setResetSent(false)
  }

  const handleGoogleSignIn = async () => {
    setSigningIn(true)
    setAuthError(null)
    try {
      await signInWithGoogle()
    } catch (e) {
      setAuthError(authErrorMessage(e))
    } finally {
      setSigningIn(false)
    }
  }

  const handleEmailSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setAuthError(null)
    setAuthBusy(true)
    try {
      if (authMode === 'signup') {
        await emailSignUp(email, password)
      } else {
        await emailSignIn(email, password)
      }
    } catch (err) {
      setAuthError(authErrorMessage(err))
    } finally {
      setAuthBusy(false)
    }
  }

  const handleResetPassword = async () => {
    if (!email) {
      setAuthError('メールアドレスを入力してください')
      return
    }
    setAuthError(null)
    setAuthBusy(true)
    try {
      await resetPassword(email)
      setResetSent(true)
    } catch (err) {
      setAuthError(authErrorMessage(err))
    } finally {
      setAuthBusy(false)
    }
  }

  const favorites = reviews.filter(r => r.isFavorite)
  const totalShows = new Set(myReviews.map(r => r.showId)).size
  const avgMyRating = myReviews.length
    ? myReviews.reduce((s, r) => s + r.rating, 0) / myReviews.length
    : 0

  const showFreq = myReviews.reduce<Record<string, number>>((acc, r) => {
    acc[r.showId] = (acc[r.showId] ?? 0) + 1
    return acc
  }, {})
  const mostVisited = Object.entries(showFreq).sort((a, b) => b[1] - a[1])[0]
  const mostVisitedShow = mostVisited ? SHOWS.find(s => s.id === mostVisited[0]) : null

  return (
    <div className="space-y-5">
      <div className="pt-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black mb-0.5 text-gray-900">マイページ</h1>
          {isLoggedIn ? (
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
              <p className="text-sm text-green-600 font-medium">{user?.displayName} でログイン中</p>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-gray-300 inline-block" />
              <p className="text-sm text-gray-400">ログインしていません</p>
            </div>
          )}
        </div>
        {isLoggedIn && user?.photoURL && (
          <img src={user.photoURL} alt="" className="w-10 h-10 rounded-full object-cover" />
        )}
      </div>

      {/* ログイン状態 */}
      {isLoggedIn ? (
        <div className="card flex items-center gap-3">
          {user?.photoURL ? (
            <img src={user.photoURL} alt="" className="w-10 h-10 rounded-full object-cover" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-shiki-accent flex items-center justify-center text-white font-bold">
              {user?.displayName?.[0] ?? '?'}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm text-gray-900 truncate">{user?.displayName ?? 'ユーザー'}</p>
            <p className="text-xs text-gray-400 truncate">{user?.email}</p>
          </div>
          <button onClick={signOut} className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600">
            <LogOut size={14} /> ログアウト
          </button>
        </div>
      ) : (
        <div className="card space-y-3">
          <div className="flex items-center gap-2">
            <LogIn size={16} className="text-shiki-accent" />
            <p className="font-bold text-sm text-gray-900">ログインしてレビューを保存</p>
          </div>
          <p className="text-xs text-gray-500">ログインすると複数端末でレビューを引き継げます。</p>

          <button
            onClick={handleGoogleSignIn}
            disabled={signingIn || authBusy}
            className="w-full flex items-center gap-3 p-3 rounded-xl border border-gray-200
                       hover:bg-gray-50 active:scale-[0.99] transition-all disabled:opacity-50"
          >
            <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" className="w-5 h-5"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            </div>
            <span className="font-bold text-sm text-gray-900">Google でログイン</span>
            {signingIn && <Loader2 size={14} className="ml-auto animate-spin text-gray-400" />}
          </button>

          <div className="flex items-center gap-2 py-1">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-[11px] text-gray-300">またはメールアドレスで</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          {authMode === 'reset' ? (
            resetSent ? (
              <div className="space-y-2 text-center py-2">
                <p className="text-xs text-shiki-accent">パスワード再設定メールを送信しました。メールをご確認ください。</p>
                <button onClick={() => switchAuthMode('login')} className="btn-ghost text-xs">ログインに戻る</button>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-xs text-gray-500">登録済みのメールアドレスを入力してください。</p>
                <input
                  type="email"
                  className="input"
                  placeholder="メールアドレス"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                {authError && <p className="text-xs text-rose-500">{authError}</p>}
                <button
                  onClick={handleResetPassword}
                  disabled={authBusy}
                  className="btn-primary w-full text-sm flex items-center justify-center gap-1.5"
                >
                  {authBusy && <Loader2 size={14} className="animate-spin" />}
                  再設定メールを送る
                </button>
                <button onClick={() => switchAuthMode('login')} className="btn-ghost w-full text-xs">ログインに戻る</button>
              </div>
            )
          ) : (
            <form onSubmit={handleEmailSubmit} className="space-y-2">
              <input
                type="email"
                required
                className="input"
                placeholder="メールアドレス"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <input
                type="password"
                required
                minLength={6}
                className="input"
                placeholder="パスワード（6文字以上）"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              {authError && <p className="text-xs text-rose-500">{authError}</p>}
              <button
                type="submit"
                disabled={authBusy}
                className="btn-primary w-full text-sm flex items-center justify-center gap-1.5"
              >
                {authBusy && <Loader2 size={14} className="animate-spin" />}
                {authMode === 'signup' ? '新規登録' : 'メールでログイン'}
              </button>
              <div className="flex items-center justify-between text-xs pt-0.5">
                <button
                  type="button"
                  onClick={() => switchAuthMode(authMode === 'signup' ? 'login' : 'signup')}
                  className="text-shiki-accent font-medium"
                >
                  {authMode === 'signup' ? 'ログインはこちら' : '新規登録はこちら'}
                </button>
                {authMode === 'login' && (
                  <button type="button" onClick={() => switchAuthMode('reset')} className="text-gray-400">
                    パスワードをお忘れですか？
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      )}

      {isLoggedIn ? (
        <>
          <div className="grid grid-cols-2 gap-3">
            <div className="card text-center">
              <Theater size={28} className="mx-auto text-shiki-accent mb-1" />
              <p className="text-3xl font-black text-gray-900">{myReviews.length}</p>
              <p className="text-xs text-gray-400">レビュー数</p>
            </div>
            <div className="card text-center">
              <CalendarDays size={28} className="mx-auto text-blue-400 mb-1" />
              <p className="text-3xl font-black text-gray-900">{totalShows}</p>
              <p className="text-xs text-gray-400">鑑賞作品数</p>
            </div>
            <div className="card text-center">
              <Star size={28} className="mx-auto text-amber-400 mb-1" />
              <p className="text-3xl font-black text-gray-900">{avgMyRating > 0 ? avgMyRating.toFixed(1) : '—'}</p>
              <p className="text-xs text-gray-400">平均評価</p>
            </div>
            <div className="card text-center">
              <Heart size={28} className="mx-auto text-rose-400 mb-1" />
              <p className="text-3xl font-black text-gray-900">{favorites.length}</p>
              <p className="text-xs text-gray-400">お気に入り</p>
            </div>
          </div>

          {mostVisitedShow && (
            <div className="card flex items-center gap-3">
              <TrendingUp size={20} className="text-gray-400 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-400">よく観る公演</p>
                <p className="font-bold text-gray-900">{mostVisitedShow.imageEmoji} {mostVisitedShow.title}</p>
              </div>
              <span className="ml-auto text-gray-600 font-bold">{mostVisited![1]}回</span>
            </div>
          )}

          {myReviews.length === 0 ? (
            <div className="card text-center py-12 space-y-3">
              <p className="text-4xl">📝</p>
              <p className="font-bold text-gray-900">まだレビューがありません</p>
              <p className="text-sm text-gray-400">公演を見てレビューを書いてみましょう</p>
              <button onClick={() => nav('/')} className="btn-primary text-sm">
                公演一覧へ
              </button>
            </div>
          ) : (
            <>
              {favorites.length > 0 && (
                <section>
                  <h3 className="font-bold mb-2 flex items-center gap-1 text-gray-700">
                    <Heart size={16} className="text-rose-400 fill-rose-400" />
                    お気に入りレビュー
                  </h3>
                  <div className="space-y-3">
                    {favorites.map(r => {
                      const show = SHOWS.find(s => s.id === r.showId)
                      return (
                        <ReviewCard key={r.id} review={r}
                          showTitle={show?.title}
                          onToggleFavorite={toggleFavorite} />
                      )
                    })}
                  </div>
                </section>
              )}

              <section>
                <h3 className="font-bold mb-2 text-gray-700">自分のレビュー</h3>
                <div className="space-y-3">
                  {myReviews.map(r => {
                    const show = SHOWS.find(s => s.id === r.showId)
                    return (
                      <button key={r.id} onClick={() => nav(`/shows/${r.showId}`)} className="w-full text-left">
                        <ReviewCard review={r} showTitle={show?.title} onToggleFavorite={toggleFavorite} />
                      </button>
                    )
                  })}
                </div>
              </section>
            </>
          )}
        </>
      ) : (
        <div className="card text-center py-12 space-y-2">
          <p className="text-4xl">🔒</p>
          <p className="font-bold text-gray-900">ログインするとマイページが使えます</p>
          <p className="text-sm text-gray-400 leading-relaxed">
            レビュー履歴・統計・お気に入りの確認には<br />ログインが必要です
          </p>
        </div>
      )}
      {/* サポート */}
      {(AFFILIATE.kofi || AFFILIATE.fanbox) && (
        <section>
          <div className="card space-y-3">
            <div className="flex items-center gap-2">
              <Coffee size={16} className="text-amber-600" />
              <h3 className="font-bold text-gray-900 text-sm">アプリを応援する</h3>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              shikixは個人が無料で運営しています。気に入っていただけたら応援していただけると励みになります。
            </p>
            <div className="space-y-2">
              {AFFILIATE.kofi && (
                <a
                  href={AFFILIATE.kofi}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl border border-amber-100 bg-amber-50
                             hover:bg-amber-100 active:scale-[0.99] transition-all"
                >
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 text-xl bg-amber-400">
                    ☕
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm text-gray-900">Ko-fi でコーヒーをおごる</p>
                    <p className="text-xs text-gray-500">ko-fi.com</p>
                  </div>
                  <ExternalLink size={14} className="text-gray-300" />
                </a>
              )}
              {AFFILIATE.fanbox && (
                <a
                  href={AFFILIATE.fanbox}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl border border-blue-100 bg-blue-50
                             hover:bg-blue-100 active:scale-[0.99] transition-all"
                >
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 text-xl bg-blue-400">
                    🎁
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm text-gray-900">FANBOX でサポート</p>
                    <p className="text-xs text-gray-500">fanbox.cc</p>
                  </div>
                  <ExternalLink size={14} className="text-gray-300" />
                </a>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 開発チームへの応援メッセージ */}
      <section>
        <div className="card space-y-3">
          <div className="flex items-center gap-2">
            <Megaphone size={16} className="text-shiki-accent" />
            <h3 className="font-bold text-gray-900 text-sm">開発チームに応援メッセージを送る</h3>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">
            shikixは個人が開発・運営しています。「いつも使ってます」「この機能が嬉しい」など、応援の一言が励みになります！
          </p>
          <form onSubmit={handleSendCheer} className="space-y-2">
            <input value={cheerName} onChange={e => setCheerName(e.target.value)}
              placeholder="お名前（任意）"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-900
                         placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-shiki-accent/30 focus:border-shiki-accent/50" />
            <textarea value={cheerMessage} onChange={e => setCheerMessage(e.target.value)}
              rows={3} placeholder="応援メッセージを書く…"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-900
                         placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-shiki-accent/30 focus:border-shiki-accent/50 resize-none" />
            <button type="submit" disabled={!cheerMessage.trim() || cheerSending}
              className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm transition-all
                ${cheerMessage.trim() && !cheerSending
                  ? 'btn-primary'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}>
              {cheerSending ? <Loader2 size={16} className="animate-spin" /> : <Send size={14} />}
              {cheerSending ? '送信中…' : 'メッセージを送る'}
            </button>
            {cheerSent && (
              <p className="text-xs text-shiki-accent text-center">応援メッセージを送りました。ありがとうございます！</p>
            )}
          </form>

          {cheers.length > 0 && (
            <div className="pt-2 border-t border-gray-100 space-y-2">
              <p className="text-xs font-bold text-gray-400">みんなからの応援メッセージ</p>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {cheers.map(c => (
                  <div key={c.id} className="bg-gray-50 rounded-xl px-3 py-2">
                    <p className="text-sm text-gray-700 leading-relaxed">{c.message}</p>
                    <p className="text-[10px] text-gray-400 mt-1">— {c.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <p className="text-[11px] text-gray-400 text-center leading-relaxed px-4 pb-2">
        本アプリは劇団四季（株式会社四季）とは一切関係のない、個人の非公式アプリです。<br />
        恐れ入りますが、お問い合わせ・ご要望は受け付けておりません。応援メッセージは上記フォームからお送りいただけます。
      </p>
      <div className="h-4" />
    </div>
  )
}
