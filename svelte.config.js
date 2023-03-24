import adapter from 'svelte-adapter-deno';
import { vitePreprocess } from '@sveltejs/kit/vite';

export default {
    preprocess: vitePreprocess(),
    kit: { adapter: adapter() },
};
