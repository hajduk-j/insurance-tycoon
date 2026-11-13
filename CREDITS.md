# Credits

Everything in the game world (map, buildings, characters, trees, props, particles) is drawn by the
game's own code in `js/game.js`. The items below come from third parties.

| What | Where in the project | Source | Licence |
|---|---|---|---|
| UI frames, buttons, progress bars, slot, cursors, exclamation mark | `assets/ui/*.png` | RPGUI 1.0.3 by Ronen Ness (npm `rpgui`); graphics by Buch / Michele Bucelli | Code: zlib (`licenses/RPGUI-LICENSE.txt`). Graphics: public domain per the RPGUI readme. |
| Icons (coffee, message, contact, script, user-plus, users, coins, trophy, zap, teach) | inlined as SVG paths in `ICONS` in `js/game.js` | Pixelarticons 2.4.2 by Gerrit Halfmann (npm `pixelarticons`) | MIT (`licenses/Pixelarticons-LICENSE.txt`) |
| Pixelify Sans, weights 400 and 700 | `assets/fonts/pixelify-sans-*.woff2` | npm `@fontsource/pixelify-sans` 5.3.0 | SIL Open Font License 1.1 (`licenses/PixelifySans-OFL.txt`) |
| Press Start 2P | `assets/fonts/press-start-2p-*.woff2` | npm `@fontsource/press-start-2p` 5.3.0 | SIL Open Font License 1.1 (`licenses/PressStart2P-OFL.txt`) |

The MIT and OFL licences require their notices to stay with copies of the icons and fonts, so keep the
`licenses/` folder and the comment at the top of `index.html` when you publish the game.
