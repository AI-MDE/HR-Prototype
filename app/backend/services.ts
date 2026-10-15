import {Injectable,Module} from '@nestjs/common';
import {Repository,Refusal,rule} from './database.js';
import {model} from '../shared/model.js';
export function validate(entity:string,input:any){
 if(!input||Array.isArray(input)||typeof input!=='object')throw new Refusal(400,'invalid-input','Supply a record.');
 const fields=model[entity].fields;
 if(Object.keys(input).some(k=>!fields.some(f=>f.key===k)))throw new Refusal(400,'invalid-input','Unexpected fields in request.');
 const data:Record<string,any>={};
 for(const f of fields){let value=input[f.key];
  if(value==null||value===''){if(!f.optional)throw new Refusal(400,'invalid-input',`${f.label} is required.`);data[f.key]=null;continue;}
  if(f.type==='number'){if(typeof value!=='number'||!Number.isFinite(value)||Math.round(value*100)!==value*100)throw new Refusal(400,'invalid-input',`${f.label} must be a number with at most two decimal places.`);}
  else {if(typeof value!=='string'||!value.trim()||value.length>10000)throw new Refusal(400,'invalid-input',`${f.label} is invalid.`);value=value.trim();}
  if(f.type==='date'&&(!/^\d{4}-\d{2}-\d{2}$/.test(value)||Number.isNaN(Date.parse(value))||new Date(value).toISOString().slice(0,10)!==value))throw new Refusal(400,'invalid-input',`${f.label} must be a valid date.`);
  if(f.ref&&!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value))throw new Refusal(400,'invalid-input',`${f.label} must identify a record.`);
  if(f.type==='email'&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))throw new Refusal(400,'invalid-input','Enter a valid work email.');
  data[f.key]=value;
 }return data;
}
@Injectable() export class EmployeeService {
 constructor(private readonly repo:Repository){}
 save(data:Record<string,any>,id?:string){return this.repo.transaction(async c=>{
  if(id)await this.repo.get('Employee',id,c,true);
  if(data.endDate&&data.endDate<data.startDate)rule('employment-interval','Employment end cannot precede its start.');
  if(id){const r=await c.query('SELECT id FROM project_assignments WHERE employee_id=$1 AND (start_date<$2 OR ($3::date IS NOT NULL AND end_date>$3))',[id,data.startDate,data.endDate]);if(r.rowCount)rule('assignment-commitment','These employment dates would invalidate an existing assignment.');}
  return this.repo.save('Employee',data,c,id);
 });}
}
@Injectable() export class PerformanceService {
 constructor(private readonly repo:Repository){}
 save(data:Record<string,any>){return this.repo.transaction(async c=>{
  await this.repo.get('Employee',data.assessedEmployeeId,c);await this.repo.get('Employee',data.reviewerId,c);
  if(data.periodEnd<data.periodStart||data.reviewDate<data.periodEnd)rule('review-interval','The period and discussion dates must be in order.');
  return this.repo.save('PerformanceReview',data,c);
 });}
}
@Injectable() export class ProjectService {
 constructor(private readonly repo:Repository){}
 save(entity:string,data:Record<string,any>){return this.repo.transaction(async c=>{
  if(entity==='Project'){await this.repo.get('Client',data.clientId,c);if(data.endDate<data.startDate)rule('project-interval','Project end cannot precede its start.');}
  if(entity==='ProjectAssignment'){
   const employee=await this.repo.get('Employee',data.employeeId,c,true);
   const project=await this.repo.get('Project',data.projectId,c);
   if(data.endDate<data.startDate||data.startDate<employee.startDate||(employee.endDate&&data.endDate>employee.endDate)||data.startDate<project.startDate||data.endDate>project.endDate)rule('assignment-commitment','Assignment dates must fit the employment and project periods.');
   if(data.allocationPercent<=0||data.allocationPercent>100)rule('assignment-commitment','Allocation must be greater than zero and no more than 100%.');
   const existing=(await c.query('SELECT start_date, end_date, allocation_percent FROM project_assignments WHERE employee_id=$1 AND start_date<=$3 AND end_date>=$2',[data.employeeId,data.startDate,data.endDate])).rows;
   const boundaries=new Set([data.startDate,...existing.map(r=>r.start_date).filter(d=>d>=data.startDate&&d<=data.endDate)]);
   for(const day of boundaries){const total=existing.filter(r=>r.start_date<=day&&r.end_date>=day).reduce((sum,r)=>sum+Number(r.allocation_percent),data.allocationPercent);if(total>100.000001)rule('assignment-commitment',`Allocation would total ${total}% on ${day}. Reduce the percentage or change the dates.`);}
  }
  return this.repo.save(entity,data,c);
 });}
}
@Module({providers:[EmployeeService],exports:[EmployeeService]})export class EmployeeModule{}
@Module({providers:[PerformanceService],exports:[PerformanceService]})export class PerformanceModule{}
@Module({providers:[ProjectService],exports:[ProjectService]})export class ProjectModule{}
