const SWITCH = [ '▲', '▼' ];
const TOGGLE = [ 'O', 'Ø' ];
const EDIT = [ 'X', 'I' ];
const HAMBURGER = 'Ξ';

const INDEX = 'src/lyrics.json';
const DIRECTORY = 'src/lyrics/';

const QUERIES = {
    'paste': paste,
};

let $content = $('#content');
let $toc = $('#toc');
let selected = '';
let kashi: Kashi;

$('#file').on('change', e => {
    if(!(e.target as HTMLInputElement).files) return;
    const filename = (e.target as HTMLInputElement).files![0];
    const reader = new FileReader();
    reader.onload = e => {
        kashi = new Kashi(update((e.target!.result as string)));
    };
    reader.readAsText(filename, 'utf8');
});

function paste(yes: string): boolean{
    if(!yes || yes == 'false' || yes == '0') return false;

    document.body.classList.toggle(HTMLClass.HideContent);
    $content.attr('contenteditable', 'true');
    $content.on('focusout', e => {
        kashi = new Kashi(update(e.target.innerText));
    });
    return true;
}

$.getJSON(INDEX).done((data: string[]) => {
    for(const line of data){
        $toc.prepend(item(line, DIRECTORY + line + '.html'));
    }
    // check of url has hash
    if(window.location.hash){
        // remove '#' then decode to utf8
        let hash = decodeURIComponent(window.location.hash.slice(1));
        if(data.includes(hash)){
            $toc.find(`p:contains("${hash}")`).trigger('click');
        }else{
            console.error(hash, 'not found');
        }
    }else{
        // check search params
        const params = new URLSearchParams(window.location.search);
        if(params){
            // only parse the first valid entry
            for(const [ key, func ] of Object.entries(QUERIES)){
                if(params.has(key) && func(params.get(key)!)) break;
            }
        }
    }
});

$('#switch').text(SWITCH[0]).on('click', function(){
    if(!kashi) return;

    kashi.switch();
    this.innerText = SWITCH[+kashi.isSwitched];
});

$('#edit').text(EDIT[0]).on('click', function(){
    let editable = !$content.attr('contenteditable');
    $content.attr('contenteditable', editable.toString());
    this.innerText = EDIT[+editable];
});

$('#toggle').text(TOGGLE[0]).on('click', function(){
    if(!kashi) return;

    kashi.toggle();
    this.innerText = TOGGLE[+kashi.isToggled];
});

$('#hamburger').text(HAMBURGER).on('click', () => document.body.classList.toggle(HTMLClass.HideContent));
