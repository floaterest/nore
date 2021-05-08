const HTMLClass = {
	Loading: 'loading',
};

const BREAK = '<br>\n';
const html = document.getElementById('html');
const raw = document.getElementById('raw');

const w = new Worker('./src/scripts/worker.js');
w.onmessage = function(e){
	switch(e.data.type){
		case 'done':
			return document.body.classList.remove(HTMLClass.Loading);
		case 'ruby':
			html.innerHTML = raw.innerText = e.data.data.join(BREAK) + BREAK;
			break;
	}
};

String.prototype.isLatinAt = function(i = 0){
	return this.charCodeAt(i) < 0xff;
};

/**
 * separate line to latin or other
 * @param line
 * @returns {{content:string,latin:boolean}[]}
 */
function separate(line){
	let array = [];
	let length = line.length;
	let latin = line.isLatinAt();
	let start = 0;
	for(let end = 0; end < length; end++){
		if(line.isLatinAt(end) !== latin){
			array.push({content: line.slice(start, end), latin: latin});
			latin = !latin;
			start = end;
		}
	}
	array.push({content: line.slice(start), latin: latin});
	return array;
}

document.getElementById('input').addEventListener('input', e => {
	let s;
	// remove nbsp to sp
	if(!(s = e.target.innerText.replace(/\u00a0/g, ' '))){
		html.innerHTML = raw.innerText = '';
		return;
	}
	console.debug('received', s);
	w.postMessage(s.split('\n').map(l => separate(l)));
});
