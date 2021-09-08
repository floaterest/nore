<script lang="ts">
    import Button, { Label, Icon } from '@smui/button';

    let clicked: number = 0;
</script>

<Button on:click={() => clicked++} variant="outlined">
    <Icon class="material-icons">thumb_up</Icon>
    <Label>Click Me</Label>
</Button>

<p class="mdc-typography--body1">
    {#if clicked}
        You've clicked the button {clicked} time{clicked === 1 ? "" : "s"}.
    {:else}
        <span class="grayed">You haven't clicked the button.</span>
    {/if}

    <a href="/">anchor</a>
    <Button disabled>
        Disabled
    </Button>
</p>

<style>
    .grayed{
        opacity: 0.6;
    }
</style>
