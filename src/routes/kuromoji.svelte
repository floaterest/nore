<script lang="ts">
    //@ts-ignore
    import { browser } from '$app/env';
    import Layout from '$lib/Layout.svelte';
    import File from '$lib/File.svelte';
    import LeftRight from '$lib/LeftRight.svelte';

    import { tohtml, split } from '$lib/kuro';

    import Textfield from '@smui/textfield';
    import IconButton from '@smui/icon-button';

    let input = browser ? localStorage.getItem('kuromoji') : '';

    let prev = input;
    let wait = false;

    async function post(inp: string): Promise<string>{
        return (await Promise.all(
            // for each line
            split(inp).map(async line => (
                // for each jpn/non-jpn chunk
                await Promise.all(line.map(async([ s, isJPN ]) => {
                    if(isJPN){
                        // ruby
                        const res = await fetch('kuromoji/' + s);
                        return tohtml(await res.json());
                    }else{
                        // raw text
                        return s;
                    }
                }))
            ).join('')),
        )).join('<br>\n');
    }

    let html;
    post(input).then(res => html = res);

    function onkeyup(){
        if(wait) return;
        wait = true;

        prev = input;
        const interval = setInterval(() => {
            // wait until the input 500ms ago is the same as right now
            if(prev === input){
                post(input).then(res => html = res);
                localStorage.setItem('kuromoji', input);
                wait = false;
                clearInterval(interval);
            }
            prev = input;
        }, 500);
    }
</script>

<Layout>
    <IconButton on:click={()=>localStorage.setItem('ruby', html)} title="Redirect to Ruby" href="/ruby">
        <span class="material-icons">code</span>
    </IconButton>
</Layout>

<main>
    <LeftRight segments={['input', 'output']}>
        <section slot="left">
            <File label="upload text" bind:content={input}/>
            <Textfield on:keyup={onkeyup} label="text/plain" variant="outlined"
                       textarea spellcheck="false" bind:value={input}/>
        </section>
        <section id="html" slot="right">
            {@html html || ''}
        </section>
    </LeftRight>
</main>

