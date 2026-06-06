# shikix 開発ルール

劇団四季 非公式レビューアプリ。本ファイルはClaude Codeとの開発ルールを定める。

## 技術スタック

| 用途 | ライブラリ |
|---|---|
| フレームワーク | React 19 + TypeScript |
| ビルド | Vite 8 |
| スタイリング | Tailwind CSS 3 |
| ルーティング | React Router v7 |
| アニメーション | Framer Motion |
| アイコン | Lucide React |
| PWA | vite-plugin-pwa |

## 開発コマンド

```bash
# Node 23 が必要（システムデフォルトが古い場合）
export PATH="/usr/local/Cellar/node/23.11.0/bin:$PATH"

npm run dev      # 開発サーバー起動 → http://localhost:5173
npm run build    # プロダクションビルド
npm run lint     # ESLint
```

## ディレクトリ構成

```
src/
├── components/     # 再利用コンポーネント
│   ├── BottomNav.tsx
│   ├── ReviewCard.tsx
│   ├── ShowCard.tsx
│   └── StarRating.tsx
├── pages/          # ルート単位のページ
│   ├── HomePage.tsx        # /
│   ├── HotPage.tsx         # /hot
│   ├── ShowDetailPage.tsx  # /shows/:id
│   ├── ReviewFormPage.tsx  # /shows/:id/review/new
│   ├── CastsPage.tsx       # /casts
│   ├── CastDetailPage.tsx  # /casts/:id
│   ├── TheaterPage.tsx     # /theaters/:id
│   └── MyPage.tsx          # /my
├── hooks/
│   └── useReviews.ts   # レビュー状態管理（localStorageに永続化）
├── data/
│   └── mock.ts         # すべてのデータ（公演・キャスト・レビュー・劇場）
└── types/
    └── index.ts        # 型定義
public/
└── images/             # 各公演の舞台写真（劇団四季公式ギャラリーより）
```

## データ構造

現在はすべてモックデータ（`src/data/mock.ts`）。DBは未実装。

- **レビューのみ** `localStorage` に保存（`STORAGE_KEY = 'shiki-review-v2'`）
- 公演・キャスト・劇場データは静的定数

### 公演に新しいフィールドを追加するとき
1. `src/types/index.ts` の `Show` インターフェースに追加
2. `src/data/mock.ts` の全6公演に値を追加
3. 参照するページ・コンポーネントを更新

## デザインルール

### カラーパレット（tailwind.config.js）

| トークン | 値 | 用途 |
|---|---|---|
| `shiki-red` / `shiki-accent` | `#00a07e` | メインアクセント（ティール） |
| `shiki-darker` | `#f5f5f5` | ページ背景 |
| `shiki-card` | `#ffffff` | カード背景 |
| `shiki-dark` | `#f0f0f0` | インプット・サーフェス |

### コンポーネントクラス（index.css）

- `.card` — 白背景・角丸・薄シャドウ
- `.btn-primary` — ティール色ボタン
- `.btn-ghost` — テキストボタン
- `.badge` — 小さなラベル
- `.input` — フォーム入力

### 画像表示

- サムネイル（ShowCard・ランキング等）: `style={{ aspectRatio: '2/3' }}` + `object-cover`
- 詳細ページヒーロー: `aspect-[2/3]` の縦長コンテナ

## アフィリエイト実装メモ

チケット・ホテルリンクはURLコメントにパラメータ追記箇所を記載済み。

```ts
// チケットぴあ（ShowDetailPage.tsx）
`https://ticket.pia.jp/...`
/* アフィリエイトパラメータ: &af=YOUR_PIA_AFFILIATE_ID */

// 楽天トラベル（TheaterPage.tsx）
`https://travel.rakuten.co.jp/...`
/* アフィリエイトパラメータ: &af=YOUR_RAKUTEN_AFFILIATE_ID */

// じゃらん（TheaterPage.tsx）
`https://www.jalan.net/...`
/* アフィリエイトパラメータ: &afid=YOUR_JALAN_AFFILIATE_ID */
```

## 今後の開発で守るルール

- **データ追加は mock.ts に集中させる** — ページに直接データを書かない
- **新しいページを追加したら** App.tsx にルートを追加し、必要に応じてBottomNavも更新
- **画像は `/public/images/` に配置** — 外部URLは使わない（オフライン対応のため）
- **アフィリエイトリンクは `target="_blank" rel="noopener noreferrer"` を必ずつける**
- **非公式である旨の表記を削除しない**（MyPage下部の免責文）
- **コメントは原則書かない** — 自明なコードにコメント不要。WHYが非自明な場合のみ

## 未実装・今後の課題

- [ ] バックエンド / DB接続（現在はすべてモック）
- [ ] ユーザー認証
- [ ] レビューへのいいね機能（UIのみ実装済み、`likeCount` フィールドあり）
- [ ] キャストの公式スケジュール連携
- [ ] アフィリエイトID本番設定
- [ ] OGP / SNSシェア機能
