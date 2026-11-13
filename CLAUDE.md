# Insurance Tycoon

Top-down pixel-art parody game about insurance sales, played in the browser. You are an insurance agent:
you persuade clients (trust meter) with "spells" (coffee, promises, business cards), sign
contracts, recruit clients into your guild and build a multi-level structure. A rival team
and break-away parts of your own guild race you to level 5. Tycoon layer: you name your company,
draw its logo and your character in the start menu, recharge charisma at your office and build
billboards that persuade clients around them. All in-game text is Slovak.

No build step, no dependencies. Plain HTML + CSS + one JavaScript file drawing on a canvas.

## Run

```
python -m http.server 8000      # then open http://localhost:8000
```

Opening `index.html` directly from disk also works in Chrome.

## Files

| Path | What it is |
|---|---|
| `index.html` | Markup for the HUD and dialogs (start-menu wizard, career ladder, structure window, end screen). |
| `css/style.css` | All UI styling. Nine-slice frames, bars, slots and buttons come from images in `assets/ui/`. |
| `css/fonts.css` | `@font-face` rules for the bundled fonts. |
| `js/game.js` | The whole game (about 800 lines, one IIFE). Sections are marked `// ---------- name ----------`. |
| `favicon.svg`, `favicon.png` | Tab icon: the default shield logo, drawn by us (12×12 pixels). |
| `assets/ui/` | UI kit images (RPGUI). |
| `assets/fonts/` | Pixelify Sans (body) and Press Start 2P (headings), latin + latin-ext subsets. |
| `tools/smoke.py` | Headless smoke test + screenshots (also drives the creator, the office and a billboard). |
| `tools/sim.py` | Balance simulation with a scripted bot player. |
| `tools/bundle.py` | Builds `dist/` with CSS/JS/fonts inlined (only for strict hosts). |
| `licenses/`, `CREDITS.md` | Third-party licences and attribution. Keep them with the project. |

## Sections of `js/game.js` (in order)

1. **Setup** – `ICONS` (inline SVG paths from Pixelarticons), `ico()`, canvas, helpers (`hash`, `vnoise`, `shade`).
2. **world layout** – `buildings`, `cafeDoor`, `acadDoor`, `pond`, collision (`pushOut`), `freeSpot`.
3. **pixel-art ground** – the map is painted once into a 600×434 canvas (`ground`) and drawn ×3 (`S=3`) without smoothing. Buildings are painted here too.
4. **sprites** – characters are generated in code: `sheet(look)` builds a 3×3 sprite sheet (down/up/side × idle/step/step) from a `look` object and caches it. `mkTree`, `mkProp`, `SPR` make props. Nothing is loaded from image files except the UI kit.
5. **game data** – `TYPES` (client types and their multipliers), `TITLES`, `SAY`, `SPAM` (fake chat), `SPELLS`, player `P`,
   **company profile** (`prof`, `LOGO_PAL`/`LOGO_PRESETS`, `LOOK_OPTS`, `drawLogo`, `saveProf` + localStorage load), `newClient`, `mkAgent`.
6. **HUD helpers** – `chat`, `err`, `float`, `burst` (particles), `levelUp`, `questCheck`, structure window (`toggleOrg`, `renderTree`), career ladder (`careerHtml`).
7. **spells** – `useSpell` (checks) and `finish` (effects) for the player's five actions.
8. **levels** – `REQ` table and the level engine (`reqInfo`, `lvNode`, `relevel`), income sharing (`credit`), rival spawn, win/lose (`checkEnd`), break-away (`breakaway`, `checkPara`), newbie leaving (`leave`).
9. **AI agents** – `updTeam(team, dt)`: one brain for three teams (`me`, `riv`, `par`), see `TEAMS`.
10. **academy** – `buyCourse`, `updCourse`, fireworks.
11. **office & billboards** – `officeDoor`, `OFFICE_REGEN`, `billboards`, `bbCost`, `nearBB`, `mkBillboard` (sprite with logo + face), `buildBillboard`.
12. **input**, **update** (main simulation step), **draw** (canvas), `hud()` (DOM), **start-menu wizard**
    (`showStep`, `commitProf`, `enterGame`, `applyProf`, `crRender`, `drawPreview`), main loop.

## Game rules as implemented

**Trust.** Each client has up to three meters: `trust` (mine, green), `rtrust` (rival, red), `ptrust`
(break-away teams, purple). Whoever fills theirs to 100 can sign. Meters decay after ~4.5 s without attention.

**Player spells** (`SPELLS`): Kávička (needs a coffee, max 3, refilled at the café, +30 trust, melee range),
Sľub (30 charisma, +18, ranged), Vizitka (8 charisma, +6), Podpis zmluvy (at 100 % trust), Nábor (at 100 %
trust, costs `recruitCost()` = 60 + 15 × members). Charisma regenerates 2/s; refilled on level-up and on
completing the monthly plan. Client types multiply coffee/promise gains (`TYPES`).

**Levels = income + structure** (`REQ`, `MAXLVL = 5`). Income is cumulative (`P.inc`, `a.inc`), spending does
not reduce it. Structure counts trained members directly under the node; a higher level satisfies a lower requirement.

| Level | Income | Directly below |
|---|---|---|
| L2 | 100 € | 1× L1 |
| L3 | 500 € | 3× L1 or 2× L2 |
| L4 | 2000 € | 3× L2 + 2× L1, or 2× L3 + 1× L2 |
| L5 | 6000 € | 3× L3 + 2× L2, or 2× L4 + 1× L3 |

The same rules apply to guild members, the rival chief and break-away leaders. First to L5 wins.

**Income sharing.** A member's contract gives them the full commission; each boss above gets half of the
level below (`credit`). The player's share is `commission × 0.5^depth`.

**Guild limits.** `MAXA = 24` members, `MAXDIRECT = 6` directly under the player. Depth-1 members recruit up to
3 people themselves (after every 3 deals); deeper members do not recruit. This shape makes L5 reachable.

**Newbies.** A new member is untrained (`trained:false`): alone he can push trust only to 65 %. If the player
casts a spell on his client, the attempt counts as helped and can finish. After 11 s without help the client
refuses; two refusals and he leaves (`leave`). First contract trains him. Members recruited by other members
have a 50 % chance to manage alone. An Academy course trains every newbie.

**Academy.** At the Academy door press E: costs `courseCost()` = (200 + 50 × members) × 1.22^courses bought.
All members run there, the course takes 2 s once everyone is inside, each course gives +35 % work speed
(`mult`), then fireworks.

**Rival.** Appears when the guild (not the player) signs its first contract. Base speed 1.25, +0.3 per rival
training level (every 20 + 14 × level contracts), chief +0.25 and recruits after every 2 deals. Team size is
capped at `max(5, my members + 4)`. The chief prefers clients the player is working on and his persuasion
drains the player's trust.

**Company profile.** The start menu is a wizard (`showStep`: title, character, company, five tutorial pages; "Rýchlo do hry" appears when a profile is saved). Steps 1-2 edit the profile: company name, company colour
(`CO_COLS`), a 12×12 pixel logo (`LOGO_PAL` palette, presets in `LOGO_PRESETS`) and the player's look built from
`LOOK_OPTS` (keys of the `look` object that `sheet()` understands). `applyProf()` pushes it into the game: `P.look`,
the office plate, the HUD logo and the billboard sprite. Guild members wear the company colour (`mkAgent`). The
profile is the only thing persisted, in `localStorage` under `insurance-tycoon.prof`; it is validated on load.

**Office.** Within `OFFICE_R` of the office door charisma regenerates at `OFFICE_REGEN` per second instead of
`MANA_REGEN` (12 vs 2). The player starts next to the door. A blue ring + "Dobi charizmu" mark the door while
charisma is not full.

**Billboards.** Key B (or the side button) builds one at the player's position for `bbCost()` = 200 × 2^built,
at most `MAXBB` = 3, not near buildings/doors/other billboards. Inside an ellipse of `BB_R` (rx 170, ry 102) every
unsigned client gains `BB_RATE` = 9 trust per second for the player and does not decay; idle clients within
`BB_PULL` pick their next wander target near the billboard 70 % of the time. The rival can still fill his meter
there, so billboards attract him too. The sprite shows the logo, the player's face and the company name plate.

**Paralelita (break-away).** When a member reaches the player's level (from L2 up), a 60 s countdown starts
(`PARA_TIME`). If the player has not levelled up by then, the member and everyone below him become a separate
purple team (`paras`) that competes like the rival. Full-screen text + sound on break-away.

## Conventions

- **Language:** every string the player sees is Slovak. Code and comments are English.
- **No real-company terminology.** The game is a fictional parody. Do not add names, career titles, rank codes
  or branding of any real insurance or financial-advice company. The owner asked for this explicitly; the word
  "paralelita" is the one piece of trade jargon he chose to keep.
- **Assets:** only CC0 / public domain / MIT / OFL. Record anything new in `CREDITS.md` and `licenses/`.
- **Pixel look:** world art is authored at 1/3 scale and drawn ×3; keep `imageSmoothingEnabled=false` and
  `image-rendering:pixelated`. UI sizes use the CSS variable `--u` (2px desktop, 1.5px under 700px wide).
- **No emoji in the UI.** Icons are Pixelarticons SVGs via `ico(name, px, color)`; add new ones to `ICONS`.
- **Player-facing numbers live in one place each** (`REQ`, `SPELLS`, `recruitCost`, `courseCost`, `mult`,
  `PARA_TIME`, `OFFICE_REGEN`/`MANA_REGEN`, `bbCost`, `MAXBB`, `BB_R`, `BB_RATE`). The career ladder dialog and the
  requirements panel are generated from `REQ`, so changing the table updates them. The start-menu text in
  `index.html` is hand-written (including the "6×" for the office); update it if rules change.
- **Scrollbars** are styled in the game's look at the top of `style.css` (webkit pseudo-elements, with a `scrollbar-color` fallback for Firefox).
- **Names typed by the player** go through `textContent` or `esc()` before they reach `innerHTML`.

## Testing

```
pip install playwright && playwright install chromium
python tools/smoke.py        # must print OK; screenshots land in tools/out/
# or, with an installed Chrome instead of downloading Chromium:
# CHROME_PATH="C:/Users/<you>/AppData/Local/Google/Chrome/Application/chrome.exe" python tools/smoke.py
python tools/sim.py          # balance check, see the docstring
```

`window.__pc` is a debug hook used by both tools (`P`, `agents`, `rivals`, `paras`, `clients`, `update(dt)`,
`buyCourse()`, `mkAgent()`, `relevel()`, `toggleOrg()`, `officeDoor`, `buildBillboard()`, `billboards`, `prof`,
`applyProf()`, `showStep()`/`commitProf()`/`enterGame()`, and `s` for a state summary). Keep it working when
refactoring, or update the tools.

Balance baseline from `tools/sim.py` at the time of hand-off: a bot closing a personal deal every 22 s wins
about half the time (game ends around 7–8 minutes); at 30 s it loses and suffers break-aways.

## Known gaps

- The simulation bot "helps" newbies instantly; real newbie mentoring has only been checked in screenshots, not played.
- The simulation bot uses neither the office nor billboards, so their effect on balance is untested beyond the smoke test.
- Screenshots from `tools/smoke.py` are not deterministic: the game keeps running in real time between the
  script's steps, so HUD numbers in them drift.
- Agents walk in straight lines and slide along walls; an agent that cannot reach a client gives up after 10 s.
- No save/load of a running game (only the company profile is remembered), no sound except the break-away effect, no settings (volume, mute).
- `game.js` is a single file; splitting it into modules is a reasonable first refactor (keep the section order).
- Mobile layout works but is cramped; the structure window scrolls horizontally on small screens.
