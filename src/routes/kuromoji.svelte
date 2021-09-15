<script lang="ts">
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
</script>

<Layout title="Kuromoji">
    <IconButton toggle bind:pressed={visible}>
        <Icon class="material-icons" on>visibility</Icon>
        <Icon class="material-icons">visibility_off</Icon>
    </IconButton>
    <IconButton toggle bind:pressed={normal}>
        <div class="rotate material-icons" class:normal>loop</div>
    </IconButton>
</Layout>

<section class="mdc-typography--body1">
    <Textfield variant="outlined" bind:value={raw} label="html"/>
    <input type="file" bind:files>
    <p>
        {@html html}
        {#if !visible}
            <style>
                rt{
                    display: none;
                }
            </style>
        {/if}
        {#if !normal}
            <style>
                ruby{
                    box-shadow: inset 0 -1px;
                }
            </style>
        {/if}
    </p>
</section>

<style lang="scss">
    .rotate{
        $rotate: all 0.5s ease-in-out;
        transition: $rotate;

        &.normal{
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
