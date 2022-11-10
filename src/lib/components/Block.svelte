<script context="module" lang="ts">
</script>

<script lang="ts">
    import { onMount, onDestroy, afterUpdate, createEventDispatcher, tick, getContext } from 'svelte';

    import { contextKey } from '../timeline';
	  import BlockHandle from './BlockHandle.svelte';
	import Layer from './Layer.svelte';

    const { time, duration, width, selectedHandle } = getContext(contextKey);

    const dispatch = createEventDispatcher();

    // Add sub layer 

    // add sub block 
    export let datum : TimelineBlock
    

    $: title = datum.title || 'New Block';
    $: inTime = datum.inTime || 0;
    $: outTime = datum.outTime || 1000;
    $: layerId = datum.layer;
    $: id = datum.id;


    let active = false;

    let blockLeft : number, blockWidth: number;

    onMount(() => {
      blockLeft = inTime / $duration * $width;
      blockWidth = (outTime-inTime) / $duration * $width;
    })

    $: {
      blockLeft = inTime / $duration * $width;
      blockWidth = (outTime-inTime) / $duration * $width;
    } 
    
    // position according to parent duration and times 
    // handle validation of times

    let blockEl: HTMLElement | null;

    //export const getDuration = () => { return outTime - inTime};

    const selectHandle = (e : CustomEvent) => {
        
        selectedHandle.set({
            layer: layerId,
            block: id,
            side: e.detail.side
        })

    }

</script>


<div class="absolute flex bg-red-400 rounded" style="left: {blockLeft}px; width: {blockWidth}px; "
  bind:this={blockEl}
>

<div class="flex-none">
<BlockHandle side={'in'} on:selecthandle={selectHandle}/>
</div>

<div class="flex-1 overflow-hidden">
<em>in: {Math.round(inTime)}</em>
{title}
<em>out: {Math.round(outTime)}</em>
</div>

<div class="flex-none">
<BlockHandle side={'out'} on:selecthandle={selectHandle}/>
</div>

</div>