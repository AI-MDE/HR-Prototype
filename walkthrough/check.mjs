import {createRequire} from 'node:module';import {pathToFileURL,fileURLToPath} from 'node:url';import path from 'node:path';
const require=createRequire('C:/mde/ws/samples/HR-Prototype/app/package.json');
const {chromium}=require('playwright');const dir=path.dirname(fileURLToPath(import.meta.url));
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1400,height:900}});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto(pathToFileURL(path.join(dir,'hr-prototype-walkthrough.html')).href+'#13');await p.waitForTimeout(400);await p.screenshot({path:path.join(dir,'check.png')});
await p.keyboard.press('ArrowRight');console.log(await p.textContent('#count'),errs);await b.close();
