<script lang="ts">
    // @ts-ignore
    import { browser } from '$app/env';
    import Layout from '$lib/Layout.svelte';

    import Textfield from '@smui/textfield';
    import IconButton, { Icon } from '@smui/icon-button';

    let raw = browser ? localStorage.getItem('raw') : '';
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
        localStorage.setItem('raw', raw);
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
        <label for="file" class="mdc-button mdc-button--outlined">
            <span class="mdc-button__ripple"></span>
            <span class="mdc-button__label">upload html</span>
        </label>
        <input id="file" type="file" accept="text/html" bind:files>

        <Textfield textarea label="html" style="width: 100%; height:100%;"
                   variant="outlined" spellcheck="false" bind:value={raw}/>
    </section>
    <section id="html">
        {@html html}
        <!-- hide rt -->
        {#if !visible}
            <style>
                rt{
                    display: none
                }
            </style>
        {/if}
        <!-- underline ruby -->
        {#if !normal}
            <style>
                ruby{
                    box-shadow: inset 0 -1px;
                }
            </style>
        {/if}
    </section>
</main>

<style lang="scss">
    .loop{
        $rotate: all 0.5s ease-in-out;
        transition: $rotate;

        &.normal{
            transition: $rotate;
            transform: rotate(180deg);
        }
    }

    main{
        display: flex;

        section{
            flex: 1;
            padding: 1em;

            input#file{
                display: none;
            }

            label[for='file']{
                margin-bottom: 1em;
            }
        }
    }

    #html{
        line-height: 2;
        white-space: nowrap;
    }

    :global(rt){
        filter: brightness(0.75);
        text-align: center;
        user-select: none;
    }

    :global(textarea){
        white-space: pre;
        overflow-x: scroll !important;
    }
</style>
