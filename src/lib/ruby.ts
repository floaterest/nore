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

/** strip longest common substring */
function strip(input: string[], start: (s:string) => number, next: (i:number) => number){
    // not using `increment: number` as param because functions are cool
    let arr:[string, number][] = input.map(s => [s, start(s)]);
    const max = Math.min(...input.map(s => s.length));
    for(let n = 0;n < max;n++){
        // do next() twice to get inclusive range

        // get each char
        const chars = arr.map(([s, i]) => s[next(i)]);
        if((new Set(chars)).size !== 1 || ! chars.every(Boolean)){
            let common = '';
            return [arr.map(([s, i]) => {
                // inclusive range
                const [a, b] = [start(s), i].sort();
                common = common || s.substring(a, b + 1);
                // return not common
                return s.substring(0, a) + s.substring(b + 1);
            }), common] as [string[], string];
        }
        // set to next index
        arr = arr.map(([s, i]) => [s, next(i)]);
    }
    return [input, ''] as [string[], string];
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
    if(!res.ok) throw await res.text();

    return (await res.json()).tokens;
}

/** inject <ruby> to text*/
export async function html(text: string): Promise<string>{
    return (await request(text)).map(({ surface, reading }) => {
        console.debug({surface, reading});
        // no reading
        if(!reading || reading === '?') return surface;
        // pure kana or 長音符
        if(/^[\u3005\u3040-\u30ff]+$/.test(surface)) return surface;
        let arr = [surface, hira(reading)];
        let [prefix, suffix] = ['', ''];
        [arr, prefix] = strip(arr, _ => 0, i => i + 1);
        console.log({arr, prefix, suffix});
        [arr, suffix] = strip(arr, s => s.length - 1, i => i - 1);
        console.log({arr, prefix, suffix});
        return prefix + ruby(...arr as [string, string]) + suffix;
    }).join('');
}
