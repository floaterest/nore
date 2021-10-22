import type { IpadicFeatures } from '$lib/kuro';

export async function get({ params }){
    const { input } = params;
    const res = await fetch('https://www.atilika.com/kuromoji/rest/tokenizer/tokenize', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0',
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ mode: 0, text: input }),
    });
    const j = await res.json();
    return {
        status: 200,
        header: {
            'content-type': 'application/json',
        },
        body: j.tokens as IpadicFeatures[],
    };
}
