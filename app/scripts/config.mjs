import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import dotenv from 'dotenv';
import {randomBytes} from 'node:crypto';
export const appDir=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
export const root=path.dirname(appDir);
if(!fs.existsSync(path.join(root,'.env'))){const example=fs.readFileSync(path.join(root,'.env.example'),'utf8');fs.writeFileSync(path.join(root,'.env'),example.replace(/^DB_PASSWORD=.*$/m,'DB_PASSWORD='+randomBytes(32).toString('base64url')),{mode:0o600});}
dotenv.config({path:path.join(root,'.env'),quiet:true});
for(const key of ['HOST','WEB_PORT','API_PORT','DB_PORT','BASE_PATH','API_BASE','DB_NAME','DB_USER','DB_PASSWORD','DB_HOST','DB_MODE']) if(!process.env[key]) throw new Error(`Missing ${key}; configure the project-root .env`);
const e=process.env;
if(e.HOST!=='127.0.0.1') throw new Error('The fictional demo must bind to loopback (HOST=127.0.0.1).');
if(!/^\/[a-zA-Z0-9/_-]*\/$/.test(e.BASE_PATH)||!e.API_BASE.startsWith(e.BASE_PATH)) throw new Error('BASE_PATH must be a folder path ending in /; API_BASE must be inside it.');
if(e.WEB_PORT!==e.API_PORT) throw new Error('The built application serves UI and API together; WEB_PORT and API_PORT must match.');
if(!/^[a-z][a-z0-9_]*$/.test(e.DB_NAME)) throw new Error('DB_NAME must be a lowercase SQL identifier.');
export const config={host:e.HOST,port:Number(e.WEB_PORT),base:e.BASE_PATH,api:e.API_BASE,url:`http://${e.HOST}:${e.WEB_PORT}${e.BASE_PATH}`,db:{host:e.DB_HOST,port:Number(e.DB_PORT),database:e.DB_NAME,user:e.DB_USER,password:e.DB_PASSWORD,connectionTimeoutMillis:5000}};
export function writeJson(p,data){fs.mkdirSync(path.dirname(p),{recursive:true});fs.writeFileSync(p,JSON.stringify(data,null,2)+'\n');}
export const evidence=path.join(root,'evidence');
