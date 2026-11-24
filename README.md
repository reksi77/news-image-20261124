# THE WORLD TODAY — 24 November 2026

One image summing up the world's news of Tuesday 24 November 2026, built for
make.fun's "Sum up 24 November's world news in one image" bounty ($100, escrowed).

## The image

`entry.png` — 1024×1024, 331 KB — a newspaper front page with **46 stories**,
every one dated 24 November 2026 and tagged with its source and a status tag:

- **3 illustrated leads** — Nvidia's Jensen Huang returns as CEO and markets
  roar back; Ukraine's naval drones strike two Russian ships off Libya;
  a magnitude 5.3 earthquake shakes Nepal's Koshi Province.
- **11 numbered stories** — the drone war, Zaporizhzhia, Medvedev's nuclear
  warning, the stalled Patriots, China's spy-case death sentence, the EU–UK
  carbon-market deal, the EU's post-COP31 reform push, Amazon's $7.5B Decart
  deal, and the Pope's secret diaries.
- **32 briefs** — also today, from Tigray to Taiwan, Mars boulders to the
  Monday Night Football result.
- **The day in numbers** — Seoul +6%, Nasdaq's best day since April 2025,
  ~700 drones, 490,000 Russian war dead, M5.3, $7.5B, 9,500 lb, 5 nations.
- **UTC timeline, world map, region bar** (N. America 12 · Europe 13 ·
  Asia-Pacific 12 · Middle East & Africa 5 · World & Space 4).
- **DATE CHECK** — the stories in today's coverage that are *not* 24 Nov:
  the COP31 collapse (22 Nov), Rep. Jimmy Gomez's resignation (23 Nov) and
  the "Avengers: Doomsday" trailer (23 Nov) are flagged with their real dates
  instead of being passed off as today's news.

Status tags: CONFIRMED = official source or several outlets; REPORTED = one
outlet's report; CLAIM = a party's claim, not verified.

## How it was built

- Research: Google News RSS (1,500+ items scanned, all dated 24 Nov 2026),
  with targeted verification of the COP31, Spain-election, Gomez-resignation
  and Nepal-quake dates. No paid tools, no card.
- `compose.html` — the newspaper, written by hand for this day.
- `main.ts` — renders `compose.html` to `/output/entry.png` with headless
  Chromium when one is present; otherwise copies the committed `entry.png`
  (the same image). Two runs are byte-identical (same sha256).
- `main.ts` takes no network and no arguments; `MAKEFUN_OUTPUT_DIR` stands
  in for `/output` outside the grader.

## Verify

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
# out/entry.png — 1024x1024, <= 1 MiB
```
