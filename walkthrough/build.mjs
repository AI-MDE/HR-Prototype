// Packs shots/ and steps.json into one self-contained walkthrough HTML file.
import fs from 'node:fs';import path from 'node:path';
const dir=path.dirname(new URL(import.meta.url).pathname.slice(1));
const steps=JSON.parse(fs.readFileSync(path.join(dir,'shots/steps.json'),'utf8')).map(s=>({...s,src:'data:image/png;base64,'+fs.readFileSync(path.join(dir,'shots',s.file)).toString('base64')}));
const html=`<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>HR-Prototype Walkthrough</title>
<style>
:root{--bg:#f6f5f1;--panel:#fff;--ink:#1d2622;--muted:#5d6862;--line:#dcdcd4;--accent:#1f4b3b;--accent-ink:#fff;--sel:#e6ece6}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--bg:#141816;--panel:#1d2320;--ink:#e8ece9;--muted:#9aa59f;--line:#2f3833;--accent:#8fbfa6;--accent-ink:#10201a;--sel:#26302b}}
:root[data-theme="dark"]{--bg:#141816;--panel:#1d2320;--ink:#e8ece9;--muted:#9aa59f;--line:#2f3833;--accent:#8fbfa6;--accent-ink:#10201a;--sel:#26302b}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font:15px/1.5 system-ui,-apple-system,"Segoe UI",sans-serif}
header{padding:24px 16px 8px;max-width:1280px;margin:0 auto}header h1{margin:0;font-size:22px;font-weight:600}header p{margin:4px 0 0;color:var(--muted)}
main{max-width:1280px;margin:0 auto;padding:16px;display:grid;grid-template-columns:260px 1fr;gap:24px}
ol{list-style:none;margin:0;padding:0;border-right:1px solid var(--line)}
ol button{all:unset;display:flex;gap:10px;width:100%;padding:8px 12px;border-radius:6px 0 0 6px;cursor:pointer;color:var(--muted)}
ol button span{font-variant-numeric:tabular-nums;min-width:20px}ol button[aria-current="step"]{background:var(--sel);color:var(--ink);font-weight:600}
ol button:focus-visible{outline:2px solid var(--accent)}
figure{margin:0}figure h2{margin:0 0 4px;font-size:20px}figure p{margin:0 0 14px;color:var(--muted);min-height:3em}
.frame{background:var(--panel);border:1px solid var(--line);border-radius:8px;overflow:hidden;display:flex;justify-content:center}
.frame img{display:block;max-width:100%;height:auto}.frame.tall img{max-height:80vh;width:auto}
nav{display:flex;align-items:center;gap:12px;margin-top:14px}nav .count{color:var(--muted);margin-right:auto;font-variant-numeric:tabular-nums}
nav button{border:1px solid var(--accent);background:var(--accent);color:var(--accent-ink);padding:8px 18px;border-radius:6px;font:inherit;cursor:pointer}
nav button.ghost{background:transparent;color:var(--ink);border-color:var(--line)}nav button:disabled{opacity:.4;cursor:default}
footer{max-width:1280px;margin:0 auto;padding:8px 16px 32px;color:var(--muted);font-size:13px}
@media (max-width:760px){main{grid-template-columns:1fr}ol{display:none}}
</style></head><body>
<header><h1>HR-Prototype walkthrough</h1><p>Five HR workflows across three roles. All data is fictional. Use ← → to step through.</p></header>
<main><ol id="list"></ol>
<figure><h2 id="title"></h2><p id="caption"></p><div class="frame" id="frame"><img id="shot" alt=""></div>
<nav><span class="count" id="count"></span><button class="ghost" id="prev">Previous</button><button id="next">Next</button></nav></figure></main>
<footer>Screenshots captured from the running prototype.</footer>
<script>
const steps=${JSON.stringify(steps.map(({title,caption,src})=>({title,caption,src})))};
let i=0;const $=id=>document.getElementById(id);
$('list').innerHTML=steps.map((s,k)=>'<li><button data-k="'+k+'"><span>'+(k+1)+'</span>'+s.title.replace(/</g,'&lt;')+'</button></li>').join('');
function show(k){i=Math.max(0,Math.min(steps.length-1,k));const s=steps[i];$('title').textContent=s.title;$('caption').textContent=s.caption;$('shot').src=s.src;$('shot').alt=s.title;
 $('count').textContent=(i+1)+' of '+steps.length;$('prev').disabled=i===0;$('next').disabled=i===steps.length-1;
 $('shot').onload=()=>$('frame').classList.toggle('tall',$('shot').naturalHeight>$('shot').naturalWidth);
 document.querySelectorAll('#list button').forEach(b=>b.toggleAttribute('aria-current',false));const cur=document.querySelector('#list button[data-k="'+i+'"]');cur.setAttribute('aria-current','step');try{history.replaceState(null,'','#'+(i+1));}catch{}}
$('list').onclick=e=>{const b=e.target.closest('button');if(b)show(+b.dataset.k);};$('prev').onclick=()=>show(i-1);$('next').onclick=()=>show(i+1);
addEventListener('keydown',e=>{if(e.key==='ArrowRight')show(i+1);if(e.key==='ArrowLeft')show(i-1);});
show((parseInt(location.hash.slice(1))||1)-1);
</script></body></html>`;
fs.writeFileSync(path.join(dir,'hr-prototype-walkthrough.html'),html);
console.log((html.length/1024/1024).toFixed(2)+' MB');
