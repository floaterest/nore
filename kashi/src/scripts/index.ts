/*
* Regex for Japanese
* Kanji: [\u3005\u4e00-\u9faf]
* Hiragana: [\u3040-\u309f]
* */

const SWITCH = [ '▲', '▼' ];
const TOGGLE = [ '0', '-' ];
const HAMBURGER = 'Ξ';

let $content = $('#content');
let $toc = $('#toc');
let directory = 'src/lyrics/';
let selected = '';
let kashi: Kashi;

$.getJSON('src/lyrics.json').done((data: string[]) => {
    for(const line of data){
        $toc.prepend(item(line, directory + line + '.html'));
    }
});

$('#switch').text(SWITCH[0]).on('click', function(){
    if(!kashi) return;

    kashi.switch();
    this.innerText = SWITCH[+kashi.isSwitched];
});

$('#toggle').text(TOGGLE[0]).on('click', function(){
    if(!kashi) return;

    kashi.toggle();
    this.innerText = TOGGLE[+kashi.isToggled];
});

$('#hamburger').text(HAMBURGER).on('click', () => document.body.classList.toggle(HTMLClass.HideContent));
