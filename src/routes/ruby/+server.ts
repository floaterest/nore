import { html } from '$lib/ruby';
import type { RequestHandler } from './$types';

export const POST = (async ({ request }) => {
    const text = await request.text();
    return new Response(await html(text), {
        headers: { 'content-type': 'text/html' },
    });
}) as RequestHandler;
