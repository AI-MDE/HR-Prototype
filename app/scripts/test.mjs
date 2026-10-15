import fs from 'node:fs';import path from 'node:path';import {spawnSync} from 'node:child_process';
import {appDir,evidence,writeJson} from './config.mjs';
// Adapt actual runner results for the Method's .feature/Cucumber Check lookup.
// This does not execute substitute assertions or turn missing results into passes.
const started=Date.now(),raw=path.join(evidence,'tests/raw');fs.mkdirSync(raw,{recursive:true});
for(const file of ['api.json','browser.json'])if(fs.existsSync(path.join(raw,file)))fs.unlinkSync(path.join(raw,file));
const commands=[['node_modules/vitest/vitest.mjs','run','--reporter=default','--reporter=json','--outputFile=../evidence/tests/raw/api.json'],['node_modules/playwright/cli.js','test']];
const runs=commands.map(args=>{const r=spawnSync(process.execPath,args,{cwd:appDir,encoding:'utf8',windowsHide:true,maxBuffer:16*1024*1024});process.stdout.write(r.stdout||'');process.stderr.write(r.stderr||'');return {args,code:r.status??1,output:(r.stdout||'')+(r.stderr||'')+(r.error?.message||'')};});
function readCurrent(file){const p=path.join(raw,file);if(!fs.existsSync(p)||fs.statSync(p).mtimeMs<started)return null;try{return JSON.parse(fs.readFileSync(p,'utf8'));}catch{return null;}}
const api=readCurrent('api.json'),browser=readCurrent('browser.json');
const assertions=(api?.testResults||[]).flatMap(s=>s.assertionResults||[]);
const startup=assertions.find(t=>t.fullName.startsWith('Fresh database start, repeat start, health and foreign-port refusal'));
const allPassed=runs.every(r=>r.code===0)&&api?.numFailedTests===0&&api?.numPassedTests>0&&browser?.stats?.unexpected===0&&browser?.stats?.expected>0;
const log=runs.map(r=>`$ node ${r.args.join(' ')}\n${r.output}\nexit ${r.code}\n`).join('\n')+`Regression exit ${allPassed?0:1}\n`;
const logFile=path.join(evidence,'tests/logs/test.log');fs.mkdirSync(path.dirname(logFile),{recursive:true});fs.writeFileSync(logFile,log);
const feature=fs.readFileSync(path.join(appDir,'tests/runtime.feature'),'utf8').split(/\r?\n/);let tags=[],elements=[],current;
for(let i=0;i<feature.length;i++){const line=feature[i].trim();if(line.startsWith('@'))tags=line.split(/\s+/).map(name=>({name,line:i+1}));else if(line.startsWith('Scenario:')){current={name:line.slice(9).trim(),line:i+1,type:'scenario',keyword:'Scenario',tags,steps:[]};tags=[];elements.push(current);}else if(line.startsWith('Then ')&&current){const result=current.tags.some(t=>t.name.includes('one-command-start'))?{status:startup?.status==='passed'?'passed':startup?'failed':'undefined',duration:Math.round((startup?.duration||0)*1e6),error_message:startup?.failureMessages?.join('\n')||(!startup?'No current startup test result':undefined)}:{status:allPassed&&fs.readFileSync(logFile,'utf8')===log?'passed':'failed',duration:(Date.now()-started)*1e6,error_message:allPassed?undefined:'A current suite result or successful captured log is missing'};current.steps.push({keyword:'Then ',name:line.slice(5),line:i+1,result});}}
writeJson(path.join(evidence,'checks/runtime-scenarios.json'),[{uri:'app/tests/runtime.feature',name:'Runnable prototype verification',keyword:'Feature',elements}]);
if(!allPassed||startup?.status!=='passed')process.exitCode=1;
