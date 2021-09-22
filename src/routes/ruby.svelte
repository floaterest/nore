<script lang="ts">
    // @ts-ignore
    import { browser } from '$app/env';
    import Layout from '$lib/Layout.svelte';

    import Textfield from '@smui/textfield';
    import IconButton, { Icon } from '@smui/icon-button';

    let raw = browser ? localStorage.getItem('kuromoji') : '';
    let files;
    let visible = true;
    let normal = true;

    $: if(files && files[0]){
        const reader = new FileReader();
        reader.onload = function(){
            raw = this.result as string;
        };
        reader.readAsText(files[0], 'utf8');
    }
    $: if(browser){
        localStorage.setItem('kuromoji', raw);
    }
    $: html = normal ? raw : raw.split('<ruby>')
        .map(l => l.replace(/(\S+)(<rt.*>)(\S+)(?=<\/rt>)/, '$3$2$1'))
        .join('<ruby>');
</script>

<Layout>
    <IconButton toggle bind:pressed={visible}>
        <Icon class="material-icons" on>visibility</Icon>
        <Icon class="material-icons">visibility_off</Icon>
    </IconButton>
    <IconButton toggle bind:pressed={normal}>
        <div class="loop material-icons" class:normal>loop</div>
    </IconButton>
</Layout>

<main>
    <section>
        <input type="file" bind:files>
        <Textfield style="width: 100%; height:100%;" textarea
                   variant="outlined" bind:value={raw}
                   label="html"/>
    </section>
    <section>
        {@html raw}
    </section>
</main>

<style>
    main{
        display: flex;
    }

    section{
        flex: 1;
        padding: 0 1em;

    }

    input{
        display: block;
        margin: 1rem 0;
    }
</style>
