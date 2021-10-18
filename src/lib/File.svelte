<script lang="ts">
    export let label: string;
    export let content: string = '';

    let files: Blob[];
    $: if(files && files[0]){
        const reader = new FileReader();
        reader.onload = function(){
            content = this.result as string;
            files = [];
        };
        reader.readAsText(files[0], 'utf8');
    }
</script>

<label for="file" class="mdc-button mdc-button--outlined">
    <span class="mdc-button__ripple"></span>
    <span class="mdc-button__label">{label}</span>
</label>
<input id="file" type="file" accept="text/html" bind:files>

<style>
    input{
        display: none;
    }

    label{
        margin-bottom: 1em;
    }
</style>
