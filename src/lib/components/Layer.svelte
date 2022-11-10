<script context="module" lang="ts">
    
</script>

<script lang="ts">
    import Block from "$lib/components/Block.svelte";

    import { flip } from "svelte/animate";
    import type { FlipParams } from "svelte/animate";

    import { contextKey } from '../timeline';
    import { onMount, onDestroy, afterUpdate, createEventDispatcher, tick, getContext } from 'svelte';

    import { writable } from "svelte/store";

    import type { TimelineContext } from "../shared";
    //export let animate: FlipParams = {};

    const { time, duration, width, editorOptions, selectedHandle }: TimelineContext = getContext(contextKey);

    let layerEl : HTMLElement | null;

    export let data;
    $: title = data.title ?? "Layer" // get a component index;

    $: blockCount = data.blocks?.length ?? 0;
    $: blocks = data.blocks.map((block, index) => {

        block.layer = title;
        block.id = index;

        if(block.validations?.inTime?.fixed) {
            block.inTime = block.validations.inTime.fixed;
        }
        if(block.inTime == undefined) {
            block.inTime = ($duration / blockCount) * index;
        }
        if(block.outTime == undefined) {
            if(index == blockCount - 1) {
                block.outTime = $duration;
            } else {
                block.outTime = block.inTime + ($duration / blockCount); // Don't overlap next block
            }
        }
        return block;
    })

    const handlePointerMove = (event) => {
        //console.log("handlePointerMove layer");

    if($selectedHandle?.layer == title) {
        //console.log($selectedHandle);
        const activeBlock = blocks[$selectedHandle.block];
        //console.log("handlePointerMove layer", activeBlock);

        if($selectedHandle.side == 'in') {
            console.log("in");
            setInHandle(activeBlock, $time);
        } else if($selectedHandle.side == 'out') {
            console.log("out");
            setOutHandle(activeBlock, $time);
        }

        blocks[$selectedHandle.block] = activeBlock;
        // todo: set block method
        //options.layers[activeHandle.layer].blocks[activeHandle.block] = activeBlock;
    }   
  }

  const setOutHandle = (block, t, options) => {
    if(t > duration) t = duration;

    const diff = block.outTime - t;
    const forward = (t > block.outTime) ? true : false;

    // if not moving forward, constrain against min duration
    if(!forward) {
        const minDuration = block.validations?.duration?.min ?? 1000; // TODO: set daults on initialization

        if(options?.maintainDuration) {
            setInHandle(block, block.inTime - diff);
        }

        if(t - block.inTime < minDuration) {
            setInHandle(block, t - minDuration);
            block.outTime = block.inTime + minDuration;
            return;
        } 
    } else {
        // if not last
        if(block.id < blocks.length - 1) {
            const nextBlock = blocks[block.id + 1];
            if(t > nextBlock.inTime) {
                setInHandle(nextBlock, t, {maintainDuration: true});
                block.outTime = nextBlock.inTime;
                return;
            }
        }
    }

    // set the out time if we had not hit any validation barriers
    return block.outTime = t;
  }

  const setInHandle = (block, t, options) => {
    if(t < 0) t = 0;

    if(block.validations?.inTime?.fixed) {
        block.inTime = block.validations.inTime.fixed;
        return
    }

    const diff = t - block.inTime;
    const forward = (t > block.inTime) ? true : false;

    // if moving forward, constrain against min duration
    if(forward) {
        const minDuration = block.validations?.duration?.min ?? 1000; // TODO: set daults on initialization
        
        if(options?.maintainDuration) {
            setOutHandle(block, block.outTime + diff);
        }

        if(block.outTime - t < minDuration) {
            setOutHandle(block, t + minDuration);
            block.inTime = block.outTime - minDuration;
            return;
        }
    } else {
        // if moving back and not first validate against previous block end 
        if(block.id > 0) {
            const prevBlock = blocks[block.id - 1];
            if(t < prevBlock.outTime) {
                setOutHandle(prevBlock, t, { maintainDuration: true });
                block.inTime = prevBlock.outTime; 
                return;
            } 
        }
    }

    // set the in time if we have not hit any validation barriers
    return block.inTime = t;
  }

</script>

<svelte:window on:pointermove={handlePointerMove}/>

<div
class="block h-12 bg-slate-200"
  bind:this={layerEl}
>       
    <h1>{title}</h1>

    {#if blocks }
    {#each blocks as datum (datum.title)}
        <slot {datum}>
            <Block {datum} />
        </slot>
    {/each}
    {/if}

</div>