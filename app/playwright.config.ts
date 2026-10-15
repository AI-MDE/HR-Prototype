import {defineConfig} from '@playwright/test';import dotenv from 'dotenv';
dotenv.config({path:'../.env',quiet:true});
export default defineConfig({testDir:'tests/browser',workers:1,fullyParallel:false,timeout:30000,retries:0,reporter:[['list'],['json',{outputFile:'../evidence/tests/raw/browser.json'}]],use:{baseURL:`http://${process.env.HOST}:${process.env.WEB_PORT}${process.env.BASE_PATH}`,headless:true,viewport:{width:1440,height:1050},screenshot:'only-on-failure',trace:'retain-on-failure'}});
