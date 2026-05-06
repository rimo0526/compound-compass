# 複利コンパス（Compound Compass）

Monte Carloで考える人生計画ツール群。資産形成・住宅ローン・学習計画・ダイエットの4軸で、確率分布を使った意思決定ツールを提供します。

🌐 **公開URL**: https://compound-compass.mc-apps.workers.dev

## 提供ツール

| ツール | 内容 |
|--------|------|
| [複利コンパス](https://compound-compass.mc-apps.workers.dev/) | つみたて投資・FIREシミュレーター |
| [住宅ローンコンパス](https://compound-compass.mc-apps.workers.dev/home-loan.html) | 繰上 vs 投資をMonte Carloで比較 |
| [学習計画コンパス](https://compound-compass.mc-apps.workers.dev/study-plan.html) | 資格試験の合格確率を可視化 |
| [ダイエット予測コンパス](https://compound-compass.mc-apps.workers.dev/diet.html) | 目標体重達成期間の予測 |

## 特徴

- **完全無料・ブラウザ完結**：登録不要、データはサーバーに送信されません
- **Monte Carlo方式**：単一値ではなく「確率分布」で結果を表示
- **シングルファイルHTML**：依存ライブラリなし、軽量・高速
- **PWA対応**：スマホにインストール可能

## 技術スタック

- 静的HTML/CSS/JS（フレームワーク不使用）
- SVGチャート（自作・外部ライブラリ不使用）
- Service Worker（PWA、Network-first for HTML）
- Cloudflare Pages（自動デプロイ）

## ブログ

15本の解説記事を公開中：複利・FIRE・NISA・iDeCo・住宅ローン・資格・ダイエット

[記事一覧 →](https://compound-compass.mc-apps.workers.dev/blog.html)

## ライセンス・免責事項

本サイトの計算結果はあくまで概算シミュレーションです。投資判断・金融判断・健康判断はご自身の責任で、必要に応じて専門家にご相談ください。
