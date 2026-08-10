# hongzhengdong.github.io

Personal homepage of **Zhengdong Hong (洪郑栋)** — full-stack roboticist.
Handcrafted static site: vanilla HTML/CSS/JS, no frameworks, no build step.

## Layout

Three columns on wide screens:

- **Left rail** — photos of robot systems I built/fixed (`assets/img/rail/sys-*.jpg`)
- **Center** — about / news / publications / robot systems / hardware / experience / contact
- **Right rail** — hardware & electronics photos (`assets/img/rail/skl-*.jpg`)

Both rails are sticky and glide through their photos as the page scrolls
(`js/main.js → initRails`). Below 1180 px they collapse into horizontal film strips;
below 860 px everything is single-column.

## Editing cheatsheet

| Task | Where |
|---|---|
| Add a publication | copy a `<div class="pub">…</div>` block in `index.html` (§ Publications), drop a teaser into `assets/img/pubs/` |
| Add a rail photo | drop a jpg into `assets/img/rail/`, copy a `<figure>` block in the matching `<aside>` |
| Add a news item | one `<li>` in the `#news` list |
| Update CV | replace `assets/ZhengdongHongCV.pdf` |
| Colors / dark theme | CSS variables at the top of `css/style.css` |

Image conventions: rails ≤ 900 px on the long edge, JPEG quality ~82
(`sips -Z 900 -s format jpeg -s formatOptions 82 in.jpg --out out.jpg`).

## Deploy

This is a GitHub Pages **user site**: push to the `main` branch of
`hongzhengdong/hongzhengdong.github.io` and it goes live at
<https://hongzhengdong.github.io/>. The `.nojekyll` file disables Jekyll processing.

## Preview locally

```bash
open index.html            # or:
python3 -m http.server     # http://localhost:8000
```
