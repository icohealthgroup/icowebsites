const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1380, height: 950 } });
  async function snap(file, scrollSel, name){
    const page = await ctx.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto('file://' + path.resolve('site', file), { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);
    if(scrollSel) await page.evaluate(sel => document.querySelector(sel)?.scrollIntoView({block:'center'}), scrollSel);
    await page.waitForTimeout(900);
    await page.screenshot({ path: 'shots/' + name + '.png' });
    if(errors.length) console.log(name, 'ERRORS:', errors.join('|'));
    await page.close();
  }
  await snap('index.html', null, 's-index-top');
  await snap('index.html', '.otm-banner', 's-index-otm');
  await snap('services.html', null, 's-services-top');
  await browser.close();
  console.log('done');
})();
