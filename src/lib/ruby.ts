const atilika = 'https://www.atilika.com/kuromoji/rest/tokenizer/tokenize';

export interface Ipadic{
    // base: string
    // pos: string
    // pronunciation: string
    reading: string
    surface: string
}

/** katakana to hiragana */
function hira(kata: string): string{
    return [...kata].map(ch => String.fromCharCode(ch.charCodeAt(0) - 96)).join('');
}

async function request(text: string): Promise<Ipadic[]>{
    // mode 2 does not keep the order
    const res = await fetch(atilika, {
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        method: 'POST',
        body: JSON.stringify({ mode: 1, text }),
    });
    if(!res.ok) throw await res.text();

    return (await res.json()).tokens;
}

function ruby(rb: string, rt:string):string{
    return `<ruby>${rb}<rt>${rt}</rt></ruby>`;
}

/** extract common rb and rt substrings */
export function extract(rb: string, rt: string): (string|[string, string])[]{
    // assume okurigana is hiragana only
    const o = rb.match(/[\u3040-\u3090]*$/)![0];
    [rb, rt] = [rb, rt].map(s => s.substring(0, s.length - o.length));
    // pure kana
    const kana = [...rb.matchAll(/[\u3040-\u30f4]+/g)].flat();
    const [b, t] = [rb, rt].map(s => kana.reduce(
        (acc, cur) => [...acc.slice(0, -1), ...acc.slice(-1)[0].split(cur)],
        [s],
    ));
    if(b.length != t.length){
        throw `Unsupported input: ${rb} ${rt}`;
    }
    const indices = Array.from(Array(Math.min(b.length, t.length)), (_, i) => i);
    if(indices.some(i => Boolean(b[i]) != Boolean(t[i]))){
        throw `Unsupported input: ${b.toString()} ${t.toString()}`;
    }
    let k = 0;
    return [
        ...indices.map(i => b[i] ? [b[i], t[i]] : kana[k++]), o,
    ].filter(Boolean) as (string|[string, string])[];
}

/** inject <ruby> to text*/
export async function inject(text: string): Promise<string>{
    return (await request(text)).map(({surface, reading}) => {
        // no reading
        if(!reading || reading === '?') return surface;
        // pure kana or 長音符
        if(/^[\u3005\u3040-\u30ff]+$/.test(surface)) return surface;
        return extract(surface, hira(reading)).reduce(
            (acc, cur) => typeof cur === 'string' ? acc + cur : acc + ruby(...cur),
        );
    }).join('');
}
