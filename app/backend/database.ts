import { Injectable, Global, Module } from '@nestjs/common';
import pg from 'pg';
import { model, snake } from '../shared/model.js';
pg.types.setTypeParser(1082,v=>v);
pg.types.setTypeParser(1700,Number);
export class Refusal extends Error {constructor(public status:number,public code:string,message:string,public rule?:string){super(message);}}
export function missing(message='Record not found'):never{throw new Refusal(404,'not-found',message);}
export function rule(id:string,message:string):never{throw new Refusal(422,'business-rule',message,id);}
export function camelRow(row:Record<string,any>){return Object.fromEntries(Object.entries(row).map(([k,v])=>[k.replace(/_([a-z])/g,(_,c:string)=>c.toUpperCase()),v]));}
@Injectable()
export class Repository {
 pool=new pg.Pool({host:process.env.DB_HOST,port:Number(process.env.DB_PORT),database:process.env.DB_NAME,user:process.env.DB_USER,password:process.env.DB_PASSWORD,connectionTimeoutMillis:5000});
 async list(entity:string){return (await this.pool.query(`SELECT * FROM ${model[entity].table} ORDER BY id`)).rows.map(camelRow);}
 async get(entity:string,id:string,c?:pg.PoolClient,lock=false){
  const r=await (c??this.pool).query(`SELECT * FROM ${model[entity].table} WHERE id=$1${lock?' FOR UPDATE':''}`,[id]);
  return r.rowCount?camelRow(r.rows[0]):missing();
 }
 async transaction<T>(fn:(c:pg.PoolClient)=>Promise<T>){const c=await this.pool.connect();try{await c.query('BEGIN');const result=await fn(c);await c.query('COMMIT');return result;}catch(e){await c.query('ROLLBACK');throw e;}finally{c.release();}}
 async save(entity:string,data:Record<string,any>,c:pg.PoolClient,id?:string){
  const keys=model[entity].fields.map(f=>f.key), values=keys.map(k=>data[k]??null);
  const q=id?`UPDATE ${model[entity].table} SET ${keys.map((k,i)=>`${snake(k)}=$${i+1}`).join(',')} WHERE id=$${keys.length+1} RETURNING *`:`INSERT INTO ${model[entity].table} (${keys.map(snake).join(',')},id) VALUES (${keys.map((_,i)=>'$'+(i+1)).join(',')},$${keys.length+1}) RETURNING *`;
  const r=await c.query(q,[...values,id??crypto.randomUUID()]);return camelRow(r.rows[0]);
 }
}
@Global() @Module({providers:[Repository],exports:[Repository]}) export class DatabaseModule{}
