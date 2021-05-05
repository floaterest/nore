importScripts('kuromoji.js');

let hira = 'あいうえおかきくけこがぎぐげごさしすせそざじずぜぞたちつてとだぢづでどなにぬねのはひふへほばびぶべぼぱぴぷぺぽまみむめもやゆよらりるれろわをんゃゅょっ';
let kata = 'アイウエオカキクケコガギグゲゴサシスセソザジズゼゾタチツテトダヂヅデドナニヌネノハヒフヘホバビブベボパピプペポマミムメモヤユヨラリルレロワヲンャュョッ';


/**
 * convert katakana to hiragana
 */
function ktoh(s){
	s = s.split('');
	let i = s.length;
	while(i--){
		s[i] = hira[kata.indexOf(s[i])];
	}
	return s.join('');
}

function trim(s1, s2){
	let [l1, l2] = [s1.length, s2.length];
	let min = Math.min(l1, l2);
	// left to right
	let i = 0;
	while(i < min){
		if(s1[i] !== s2[i]) break;
		i++;
	}

	// right to left
	while(l1-- && l2--){
		if(s1[l1] !== s2[l2]) break;
	}
	// common leading, distinct s1, distinct s2, common trailing
	return [s1.slice(0, i), s1.slice(i, l1 + 1), s2.slice(i, l2 + 1), s1.slice(l1 + 1)];
}

/**
 * merge repeating kana
 */
function toruby(original, reading){
	let [start, kanji, furigana, end] = trim(original, reading);
	return `${start}<ruby>${kanji}<rt>${furigana}</rt></ruby>${end}`;
}


let token;

kuromoji.builder({dicPath: '../dict'}).build((err, t) => {
	token = t;
	postMessage({type: 'done'});
});

onmessage = function(e){
	let words = token.tokenize(e.data);
	let s = '';
	for(let word of words){
		let h = ktoh(word.reading);
		if(h === word.surface_form){
			s += h;
		}else{
			s += toruby(word.surface_form, h);
		}
	}
	postMessage({type: 'ruby', data: s});
};
