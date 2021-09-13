<script lang="ts">
    import { fade } from 'svelte/transition';
    // @ts-ignore
    import { browser } from '$app/env';
    import Layout from '$lib/Layout.svelte';

    import Textfield from '@smui/textfield';
    import IconButton, { Icon } from '@smui/icon-button';


    let raw = browser ? localStorage.getItem('kuromoji') : '';

    $: if(browser){
        localStorage.setItem('kuromoji', raw);
    }

    $: html = normal ? raw : raw.split('<ruby>')
        .map(l => l.replace(/(\S+)(<rt.*>)(\S+)(?=<\/rt>)/, '$3$2$1'))
        .join('<ruby>');

    let visible = true;
    let normal = true;
</script>

<Layout title="Kuromoji">
    <IconButton toggle bind:pressed={visible}>
        <Icon class="material-icons" on>visibility</Icon>
        <Icon class="material-icons">visibility_off</Icon>
    </IconButton>
    <IconButton toggle bind:pressed={normal}>
        <div class="rotate material-icons" class:normal in:fade>loop</div>
    </IconButton>
</Layout>

<section class="mdc-typography--body1">
    <Textfield variant="outlined" bind:value={raw} label="raw"/>
    <p>
        {@html html}
        {#if !visible}
            <style>
                rt{
                    display: none;
                }
            </style>
        {/if}
    </p>
</section>

<style lang="scss">
    $rotate: all 0.5s ease-in-out;
    .rotate{
        transition: $rotate;

        &.flipped{
            transition: $rotate;
            transform: rotate(180deg);
        }
    }

    section{
        margin-top: 1rem;

        p{
            line-height: 2;
            white-space: nowrap;
        }
    }

    :global(rt){
        filter: brightness(0.75);
        white-space: nowrap;
        text-align: center;
        user-select: none;
    }
</style>
