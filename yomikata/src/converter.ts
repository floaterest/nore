import type { IpadicFeatures } from 'kuromoji';

// kana + kanji + 長音符
const jpn = /[\u3040-\u30ff\u4e00-\u9fff\u3005]+/g;
const kana = /[\u3040-\u30ff]+/g;

/**
 * convert katakana to hiragana
 * @param s all characters should be katakana
 */
function hiragana(s: string){
    return [ ...s ].map(ch => String.fromCharCode(ch.charCodeAt(0) - 96)).join('');
}

/**
 * separate japanese and non-japanese
 * @returns [string, boolean][]
 */
function separate(line: string){
    let res = [];
    let i1 = 0, i2, l;
    for(l of line.match(jpn)){
        i2 = line.indexOf(l, i1);
        res.push([ line.substr(i1, i2 - i1), false ]); // non-jpn
        res.push([ line.substr(i2, l.length), true ]); // jpn
        i2 += l.length;
        i1 = i2;
    }
    // if has non-jpn left
    if(i2 != line.length){
        res.push([ line.substr(i2), false ]);
    }
    // if 1st is empty
    if(!res[0][0]){
        res.shift();
    }
    return res;
}

/**
 * create ruby element
 */
const ruby = (rb: string, rt: string) => `<ruby>${rb}<rt>${rt}</rt></ruby>`;

/**
 * remove trailing and middle kana
 * @param sf
 * @param r must be in hiragana
 */
function trim(sf, r){
    let l1 = sf.length, l2 = r.length;
    let min = l1 < l2 ? l1 : l2;

    // test leading
    let i = 0;
    do{
        if(sf[i] !== r[i]) break;
    }while(++i < min);

    // test trailing
    while(l1 && l2){
        if(sf[--l1] !== r[--l2]) break;
    }
    // empty list if no leading
    let res = i ? [ sf.slice(0, i) ] : [];
    res.push(ruby(sf.slice(i, ++l1), r.slice(i, ++l2)));
    // add trailing if exists
    if(l1 !== sf.length){
        res.push(r.slice(l2));
    }

    return res;
}

/**
 * split string into jpn/non-jpn
 * @returns [string, boolean][][]
 */
export const split = (s: string) => s.split('\n').map(separate);

/**
 * convert worker's message to html
 */
export function html(lines: (string | IpadicFeatures[])[][]): string{
    console.debug('converter received', lines);
    return lines.map(
        l => l.map(
            res => typeof res === 'string' ? res : res.map(({ surface_form, reading }) => {
                    // if no reading or both are the same (eg pure katakana)
                    if(!reading || reading === surface_form) return surface_form;

                    let hira = hiragana(reading);
                    // if pure hiragana
                    if(hira === surface_form){
                        return surface_form;
                    }

                    return trim(surface_form, hira).join('');
                },
            ).join(''),
        ).join(''),
    ).join('');
}
