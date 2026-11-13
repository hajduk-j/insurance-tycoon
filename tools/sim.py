"""Balance simulation: a scripted "bot player" plays against the rival for up to 20 minutes
of game time (fast-forwarded), printing one line per minute.

    python tools/sim.py            # bot closes a personal deal every 22 s (two runs) and every 30 s
    python tools/sim.py 18 26      # custom tempos, one run each

How the bot plays (see JS below): every <tempo> seconds it does ONE thing, in this priority:
  1. trains one untrained direct newbie (stands in for "helping" him),
  2. recruits a new direct member if it can afford it and has fewer than 6,
  3. otherwise closes a personal contract worth 65 EUR.
It buys an Academy course whenever it can afford one and it makes sense.
Use it after touching any number in js/game.js (REQ table, mult(), costs, rival rules).
Rule of thumb used so far: tempo 22 s should be roughly a coin flip, 30 s should lose.
"""
import asyncio, os, pathlib, sys
from playwright.async_api import async_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent
JS = r"""(per)=>{const g=window.__pc;const P=g.P;
const recruit=()=>{const c=g.clients.find(c=>!c.signed);if(!c)return;g.agents.push(g.mkAgent(c,null,'me'));g.clients.splice(g.clients.indexOf(c),1);};
const out=[];let t=0;
for(let i=0;i<20*1200;i++){
  if(i%(20*per)===0&&i){const direct=g.agents.filter(a=>!a.boss),nb=direct.find(a=>!a.trained),rc=60+15*g.agents.length;
    if(nb){nb.trained=true;nb.deals++;}
    else if(g.agents.length<24&&P.gold>=rc&&direct.length<6){P.gold-=rc;recruit();}
    else{P.signed++;P.gold+=65;P.inc+=65;}}
  if(g.agents.length>=3&&(g.agents.filter(a=>!a.boss).length>=5||g.agents.some(a=>!a.trained&&a.boss))){P.x=g.acadDoor.x;P.y=g.acadDoor.y;g.buyCourse();}
  g.update(.05);t+=.05;const s=g.s;
  if(i%(20*60)===20*60-1||s.ended){out.push([Math.round(t)+'s','me L'+s.pl+' '+s.inc+'€','rival L'+s.rl+' '+s.rinc+'€','parallel '+(s.pal||'-'),'breakaways '+s.paraCount,'ranks '+s.ranks,'people '+g.agents.length+'/'+g.rivals.length+'/'+g.paras.length,document.getElementById('endt').textContent].join(' | '));if(s.ended)break;}}
return out;}"""

async def main():
    tempos = [int(x) for x in sys.argv[1:]] or [22, 22, 30]
    async with async_playwright() as p:
        kw = {"args": ["--no-sandbox"]}
        if os.environ.get("CHROME_PATH"):
            kw["executable_path"] = os.environ["CHROME_PATH"]
        b = await p.chromium.launch(**kw)
        for per in tempos:
            pg = await b.new_page(viewport={"width": 1100, "height": 700})
            errs = []
            pg.on("pageerror", lambda e: errs.append(str(e)))
            await pg.goto((ROOT / "index.html").as_uri()); await pg.click("#go")
            rows = await pg.evaluate(JS, per)
            print(f"--- personal deal every {per} s")
            for r in rows: print("  ", r)
            if errs: print("  ERRORS:", errs)
            await pg.close()
        await b.close()

asyncio.run(main())
