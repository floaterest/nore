<script lang="ts">
    import Textfield from '@smui/textfield';
    import Layout from '$lib/Layout.svelte';
    import File from '$lib/File.svelte';

    import type { PageData } from './$types';

    export let data: PageData;
    const { fetch } = data;

    let [value, output] = ['', ''];
    let timeout: NodeJS.Timeout;

    $: {
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
    <File slot="top" icon="upload_file" bind:content={value}/>

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
</style>
