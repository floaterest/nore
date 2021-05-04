let hira = 'あいうえおかきくけこがぎぐげごさしすせそざじずぜぞたちつてとだぢづでどなにぬねのはひふへほばびぶべぼぱぴぷぺぽまみむめもやゆよらりるれろわをんゃゅょっ';
let kata = 'アイウエオカキクケコガギグゲゴサシスセソザジズゼゾタチツテトダヂヅデドナニヌネノハヒフヘホバビブベボパピプペポマミムメモヤユヨラリルレロワヲンャュョッ';

let sentence = 'そう出逢う前から解ってた';

let tests = [
	['そう', 'ソウ'],
	['出逢う', 'デアウ'],
	['お茶', 'オチャ'],
	['太もも', 'フトモモ'],
];

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

/**
 * merge repeating kana
 */
function toruby(s1, s2){
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
	// {common leading kana} <ruby> {kanji} <rt> {furigana} </rt></ruby> {common trailing kana}
	return `${s1.slice(0, i)}<ruby>${s1.slice(i, l1 + 1)}<rt>${s2.slice(i, l2 + 1)}</rt></ruby>${s1.slice(l1 + 1)}`;
}

kuromoji.builder({dicPath: 'src/dict/'}).build((err, t) => {
	document.body.innerHTML = '';
	let words = t.tokenize('そう出逢う前から解ってた');
	let s = '';
	for(let word of words){
		let h = ktoh(word.reading);
		if(h === word.surface_form){
			s += h;
		}else{
			s += toruby(word.surface_form, h);
		}
	}
	document.body.innerHTML = s;
});
