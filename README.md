# Insurance Tycoon

Pixelová hra v prehliadači o poisťovacom agentovi. Presviedčaš klientov kávičkami a sľubmi,
uzatváraš zmluvy, verbuješ ľudí do cechu a staviaš viacúrovňovú štruktúru. Súperíš s konkurenciou
a s ľuďmi, ktorí sa od teba odtrhnú. Vyhrá ten, kto prvý dosiahne level 5.

**Hrať:** https://insurance-tycoon.vercel.app

Hra je vymyslená paródia a nemá nič spoločné so žiadnou skutočnou firmou. Všetky texty v hre sú po slovensky.

## Ako sa hrá

- **Začiatok.** V úvodnom menu si poskladáš postavu a firmu: meno, vzhľad, názov, farbu a logo
  (kreslíš ho v mriežke 12×12). Profil sa pamätá v prehliadači. Potom prejdeš päť krátkych strán s vysvetlivkami,
  alebo ich preskočíš.
- **Klienti.** Po mape chodia klienti. Vyber si jedného a zvyšuj mu dôveru kúzlami: Kávička (najsilnejšia, treba stáť pri
  klientovi), Sľub (aj z diaľky, stojí charizmu) a Vizitka (rýchla drobnosť). Keď lišta dosiahne 100 %, môžeš uzavrieť
  zmluvu a zarobiť províziu, alebo klienta prijať do cechu.
- **Level.** Level nie je za skúsenosti, ale za celkový príjem a za zaučených ľudí priamo pod tebou:

  | Level | Príjem | Priamo pod tebou |
  |---|---|---|
  | L2 | 100 € | 1× L1 |
  | L3 | 500 € | 3× L1 alebo 2× L2 |
  | L4 | 2 000 € | 3× L2 + 2× L1, alebo 2× L3 + 1× L2 |
  | L5 | 6 000 € | 3× L3 + 2× L2, alebo 2× L4 + 1× L3 |

- **Cech.** Člen cechu poisťuje sám a ty berieš podiel z jeho zmlúv. Nováčikovi treba pomáhať kúzlom, inak po dvoch
  odmietnutiach odíde. Kurz v Akadémii zaučí všetkých naraz a zrýchli celý cech.
- **Konkurencia.** Keď tvoj cech uzavrie prvú zmluvu, do mesta príde konkurent. Poisťuje, verbuje, stavia vlastnú
  štruktúru a rád preberá klientov, na ktorých pracuješ ty.
- **Paralelita.** Keď sa tvoj človek dotiahne na tvoj level, máš 60 sekúnd na postup. Inak sa odtrhne aj so svojimi ľuďmi
  a ide proti tebe.
- **Kancelária.** Pri dverách svojej firmy dobíjaš charizmu 6× rýchlejšie.
- **Billboard.** Postavíš ho na mieste, kde stojíš (najviac 3, každý ďalší je drahší). Má tvoje logo a tvoju tvár. Klienti v jeho
  okolí sa presviedčajú sami a radi sa pri ňom zdržiavajú, takže ti stačí prísť po podpis.

Presné požiadavky na každý level nájdeš v hre v okne Kariérny strom.

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
| B | postaviť billboard |
| O | okno štruktúry |
| Esc | zrušiť cieľ / zavrieť okno |

Kúzla a tlačidlá sa dajú aj klikať myšou alebo ťukať prstom.

## Spustenie

Netreba nič inštalovať ani buildovať, hra je čisté HTML, CSS a jeden JavaScript súbor.

```
python -m http.server 8000
```

Potom otvor http://localhost:8000. V Chrome funguje aj dvojklik na `index.html`.

## Nasadenie

Hra je statická stránka, takže ide na akýkoľvek statický hosting. Na Verceli stačí v priečinku projektu spustiť
`vercel --prod`, žiadne nastavenia buildu netreba. Pre hostingy s prísnymi pravidlami vie `tools/bundle.py` zostaviť
priečinok `dist/`, kde je CSS, JS a písma vložené priamo do stránky.

## Štruktúra projektu

| Cesta | Čo to je |
|---|---|
| `index.html` | Rozloženie HUD a dialógov (úvodné menu, kariérny strom, štruktúra, koniec hry). |
| `css/` | Štýly a písma. |
| `js/game.js` | Celá hra, členená na sekcie. |
| `assets/` | Obrázky UI a písma. |
| `tools/` | Test a simulácia vyváženia. |
| `CLAUDE.md` | Podrobný opis kódu a pravidiel hry. |

## Testy a vyváženie

```
pip install playwright
playwright install chromium
python tools/smoke.py     # načíta hru, prejde úvodné menu, kanceláriu a billboard, uloží screenshoty do tools/out/
python tools/sim.py       # bot hrá proti konkurencii, vypíše priebeh po minútach
```

Ak už máš nainštalovaný Chrome, môžeš namiesto sťahovania Chromia nastaviť premennú `CHROME_PATH` na jeho `chrome.exe`.

## Licencie

Mapa, budovy a postavy sú nakreslené priamo kódom hry, favicon je vlastná kresba. Cudzie assety (rámy a tlačidlá UI, ikony, písma)
a ich licencie sú v `CREDITS.md` a v priečinku `licenses/`. Pri zverejnení ich nechaj spolu s hrou.
