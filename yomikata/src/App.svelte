<script lang="ts">
    import { data, output } from './stores';
    import { split, tohtml } from './converter';

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
        output.set(tohtml(e.data));
    };

    // update ui when input changes
</script>

<main>
    <input type="text" on:change={()=>send(w,$data)} bind:value={$data}>
    <div contenteditable="true">{@html $output}</div>
    <div contenteditable="true">{$output}</div>
</main>

<style lang="less">

</style>
