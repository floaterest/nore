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

    // update ui when input changes
</script>

<main>
    <input type="text" on:change={()=>send(w,$data)} bind:value={$data}>
    <div spellcheck="false" contenteditable="true">{@html $output}</div>
    <div spellcheck="false" contenteditable="true">{$output}</div>
</main>

<style lang="less">

</style>
