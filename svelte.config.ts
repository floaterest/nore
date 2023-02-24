import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';
import type { Config } from '@sveltejs/kit';

const config: Config = {
    preprocess: vitePreprocess(),
    kit: { adapter: adapter() },
};

export default config;
