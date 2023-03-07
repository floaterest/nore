import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';


export default{
    plugins: [sveltekit()],
    test: { include:['test/**/*.test.ts'] },
} as UserConfig;
