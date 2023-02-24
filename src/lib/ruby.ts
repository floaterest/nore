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
    const a = await request(text);
    console.log(a)
    return (a).map(({ surface, reading }) => {
        const hiragana = hira(reading);
        console.debug({surface, reading})
        // no reading
        if(!reading || reading === '?') return surface;
        // pure kana
        if([hiragana, reading].includes(surface)) return surface;
        return ruby(surface, hiragana);
    }).join('');
}
