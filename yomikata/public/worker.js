importScripts('kuromoji.js');


let token;
kuromoji.builder({dicPath: './dict'}).build((err, t) => {
	token = t;
	postMessage(true);
});

/**
 * @param lines [string, boolean][][]
 */
function tokenize(lines){
	console.debug('worker received', lines);
	return lines.map(l => l.map(b => b[1] ? token.tokenize(b[0]) : b[0]));
}

onmessage = e => postMessage(tokenize(e.data));
