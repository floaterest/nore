const SWITCH = [ '⇅', '⇵' ];
const TOGGLE = [ '０', 'ー' ];

let c = $('#content');
let t = $('#toc');
let d = 'src/lyrics/';
let selected = '';

function update(content: string){
    c.html(content).find('ruby').on('click', function(){
        if(isSelecting()) return;
        $(this).each(function(){
            this.classList.toggle(HTMLClass.Hidden);
        });
    });
}

/**
 * generate a new item for the table of contents
 * @param text innerText for this element
 * @param path file to download when clicked
 */
function item(text: string, path: string): JQuery{
    return $('<p>').on('click', async function(){
        // if clicked on selected, refresh the content
        let refresh = this.innerText == selected;
        let content = sessionStorage.getItem(path);
        if(refresh || content == null){
            // download file, set session storage, assign to content
            await $.get(path, f => sessionStorage.setItem(path, content = f));
        }
        update(content!);

        selected = this.innerText;
        document.body.classList.remove(HTMLClass.HideContent);
        window.scrollTo(0, 0);
    }).text(text);
}

$.getJSON('src/lyrics.json').done((data: string[]) => {
    for(const line of data){
        t.prepend(item(line, d + line + '.html'));
    }
});
