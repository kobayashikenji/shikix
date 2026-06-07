import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, MapPin, Train, ExternalLink, Hotel, ChevronRight, Coffee, Clock, Wifi, Zap, History } from 'lucide-react'
import { THEATERS, SHOWS, RUNS } from '../data/mock'
import { rakutenHotelUrl, jalanUrl } from '../config/affiliate'

const HOTEL_SERVICES = [
  {
    id: 'rakuten',
    name: '楽天トラベル',
    domain: 'travel.rakuten.co.jp',
    color: '#BF0000',
    getUrl: rakutenHotelUrl,
  },
  {
    id: 'jalan',
    name: 'じゃらん',
    domain: 'jalan.net',
    color: '#FF6600',
    getUrl: jalanUrl,
  },
]

export function TheaterPage() {
  const { id } = useParams<{ id: string }>()
  const nav = useNavigate()

  const theater = THEATERS.find(t => t.id === id)
  if (!theater) return <div className="text-center py-20 text-gray-400">劇場が見つかりません</div>

  const shows = SHOWS.filter(s => s.theaterId === id)
  const runningShows = shows.filter(s => s.currentlyRunning)

  // この劇場で過去に上演された公演（公演×劇場の多対多関係をRUNSから集計）
  const pastRuns = RUNS
    .filter(r => r.theaterId === id && r.periodEnd)
    .map(r => ({ run: r, show: SHOWS.find(s => s.id === r.showId) }))
    .filter((x): x is { run: typeof RUNS[number]; show: NonNullable<typeof x.show> } => !!x.show)
    .sort((a, b) => b.run.periodStart.localeCompare(a.run.periodStart))

  return (
    <div className="space-y-5">
      <div className="pt-4">
        <button onClick={() => nav(-1)} className="btn-ghost -ml-2 flex items-center gap-1 text-sm mb-3">
          <ArrowLeft size={16} /> 戻る
        </button>

        {/* 劇場情報ヘッダー */}
        <div className="card space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-xl bg-gray-900 flex items-center justify-center flex-shrink-0">
              <Hotel size={22} className="text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-black text-gray-900 leading-tight">{theater.name}</h2>
              <p className="text-xs text-gray-400 mt-0.5">{theater.prefecture}</p>
            </div>
          </div>
          <div className="space-y-2 pt-1">
            <div className="flex items-start gap-2 text-sm text-gray-600">
              <MapPin size={14} className="text-gray-400 mt-0.5 flex-shrink-0" />
              <span>{theater.address}</span>
            </div>
            <div className="flex items-start gap-2 text-sm text-gray-600">
              <Train size={14} className="text-gray-400 mt-0.5 flex-shrink-0" />
              <span>{theater.nearestStation}</span>
            </div>
          </div>
          <a
            href={theater.mapUrl}
            target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 w-full py-2 rounded-xl bg-gray-50 border border-gray-200
                       text-sm text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <MapPin size={14} />
            Google マップで開く
            <ExternalLink size={12} className="text-gray-400" />
          </a>
        </div>
      </div>

      {/* 上演中の公演 */}
      {runningShows.length > 0 && (
        <section>
          <h3 className="font-bold text-sm text-gray-700 mb-2">現在上演中の公演</h3>
          <div className="space-y-2">
            {runningShows.map(show => (
              <button key={show.id} onClick={() => nav(`/shows/${show.id}`)}
                className="w-full card text-left flex items-center gap-3 hover:shadow-md transition-all active:scale-[0.99]">
                <div className="w-10 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100" style={{ aspectRatio: '2/3' }}>
                  <img src={show.image} alt={show.title} className="w-full h-full object-cover object-center" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-gray-900">{show.title}</p>
                  <p className="text-xs text-gray-400">{show.titleEn}</p>
                </div>
                <span className="badge bg-green-50 text-green-700 flex-shrink-0">上演中</span>
                <ChevronRight size={14} className="text-gray-300 flex-shrink-0" />
              </button>
            ))}
          </div>
        </section>
      )}

      {/* 過去にこの劇場で上演された公演 */}
      {pastRuns.length > 0 && (
        <section>
          <h3 className="font-bold text-sm text-gray-700 mb-2 flex items-center gap-1.5">
            <History size={14} className="text-gray-400" />
            この劇場でのこれまでの上演
          </h3>
          <div className="space-y-2">
            {pastRuns.map(({ run, show }) => (
              <button key={run.id} onClick={() => nav(`/shows/${show.id}`)}
                className="w-full card text-left flex items-center gap-3 hover:shadow-md transition-all active:scale-[0.99]">
                <div className="w-10 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100" style={{ aspectRatio: '2/3' }}>
                  <img src={show.image} alt={show.title} className="w-full h-full object-cover object-center" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-gray-900">{show.title}</p>
                  <p className="text-xs text-gray-400">
                    {run.periodStart} 〜 {run.periodEnd}
                    {run.note && <span className="ml-1">（{run.note}）</span>}
                  </p>
                </div>
                <span className="badge bg-gray-100 text-gray-500 flex-shrink-0">上演終了</span>
                <ChevronRight size={14} className="text-gray-300 flex-shrink-0" />
              </button>
            ))}
          </div>
        </section>
      )}

      {/* 周辺カフェ */}
      <section>
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-bold text-gray-900 flex items-center gap-1.5">
            <Coffee size={16} className="text-amber-600" />
            周辺のカフェ
          </h3>
        </div>
        <p className="text-xs text-gray-400 mb-3">開演前・終演後におすすめ</p>
        <div className="space-y-3">
          {theater.cafes.map((cafe, i) => (
            <a
              key={i}
              href={cafe.mapUrl}
              target="_blank" rel="noopener noreferrer"
              className="card flex gap-3 hover:shadow-md transition-all active:scale-[0.99]"
            >
              {/* アイコン */}
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0 border border-amber-100">
                <Coffee size={18} className="text-amber-600" />
              </div>
              {/* 情報 */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-bold text-sm text-gray-900 leading-tight">{cafe.name}</p>
                  <span className="text-xs font-medium text-gray-500 flex-shrink-0">{cafe.priceRange}</span>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">{cafe.category}</p>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="flex items-center gap-1 text-[11px] text-gray-500">
                    <Clock size={10} /> 徒歩{cafe.walkMin}分
                  </span>
                  <div className="flex gap-1.5 flex-wrap">
                    {cafe.features.map(f => (
                      <span key={f} className="flex items-center gap-0.5 text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full">
                        {f === 'Wi-Fi' && <Wifi size={9} />}
                        {f === 'コンセント' && <Zap size={9} />}
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <ExternalLink size={14} className="text-gray-300 flex-shrink-0 mt-1" />
            </a>
          ))}
        </div>
      </section>

      {/* 遠征組向けホテル */}
      <section>
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-bold text-gray-900">遠征組向けホテル</h3>
          <span className="badge bg-orange-50 text-orange-600 text-[10px]">遠征応援</span>
        </div>
        <p className="text-xs text-gray-400 mb-3">
          「{theater.area}」周辺のホテルを検索できます
        </p>
        <div className="card space-y-3">
          {HOTEL_SERVICES.map(svc => (
            <a
              key={svc.id}
              href={svc.getUrl(theater.area)}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 active:scale-[0.99] transition-all"
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-black text-xs"
                   style={{ background: svc.color }}>
                {svc.id === 'rakuten' ? '楽天' : 'じゃらん'.slice(0, 3)}
              </div>
              <div className="flex-1">
                <p className="font-bold text-sm text-gray-900">{svc.name}</p>
                <p className="text-xs text-gray-400">{svc.domain}</p>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-shiki-accent font-medium">{theater.area}周辺</span>
                <ExternalLink size={14} className="text-gray-300" />
              </div>
            </a>
          ))}
          <div className="pt-1 border-t border-gray-100">
            <p className="text-[10px] text-gray-400 leading-relaxed">
              ※ リンク先での予約により手数料が発生する場合があります。
              表示価格・空室状況は各サービスにてご確認ください。
            </p>
          </div>
        </div>
      </section>

      <div className="h-4" />
    </div>
  )
}
