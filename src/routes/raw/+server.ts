import type { RequestHandler } from './$types';

export const POST = (async ({request}) => new Response(
    `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="white-space: pre">${(await request.text()).replace(/^body=/, '')}</body>
</html>`, { headers: { 'content-type': 'text/html' } })
) as RequestHandler;
