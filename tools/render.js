// ロゴSVGから透過PNGを書き出すスクリプト。
// 使い方: cd tools && npm install playwright-core && node render.js
// (Playwright の Chromium が未取得なら `npx playwright install chromium` を先に実行)
const { chromium } = require('playwright-core');
const path = require('path');
const fs = require('fs');

const SVG = path.join(__dirname, '..', 'svg');
const OUT = path.join(__dirname, '..', 'png');

(async () => {
  // lockup HTML が参照する mark.svg を tools/ に同期
  fs.copyFileSync(path.join(SVG, 'mark.svg'), path.join(__dirname, 'mark.svg'));
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // 1) 単体マーク(透過)を各サイズで
  const markSvg = fs.readFileSync(path.join(SVG, 'mark.svg'), 'utf8');
  const markLightSvg = fs.readFileSync(path.join(SVG, 'mark-light.svg'), 'utf8');
  for (const [name, svg] of [['mark', markSvg], ['mark-light', markLightSvg]]) {
    for (const size of [256, 512, 1024]) {
      await page.setViewportSize({ width: size, height: size });
      await page.setContent(
        `<body style="margin:0;background:transparent">${svg.replace('<svg ', `<svg width="${size}" height="${size}" `)}</body>`
      );
      await page.screenshot({ path: `${OUT}/${name}-${size}.png`, omitBackground: true });
      console.log(`${name}-${size}.png`);
    }
  }

  // 2) 団体名あり(横組み・縦組み)。Webフォント読込を待ってから要素単位で撮影
  for (const [file, out] of [
    ['lockup-horizontal.html', 'lockup-horizontal'],
    ['lockup-vertical.html', 'lockup-vertical'],
  ]) {
    const p = await browser.newPage({ deviceScaleFactor: 2 });
    await p.goto('file://' + path.join(__dirname, file));
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(300);
    const el = await p.$('#target');
    await el.screenshot({ path: `${OUT}/${out}@2x.png`, omitBackground: true });
    console.log(`${out}@2x.png`);
    await p.close();
  }

  await browser.close();
})();
