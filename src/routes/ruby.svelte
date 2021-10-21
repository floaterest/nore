<script lang="ts">
    // @ts-ignore
    import { browser } from '$app/env';
    import Layout from '$lib/Layout.svelte';
    import File from '$lib/File.svelte';
    import LeftRight from '$lib/LeftRight.svelte';

    import Textfield from '@smui/textfield';
    import IconButton, { Icon } from '@smui/icon-button';

    const segments = [ 'raw', 'html' ];
    // raw (and fresh) html string from storage
    let raw = browser ? localStorage.getItem('raw') : '';
    let visible = true;
    let normal = true;

    // on client-end
    $: if(browser){
        localStorage.setItem('raw', raw);
    }
    // when user click on flip button
    $: html = normal ? raw : raw.split('<ruby>')
        .map(l => l.replace(/(\S+)(<rt.*>)(\S+)(?=<\/rt>)/, '$3$2$1'))
        .join('<ruby>');
</script>

<Layout>
    <IconButton title="Toggle rt" toggle bind:pressed={visible}>
        <Icon class="material-icons" on>visibility</Icon>
        <Icon class="material-icons">visibility_off</Icon>
    </IconButton>
    <IconButton title="Switch rt rb" toggle bind:pressed={normal}>
        <div class="loop material-icons" class:normal>loop</div>
    </IconButton>
</Layout>

<main>
    <LeftRight {segments}>
        <section slot="left">
            <File label="upload html" bind:content={raw}/>
            <Textfield textarea label="html" variant="outlined" spellcheck="false" bind:value={raw}/>
        </section>

        <section slot="right" id="html">
            {@html html}
            <!-- hide rt -->
            {#if !visible}
                <style>
                    rt{ display: none }
                </style>
            {/if}
            <!-- underline ruby -->
            {#if !normal}
                <style>
                    ruby{ box-shadow: inset 0 -1px; }
                </style>
            {/if}
        </section>
    </LeftRight>
</main>

<style lang="scss">
    .loop{
        // rotation transition
        $rotate: all 0.5s ease-in-out;
        transition: $rotate;

        &.normal{
            transition: $rotate;
            transform: rotate(180deg);
        }
    }
</style>
