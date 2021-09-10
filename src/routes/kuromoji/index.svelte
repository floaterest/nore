<script lang="ts">
    import Textfield from '@smui/textfield';

    let raw = localStorage.getItem('kuromoji-raw') || '';

    $:localStorage.setItem('kuromoji-raw', raw);
</script>

<Textfield variant="outlined" bind:value={raw} label="raw"/>

<section class="mdc-typography--body1">
    {@html raw}
</section>
