<script lang="ts">
    import Textfield from '@smui/textfield';
    import Layout from '$lib/Layout.svelte';
    import IconButton from '@smui/icon-button';
    import File from '$lib/File.svelte';

    import { browser } from '$app/environment';

    import type { PageData } from './$types';

    export let data: PageData;
    const { fetch } = data;

    let [value, output] = ['', ''];
    if(browser){
        // @ts-ignore: they do have default values!
        ({value, output} = {value, output, ...JSON.parse(localStorage.getItem('nore') || '{}')});
    }

    let timeout: NodeJS.Timeout;

    $: browser && localStorage.setItem('nore', JSON.stringify({value, output}));

    $:{
        clearTimeout(timeout);
        timeout = setTimeout(async () => output = (
            await Promise.all(value.split('\n').map(async body => await (
                await fetch('/ruby', { method: 'POST', body })).text(),
            ))
        ).join('\n'), 500);
    }
</script>

<svelte:head>
    <title>Ruby</title>
</svelte:head>

<Layout title="Ruby">
    <svelte:fragment slot="top">
        <IconButton title="view as raw html" type="submit" form="raw" class="material-icons">
            launch
        </IconButton>
        <File title="upload text file" icon="upload_file" bind:content={value}/>
    </svelte:fragment>

    <form id="raw" method="post" action="/raw" target="_blank" enctype="text/plain">
        <textarea name="body" value={output} />
    </form>

    <section>
        <Textfield bind:value label="text/plain"
            style="width: 100%; height: 100px"
            textarea variant="outlined" spellcheck="false" />
    </section>
    <section class="html mdc-elevation--z24">{@html output}</section>
</Layout>

<style lang="sass">
    section
        flex: 1
        margin: 0.5em
    .html
        white-space: pre
        padding: 1em
    form
        display: none
</style>
