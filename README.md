# Insurance Tycoon

Paródia na MMORPG z pohľadu zhora. Hráš za poisťovacieho agenta: presviedčaš klientov kávičkami
a sľubmi, uzatváraš zmluvy, verbuješ ľudí do cechu a staviaš štruktúru. Vyhrá ten, kto prvý
dosiahne level 5 – ty, konkurencia, alebo niekto, kto sa od teba odtrhol.

V štart menu si pomenuješ firmu, nakreslíš jej logo a poskladáš vlastnú postavu. V kancelárii sa ti
rýchlo dobíja charizma a za zarobené peniaze staviaš billboardy, okolo ktorých sa klienti presviedčajú sami.

Hra je vymyslená paródia a nemá nič spoločné so žiadnou skutočnou firmou.

## Spustenie

Netreba nič inštalovať ani buildovať.

```
python -m http.server 8000
```

Potom otvor http://localhost:8000. V Chrome funguje aj dvojklik na `index.html`.

Vo VS Code stačí rozšírenie Live Server a „Open with Live Server“ na `index.html`.

## Ovládanie

| Kláves | Akcia |
|---|---|
| WASD / šípky, klik na zem | pohyb |
| Tab, klik na klienta | výber cieľa |
| 1 | Kávička |
| 2 | Sľub |
| 3 | Vizitka |
| 4 | Podpis zmluvy (pri 100 % dôvere) |
| 5 | Nábor do cechu (pri 100 % dôvere) |
| E | kúpiť kurz pri Akadémii |
| B | postaviť billboard na mieste, kde stojíš |
| O | okno štruktúry |
| Esc | zrušiť cieľ / zavrieť okno |

## Práca s Claude Code

V koreni je `CLAUDE.md`. Claude Code si ho načíta sám a nájde v ňom, ako je kód členený,
aké sú pravidlá hry, kde sa menia čísla a ako projekt otestovať.

Nápady, kde začať:

- „Spusti `tools/smoke.py` a ukáž mi screenshoty.“
- „Rozdeľ `js/game.js` na moduly podľa sekcií, hra musí prejsť smoke testom.“
- „Pridaj nový typ klienta / nové kúzlo.“
- „Zmeň tabuľku levelov v `REQ` a over vyváženie cez `tools/sim.py`.“

## Testy a vyváženie

```
pip install playwright
playwright install chromium
python tools/smoke.py     # načíta hru, prejde editor firmy, kanceláriu a billboard, uloží screenshoty do tools/out/
python tools/sim.py       # bot hrá proti konkurencii, vypíše priebeh po minútach
```

## Licencie

Kód hry je tvoj. Použité cudzie assety a ich licencie sú v `CREDITS.md` a v priečinku `licenses/`.
