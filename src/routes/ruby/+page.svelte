<script lang="ts">
    import Textfield from '@smui/textfield';

    const label = 'text/plain';
    let [value, output] = ['', ''];
    let timeout: NodeJS.Timeout;

    async function request(){
        const res = await fetch('/ruby', {
            method: 'POST',
            body: value,
        });
        output = await res.text();
    }

    function keyup(){
        clearTimeout(timeout);
        timeout = setTimeout(request, 500);
    }
</script>

<section>
    <Textfield on:keyup={keyup} bind:value {label} textarea variant="outlined" spellcheck="false"/>
</section>
<section>{@html output}</section>

<style lang="sass">
section
    flex: 1

</style>
