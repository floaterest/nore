import { inject } from '$lib/ruby';
import type { RequestHandler } from './$types';

const cache = new Map();

export const POST = (async ({ request }) => {
    const text = await request.text();
    let res = cache.get(text);
    if(!cache.has(text)){
        res = await inject(text);
        cache.set(text, res);
    }
    return new Response(res, { headers: { 'content-type': 'text/html' } });
}) satisfies RequestHandler;
