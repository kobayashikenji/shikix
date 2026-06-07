import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, MapPin, Pencil, Star, Users, ExternalLink, Ticket, History, Globe, Award, Heart } from 'lucide-react'
import { SHOWS, CASTS, RUNS, THEATERS, WORKS } from '../data/mock'
import { piaUrl, ltikeUrl, eplusUrl } from '../config/affiliate'
import { useReviews } from '../hooks/useReviews'
import { ReviewCard } from '../components/ReviewCard'
import { StarRating } from '../components/StarRating'

export function ShowDetailPage() {
  const { id } = useParams<{ id: string }>()
  const nav = useNavigate()
  const { getByShow, avgRating, toggleFavorite } = useReviews()

  const show = SHOWS.find(s => s.id === id)
  if (!show) return <div className="text-center py-20 text-gray-400">公演が見つかりません</div>

  const reviews = getByShow(show.id)
  const avg = avgRating(show.id)
  const casts = show.castIds.map(cid => CASTS.find(c => c.id === cid)).filter(Boolean) as typeof CASTS
  const work = show.workId ? WORKS.find(w => w.id === show.workId) : undefined

  // この作品の上演劇場の歴史（公演×劇場の多対多関係をRUNSから集計）
  const runHistory = RUNS
    .filter(r => r.showId === show.id)
    .map(r => ({ run: r, theater: THEATERS.find(t => t.id === r.theaterId) }))
    .filter((x): x is { run: typeof RUNS[number]; theater: NonNullable<typeof x.theater> } => !!x.theater)
    .sort((a, b) => b.run.periodStart.localeCompare(a.run.periodStart))

  const favoriteCount = (castId: string) =>
    reviews.filter(r => r.favoriteCastIds.includes(castId)).length

  return (
    <div className="space-y-5">
      {/* ヒーロー：ポスター左 + 情報右（Filmarks風） */}
      <div className="relative -mx-4 -mt-4 bg-white border-b border-gray-100">
        <button onClick={() => nav(-1)} className="btn-ghost absolute top-3 left-2 z-10 flex items-center gap-1 text-sm">
          <ArrowLeft size={16} /> 戻る
        </button>
        <div className="flex gap-4 px-4 pt-12 pb-5">
          {/* 縦長ポスター (2:3) */}
          <div className="w-28 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100 shadow-md" style={{ aspectRatio: '2/3' }}>
            <img src={show.image} alt={show.title} className="w-full h-full object-cover object-center" />
          </div>
          {/* タイトル・情報 */}
          <div className="flex-1 min-w-0 pt-1">
            <div className="flex flex-wrap gap-1.5 mb-2">
              <span className={`badge ${show.currentlyRunning ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                {show.currentlyRunning ? '上演中' : '上演終了'}
              </span>
              <span className="badge bg-teal-50 text-teal-700">{show.genre}</span>
            </div>
            <h2 className="text-xl font-black leading-tight text-gray-900 mb-0.5">{show.title}</h2>
            <p className="text-[11px] text-gray-400 mb-2">{show.titleEn}</p>
            <button
              onClick={() => nav(`/theaters/${show.theaterId}`)}
              className="flex items-center gap-1 text-xs text-shiki-accent mb-3 hover:underline"
            >
              <MapPin size={11} /> {show.theater}
            </button>
            {/* 評価 */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl font-black text-amber-500">{avg > 0 ? avg.toFixed(1) : '—'}</span>
              <div>
                <StarRating value={avg} size={14} />
                <p className="text-[10px] text-gray-400 mt-0.5">{reviews.length}件</p>
              </div>
            </div>
            <button
              onClick={() => nav(`/shows/${show.id}/review/new`)}
              className="btn-primary flex items-center gap-1 text-xs py-1.5 px-3"
            >
              <Pencil size={12} /> レビューを書く
            </button>
          </div>
        </div>
        {/* あらすじ */}
        <p className="text-sm text-gray-600 leading-relaxed px-4 pb-5">{show.synopsis}</p>
      </div>

      {/* 評価分布 */}
      <div className="card flex items-center gap-4">
        <div className="text-center">
          <div className="text-4xl font-black text-amber-500">{avg > 0 ? avg.toFixed(1) : '—'}</div>
          <StarRating value={avg} size={16} />
          <p className="text-xs text-gray-400 mt-1">{reviews.length}件のレビュー</p>
        </div>
        <div className="flex-1 space-y-1">
          {[5,4,3,2,1].map(s => {
            const cnt = reviews.filter(r => r.rating === s).length
            const pct = reviews.length ? (cnt / reviews.length) * 100 : 0
            return (
              <div key={s} className="flex items-center gap-2 text-xs">
                <Star size={11} className="text-amber-400 fill-amber-400 flex-shrink-0" />
                <span className="w-3 text-gray-400">{s}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full transition-all" style={{ width: `${pct}%` }} />
                </div>
                <span className="w-6 text-right text-gray-400">{cnt}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* キャスト */}
      {casts.length > 0 && (
        <section>
          <h3 className="font-bold text-sm text-gray-500 mb-2 flex items-center gap-1">
            <Users size={14} /> キャスト
          </h3>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {casts.map(cast => {
              const role = cast.roles.find(r => r.showId === show.id)
              const favCount = favoriteCount(cast.id)
              return (
                <button
                  key={cast.id}
                  onClick={() => nav(`/casts/${cast.id}`)}
                  className="flex-shrink-0 bg-white border border-gray-100 hover:border-gray-200 hover:bg-gray-50
                             transition-colors rounded-xl p-3 text-center w-28 shadow-sm"
                >
                  <div className="text-2xl mb-1">🎭</div>
                  <p className="font-bold text-xs leading-tight text-gray-900">{cast.name}</p>
                  <p className="text-[10px] text-shiki-accent mt-0.5">{role?.roleName}</p>
                  {favCount > 0 && (
                    <div className="flex items-center justify-center gap-0.5 mt-1 text-[10px] text-rose-400">
                      <Heart size={10} className="fill-rose-400" />
                      {favCount}
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </section>
      )}

      {/* 世界のこの作品（原作ミュージカルの受賞歴・海外公演実績） */}
      {work && (
        <section>
          <h3 className="font-bold text-sm text-gray-500 mb-2 flex items-center gap-1">
            <Globe size={14} /> 世界のこの作品
          </h3>
          <div className="card space-y-4">
            <div className="flex items-center gap-3">
              <div className="text-xs text-gray-400">初演</div>
              <div className="font-bold text-sm text-gray-900">{work.createdYear}年（{work.titleEn}）</div>
            </div>

            {work.tonyAwards && work.tonyAwards.length > 0 && (
              <div>
                <p className="text-xs font-bold text-gray-500 mb-1.5 flex items-center gap-1">
                  <Award size={12} className="text-amber-500" /> トニー賞
                </p>
                <ul className="space-y-1">
                  {work.tonyAwards.map((t, i) => (
                    <li key={i} className="text-xs text-gray-600 flex gap-2">
                      <span className="text-gray-400 flex-shrink-0">{t.year}年</span>
                      <span>{t.result}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {work.overseasProductions && work.overseasProductions.length > 0 && (
              <div>
                <p className="text-xs font-bold text-gray-500 mb-1.5 flex items-center gap-1">
                  <Globe size={12} className="text-shiki-accent" /> 海外公演実績
                </p>
                <ul className="space-y-1.5">
                  {work.overseasProductions.map((o, i) => (
                    <li key={i} className="text-xs text-gray-600">
                      <span className="font-medium text-gray-800">{o.region}</span>
                      <span className="text-gray-400 ml-2">{o.period}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <p className="text-[10px] text-gray-400 leading-relaxed pt-1 border-t border-gray-100">
              ※ 受賞歴・海外公演実績は原作ミュージカルとしての記録です。劇団四季版の上演内容と異なる場合があります。
            </p>
          </div>
        </section>
      )}

      {/* 上演劇場の歴史 */}
      {runHistory.length > 0 && (
        <section>
          <h3 className="font-bold text-sm text-gray-500 mb-2 flex items-center gap-1">
            <History size={14} /> 上演ヒストリー
          </h3>
          <div className="card p-0 divide-y divide-gray-100">
            {runHistory.map(({ run, theater }) => (
              <button
                key={run.id}
                onClick={() => nav(`/theaters/${theater.id}`)}
                className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="w-2 h-2 rounded-full flex-shrink-0"
                     style={{ background: run.periodEnd ? '#d1d5db' : '#00a07e' }} />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-gray-900">{theater.name}</p>
                  <p className="text-xs text-gray-400">
                    {run.periodStart} 〜 {run.periodEnd ?? '上演中'}
                    {run.note && <span className="ml-1">（{run.note}）</span>}
                  </p>
                </div>
                <span className={`badge text-[10px] flex-shrink-0 ${run.periodEnd ? 'bg-gray-100 text-gray-500' : 'bg-green-50 text-green-700'}`}>
                  {run.periodEnd ? '終了' : '上演中'}
                </span>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* チケット購入 */}
      <section>
        <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-1.5">
          <Ticket size={16} className="text-shiki-accent" />
          チケット購入
        </h3>
        {show.currentlyRunning ? (
          <div className="card space-y-3">
            <p className="text-xs text-gray-500">
              各チケットサービスで「劇団四季 {show.title}」を検索できます
            </p>
            {/* ぴあ */}
            <a
              href={piaUrl(show.title)}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 active:scale-[0.99] transition-all"
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 font-black text-sm text-white"
                   style={{ background: '#E8192C' }}>
                ぴあ
              </div>
              <div className="flex-1">
                <p className="font-bold text-sm text-gray-900">チケットぴあ</p>
                <p className="text-xs text-gray-400">pia.jp</p>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="badge bg-green-50 text-green-700 text-[10px]">発売中</span>
                <ExternalLink size={14} className="text-gray-300" />
              </div>
            </a>
            {/* ローチケ */}
            <a
              href={ltikeUrl(show.title)}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 active:scale-[0.99] transition-all"
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 font-black text-[11px] text-white leading-tight text-center"
                   style={{ background: '#003087' }}>
                ロー<br/>チケ
              </div>
              <div className="flex-1">
                <p className="font-bold text-sm text-gray-900">ローソンチケット</p>
                <p className="text-xs text-gray-400">l-tike.com</p>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="badge bg-green-50 text-green-700 text-[10px]">発売中</span>
                <ExternalLink size={14} className="text-gray-300" />
              </div>
            </a>
            {/* e+ */}
            <a
              href={eplusUrl(show.title)}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 active:scale-[0.99] transition-all"
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 font-black text-sm text-white"
                   style={{ background: '#FF6B2B' }}>
                e+
              </div>
              <div className="flex-1">
                <p className="font-bold text-sm text-gray-900">イープラス</p>
                <p className="text-xs text-gray-400">eplus.jp</p>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="badge bg-green-50 text-green-700 text-[10px]">発売中</span>
                <ExternalLink size={14} className="text-gray-300" />
              </div>
            </a>
            {/* 劇団四季公式 */}
            <a
              href={show.officialUrl}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 active:scale-[0.99] transition-all"
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 font-black text-[10px] text-white leading-tight text-center"
                   style={{ background: '#1a1a2e' }}>
                劇団<br/>四季
              </div>
              <div className="flex-1">
                <p className="font-bold text-sm text-gray-900">劇団四季公式サイト</p>
                <p className="text-xs text-gray-400">shiki.jp</p>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="badge bg-blue-50 text-blue-600 text-[10px]">公式</span>
                <ExternalLink size={14} className="text-gray-300" />
              </div>
            </a>
            <p className="text-[10px] text-gray-400 text-center pt-1">
              ※ リンク先での購入により手数料が発生する場合があります
            </p>
          </div>
        ) : (
          <div className="card text-center py-6 text-gray-400">
            <Ticket size={28} className="mx-auto mb-2 opacity-30" />
            <p className="text-sm">この公演は現在取り扱いがありません</p>
          </div>
        )}
      </section>

      {/* レビュー一覧 */}
      <section>
        <h3 className="font-bold text-gray-900 mb-3">レビュー（{reviews.length}件）</h3>
        {reviews.length === 0 ? (
          <div className="card text-center py-10 text-gray-400">
            <p>まだレビューがありません</p>
            <p className="text-sm mt-1">最初のレビューを書きましょう！</p>
          </div>
        ) : (
          <div className="space-y-3">
            {reviews.map(r => (
              <ReviewCard key={r.id} review={r} onToggleFavorite={toggleFavorite} />
            ))}
          </div>
        )}
      </section>

      <div className="h-4" />
    </div>
  )
}
