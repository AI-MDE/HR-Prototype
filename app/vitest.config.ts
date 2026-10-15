import {defineConfig} from 'vitest/config';
export default defineConfig({test:{include:['tests/api.test.ts'],testTimeout:240000,hookTimeout:240000,fileParallelism:false}});
