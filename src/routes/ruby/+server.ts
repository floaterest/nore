import { inject } from '$lib/ruby';
import type { RequestHandler } from './$types';

// cache only CJC characters
const cache = new Map();

export const POST = (async ({ request }) => {
    const text = await request.text();
    let result = text;
    // if has CJK characters and key not found in cache
    if(/[\u4e00-\u9fff]/.test(text) && !(result = cache.get(text))){
        // add new entry to map
        result = cache.set(text, await inject(text)).get(text);
    }
    return new Response(result, { headers: { 'content-type': 'text/html' } });
}) satisfies RequestHandler;
