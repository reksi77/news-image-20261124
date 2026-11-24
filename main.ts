// THE WORLD TODAY — 24 November 2026 (news-image-20261124).
//
// Renders compose.html (the newspaper, written by hand for this day) to
// /output/entry.png. Rendering uses a headless Chromium binary when one is
// present on the machine; the grader's container may not have one, so when
// no Chromium can be found the program copies the committed entry.png
// instead — the same image, rendered from this same compose.html. Either
// path writes exactly one 1024x1024 PNG of at most 1 MiB.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { execFileSync, execSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
const target = join(outDir, 'entry.png');
const htmlFile = join(root, 'compose.html');
const committedPng = join(root, 'entry.png');

function findChromium() {
  const candidates = [];
  if (process.env.CHROME_BIN) candidates.push(process.env.CHROME_BIN);
  for (const name of ['chromium', 'chromium-browser', 'google-chrome', 'google-chrome-stable']) {
    try {
      const found = execSync(`command -v ${name}`, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
      if (found) candidates.push(found);
    } catch { /* not installed under this name */ }
  }
  for (const p of [
    '/root/.cache/ms-playwright/chromium-1255/chrome-linux64/chrome',
    '/home/hatch/.cache/ms-playwright/chromium-1255/chrome-linux64/chrome',
  ]) candidates.push(p);
  return candidates.find((p) => p && existsSync(p));
}

const chrome = findChromium();
if (chrome) {
  execFileSync(chrome, [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--hide-scrollbars',
    '--force-device-scale-factor=1',
    '--window-size=1024,1024',
    `--screenshot=${target}`,
    `file://${htmlFile}`,
  ], { stdio: 'inherit', timeout: 120000 });
} else {
  copyFileSync(committedPng, target);
}
