import fs from 'node:fs';import path from 'node:path';import {spawnSync} from 'node:child_process';import {appDir,evidence,writeJson} from './config.mjs';
for(const args of [['node_modules/typescript/bin/tsc','-p','tsconfig.json'],['node_modules/typescript/bin/tsc','-p','frontend/tsconfig.json'],['node_modules/vite/bin/vite.js','build','--config','frontend/vite.config.ts']]){const r=spawnSync(process.execPath,args,{cwd:appDir,stdio:'inherit',windowsHide:true});if(r.status!==0)process.exit(r.status||1);}
const count=p=>fs.readdirSync(p,{withFileTypes:true}).reduce((n,f)=>n+(f.isDirectory()?count(path.join(p,f.name)):1),0);
writeJson(path.join(evidence,'tests/raw/build.json'),{parts:[{name:'backend',output:'app/dist',files:count(path.join(appDir,'dist'))},{name:'frontend',output:'app/frontend/dist',files:count(path.join(appDir,'frontend/dist'))}]});
console.log('Built and typechecked NestJS backend and React frontend.');
