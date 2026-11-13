"""Smoke test: loads the game in headless Chromium, starts it, runs 60 simulated seconds
and fails on any page error. Also saves screenshots to tools/out/.

    pip install playwright && playwright install chromium
    python tools/smoke.py
Set CHROME_PATH to use an already installed Chrome/Chromium instead.
"""
import asyncio, os, pathlib, sys
from playwright.async_api import async_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "tools" / "out"

async def main():
    OUT.mkdir(exist_ok=True)
    async with async_playwright() as p:
        kw = {"args": ["--no-sandbox"]}
        if os.environ.get("CHROME_PATH"):
            kw["executable_path"] = os.environ["CHROME_PATH"]
        b = await p.chromium.launch(**kw)
        pg = await b.new_page(viewport={"width": 1280, "height": 760})
        errs = []
        pg.on("pageerror", lambda e: errs.append(str(e)))
        pg.on("requestfailed", lambda r: errs.append("request failed: " + r.url))
        await pg.goto((ROOT / "index.html").as_uri())
        await pg.wait_for_timeout(400)
        await pg.screenshot(path=str(OUT / "menu.png"))
        await pg.click("#careerbtn"); await pg.wait_for_timeout(200)
        await pg.screenshot(path=str(OUT / "career.png"))
        await pg.click("#cclose")
        # wizard: title -> character -> company -> tutorial pages -> game
        await pg.click("#snew"); await pg.wait_for_timeout(200)
        await pg.click('#copts [data-k="style"][data-v="cap"]'); await pg.fill("#agname", "Tester")
        await pg.screenshot(path=str(OUT / "wizard-character.png"))
        await pg.click("#snext"); await pg.wait_for_timeout(200)
        await pg.click('#lpre [data-p="hviezda"]'); await pg.click('#lpal [data-c="3"]'); await pg.click('#lgrid i[data-i="0"]')
        await pg.click('#cocol [data-col="#3fa37a"]'); await pg.fill("#coname", "Testovacia a.s.")
        await pg.screenshot(path=str(OUT / "creator.png"))
        await pg.click("#snext"); await pg.wait_for_timeout(200)
        await pg.screenshot(path=str(OUT / "wizard-help.png"))
        for _ in range(4): await pg.click("#snext")
        assert await pg.inner_text("#snext") == "VSTÚPIŤ DO SVETA"
        await pg.screenshot(path=str(OUT / "wizard-goal.png"))
        await pg.click("#snext"); await pg.wait_for_timeout(300)
        prof = await pg.evaluate("JSON.stringify({co:__pc.prof.co,name:__pc.prof.name,col:__pc.prof.col,l0:__pc.prof.logo[0],style:__pc.prof.look.style,saved:!!localStorage.getItem('insurance-tycoon.prof')})")
        assert prof == '{"co":"Testovacia a.s.","name":"Tester","col":"#3fa37a","l0":3,"style":"cap","saved":true}', prof
        assert await pg.inner_text("#pname") == "Tester"
        # office: charisma regenerates fast at the office door
        mana = await pg.evaluate("""()=>{const g=window.__pc;g.P.x=g.officeDoor.x;g.P.y=g.officeDoor.y;g.P.mana=0;for(let i=0;i<40;i++)g.update(.05);return g.P.mana;}""")
        assert mana >= 20, f"office regen too slow: {mana}"
        # billboard: build one and let a client stand next to it
        bb = await pg.evaluate("""()=>{const g=window.__pc;g.P.gold+=1000;g.P.x=900;g.P.y=700;g.buildBillboard();
            const c=g.clients[0];c.x=900;c.y=690;c.trust=0;for(let i=0;i<40;i++)g.update(.05);return {n:g.billboards.length,gold:g.P.gold,trust:c.trust};}""")
        assert bb["n"] == 1 and bb["gold"] == 800 and bb["trust"] > 10, bb
        await pg.wait_for_timeout(200)
        await pg.screenshot(path=str(OUT / "billboard.png"))
        # recruit two members through the debug hook and fast-forward one minute
        await pg.evaluate("""()=>{const g=window.__pc;for(let i=0;i<2;i++){const c=g.clients[0];const a=g.mkAgent(c,null,'me');a.trained=true;g.agents.push(a);g.clients.splice(0,1);}
            for(let i=0;i<20*60;i++)g.update(.05);}""")
        await pg.wait_for_timeout(300)
        await pg.screenshot(path=str(OUT / "game.png"))
        await pg.click("#orgbtn"); await pg.wait_for_timeout(200)
        await pg.screenshot(path=str(OUT / "structure.png"))
        state = await pg.evaluate("JSON.stringify(window.__pc.s)")
        await b.close()
    print("state:", state)
    if errs:
        print("ERRORS:", *errs, sep="\n  "); sys.exit(1)
    print("OK – screenshots in tools/out/")

asyncio.run(main())
