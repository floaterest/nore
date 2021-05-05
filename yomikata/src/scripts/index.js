const HTMLClass = {
	Loading: 'loading',
};

var w = new Worker('./src/scripts/worker.js');
w.onmessage = function(e){
	switch(e.data.type){
		case 'done':
			return document.body.classList.remove(HTMLClass.Loading);
		case 'ruby':
			return document.getElementById('html').innerHTML = e.data.data;
	}
};
// w.postMessage('そう出逢う前から解ってた');
// w.onmessage = function(e){
// 	document.body.innerHTML = e.data;
// };
