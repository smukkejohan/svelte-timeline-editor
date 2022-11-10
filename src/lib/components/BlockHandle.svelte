<script lang="ts">
    import { getContext, createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

    export let side : 'in' | 'out'

    //import { contextKey } from '../timeline';
    //const { selectedHandle }: TimelineContext = getContext(contextKey);
  
    const handlePointerdown = (e : MouseEvent) => {
        // dispatch even to set selected handle
        dispatch('selecthandle', {
            side: side,
		});
        //console.log($selectedHandle)   
    }

    /**
     TODO: proper icon for handles - different icon when fixed position
    */
</script>

<div class="w-4 overflow-hidden text-center bg-red-500 cursor-ew-resize {side == 'in' ? 'rounded-l-sm' : 'rounded-r-sm'}" on:pointerdown={handlePointerdown}>
    ll
</div>