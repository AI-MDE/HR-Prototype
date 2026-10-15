import fs from 'node:fs';import path from 'node:path';import net from 'node:net';import {spawn,spawnSync,execFileSync} from 'node:child_process';
import {config,appDir,evidence,writeJson} from './config.mjs';import {create,migrate,seed} from './database.mjs';
const statePath=path.join(appDir,'logs/run.json'),entry=path.join(appDir,'dist/backend/main.js');
async function stop(log){if(!fs.existsSync(statePath))return;const s=JSON.parse(fs.readFileSync(statePath,'utf8'));let command='';try{command=process.platform==='win32'?execFileSync('powershell.exe',['-NoProfile','-Command',`(Get-CimInstance Win32_Process -Filter "ProcessId = ${Number(s.pid)}").CommandLine`],{encoding:'utf8',windowsHide:true}):fs.readFileSync(`/proc/${Number(s.pid)}/cmdline`,'utf8');}catch{}
 if(command&&command.toLowerCase().includes(entry.toLowerCase())){log(`Stopping HR-Prototype process ${s.pid}`);if(process.platform==='win32'){const r=spawnSync('taskkill',['/PID',String(s.pid),'/T','/F'],{encoding:'utf8',windowsHide:true});if(r.status!==0)throw new Error('Could not stop recorded HR-Prototype process.');}else process.kill(s.pid,'SIGTERM');}
 else if(command)throw new Error('Recorded PID belongs to another process; refusing to stop it.');
 fs.unlinkSync(statePath);
}
function available(){return new Promise((resolve,reject)=>{const s=net.createServer();s.once('error',()=>reject(new Error(`Port ${config.port} on ${config.host} is occupied by another process; it was left alone.`)));s.listen(config.port,config.host,()=>s.close(resolve));});}
export async function health(){const r=await fetch(`http://${config.host}:${config.port}${config.api}/health`,{signal:AbortSignal.timeout(4000)});const data=await r.json();if(!r.ok||data.application!=='HR-Prototype'||data.status!=='healthy'||data.dependencies?.database?.status!=='healthy')throw new Error('HR-Prototype health failed: '+JSON.stringify(data));return data;}
const action=process.argv[2];const logPath=path.join(evidence,'tests/logs',action+'.log');fs.mkdirSync(path.dirname(logPath),{recursive:true});fs.writeFileSync(logPath,`HR-Prototype ${action} ${new Date().toISOString()}\n`);
const log=s=>{console.log(s);fs.appendFileSync(logPath,s+'\n');};
try{
 if(action==='stop')await stop(log);
 else if(action==='health')log(JSON.stringify(await health()));
 else if(action==='start'){
  await stop(log);await available();
  if(!fs.existsSync(entry)||!fs.existsSync(path.join(appDir,'frontend/dist/index.html'))){const r=spawnSync(process.execPath,[path.join(appDir,'scripts/build.mjs')],{cwd:appDir,stdio:'inherit',windowsHide:true});if(r.status!==0)throw new Error('Build failed.');}
  log('Creating database if absent, applying migrations and loading fictional seed.');await create();await migrate();await seed();
  fs.mkdirSync(path.join(appDir,'logs'),{recursive:true});const out=fs.openSync(path.join(appDir,'logs/server.log'),'a');const child=spawn(process.execPath,[entry],{cwd:appDir,env:process.env,stdio:['ignore',out,out],detached:true,windowsHide:true});
  await new Promise((resolve,reject)=>{child.once('spawn',resolve);child.once('error',reject);});writeJson(statePath,{pid:child.pid,entry,startedAt:new Date().toISOString(),url:config.url});child.unref();fs.closeSync(out);
  let ok=false;for(let i=0;i<240;i++){try{log(JSON.stringify(await health()));ok=true;break;}catch{await new Promise(r=>setTimeout(r,500));}}
  if(!ok){await stop(log);throw new Error('Server did not become healthy; inspect app/logs/server.log.');}log(`Ready: ${config.url}`);
 }else throw new Error('Unknown runtime action.');
 log('exit 0');
}catch(e){log('Failed: '+e.message);log('exit 1');process.exitCode=1;}
