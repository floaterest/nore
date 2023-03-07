const atilika = 'https://www.atilika.com/kuromoji/rest/tokenizer/tokenize';

export interface Ipadic{
    // base: string
    // pos: string
    // pronunciation: string
    reading: string
    surface: string
}

function substring(s: string, range:number[]){
    return s.substring(...range.sort() as [number, number]);
}

/** get longest common substring */
function common(input: string[], start: (s:string) => number, next: (i:number) => number){
    // not using `increment: number` as param because functions are cool
    const init = input.map(start);
    const max = Math.min(...input.map(s => s.length));
    let prev = [...init];
    let chars: string[];
    for(let i = 0;i < max;i++){
        const cur = prev.map(next);
        chars = input.map((s, i) => substring(s, [init[i], cur[i]].sort()));
        if((new Set(chars)).size !== 1) break;
        prev = [...cur];
    }
    let common = '';
    return [input.map((s, i) => {
        const [a, b] = [init[i], prev[i]].sort();
        common = common || s.substring(a, b);
        return s.substring(0, a) + s.substring(b);
    }), common] as [string[], string];
}

/** katakana to hiragana */
function hira(kata: string): string{
    return [...kata].map(ch => String.fromCharCode(ch.charCodeAt(0) - 96)).join('');
}

async function request(text: string): Promise<Ipadic[]>{
    const res = await fetch(atilika, {
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        method: 'POST',
        body: JSON.stringify({ mode: 2, text }),
    });
    if(!res.ok) throw await res.text();

    return (await res.json()).tokens;
}

/** extract left and right longest common substring */
export function extract(...input:string[]): [string, string[], string]{
    let [prefix, suffix] = ['', ''];
    [input, prefix] = common(input, _ => 0, i => i + 1);
    [input, suffix] = common(input, s => s.length, i => i - 1);
    return [prefix, input, suffix];
}

/** inject <ruby> to text*/
export async function inject(text: string): Promise<string>{
    return (await request(text)).map(({surface, reading}) => {
    // no reading
        if(!reading || reading === '?') return surface;
        // pure kana or 長音符
        if(/^[\u3005\u3040-\u30ff]+$/.test(surface)) return surface;
        const [prefix, [rb, rt], suffix] = extract(surface, hira(reading));
        return `${prefix}<ruby>${rb}<rt>${rt}</rt></ruby>${suffix}`;
    }).join('');
}
