import {beforeAll,afterAll,test,expect} from 'vitest';import pg from 'pg';import dotenv from 'dotenv';import {execFileSync} from 'node:child_process';import fs from 'node:fs';import path from 'node:path';import net from 'node:net';import {randomUUID} from 'node:crypto';
dotenv.config({path:'../.env',quiet:true});
const env=process.env,base=`http://${env.HOST}:${env.WEB_PORT}${env.API_BASE}`,url=`http://${env.HOST}:${env.WEB_PORT}${env.BASE_PATH}`;
const pool=new pg.Pool({host:env.DB_HOST,port:Number(env.DB_PORT),database:env.DB_NAME,user:env.DB_USER,password:env.DB_PASSWORD});
const ids:string[]=[];const code='TEST-'+Date.now();
let hr='',manager='',coordinator='';
async function session(role:string){const r=await fetch(base+'/session',{method:'POST',headers:{'Content-Type':'application/json',Connection:'close'},body:JSON.stringify({role})});expect(r.status).toBe(201);return r.headers.get('set-cookie')!.split(';')[0];}
async function call(entity:string,cookie:string,method='GET',body?:any,id=''){const r=await fetch(base+'/records/'+entity+(id?'/'+id:''),{method,headers:{cookie,'Content-Type':'application/json',Connection:'close'},body:body?JSON.stringify(body):undefined});return {status:r.status,body:await r.json()};}
function run(action:string,extra:Record<string,string>={}){return execFileSync(process.execPath,['scripts/runtime.mjs',action],{cwd:process.cwd(),env:{...env,...extra},encoding:'utf8',windowsHide:true,timeout:180000});}
beforeAll(async()=>{hr=await session('hrAdministrator');manager=await session('peopleManager');coordinator=await session('projectCoordinator');});
afterAll(async()=>{for(const table of ['project_assignments','performance_reviews','projects','clients','employees'])await pool.query(`DELETE FROM ${table} WHERE id=ANY($1::uuid[])`,[ids]);await pool.end();});
test('Business workflows persist records and reject invalid employment changes',async()=>{
 const input={employeeNumber:code,fullName:'Casey Test',email:'casey@example.test',jobTitle:'Consultant',startDate:'2026-01-01',endDate:null};
 let r=await call('Employee',hr,'POST',input);expect(r.status).toBe(201);const employee=r.body;ids.push(employee.id);
 expect((await pool.query('SELECT full_name FROM employees WHERE id=$1',[employee.id])).rows[0].full_name).toBe(input.fullName);
 expect((await call('Employee',hr,'POST',input)).status).toBe(409);
 expect((await call('Employee',hr,'PUT',{...input,jobTitle:'Senior Consultant'},employee.id)).body.jobTitle).toBe('Senior Consultant');
 expect((await call('Employee',hr,'PUT',{...input,endDate:'2025-01-01'},employee.id)).body.rule).toBe('employment-interval');
 r=await call('Client',coordinator,'POST',{clientCode:code,name:'Test Client'});expect(r.status).toBe(201);ids.push(r.body.id);const clientId=r.body.id;
 r=await call('Project',coordinator,'POST',{clientId,projectCode:code,name:'Test Project',description:'Scenario fixture',startDate:'2026-01-01',endDate:'2026-12-31'});expect(r.status).toBe(201);ids.push(r.body.id);const projectId=r.body.id;
 const assignment={projectId,employeeId:employee.id,responsibility:'Test contribution',startDate:'2026-10-01',endDate:'2026-10-31',allocationPercent:60};
 r=await call('ProjectAssignment',coordinator,'POST',assignment);expect(r.status).toBe(201);ids.push(r.body.id);
 expect((await call('ProjectAssignment',coordinator,'POST',{...assignment,allocationPercent:41})).body.rule).toBe('assignment-commitment');
 r=await call('ProjectAssignment',coordinator,'POST',{...assignment,allocationPercent:40});expect(r.status).toBe(201);ids.push(r.body.id);
 expect((await call('Employee',hr,'PUT',{...input,endDate:'2026-10-15'},employee.id)).body.rule).toBe('assignment-commitment');
 const review={assessedEmployeeId:employee.id,reviewerId:'00000000-0000-4000-8000-000000000002',periodStart:'2026-01-01',periodEnd:'2026-06-30',reviewDate:'2026-07-01',summary:'Strong delivery',strengths:'Communication',developmentActions:'Mentor a peer'};
 r=await call('PerformanceReview',manager,'POST',review);expect(r.status).toBe(201);ids.push(r.body.id);
 expect((await call('PerformanceReview',manager,'POST',{...review,reviewDate:'2026-06-01'})).body.rule).toBe('review-interval');
 expect((await pool.query('SELECT count(*)::int n FROM project_assignments WHERE employee_id=$1',[employee.id])).rows[0].n).toBe(2);
});
test('Concurrent assignment requests share one capacity lock and inclusive boundaries',async()=>{
 const input={employeeNumber:code+'-RACE',fullName:'Race Fixture',email:'race@example.test',jobTitle:'Engineer',startDate:'2026-01-01',endDate:null};
 const employee=(await call('Employee',hr,'POST',input)).body;ids.push(employee.id);
 const assignment={employeeId:employee.id,projectId:'00000000-0000-4000-8000-000000000021',responsibility:'Concurrent request',startDate:'2026-08-01',endDate:'2026-08-10',allocationPercent:60};
 const results=await Promise.all([call('ProjectAssignment',coordinator,'POST',assignment),call('ProjectAssignment',coordinator,'POST',assignment)]);
 for(const r of results)if(r.status===201)ids.push(r.body.id);
 expect(results.map(r=>r.status).sort()).toEqual([201,422]);
 expect((await call('ProjectAssignment',coordinator,'POST',{...assignment,startDate:'2026-08-10',endDate:'2026-08-20'})).status).toBe(422);
 const adjacent=await call('ProjectAssignment',coordinator,'POST',{...assignment,startDate:'2026-08-11',endDate:'2026-08-20',allocationPercent:100});expect(adjacent.status).toBe(201);ids.push(adjacent.body.id);
 expect((await call('ProjectAssignment',coordinator,'POST',{...assignment,allocationPercent:0})).status).toBe(422);
 expect((await call('ProjectAssignment',coordinator,'POST',{...assignment,endDate:'2027-01-01'})).status).toBe(422);
});
test('Errors and access controls are enforced at the API @feature:standard-errors/fixed-codes @feature:standard-errors/rule-named @feature:standard-errors/no-internals',async()=>{
 expect((await call('Employee','')).status).toBe(401);
 expect((await call('PerformanceReview',coordinator)).status).toBe(403);
 expect((await call('Employee',manager,'POST',{})).status).toBe(403);
 expect((await call('Employee',hr,'POST',{})).status).toBe(400);
 expect((await call('Employee',hr,'GET',undefined,randomUUID())).status).toBe(404);
 const bad=await call('ProjectAssignment',coordinator,'POST',{employeeId:'00000000-0000-4000-8000-000000000001',projectId:'00000000-0000-4000-8000-000000000021',responsibility:'Over capacity',startDate:'2026-10-01',endDate:'2026-10-02',allocationPercent:1});
 expect(bad.status).toBe(422);expect(bad.body.rule).toBe('assignment-commitment');expect(JSON.stringify(bad.body)).not.toMatch(/SELECT|INSERT|stack|password|node_modules/);
 const origin=await fetch(base+'/session',{method:'POST',headers:{Origin:'https://example.test','Content-Type':'application/json'},body:JSON.stringify({role:'hrAdministrator'})});expect(origin.status).toBe(403);
});
test('Migration schema preserves model naming and indexed references @feature:storage-naming/names-follow-model @feature:foreign-key-indexes/indexed',async()=>{
 const {rows}=await pool.query("SELECT table_name,column_name FROM information_schema.columns WHERE table_schema='public'");
 for(const [table,col]of [['employees','employee_number'],['projects','client_id'],['performance_reviews','assessed_employee_id'],['project_assignments','allocation_percent']])expect(rows.some(r=>r.table_name===table&&r.column_name===col)).toBe(true);
 const indexes=(await pool.query("SELECT indexdef FROM pg_indexes WHERE schemaname='public'")).rows.map(r=>r.indexdef).join('\n');for(const col of ['client_id','employee_id','project_id','assessed_employee_id','reviewer_id'])expect(indexes).toContain('('+col+')');
});
test('Fresh database start, repeat start, health and foreign-port refusal @feature:app-start-contract/one-command-start',async()=>{
 const temp='hrproto_verify_'+Date.now();const admin=new pg.Client({host:env.DB_HOST,port:Number(env.DB_PORT),database:'postgres',user:env.DB_USER,password:env.DB_PASSWORD});await admin.connect();
 let blocker:net.Server|undefined;
 try{
  expect((await admin.query('SELECT 1 FROM pg_database WHERE datname=$1',[temp])).rowCount).toBe(0);
  const output=run('start',{DB_NAME:temp});expect(output).toContain('exit 0');
  expect((await (await fetch(base+'/health',{headers:{Connection:'close'}})).json()).dependencies.database.name).toBe(temp);
  const first=JSON.parse(fs.readFileSync('logs/run.json','utf8')).pid;
  expect(run('start',{DB_NAME:temp})).toContain('Stopping HR-Prototype process');expect(JSON.parse(fs.readFileSync('logs/run.json','utf8')).pid).not.toBe(first);
  const db=new pg.Client({host:env.DB_HOST,port:Number(env.DB_PORT),database:temp,user:env.DB_USER,password:env.DB_PASSWORD});await db.connect();expect((await db.query('SELECT count(*)::int n FROM employees')).rows[0].n).toBe(4);await db.end();
  expect(run('health',{DB_NAME:temp})).toContain('healthy');
  blocker=net.createServer();await new Promise<void>(resolve=>blocker!.listen(0,'127.0.0.1',resolve));const port=String((blocker.address() as net.AddressInfo).port);
  expect(()=>run('start',{DB_NAME:temp,WEB_PORT:port,API_PORT:port})).toThrow();expect(blocker.listening).toBe(true);
 }finally{if(blocker)await new Promise<void>(resolve=>blocker!.close(()=>resolve()));run('start');await admin.query(`DROP DATABASE IF EXISTS "${temp}"`);await admin.end();}
 expect(run('health')).toContain('HR-Prototype');expect((await fetch(url,{headers:{Connection:'close'}})).status).toBe(200);
});
