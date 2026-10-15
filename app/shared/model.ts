export type Field={key:string;label:string;type?:'date'|'number'|'textarea'|'email';optional?:boolean;ref?:string};
export type Entity={title:string;singular:string;table:string;fields:Field[];label:string[]};
export const model:Record<string,Entity>={
 Employee:{title:'Employees',singular:'Employee',table:'employees',label:['employeeNumber','fullName'],fields:[{key:'employeeNumber',label:'Employee number'},{key:'fullName',label:'Full name'},{key:'email',label:'Work email',type:'email'},{key:'jobTitle',label:'Job title'},{key:'startDate',label:'Employment start',type:'date'},{key:'endDate',label:'Employment end',type:'date',optional:true}]},
 PerformanceReview:{title:'Performance reviews',singular:'Performance review',table:'performance_reviews',label:['periodStart','periodEnd'],fields:[{key:'assessedEmployeeId',label:'Employee',ref:'Employee'},{key:'reviewerId',label:'Reviewer',ref:'Employee'},{key:'periodStart',label:'Period start',type:'date'},{key:'periodEnd',label:'Period end',type:'date'},{key:'reviewDate',label:'Discussion date',type:'date'},{key:'summary',label:'Assessment',type:'textarea'},{key:'strengths',label:'Strengths and examples',type:'textarea'},{key:'developmentActions',label:'Development actions',type:'textarea'}]},
 Client:{title:'Clients',singular:'Client',table:'clients',label:['clientCode','name'],fields:[{key:'clientCode',label:'Client code'},{key:'name',label:'Organization name'}]},
 Project:{title:'Projects',singular:'Project',table:'projects',label:['projectCode','name'],fields:[{key:'clientId',label:'Client',ref:'Client'},{key:'projectCode',label:'Project code'},{key:'name',label:'Project name'},{key:'description',label:'Scope of work',type:'textarea'},{key:'startDate',label:'Planned start',type:'date'},{key:'endDate',label:'Planned end',type:'date'}]},
 ProjectAssignment:{title:'Assignments',singular:'Assignment',table:'project_assignments',label:['responsibility','startDate'],fields:[{key:'projectId',label:'Project',ref:'Project'},{key:'employeeId',label:'Employee',ref:'Employee'},{key:'responsibility',label:'Responsibility'},{key:'startDate',label:'Assignment start',type:'date'},{key:'endDate',label:'Assignment end',type:'date'},{key:'allocationPercent',label:'Allocation (%)',type:'number'}]}
};
export const roles:Record<string,string>={hrAdministrator:'HR Administrator',peopleManager:'People Manager',projectCoordinator:'Project Coordinator'};
export const routes:Record<string,string>={Employee:'employees',PerformanceReview:'performance-reviews',Client:'clients',Project:'projects'};
export const flows:Record<string,{title:string;entity:string;role:string;update?:boolean;description:string}>={
 'establish-employee-record':{title:'Establish employee record',entity:'Employee',role:'hrAdministrator',description:'Give a new colleague a reliable record for reviews and project work.'},
 'correct-employee-details':{title:'Correct employee details',entity:'Employee',role:'hrAdministrator',update:true,description:'Keep employee details current without disrupting existing commitments.'},
 'record-performance-discussion':{title:'Record performance discussion',entity:'PerformanceReview',role:'peopleManager',description:'Capture the conversation, recognize strengths and agree what comes next.'},
 'prepare-client-project':{title:'Prepare client project',entity:'Project',role:'projectCoordinator',description:'Connect client work to a clear scope and delivery period.'},
 'assign-employee-to-project':{title:'Assign employee to project',entity:'ProjectAssignment',role:'projectCoordinator',description:'Review existing commitments and plan a responsible allocation.'}
};
export function label(entity:string,row:Record<string,any>){return model[entity].label.map(k=>row[k]).filter(Boolean).join(' · ');}
export function snake(s:string){return s.replace(/[A-Z]/g,c=>'_'+c.toLowerCase());}
