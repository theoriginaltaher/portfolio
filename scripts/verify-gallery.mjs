// Run against a local Next server. Set PLAYWRIGHT_MODULE and CHROMIUM_PATH if using a shared installation.
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE ? pathToFileURL(path.join(process.env.PLAYWRIGHT_MODULE, 'index.mjs')).href : 'playwright');
const base = process.env.QA_BASE_URL || 'http://localhost:3100';
(async () => {
  const browser = await chromium.launch({ headless: true, ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}) });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await fs.mkdir('reports/media', { recursive: true });
  const goto = async route => { const response = await page.goto(base + route, { waitUntil: 'networkidle', timeout: 180000 }); assert.equal(response.status(), 200, route); };
  const loadImages = async () => {
    for (const image of await page.locator('main img').all()) {
      if (!await image.isVisible()) continue;
      await image.scrollIntoViewIfNeeded();
      await image.evaluate(img => img.complete ? Promise.resolve() : new Promise(resolve => { img.addEventListener('load', resolve, { once: true }); img.addEventListener('error', resolve, { once: true }); setTimeout(resolve, 15000); }));
    }
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  };
  await goto('/projects/systems');
  assert.equal(await page.locator('.system-project').count(), 5);
  await loadImages();
  await page.screenshot({ path: 'reports/media/systems-desktop.png', fullPage: true });
  await goto('/projects/serveflow');
  await page.locator('.media-tile').first().click();
  await page.locator('dialog[open]').waitFor();
  const firstTitle = await page.locator('#viewer-title').textContent();
  await page.keyboard.press('ArrowRight');
  assert.notEqual(await page.locator('#viewer-title').textContent(), firstTitle);
  await page.getByRole('button', { name: 'Zoom image' }).click();
  assert.equal(await page.locator('.viewer-image.is-zoomed').count(), 1);
  await page.screenshot({ path: 'reports/media/viewer-zoom.png' });
  await page.getByRole('button', { name: 'Fit image' }).click();
  await page.getByRole('button', { name: 'Fullscreen', exact: true }).click();
  await page.waitForFunction(() => Boolean(document.fullscreenElement));
  await page.getByRole('button', { name: 'Exit fullscreen', exact: true }).click();
  await page.keyboard.press('Escape');
  await goto('/projects/media/rangers-safety-systems-films');
  assert.equal(await page.locator('video').count(), 0, 'No video download before opening');
  await page.locator('.media-tile').first().click();
  await page.locator('video').waitFor();
  await page.locator('video').evaluate(async video => { video.muted = true; await video.play(); });
  await page.waitForFunction(() => document.querySelector('video')?.currentTime > 0, { timeout: 30000 });
  await page.screenshot({ path: 'reports/media/video-playback.png' });
  await page.getByRole('button', { name: 'Next item' }).click();
  assert.equal(await page.locator('video').count(), 1, 'Only one video player at a time');
  await page.getByRole('button', { name: 'Close media viewer' }).click();
  assert.equal(await page.locator('video').count(), 0, 'Closing destroys playback');
  assert.equal(await page.locator('dialog[open]').count(), 0);
  assert.equal(await page.evaluate(() => document.activeElement?.classList.contains('media-tile')), true, 'Restores focus to opened tile');
  await goto('/projects/media');
  await loadImages();
  await page.screenshot({ path: 'reports/media/gallery-desktop.png', fullPage: true });
  await page.getByRole('button', { name: /Photography/ }).click();
  assert.equal(await page.locator('.album-card').count(), 8);
  await page.getByRole('searchbox').fill('not-a-real-collection');
  await page.getByRole('heading', { name: 'No matching collections' }).waitFor();
  await page.getByRole('button', { name: 'Clear filters' }).click();
  await page.locator('.album-card a').first().click();
  await page.locator('.media-tile').first().click();
  await page.locator('.viewer-image').waitFor();
  await page.waitForFunction(() => { const image = document.querySelector('.viewer-image'); return image?.complete && image.naturalWidth > 0; });
  await page.screenshot({ path: 'reports/media/viewer-desktop.png' });
  for (let i = 0; i < 20; i++) { await page.keyboard.press('Tab'); assert.equal(await page.evaluate(() => Boolean(document.activeElement?.closest('dialog'))), true, 'Focus remains in dialog'); }
  await page.keyboard.press('Escape');
  for (const width of [390, 768]) {
    await page.setViewportSize({ width, height: 844 });
    for (const route of ['/projects/systems', '/projects/media', '/projects/serveflow', '/projects/media/interact-installation-29']) {
      await goto(route);
      await loadImages();
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `No overflow: ${route} at ${width}`);
      await page.screenshot({ path: `reports/media/${route.split('/').filter(Boolean).join('-')}-${width}.png`, fullPage: true });
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator('.media-tile').first().click();
  const beforeSwipe = await page.locator('#viewer-title').textContent();
  await page.locator('.viewer-stage').dispatchEvent('pointerdown', { clientX: 300, clientY: 300, pointerType: 'touch' });
  await page.locator('.viewer-stage').dispatchEvent('pointerup', { clientX: 100, clientY: 300, pointerType: 'touch' });
  assert.notEqual(await page.locator('#viewer-title').textContent(), beforeSwipe, 'Swipe navigates');
  await page.waitForFunction(() => { const image = document.querySelector('.viewer-image'); return image?.complete && image.naturalWidth > 0; });
  await page.screenshot({ path: 'reports/media/viewer-mobile.png' });
  await page.getByRole('button', { name: 'Close media viewer' }).click();
  const missing = await page.goto(base + '/projects/media/nonexistent-album');
  assert.equal(missing.status(), 404);
  const missingProject = await page.goto(base + '/projects/nonexistent-project');
  assert.equal(missingProject.status(), 404);
  assert.deepEqual(errors, []);
  console.log('PASS: desktop/tablet/mobile layout, image viewer, zoom, navigation, focus trap/restore, filtering/search, native video playback/cleanup, and missing-page 404s.');
  await browser.close();
})().catch(error => { console.error(error); process.exit(1); });
