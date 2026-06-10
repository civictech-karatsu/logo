# シビックテック唐津 ロゴアセット

シビックテック唐津の公式ロゴを管理するリポジトリです。
モチーフは「円相の中に建つ唐津城(舞鶴城)の天守・波・朝日」。
レイアウトは黄金比基準(石垣の下端=コンテンツの黄金分割点)で構成しています。

## パターン一覧

| パターン | SVG | PNG(透過) | PNG(白背景) |
|---|---|---|---|
| 単体マーク | `svg/mark.svg` | `png/mark-{256,512,1024}.png` | `png/mark-{256,512,1024}-white.png` |
| 単体マーク(明色・濃色背景用) | `svg/mark-light.svg` | `png/mark-light-{256,512,1024}.png` | —(白地では見えないため無し) |
| 団体名あり・横組み | (tools/lockup-horizontal.html から生成) | `png/lockup-horizontal@2x.png` | `png/lockup-horizontal-white@2x.png` |
| 団体名あり・縦組み | (tools/lockup-vertical.html から生成) | `png/lockup-vertical@2x.png` | `png/lockup-vertical-white@2x.png` |

- 明るい背景には通常版、濃い背景(紺・墨色など)には `mark-light` を使ってください。
- 透過 PNG が使えない場面(SNS アイコン・印刷物への貼り込みなど)では白背景版を使ってください。
- 団体名ありパターンの書体: 和文 = Zen Old Mincho(900) / 欧文 = Noto Sans JP(700)

## ブランドカラー

| 色 | HEX | 用途 |
|---|---|---|
| ティール | `#0f7b8a` | メイン(円相・天守・波) |
| 水色 | `#9fe0e8` | 明色版・補助 |
| 金(朝日) | `#f7c948` | アクセント |
| 墨 | `#12343b` | 団体名の和文 |

## PNG の再生成

SVG を編集したら、以下で PNG を再生成できます。

```bash
cd tools
npm install playwright-core
npx playwright install chromium   # Chromium 未取得の場合のみ
node render.js
```

## 利用先

- 公式サイト: https://civictech-karatsu.org/ (`public/logo.svg` / `logo-light.svg` / `favicon.svg`)
- note・SNS のアイコンには `png/mark-1024.png` を推奨
