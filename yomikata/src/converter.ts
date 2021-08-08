// kana + kanji + 長音符
import type { IpadicFeatures } from 'kuromoji';

const jpn = /[\u3040-\u30ff\u4e00-\u9fff\u3005]+/g;

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
        res.push(line.substr(i2), false);
    }
    // if 1st is empty
    if(!res[0][0]){
        res.shift();
    }
    return res;
}

/**
 * split string into jpn/non-jpn
 * @returns [string, boolean][][]
 */
export function split(s: string){
    return s.split('\n').map(separate);
}

export function html(lines: (string | IpadicFeatures[])[][]){
    let s = '';
    for(const line of lines){
        for(const result of line){
            // if is not jpn
            if(typeof result[0] === 'string'){
                s += result;
            }else{
                for(const { surface_form, reading } of result as IpadicFeatures[]){
                    s += `<ruby>${surface_form}<rt>${hiragana(reading)}</rt></ruby>`;
                }
            }
        }
    }
    return s;
}
