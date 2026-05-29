const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Listen for page navigations (full reload signals)
  let fullNavCount = 0;
  page.on('framenavigated', frame => {
    if (frame === page.mainFrame()) {
      fullNavCount++;
      process.stdout.write(`[NAVIGATION #${fullNavCount}] ${frame.url()}\n`);
    }
  });

  // Capture console
  const logs = [];
  page.on('console', msg => {
    const t = msg.text();
    if (t.match(/^(RENDER|MOUNT)/)) logs.push(t);
  });

  await page.goto('http://localhost:3101', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(3000);
  process.stdout.write(`[INITIAL] navigations: ${fullNavCount}\n`);
  process.stdout.write('[INITIAL LOGS]\n');
  logs.forEach(l => process.stdout.write(l + '\n'));
  logs.length = 0; fullNavCount = 0;

  // Check the tab link HTML attributes
  const linkAttrs = await page.evaluate(() => {
    const links = document.querySelectorAll('a[href="/journal"], a[href="/today"], a[href="/progress"]');
    return Array.from(links).map(l => ({
      href: l.href,
      outerHTML: l.outerHTML.substring(0, 200),
      hasClickHandler: typeof l.onclick !== 'undefined',
      reactFiber: !!l['__reactFiber$' + Object.keys(l).find(k => k.startsWith('__reactFiber'))],
    }));
  });
  process.stdout.write('\n[TAB LINK ATTRIBUTES]\n');
  linkAttrs.forEach(l => process.stdout.write(JSON.stringify(l, null, 2) + '\n'));

  // Click journal and measure what happens
  process.stdout.write('\n[CLICKING JOURNAL TAB]\n');
  await page.click('a[href="/journal"]', { timeout: 5000 });
  await page.waitForTimeout(2000);
  process.stdout.write(`full_page_navigations_after_click: ${fullNavCount}\n`);
  process.stdout.write(`current_url: ${page.url()}\n`);
  logs.forEach(l => process.stdout.write(l + '\n'));

  await browser.close();
})().catch(e => process.stderr.write('[FATAL] ' + e.message + '\n'));
