import type { IpadicFeatures } from '$lib/kuro';

const atilika = 'https://www.atilika.com/kuromoji/rest/tokenizer/tokenize';

export async function get({ params }){
    const { text } = params;
    const res = await fetch(atilika, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ mode: 0, text }),
    });
    if(!res.ok) throw await res.text();

    return {
        status: 200,
        header: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: (await res.json()).tokens as IpadicFeatures[],
    };
}
