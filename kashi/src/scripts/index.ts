const INDEX = 'src/lyrics.json';
const DIRECTORY = 'src/lyrics/';

const QUERIES = {
    'paste': paste,
};

let $content = $('#content');
let $menu = $('#menu');
let selected = '';
let kashi: Kashi;

$('#file').on('change', function(this: HTMLInputElement){
    if(!this.files) return;
    const filename = this.files![0];
    const reader = new FileReader();
    reader.onload = function(){
        kashi = new Kashi(this.result as string);
    };
    reader.readAsText(filename, 'utf8');
});

function paste(yes: string): boolean{
    if(!yes || yes == 'false' || yes == '0') return false;

    document.body.classList.remove(HTMLClass.HideContent);
    // enable edit
    $('#edit').trigger('click');
    $content.on('paste', e => {
        // stop data actually being pasted
        e.stopPropagation();
        e.preventDefault();
        // tsc please
        //@ts-ignore
        kashi = new Kashi(e.originalEvent.clipboardData.getData('text'));
        // disable edit
        $('#edit').trigger('click');
    });
    return true;
}

$.getJSON(INDEX).done((data: string[]) => {
    for(const line of data){
        $menu.prepend(item(line, DIRECTORY + line + '.html'));
    }
    // check of url has hash
    if(window.location.hash){
        // remove '#' then decode to utf8
        let hash = decodeURIComponent(window.location.hash.slice(1));
        if(data.includes(hash)){
            $menu.find(`p:contains("${hash}")`).trigger('click');
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

