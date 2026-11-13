"""Builds dist/ – a version with CSS, JS and fonts inlined into one index.html (UI images stay
as files in dist/ui/). Needed only for hosts with a strict content policy, e.g. publishing as a
Claude artifact, where fonts must be data: URIs. For normal hosting just upload the project folder.

    python tools/bundle.py
"""
import base64, pathlib, re, shutil

ROOT = pathlib.Path(__file__).resolve().parent.parent
DIST = ROOT / "dist"

def main():
    html = (ROOT / "index.html").read_text(encoding="utf-8")
    fonts = (ROOT / "css" / "fonts.css").read_text(encoding="utf-8")
    def inline_font(m):
        data = base64.b64encode((ROOT / "assets" / "fonts" / m.group(1)).read_bytes()).decode()
        return f"url(data:font/woff2;base64,{data})"
    fonts = re.sub(r"url\(\.\./assets/fonts/([^)]+)\)", inline_font, fonts)
    css = (ROOT / "css" / "style.css").read_text(encoding="utf-8").replace("url(../assets/ui/", "url(ui/")
    js = (ROOT / "js" / "game.js").read_text(encoding="utf-8").replace("'assets/ui/", "'ui/")
    html = html.replace('<link rel="stylesheet" href="css/fonts.css">\n', "")
    html = html.replace('<link rel="stylesheet" href="css/style.css">', "<style>\n" + fonts + css + "</style>")
    html = html.replace('<script src="js/game.js"></script>', "<script>\n" + js + "</script>")
    assert "css/style.css" not in html and "js/game.js" not in html
    if DIST.exists(): shutil.rmtree(DIST)
    (DIST / "ui").mkdir(parents=True)
    for f in (ROOT / "assets" / "ui").glob("*.png"): shutil.copy(f, DIST / "ui" / f.name)
    (DIST / "index.html").write_text(html, encoding="utf-8")
    print("dist/index.html", len(html) // 1024, "KB +", len(list((DIST / "ui").iterdir())), "images")

main()
