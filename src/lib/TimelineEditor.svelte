<script context="module" lang="ts">

    export type Block = {
        in: number;
        out: number;
    }

    export type Layer = {
        in?: number;
        out?: number;

        title: string;
        blocks: Array<Layer | Block>;
    }

</script>

<script lang="ts">



    export let layers: Layer[] = [];
    export let playheadTime: number = 0;
  
</script>
  
  {#each layers as layer, index }
    <div>
        {#each layer.blocks as block, index}
            <div>
                {#if block.in}
                    <div>
                        {block.in}
                    </div>
                {/if}
            </div>
        {/each}
    </div>
  {/each}