const HTMLClass = {
	Loading: 'loading',
};

let html = document.getElementById('html');
let raw = document.getElementById('raw');

let w = new Worker('./src/scripts/worker.js');
w.onmessage = function(e){
	switch(e.data.type){
		case 'done':
			return document.body.classList.remove(HTMLClass.Loading);
		case 'ruby':
			html.innerHTML = raw.innerText = e.data.data;
			break;
	}
};

document.getElementById('input').addEventListener('input', e => {
	if(!e.target.value) return;
	w.postMessage(e.target.value);
});
// w.postMessage('そう出逢う前から解ってた');
// w.onmessage = function(e){
// 	document.body.innerHTML = e.data;
// };
