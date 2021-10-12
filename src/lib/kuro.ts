import type { IpadicFeatures } from 'kuromoji';
import { importAny } from 'svelte-preprocess/dist/modules/utils';

// kana + kanji + 長音符
const jpn = /[\u3040-\u30ff\u4e00-\u9fff\u3005]+/g;
// kana except ヶ(\u30f5) and ヵ(\u30f6)
const kana = /[\u3040-\u30f4\u30f7-\u30ff]+/g;

//#region separate jpn and non-jpn

/**
 * separate japanese and non-japanese
 * @returns [string, boolean][]
 */
function separate(line: string){
    let res = [];
    let i1 = 0, i2, l;
    if(jpn.test(line)){
        for(l of line.match(jpn)){
            i2 = line.indexOf(l, i1);
            res.push([ line.substr(i1, i2 - i1), false ]); // non-jpn
            res.push([ line.substr(i2, l.length), true ]); // jpn
            i2 += l.length;
            i1 = i2;
        }
    }else{
        return [[ line, false ]];
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
function ruby(rb: string, rt: string){
    return `<ruby>${rb}<rt>${rt}</rt></ruby>`;
}

/**
 * remove trailing and middle kana
 * @param s surface_form
 * @param r reading in hiragana
 */
function trim(s: string, r: string){
    let l1 = s.length, l2 = r.length;
    let min = l1 < l2 ? l1 : l2;

    // test leading
    let i = 0;
    do{
        if(s[i] !== r[i]) break;
    }while(++i < min);

    // test trailing
    while(l1 && l2){
        if(s[--l1] !== r[--l2]) break;
    }
    // empty list if no leading
    let res = i ? [ s.slice(0, i) ] : [];

    // add ruby (and delete later if contains kana in the middle)
    res.push(ruby(s.slice(i, ++l1), r.slice(i, ++l2)));

    // add trailing if exists
    if(l1 !== s.length){
        res.push(r.slice(l2));
    }

    // now `s` starts and ends with kanji
    // but might contains kana in the middle
    s = s.slice(i, l1);
    r = r.slice(i, l2);


    // if kana exists in the middle
    if((l1 = s.search(kana)) + 1){
        // find the kana
        let k = s.match(kana)[0];
        l2 = r.indexOf(k);
        // remove ruby, add 2 new ones with kana in the middle
        res.splice(i, 1,
            ruby(s.slice(0, l1++), r.slice(0, l2++)),
            k,
            ruby(s.slice(l1), r.slice(l2)),
        );
    }

    return res;
}

/**
 * split string into jpn/non-jpn
 * @returns [string, boolean][][]
 */
function split(s: string){
    return s.split('\n').map(separate);
}

//#endregion separate jpn and non-jpn

//#region convert kuromoji output to ruby

/**
 * convert katakana to hiragana
 * @param s all characters should be katakana
 */
function hiragana(s: string){
    return [ ...s ].map(ch => String.fromCharCode(ch.charCodeAt(0) - 96)).join('');
}

/**
 * convert ipadic features to html
 */
function tohtml(ipadics: IpadicFeatures[]): string{
    return ipadics.map(ipadic => {
        const { surface_form, reading } = ipadic;
        // if no reading or both are the same (eg pure katakana)
        if(!reading || reading === surface_form) return surface_form;

        let hira = hiragana(reading);
        // if pure hiragana
        if(hira === surface_form){
            return surface_form;
        }

        return trim(surface_form, hira).join('');
    }).join('');
}

//#endregion convert kuromoji output to ruby

export { split, tohtml };
