import 'reflect-metadata';
import {NestFactory} from '@nestjs/core';
import {Module,Controller,Get,Post,Put,Param,Body,Req,Res,Catch,ArgumentsHost,ExceptionFilter} from '@nestjs/common';
import type {Request,Response} from 'express';
import express from 'express';
import fs from 'node:fs';import path from 'node:path';import {randomBytes} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import dotenv from 'dotenv';
import {DatabaseModule,Repository,Refusal,missing} from './database.js';
import {EmployeeModule,EmployeeService,PerformanceModule,PerformanceService,ProjectModule,ProjectService,validate} from './services.js';
import {model,roles} from '../shared/model.js';
const appDir=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
dotenv.config({path:path.join(appDir,'../.env'),quiet:true});
const base=process.env.BASE_PATH!,apiBase=process.env.API_BASE!;
if(!base||!apiBase||process.env.HOST!=='127.0.0.1')throw new Error('Missing base configuration or non-loopback demo host.');
const grants=JSON.parse(fs.readFileSync(path.join(appDir,'../specs/design/authorization.json'),'utf8'));
const sessions=new Map<string,{role:string;expires:number}>();
function session(req:Request){const cookie=req.headers.cookie?.split(';').map(s=>s.trim()).find(s=>s.startsWith('hrproto='))?.slice(8);const s=cookie?sessions.get(cookie):undefined;if(!s||s.expires<Date.now())throw new Refusal(401,'unauthenticated','Choose a demo role to continue.');return s;}
function permitted(req:Request,entity:string,op:string){if(!Object.hasOwn(model,entity))missing('Unknown entity.');if(!grants[entity]?.[op]?.includes(session(req).role))throw new Refusal(403,'forbidden','This demo role cannot perform that action.');}
function uuid(id:string){if(!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id))throw new Refusal(400,'invalid-input','Invalid record identifier.');}
@Catch() class Errors implements ExceptionFilter{
 catch(err:any,host:ArgumentsHost){const res=host.switchToHttp().getResponse<Response>();
  let e=err;
  if(err.code==='23505')e=new Refusal(409,'duplicate','That business identifier already exists. Open the existing record.');
  else if(err.code==='23503')e=new Refusal(404,'not-found','A referenced record no longer exists.');
  else if(err.code==='23514')e=new Refusal(422,'business-rule','The record violates its constraints.','record-constraint');
  else if(!(err instanceof Refusal))e=new Refusal(err.status===404?404:err.status===400?400:500,err.status===404?'not-found':err.status===400?'invalid-input':'unexpected',err.status===404?'Page or operation not found.':err.status===400?'Invalid request.':'The operation could not be completed. Please retry.');
  res.status(e.status).json({code:e.code,message:e.message,...(e.rule?{rule:e.rule}:{})});
 }
}
@Controller() class ApiController{
 constructor(private readonly repo:Repository,private readonly employees:EmployeeService,private readonly performance:PerformanceService,private readonly projects:ProjectService){}
 @Get('health')async health(@Res() res:Response){try{await this.repo.pool.query('SELECT 1');return res.json({application:'HR-Prototype',status:'healthy',dependencies:{database:{status:'healthy',name:process.env.DB_NAME}}});}catch{return res.status(503).json({application:'HR-Prototype',status:'unhealthy',dependencies:{database:{status:'unhealthy',name:process.env.DB_NAME}}});}}
 @Post('session') choose(@Body() body:any,@Res() res:Response){if(!Object.hasOwn(roles,body?.role))throw new Refusal(400,'invalid-input','Select a valid demo role.');for(const [k,v]of sessions)if(v.expires<Date.now())sessions.delete(k);const id=randomBytes(32).toString('hex');sessions.set(id,{role:body.role,expires:Date.now()+8*3600000});res.cookie('hrproto',id,{httpOnly:true,sameSite:'strict',path:base,maxAge:8*3600000});return res.json({role:body.role,grants});}
 @Get('session') who(@Req() req:Request){return {role:session(req).role,grants};}
 @Get('records/:entity') list(@Param('entity') entity:string,@Req() req:Request){permitted(req,entity,'read');return this.repo.list(entity);}
 @Get('records/:entity/:id') get(@Param('entity') entity:string,@Param('id') id:string,@Req() req:Request){permitted(req,entity,'read');uuid(id);return this.repo.get(entity,id);}
 @Post('records/:entity') create(@Param('entity') entity:string,@Body() input:any,@Req() req:Request){permitted(req,entity,'create');const d=validate(entity,input);return entity==='Employee'?this.employees.save(d):entity==='PerformanceReview'?this.performance.save(d):this.projects.save(entity,d);}
 @Put('records/:entity/:id') update(@Param('entity') entity:string,@Param('id') id:string,@Body() input:any,@Req() req:Request){permitted(req,entity,'update');uuid(id);return this.employees.save(validate(entity,input),id);}
}
@Module({imports:[DatabaseModule,EmployeeModule,PerformanceModule,ProjectModule],controllers:[ApiController]})class AppModule{}
const app=await NestFactory.create(AppModule);
app.setGlobalPrefix(apiBase.replace(/^\//,''));app.useGlobalFilters(new Errors());
app.use((req:Request,res:Response,next:()=>void)=>{res.setHeader('X-Content-Type-Options','nosniff');if(!['GET','HEAD','OPTIONS'].includes(req.method)&&req.headers.origin&&req.headers.origin!==`http://${process.env.HOST}:${process.env.WEB_PORT}`){res.status(403).json({code:'forbidden',message:'Cross-origin mutations are not allowed.'});return;}next();});
app.use(base,express.static(path.join(appDir,'frontend/dist'),{index:false}));
app.use((req:Request,res:Response,next:()=>void)=>{if(req.method==='GET'&&!req.path.startsWith(apiBase)&&req.path.startsWith(base))return res.sendFile(path.join(appDir,'frontend/dist/index.html'));if(req.path==='/')return res.redirect(base);next();});
app.enableShutdownHooks();await app.listen(Number(process.env.WEB_PORT),process.env.HOST);
console.log(`HR-Prototype ready at http://${process.env.HOST}:${process.env.WEB_PORT}${base}`);
