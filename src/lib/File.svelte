<script lang="ts">
    import IconButton from '@smui/icon-button';

    export let icon: string;
    export let content = '';
    let files: FileList | null;
    let input: HTMLInputElement;
    $: if(files && files[0]){
        const reader = new FileReader();
        reader.onload = function(){
            content = this.result as string;
            files = null;
        };
        reader.readAsText(files[0], 'utf8');
    }
</script>

<label for="file" >
    <IconButton class="material-icons" on:click={() => input.click()}>{icon}</IconButton>
</label>
<input id="file" bind:this={input} type="file" accept="text/plain" bind:files>

<style lang="sass">
    input
        display: none
</style>
