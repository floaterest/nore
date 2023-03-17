import { inject } from '$lib/ruby';
import type { RequestHandler } from './$types';

export const POST = (async ({ request }) => {
    const text = await request.text();
    return new Response(await inject(text), {
        headers: { 'content-type': 'text/html' },
    });
}) as RequestHandler;
