/*
* Regex for Japanese
* Kanji: [\u3005\u4e00-\u9faf]
* Hiragana: [\u3040-\u309f]
* */

enum HTMLClass{
	Hidden = 'hidden',
	Underline = 'underline',
}

//#region constants

const switches: {[id: string]: string} = {
	'⇅': '⇵',
	'⇵': '⇅',
};
const toggles: {[id: string]: string} = {
	'０': 'ー',
	'ー': '０',
};
//#endregion constants

//#region variables

let directory = 'lyrics/';
let $toc = $('#toc');
let $lrc = $('#lrc');
let $toggle = $('#toggle');
let $switch = $('#switch');
let selected: HTMLAnchorElement;

//#endregion variables

//#region functions

/*
 * get the first key of a dictionary/object
 */
function init(o: object){
	return Object.keys(o)[0];
}

/*
 * create an <a> element for the table of contents
 */
function toc(title: string, file: string){
	let a = $('<a>');
	a.text(title);
	a.attr('href', '#' + title);
	a.on('click', async function(this: HTMLAnchorElement){
		if(this == selected) return;

		// get lyrics from storage if available
		let lyrics = sessionStorage.getItem(file)!;
		if(!lyrics){
			await $.get(directory + file, f => sessionStorage.setItem(file, f));
			lyrics = sessionStorage.getItem(file)!;
		}
		// update ui
		lrc(lyrics, $lrc);

		selected = this;
	});
	return a;
}

/* add lyrics */
function lrc(lyrics: string, element: JQuery){
	// reset buttons' symbols to default
	$toggle.text(init(toggles));
	$switch.text(init(switches));

	element.html(lyrics).find('ruby').on('click', function(){
		Array.from(this.getElementsByTagName('rt')).forEach(e => {
			e.classList.toggle(HTMLClass.Hidden);
		});
	});
}

//#endregion functions

$.getJSON(directory.replace('/', '.json')).done(data =>
	Object.entries(data).forEach(a => $toc.prepend(toc(a[0], a[1] as string))),
);

$toggle.text(init(toggles)).on('click', function(){
	// switch the symbol
	this.innerText = toggles[this.innerText];
	// toggle rt's visibility
	$('rt').toggleClass(HTMLClass.Hidden);
});

$switch.text(init(switches)).on('click', function(){
	// switch the symbol
	this.innerText = switches[this.innerText];

	$('ruby').each(function(){
		// switch the texts
		// 'rb' and 'rt' stand for 'ruby base' and 'ruby top' ?
		// bottom<rt>top</rt>
		this.innerHTML = this.innerHTML.replace(/(\S+)<rt.*>(\S+)<\/rt>/, '$2<rt>$1</rt>');

		// rb will be underlined when rb is furigana
		this.classList.toggle(HTMLClass.Underline);
	});
});

$('#to-top').on('click', () => window.scrollTo(0, 0));
