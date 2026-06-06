import type { Show, Cast, Review, Theater } from '../types'

export const THEATERS: Theater[] = [
  {
    id: 'ariake-aki',
    name: '四季劇場[秋]',
    address: '東京都江東区有明1-3-4',
    nearestStation: 'りんかい線「有明」駅 徒歩5分 / ゆりかもめ「有明」駅 徒歩3分',
    area: '有明 お台場',
    prefecture: '東京都',
    mapUrl: 'https://maps.google.com/?q=四季劇場+秋+有明',
    cafes: [
      { name: 'スターバックス 有明ガーデン店', category: 'カフェ', walkMin: 3, priceRange: '¥¥', features: ['Wi-Fi', 'コンセント', '広い'], mapUrl: 'https://maps.google.com/?q=スターバックス+有明ガーデン' },
      { name: 'WIRED CAFE 有明ガーデン', category: 'カフェ・ダイニング', walkMin: 5, priceRange: '¥¥', features: ['Wi-Fi', 'ゆったり'], mapUrl: 'https://maps.google.com/?q=WIRED+CAFE+有明' },
      { name: 'PRONTO 有明テニスの森店', category: 'カフェ', walkMin: 7, priceRange: '¥', features: ['軽食あり'], mapUrl: 'https://maps.google.com/?q=PRONTO+有明' },
    ],
  },
  {
    id: 'dentsu-umi',
    name: '電通四季劇場[海]',
    address: '東京都港区東新橋1-2-1 カレッタ汐留',
    nearestStation: '都営大江戸線「汐留」駅 徒歩1分 / JR「新橋」駅 徒歩7分',
    area: '汐留 新橋',
    prefecture: '東京都',
    mapUrl: 'https://maps.google.com/?q=電通四季劇場+海+汐留',
    cafes: [
      { name: 'スターバックス カレッタ汐留店', category: 'カフェ', walkMin: 1, priceRange: '¥¥', features: ['Wi-Fi', 'コンセント'], mapUrl: 'https://maps.google.com/?q=スターバックス+カレッタ汐留' },
      { name: 'タリーズコーヒー 汐留シオサイト店', category: 'カフェ', walkMin: 3, priceRange: '¥¥', features: ['Wi-Fi', '広い'], mapUrl: 'https://maps.google.com/?q=タリーズ+汐留' },
      { name: 'ドトールコーヒー 新橋駅前店', category: 'カフェ', walkMin: 8, priceRange: '¥', features: ['軽食あり', '朝早い'], mapUrl: 'https://maps.google.com/?q=ドトール+新橋' },
    ],
  },
  {
    id: 'ariake-haru',
    name: '四季劇場[春]',
    address: '東京都江東区有明1-3-4',
    nearestStation: 'りんかい線「有明」駅 徒歩5分 / ゆりかもめ「有明」駅 徒歩3分',
    area: '有明 お台場',
    prefecture: '東京都',
    mapUrl: 'https://maps.google.com/?q=四季劇場+春+有明',
    cafes: [
      { name: 'スターバックス 有明ガーデン店', category: 'カフェ', walkMin: 3, priceRange: '¥¥', features: ['Wi-Fi', 'コンセント', '広い'], mapUrl: 'https://maps.google.com/?q=スターバックス+有明ガーデン' },
      { name: 'WIRED CAFE 有明ガーデン', category: 'カフェ・ダイニング', walkMin: 5, priceRange: '¥¥', features: ['Wi-Fi', 'ゆったり'], mapUrl: 'https://maps.google.com/?q=WIRED+CAFE+有明' },
      { name: 'PRONTO 有明テニスの森店', category: 'カフェ', walkMin: 7, priceRange: '¥', features: ['軽食あり'], mapUrl: 'https://maps.google.com/?q=PRONTO+有明' },
    ],
  },
  {
    id: 'hokkaido',
    name: '北海道四季劇場',
    address: '北海道札幌市中央区南1条西1丁目 ススキノラフィラ5F',
    nearestStation: '札幌市営地下鉄「大通」駅 徒歩5分 / 「すすきの」駅 徒歩5分',
    area: '札幌 すすきの',
    prefecture: '北海道',
    mapUrl: 'https://maps.google.com/?q=北海道四季劇場+札幌',
    cafes: [
      { name: '森彦 本店', category: 'コーヒー専門店', walkMin: 10, priceRange: '¥¥', features: ['こだわり豆', '落ち着いた雰囲気'], mapUrl: 'https://maps.google.com/?q=森彦+本店+札幌' },
      { name: 'スターバックス 札幌大通公園店', category: 'カフェ', walkMin: 5, priceRange: '¥¥', features: ['Wi-Fi', 'コンセント', '公園ビュー'], mapUrl: 'https://maps.google.com/?q=スターバックス+札幌大通公園' },
      { name: 'PROVO', category: 'コーヒー・ベーカリー', walkMin: 8, priceRange: '¥¥', features: ['自家製パン', 'こだわりコーヒー'], mapUrl: 'https://maps.google.com/?q=PROVO+札幌' },
    ],
  },
  {
    id: 'canal-city',
    name: 'キャナルシティ劇場',
    address: '福岡県福岡市博多区住吉1-2-22 キャナルシティ博多',
    nearestStation: '福岡市地下鉄「中洲川端」駅 徒歩8分 / JR「博多」駅 徒歩15分',
    area: '博多 天神',
    prefecture: '福岡県',
    mapUrl: 'https://maps.google.com/?q=キャナルシティ劇場+福岡',
    cafes: [
      { name: 'コーヒーカウンティ 博多店', category: 'スペシャルティコーヒー', walkMin: 5, priceRange: '¥¥', features: ['こだわり豆', 'ラテアート'], mapUrl: 'https://maps.google.com/?q=コーヒーカウンティ+博多' },
      { name: '% ARABICA 福岡', category: 'コーヒー専門店', walkMin: 12, priceRange: '¥¥', features: ['フォトジェニック', 'こだわりエスプレッソ'], mapUrl: 'https://maps.google.com/?q=%25ARABICA+福岡' },
      { name: 'スターバックス キャナルシティ博多店', category: 'カフェ', walkMin: 1, priceRange: '¥¥', features: ['Wi-Fi', 'コンセント', '開演前に便利'], mapUrl: 'https://maps.google.com/?q=スターバックス+キャナルシティ博多' },
    ],
  },
]

export const SHOWS: Show[] = [
  {
    id: 'lion-king', title: 'ライオンキング', titleEn: 'THE LION KING',
    genre: 'ミュージカル', theater: '四季劇場[秋]（東京）',
    imageEmoji: '🦁', image: '/images/lion-king.jpg', officialUrl: 'https://www.shiki.jp/applause/lionking/', theaterId: 'ariake-aki', heroBg: 'bg-hero-lion', accentColor: '#F59E0B',
    synopsis: 'アフリカの大地を舞台に、若き王子シンバの成長と王座奪還を描く壮大なミュージカル。世界中で愛されるディズニーの傑作。ティム・ライスとエルトン・ジョンによる名曲が彩る。',
    castIds: ['c1','c2','c3','c4'], currentlyRunning: true, openDate: '2023-03-01',
    songs: ['サークル・オブ・ライフ','ハクナ・マタタ','愛を感じて'],
  },
  {
    id: 'aladdin', title: 'アラジン', titleEn: 'ALADDIN',
    genre: 'ミュージカル', theater: '電通四季劇場[海]（東京）',
    imageEmoji: '🧞', image: '/images/aladdin.jpg', officialUrl: 'https://www.shiki.jp/applause/aladdin/', theaterId: 'dentsu-umi', heroBg: 'bg-hero-aladdin', accentColor: '#8B5CF6',
    synopsis: 'アラビアンナイトの世界を舞台に、青年アラジンとジャスミン姫の冒険と恋を描く。豪華絢爛な舞台美術と魔法のランプが見どころ。ジーニーの圧倒的なパフォーマンスに注目。',
    castIds: ['c5','c6','c7'], currentlyRunning: true, openDate: '2015-05-06',
    songs: ['ア・ホール・ニュー・ワールド','フレンド・ライク・ミー','プリンス・アリ'],
  },
  {
    id: 'cats', title: 'キャッツ', titleEn: 'CATS',
    genre: 'ミュージカル', theater: '四季劇場[春]（東京）',
    imageEmoji: '🐱', image: '/images/cats.jpg', officialUrl: 'https://www.shiki.jp/applause/cats/', theaterId: 'ariake-haru', heroBg: 'bg-hero-cats', accentColor: '#10B981',
    synopsis: 'T.S.エリオットの詩集をもとにした、猫たちの一夜の物語。「メモリー」など名曲ぞろいの不朽の名作。劇団四季の代表作として長年愛され続けている。',
    castIds: ['c8','c9','c10'], currentlyRunning: true, openDate: '1983-11-10',
    songs: ['メモリー','マキャヴィティ','ジェリクル・ソング'],
  },
  {
    id: 'phantom', title: 'オペラ座の怪人', titleEn: 'THE PHANTOM OF THE OPERA',
    genre: 'ミュージカル', theater: '四季劇場[春]（東京）',
    imageEmoji: '🎭', image: '/images/phantom.jpg', officialUrl: 'https://www.shiki.jp/applause/operaza/', theaterId: 'ariake-haru', heroBg: 'bg-hero-phantom', accentColor: '#A78BFA',
    synopsis: 'パリのオペラ座に潜む謎の怪人ファントムと、歌姫クリスティーヌの哀しき愛の物語。壮大な舞台装置とアンドリュー・ロイド・ウェバーの美しい音楽が魅力。',
    castIds: ['c11','c12'], currentlyRunning: false, openDate: '1988-03-16',
    songs: ['オペラ座の怪人','ミュージック・オブ・ザ・ナイト','オール・アイ・アスク・オブ・ユー'],
  },
  {
    id: 'notre-dame', title: 'ノートルダムの鐘', titleEn: 'THE HUNCHBACK OF NOTRE DAME',
    genre: 'ミュージカル', theater: '北海道四季劇場（札幌）',
    imageEmoji: '⛪', image: '/images/notre-dame.jpg', officialUrl: 'https://www.shiki.jp/applause/notredame/', theaterId: 'hokkaido', heroBg: 'bg-hero-notre', accentColor: '#3B82F6',
    synopsis: 'ヴィクトル・ユゴーの名作をもとに、パリのノートルダム大聖堂を舞台に繰り広げられる愛と差別・偏見との戦い。重厚な合唱と深いテーマが観る者の心を揺さぶる。',
    castIds: ['c1','c13'], currentlyRunning: true, openDate: '2016-09-08',
    songs: ['ノートルダム大聖堂','神よ助けたまえ','聖なる場所'],
  },
  {
    id: 'mermaid', title: 'リトルマーメイド', titleEn: 'THE LITTLE MERMAID',
    genre: 'ミュージカル', theater: 'キャナルシティ劇場（福岡）',
    imageEmoji: '🧜', image: '/images/mermaid.jpg', officialUrl: 'https://www.shiki.jp/applause/littlemermaid/', theaterId: 'canal-city', heroBg: 'bg-hero-mermaid', accentColor: '#06B6D4',
    synopsis: 'アンデルセンの人魚姫をもとにした、海の世界から陸の世界へ憧れる人魚アリエルの冒険と恋の物語。水中を表現した革新的な舞台技術に驚かされる。',
    castIds: ['c6','c14'], currentlyRunning: true, openDate: '2013-07-12',
    songs: ['パート・オブ・ユア・ワールド','アンダー・ザ・シー','キス・ザ・ガール'],
  },
]

export const CASTS: Cast[] = [
  { id:'c1',  name:'芝 清道',      nameKana:'しば きよみち',          roles:[
    {showId:'lion-king',   roleName:'ムファサ',         periodStart:'2023-03-01'},
    {showId:'notre-dame',  roleName:'フロロー',         periodStart:'2024-06-01', periodEnd:'2025-03-30'},
  ]},
  { id:'c2',  name:'山口 祐一郎',  nameKana:'やまぐち ゆういちろう',  roles:[
    {showId:'lion-king',   roleName:'スカー',           periodStart:'2022-09-01'},
  ]},
  { id:'c3',  name:'光川 愛',      nameKana:'みつかわ めぐみ',        roles:[
    {showId:'lion-king',   roleName:'ナラ',             periodStart:'2024-01-15'},
  ]},
  { id:'c4',  name:'下村 青',      nameKana:'しもむら あおい',        roles:[
    {showId:'lion-king',   roleName:'ラフィキ',         periodStart:'2023-06-01'},
  ]},
  { id:'c5',  name:'木村 達成',    nameKana:'きむら たつなり',        roles:[
    {showId:'aladdin',     roleName:'アラジン',         periodStart:'2024-04-01'},
  ]},
  { id:'c6',  name:'神田 恵介',    nameKana:'かんだ けいすけ',        roles:[
    {showId:'aladdin',     roleName:'ジーニー',         periodStart:'2023-10-01'},
    {showId:'mermaid',     roleName:'エリック王子',     periodStart:'2021-03-01', periodEnd:'2022-11-30'},
  ]},
  { id:'c7',  name:'山本 紗衣',    nameKana:'やまもと さえ',          roles:[
    {showId:'aladdin',     roleName:'ジャスミン',       periodStart:'2024-07-01'},
  ]},
  { id:'c8',  name:'谷口 あかり',  nameKana:'たにぐち あかり',        roles:[
    {showId:'cats',        roleName:'グリザベラ',       periodStart:'2022-04-01'},
  ]},
  { id:'c9',  name:'野中 万寿夫',  nameKana:'のなか ますお',          roles:[
    {showId:'cats',        roleName:'マンカストラップ', periodStart:'2023-02-01'},
  ]},
  { id:'c10', name:'苫田 亜沙子',  nameKana:'とまだ あさこ',          roles:[
    {showId:'cats',        roleName:'グランバスタファー', periodStart:'2024-09-01'},
  ]},
  { id:'c11', name:'村俊 英之',    nameKana:'むらとし ひでゆき',      roles:[
    {showId:'phantom',     roleName:'ファントム',       periodStart:'2019-05-01', periodEnd:'2023-03-31'},
  ]},
  { id:'c12', name:'坂本 里咲',    nameKana:'さかもと りさ',          roles:[
    {showId:'phantom',     roleName:'クリスティーヌ',   periodStart:'2020-01-01', periodEnd:'2023-03-31'},
  ]},
  { id:'c13', name:'飯田 達郎',    nameKana:'いいだ たつろう',        roles:[
    {showId:'notre-dame',  roleName:'カジモド',         periodStart:'2024-06-01', periodEnd:'2025-03-30'},
  ]},
  { id:'c14', name:'田中 彩子',    nameKana:'たなか あやこ',          roles:[
    {showId:'mermaid',     roleName:'アリエル',         periodStart:'2021-03-01', periodEnd:'2022-11-30'},
  ]},
]

export const INITIAL_REVIEWS: Review[] = [
  {
    id:'r1', showId:'lion-king', userId:'u2', userName:'みゅー', userInitial:'み', userColor:'#E8192C',
    postedAt:'2024-11-20T10:00:00', date:'2024-11-15', rating:5,
    title:'何度見ても圧倒される！', likeCount:24,
    body:'10回以上見ていますが、毎回感動します。特に「サークルオブライフ」の開幕は鳥肌もの。今回は2階席から見ましたが、全体が見渡せてまた違う感動がありました。芝さんのムファサは貫禄が増して最高でした！舞台装置の精巧さも毎回新しい発見があって飽きません。',
    seat:'2階B列23番', isFavorite:true,
    castRatings:[
      {castId:'c1', rating:5, comment:'声量・存在感ともに圧巻！登場シーンだけで泣けます'},
      {castId:'c3', rating:5, comment:'ナラの凛とした美しさが素晴らしかった'},
    ],
  },
  {
    id:'r2', showId:'lion-king', userId:'u3', userName:'劇場通いK', userInitial:'K', userColor:'#3B82F6',
    postedAt:'2024-10-05T15:30:00', date:'2024-10-01', rating:4,
    title:'スカーのキャラが今回は特に際立っていた', likeCount:11,
    body:'山口さんのスカーは毎回趣が異なりますが、今回は特に嫌らしさが際立っていて最高でした。若干テンポが早く感じたシーンもありましたが、全体的に大満足。次は1階前方で観たいです。',
    seat:'1階P列5番', isFavorite:false,
    castRatings:[{castId:'c2', rating:5, comment:'絶妙な悪役ぶり、最高の存在感'}],
  },
  {
    id:'r3', showId:'lion-king', userId:'u4', userName:'さくら', userInitial:'さ', userColor:'#EC4899',
    postedAt:'2024-09-22T09:00:00', date:'2024-09-20', rating:5,
    title:'子供と初めて観劇、大正解でした', likeCount:18,
    body:'8歳の娘と初めて劇団四季を観に行きました。心配していましたが、最初から最後まで釘付けでした。終わった後「もう一回見たい！」と言ってくれて嬉しかった。親子で泣けて笑える素晴らしい舞台です。',
    seat:'1階K列8番', isFavorite:false,
    castRatings:[{castId:'c4', rating:5, comment:'ラフィキのシーンが特に印象的でした！'}],
  },
  {
    id:'r4', showId:'aladdin', userId:'u2', userName:'みゅー', userInitial:'み', userColor:'#E8192C',
    postedAt:'2024-09-10T11:00:00', date:'2024-09-05', rating:5,
    title:'ジーニーが神がかっていた！', likeCount:31,
    body:'神田さんのジーニーは本当に笑いが止まらない！即興のようなアドリブも多く、客席全体が笑いに包まれました。フレンドライクミーのナンバーは圧巻のパフォーマンス。衣装も豪華で目が足りない！終わったあとも余韻が続く最高の作品でした。',
    seat:'1階G列12番', isFavorite:true,
    castRatings:[
      {castId:'c6', rating:5, comment:'アドリブ満載で腹筋崩壊。神田ジーニーは唯一無二！'},
      {castId:'c5', rating:4, comment:'歌が安定してきた、今後が楽しみ'},
    ],
  },
  {
    id:'r5', showId:'aladdin', userId:'u5', userName:'takaoh', userInitial:'T', userColor:'#8B5CF6',
    postedAt:'2024-08-01T20:00:00', date:'2024-07-28', rating:4,
    title:'舞台美術が圧倒的すぎる', likeCount:9,
    body:'アラジンの世界観を完璧に表現した舞台美術には言葉を失いました。特にアグラバーの市場シーンの奥行きと賑やかさ。ジャスミンの衣装も美しくて目が離せませんでした。また観に行きたい。',
    seat:'1階Q列22番', isFavorite:false,
    castRatings:[{castId:'c7', rating:5, comment:'ジャスミンの凛とした美しさと歌声が最高'}],
  },
  {
    id:'r6', showId:'cats', userId:'u3', userName:'劇場通いK', userInitial:'K', userColor:'#3B82F6',
    postedAt:'2024-08-20T20:00:00', date:'2024-08-18', rating:5,
    title:'メモリーで号泣', likeCount:27,
    body:'谷口さんのグリザベラは本当に圧巻。「メモリー」は何度聞いても泣きます。今回は割と前の席だったので、俳優さんの表情まで細かく見れて大満足でした。四季のキャッツは何年経っても色褪せない。劇場の没入感もたまりません。',
    seat:'1階C列8番', isFavorite:false,
    castRatings:[{castId:'c8', rating:5, comment:'グリザベラの孤独と希望が伝わってくる名演'}],
  },
  {
    id:'r7', showId:'cats', userId:'u6', userName:'nemu', userInitial:'ね', userColor:'#10B981',
    postedAt:'2024-07-10T14:00:00', date:'2024-07-08', rating:5,
    title:'猫になって踊りたくなる！', likeCount:15,
    body:'開演から終演まで、ずっと猫の世界に引き込まれっぱなしでした。俳優さん全員の身体能力が素晴らしく、人間とは思えない動き。特にマンカストラップのシーンはかっこよすぎて声が出ました。',
    seat:'2階E列14番', isFavorite:false,
    castRatings:[{castId:'c9', rating:5, comment:'リーダーとしての存在感が圧倒的'}],
  },
  {
    id:'r8', showId:'notre-dame', userId:'u2', userName:'みゅー', userInitial:'み', userColor:'#E8192C',
    postedAt:'2024-07-15T12:00:00', date:'2024-07-10', rating:5,
    title:'衝撃の完成度。四季の新境地', likeCount:42,
    body:'「ノートルダムの鐘」は今まで見た四季の中で最高傑作かもしれない。テーマが重くて賛否あると思いますが、その深さが四季らしくない（いい意味で）。合唱の迫力は生で聞くと震えます。飯田さんのカジモドは純粋さと悲しさが同居していて最高でした。終演後に立ち上がれなかった。',
    seat:'1階F列15番', isFavorite:true,
    castRatings:[
      {castId:'c13', rating:5, comment:'カジモドの純粋さに胸が痛い。素晴らしい'},
      {castId:'c1',  rating:5, comment:'フローロー役も完璧。声の使い方が違う'},
    ],
  },
  {
    id:'r9', showId:'mermaid', userId:'u5', userName:'takaoh', userInitial:'T', userColor:'#8B5CF6',
    postedAt:'2024-06-18T18:00:00', date:'2024-06-15', rating:5,
    title:'水中表現に度肝を抜かれた', likeCount:20,
    body:'アリエルが泳ぐシーンの舞台技術は本当に驚異的。俳優さんたちが本当に海中を漂っているように見えて、思わず息を止めてしまいました。田中さんのアリエルは声も演技も完璧で最高の体験でした。',
    seat:'1階H列3番', isFavorite:false,
    castRatings:[{castId:'c14', rating:5, comment:'アリエルの無邪気さと切なさのバランスが絶妙'}],
  },
  {
    id:'r10', showId:'phantom', userId:'u4', userName:'さくら', userInitial:'さ', userColor:'#EC4899',
    postedAt:'2024-05-05T16:00:00', date:'2024-05-03', rating:5,
    title:'生涯最高の体験と言っても過言ではない', likeCount:55,
    body:'初めてオペラ座の怪人を観ました。圧倒されすぎて観劇後しばらく何もできませんでした。「ミュージック・オブ・ザ・ナイト」をライブで聴く体験は言葉にならない。村俊さんのファントムは美しくて悲しくて、ずっと心に残っています。これは絶対に生で観るべき。',
    seat:'1階D列10番', isFavorite:true,
    castRatings:[
      {castId:'c11', rating:5, comment:'あの声はもはや人間業を超えている'},
      {castId:'c12', rating:5, comment:'クリスティーヌの揺れ動く心が完璧に表現されていた'},
    ],
  },
]

export const STORAGE_KEY = 'shiki-review-v2'

export function loadReviews(): Review[] {
  try {
    const s = localStorage.getItem(STORAGE_KEY)
    if (s) return JSON.parse(s)
  } catch {}
  return INITIAL_REVIEWS
}

export function saveReviews(r: Review[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(r))
}
