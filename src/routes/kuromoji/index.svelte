<script lang="ts">
    //@ts-ignore
    import { browser } from '$app/env';
    import Layout from '../../lib/Layout.svelte';
    import File from '../../lib/File.svelte';

    import { tohtml, split } from '../../lib/kuro';

    import Textfield from '@smui/textfield';
    import IconButton from '@smui/icon-button';
    import SegmentedButton, { Segment } from '@smui/segmented-button';

    let input = browser ? localStorage.getItem('kuro') : '';
    // on client-end
    $: if(browser){
        localStorage.setItem('kuro', input);
    }
    $:p = (async() => {
        if(browser && input){
            const li = [];
            for(const l of split(input)){
                for(const [ s, isJPN ] of l){
                    if(isJPN){
                        const r = await fetch('kuromoji/' + s);
                        const j = await r.json();
                        const h = tohtml(j);
                        li.push(h);
                    }else{
                        li.push(s);
                    }
                }
                li.push('<br>\n');
            }
            return li.join('');
        }
    })();
</script>

<Layout>
    <IconButton title="Redirect to Ruby" href="/ruby">
        <span class="material-icons">code</span>
    </IconButton>
</Layout>

<main>
    <section>
        <File label="upload text" bind:content={input}/>
        <Textfield textarea label="text/plain" variant="outlined" spellcheck="false" bind:value={input}/>
    </section>
    <section>
        {#await p}
            wait
        {:then html}
            {@html html || ''}
        {/await}
    </section>
</main>
