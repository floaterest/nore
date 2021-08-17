<script lang="ts">
    import { data, output } from './stores';
    import { split, html } from './converter';

    const w = new Worker('./worker.js');
    let loaded = false;

    function send(w: Worker, s: string){
        w.postMessage(split(s));
    }

    console.time('loading');
    w.onmessage = e => {
        if(typeof e.data === 'boolean'){
            // when loaded, parse the initial input
            send(w, $data);
            console.timeEnd('loading');
            return loaded = true;
        }
        output.set(html(e.data));
    };
</script>

<main>
    <details open>
        <summary>Input</summary>
        <textarea on:change={()=>send(w,$data)} bind:value={$data}></textarea>
    </details>

    <details open>
        <summary>HTML</summary>
        <div spellcheck="false" contenteditable="true">{@html $output}</div>
    </details>

    <details open>
        <summary>Raw</summary>
        <div spellcheck="false" contenteditable="true">{$output}</div>
    </details>
</main>

<style>
    textarea{
        width: 100%;
    }

    summary{
        cursor: pointer;
        user-select: none;
    }
</style>
