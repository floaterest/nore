const INDEX = 'src/lyrics.json';
const DIRECTORY = 'src/lyrics/';

const Queries = {
    'paste': (_: string) => {
        document.body.classList.remove(HTMLClass.HideContent);
        // enable edit
        $('#edit').trigger('click');
        $content.on('paste', e => {
            // stop data being actually pasted

            // edit, kashi, event
            // no edit, event
            e.stopPropagation();
            e.preventDefault();
            // disable edit
            $('#edit').trigger('click');
            // tsc please
            //@ts-ignore
            kashi = new Kashi(e.originalEvent.clipboardData.getData('text'));
        });
    },
    'wrap': (_: string) => {
        $content.css('white-space', 'normal');
    },
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

$.getJSON(INDEX).done((data: string[]) => {
    for(const line of data){
        $menu.prepend(item(line, DIRECTORY + line + '.html'));
    }
});

window.onload = () => {
    // check search params
    const params = new URLSearchParams(window.location.search);
    if(params){
        let value;
        for(const [ key, func ] of Object.entries(Queries)){
            // check of has key and value is not false
            if(params.has(key) && (value = params.get(key)) && JSON.parse(value)){
                func(value);
            }
        }
    }
};
