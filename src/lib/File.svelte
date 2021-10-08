<script lang="ts">
    export let label: string;
    export let files: string[];
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
