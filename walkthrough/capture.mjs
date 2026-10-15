// Records a captioned screenshot walkthrough of the running HR-Prototype.
import {createRequire} from 'node:module';import fs from 'node:fs';import path from 'node:path';
const appDir='C:/mde/ws/samples/HR-Prototype/app';
const require=createRequire(appDir+'/package.json');
const {chromium}=require('playwright');const pg=require('pg');const dotenv=require('dotenv');
const env=dotenv.parse(fs.readFileSync(appDir+'/../.env'));
const out=path.join(path.dirname(new URL(import.meta.url).pathname.slice(1)),'shots');fs.mkdirSync(out,{recursive:true});
const base=`http://${env.HOST}:${env.WEB_PORT}${env.BASE_PATH}`;
const uid=n=>'00000000-0000-4000-8000-'+String(n).padStart(12,'0');
const steps=[];let n=0;
const browser=await chromium.launch();const page=await browser.newPage({viewport:{width:1440,height:900},deviceScaleFactor:1});
async function shot(title,caption,{full=false}={}){await page.waitForTimeout(300);const file=String(++n).padStart(2,'0')+'.png';await page.screenshot({path:path.join(out,file),fullPage:full});steps.push({file,title,caption});console.log(file,title);}
const fill=async(pairs)=>{for(const [l,v] of pairs)await page.getByLabel(l,{exact:true}).fill(v);};
const review=async()=>page.getByRole('button',{name:'Review details'}).click();
const confirm=async()=>page.getByRole('button',{name:'Confirm & save'}).click();
let employeeId,projectId;
try{
 await page.goto(base);await shot('Choose a demo role','The prototype opens on a role picker. Each role sees its own pages and workflows.');
 await page.getByRole('button',{name:/HR Administrator/}).click();await page.getByRole('heading',{name:'People at the center.'}).waitFor();
 await shot('HR Administrator overview','The HR Administrator lands on an overview of the people records and the workflows they own.');
 await page.getByRole('link',{name:/Establish employee record/}).click();
 await fill([['Employee number','EMP-DEMO-01'],['Full name','Taylor Morgan'],['Work email','taylor.morgan@example.test'],['Job title','Consultant'],['Employment start','2026-01-01']]);
 await shot('Establish an employee record','Workflow 1: the administrator enters a new employee’s details.');
 await review();await shot('Review before saving','Every workflow shows a review step, so nothing is saved until it is confirmed.');
 await confirm();await page.getByRole('heading',{name:'Taylor Morgan'}).waitFor();employeeId=page.url().split('/').pop();
 await shot('Employee record','The new record opens with its details, reviews and project assignments.');
 await page.getByRole('link',{name:/Correct details/}).click();await page.getByLabel('Job title',{exact:true}).fill('Senior Consultant');
 await shot('Correct employee details','Workflow 2: the administrator corrects the job title.');
 await review();await confirm();await page.getByText('Senior Consultant',{exact:true}).first().waitFor();
 await page.getByRole('link',{name:'Employees',exact:true}).first().click();await page.getByRole('heading',{name:'Employees',exact:true}).waitFor();
 await shot('Employee list','All employees, including the one just added.');
 await page.getByLabel('Demo role').selectOption('peopleManager');await page.getByRole('link',{name:/Record performance discussion/}).click();
 await page.getByLabel('Employee',{exact:true}).selectOption(employeeId);await page.getByLabel('Reviewer',{exact:true}).selectOption(uid(2));
 await fill([['Period start','2026-01-01'],['Period end','2026-06-30'],['Discussion date','2026-07-01'],['Assessment','A thoughtful first half.'],['Strengths and examples','Clear communication with clients.'],['Development actions','Lead a team workshop.']]);
 await shot('Record a performance discussion','Workflow 3: switching to the People Manager role to record a performance discussion.',{full:true});
 await review();await confirm();await page.getByRole('heading',{name:'Performance discussion',exact:true}).waitFor();
 await shot('Performance discussion','The saved discussion, linked to the employee and the reviewer.');
 await page.getByLabel('Demo role').selectOption('projectCoordinator');await page.getByRole('link',{name:/Prepare client project/}).click();
 await page.getByLabel('Client',{exact:true}).selectOption(uid(11));
 await fill([['Project code','PRJ-DEMO-01'],['Project name','Client onboarding programme'],['Scope of work','Plan and deliver onboarding for a new client.'],['Planned start','2026-01-01'],['Planned end','2026-12-31']]);
 await shot('Prepare a client project','Workflow 4: the Project Coordinator sets up a project for a client.');
 await review();await confirm();await page.getByRole('heading',{name:'Client onboarding programme',exact:true}).waitFor();projectId=page.url().split('/').pop();
 await page.getByRole('link',{name:/Assign employee/}).click();await page.getByLabel('Employee',{exact:true}).selectOption(employeeId);
 await fill([['Responsibility','Delivery lead'],['Assignment start','2026-09-01'],['Assignment end','2026-10-31'],['Allocation (%)','60']]);
 await shot('Assign an employee','Workflow 5: assigning the new employee to the project at 60% allocation.');
 await review();await confirm();await page.getByRole('cell',{name:'Delivery lead'}).waitFor();
 await shot('Project with its team','The project now shows its assignment.',{full:true});
 await page.getByRole('link',{name:/Assign employee/}).click();await page.getByLabel('Employee',{exact:true}).selectOption(uid(1));
 await fill([['Responsibility','Extra work'],['Assignment start','2026-10-01'],['Assignment end','2026-10-02'],['Allocation (%)','1']]);
 await review();await confirm();await page.getByText(/Allocation would total/).waitFor();await page.getByText(/Allocation would total/).first().evaluate(e=>e.scrollIntoView({block:'center'}));
 await shot('A business rule refuses','Allocating someone past 100% is refused, with the reason, and the entered details are kept.');
 await page.goto(base+'performance-reviews');await page.getByRole('heading',{name:'This page belongs to another role.'}).waitFor();
 await shot('Role-based access','A Project Coordinator who opens a People Manager page is turned away.');
 await page.getByRole('link',{name:'Clients',exact:true}).first().click();await page.getByRole('link',{name:/Open NORTH/}).click();await page.getByRole('heading',{name:'Northstar Studio'}).waitFor();
 await shot('Client record','A client with its projects.');
 await page.getByRole('link',{name:'Return to overview'}).or(page.getByRole('link',{name:/overview/i})).first().click().catch(()=>{});
 await page.setViewportSize({width:390,height:844});await page.goto(base);
 await shot('On a phone','The same app at phone width.');
}finally{
 await browser.close();
 fs.writeFileSync(path.join(out,'steps.json'),JSON.stringify(steps,null,1));
 // Remove only the records this walkthrough created.
 const db=new pg.Client({host:env.DB_HOST,port:Number(env.DB_PORT),database:env.DB_NAME,user:env.DB_USER,password:env.DB_PASSWORD});await db.connect();
 try{if(employeeId){await db.query('DELETE FROM project_assignments WHERE employee_id=$1',[employeeId]);await db.query('DELETE FROM performance_reviews WHERE assessed_employee_id=$1',[employeeId]);}
  if(projectId)await db.query('DELETE FROM projects WHERE id=$1',[projectId]);if(employeeId)await db.query('DELETE FROM employees WHERE id=$1',[employeeId]);}finally{await db.end();}
}
