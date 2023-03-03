const atilika = 'https://www.atilika.com/kuromoji/rest/tokenizer/tokenize';

export interface Ipadic{
    // base: string
    // pos: string
    // pronunciation: string
    reading: string
    surface: string
}

/** create ruby element */
function ruby(rb: string, rt: string): string{
    return `<ruby>${rb}<rt>${rt}</rt></ruby>`;
}

/** katakana to hiragana */
function hira(kata: string): string{
    return [...kata].map(ch => String.fromCharCode(ch.charCodeAt(0) - 96)).join('');
}

export async function request(text: string): Promise<Ipadic[]>{
    const res = await fetch(atilika, {
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        method: 'POST',
        body: JSON.stringify({ mode: 2, text }),
    });
    if(!res.ok)throw await res.text();

    return (await res.json()).tokens;
}

/** inject <ruby> to text*/
export async function html(text: string): Promise<string>{
    return (await request(text)).map(({ surface, reading }) => {
        // no reading
        if(!reading || reading === '?') return surface;
        // pure kana or 長音符
        if(/^[\u3005\u3040-\u30ff]+$/.test(surface)) return surface;
        const hiragana = hira(reading);
        console.debug({surface, reading})
        return ruby(surface, hiragana);
    }).join('');
}
