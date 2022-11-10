<script lang="ts">



    import type { TimelineData, TimelineContext, TimelineOptions } from "../shared";

    import { contextKey } from '../timeline';
    import { writable } from "svelte/store";

    import { uniqueClasses } from "$lib/utills";

    import { onMount, onDestroy, afterUpdate, createEventDispatcher, tick, setContext } from 'svelte';

    const DEFAULT_OPTIONS: Required<TimelineOptions> = {
        duration: 30000,
        timeFormat: "HH:mm:ss:SSS",
    };

    export let data: TimelineData = [];

    export let options: TimelineOptions = {
        ...DEFAULT_OPTIONS,
    };

   /**
   * Set the current value.
   * `null` denotes "no value."
   *
   * If set to `null`, the Slider input will reset to the minimum value.
   * @example bind:currentValue
   */
  export let currentTime: null | number = null;
  export let currentDuration: null | number = null;
  export let currentWidth: null | number = null;

  const time = writable(currentTime ?? -1);
  const duration = writable(options.duration ?? 30000);
  const width = writable(currentWidth ?? 30000);
  const layers = writable({});

  const selectedHandle = writable(null);

  //const range: BarChartRaceContext["range"] = writable([]);
  const editorOptions = writable({ ...DEFAULT_OPTIONS, ...options });
  const context: TimelineContext = {
    time,
    duration,
    layers,
    width,
    editorOptions,
    selectedHandle,
    setTime: (_value) => time.set(_value),
  };

  setContext(contextKey, context);


  /*setContext(key, {
		getDuration: () => duration,
        getWidth: () => width,
        getPxTime: (t : number) => {
            return (t / duration) * width;
        },
        index: () => {
            startIndex += 1;
            return startIndex;
        }
	});*/
 
  $: editorOptions.set({ ...DEFAULT_OPTIONS, ...options });
  $: duration.set($editorOptions.duration);

  //let duration: number = options.duration;

    /*$: {
        if(layers != options.layers) {
            console.log('layers changed');
            console.log(_.differenceBy(layers, options.layers, 'blocks'));
        }
    }*/

    /*$: { 
        if(duration != options.duration) {
            if(options.duration > duration) {
                duration = options.duration;
            } else {
                // rescale to fit in shorter duration
                const factor = options.duration / duration;

                options.layers = options.layers.map((layer) => {
                    layer.blocks = layer.blocks.map((block) => {
                        block.inTime = block.inTime * factor;
                        block.outTime = block.outTime * factor;
                        return block;
                    })
                    return layer;
                })
            }
        } 
        duration = options.duration
    }*/

    //$: options.duration = duration;

    //$: ({duration} = options) // TODO: force recomputation when duration changes - trigger duration update method

    /*$: layers = options.layers.map((layer, index) => {
        layer.id = index;

        const blockCount = layer.blocks?.length ?? 0;
        layer.blocks = layer.blocks?.map((block, index) => {
            block.id = index;
            block.layer = layer.id;

            if(block.validations?.inTime?.fixed) {
                block.inTime = block.validations.inTime.fixed;
            }

            if(block.inTime == undefined) {
                block.inTime = (duration / blockCount) * index;
            }

            if(block.outTime == undefined) {
                if(index == blockCount - 1) {
                    block.outTime = duration;
                } else {
                    block.outTime = block.inTime + (duration / blockCount); // Don't overlap next block
                }
            }
            //block.duration = () => {
            //    return block.outTime - block.inTime;
            //}

            return block;
        })

        return layer;
    })*/

    /*const calculateDefauls = async () => {
        await tick();
        const blockCount = layers[0].blocks?.length ?? 0;
        layers[0].blocks = layers[0].blocks?.map((block, index) => {

            if(block.inTime == undefined) {
                setInHandle(block, (duration / blockCount) * index);
            }

            if(block.outTime == undefined) {
                setOutHandle(block, block.inTime  + (duration / blockCount));
            }

            return block;
        })
    } */

    //let startIndex = -1;

    // TODO:
    // Event handlers for drag and release of handles
    // Method for adding and removing blocks and layers

    const addLayer = () => {
        const newLayer = {
            title: 'New Layer',
            blocks: []
        }

        layers.push(newLayer);
        return newLayer
    }


    /*
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
  */

  const dispatch = createEventDispatcher();
  let containerClasses = 'timeline-editor block group';

  let className : string | undefined;
  export { className as class };

  export let tag = 'div';

  let timelineEl : HTMLElement | null;
  let mouseX = 0;

  export const playhead = {
    x: 0,
    titlePos: 0,
    time: 0,
    norm: 0,
    titleWidth: 0
  }

  function handleTimelinePointerMove(event) {
    mouseX = event.clientX;
    const x = mouseX - timelineEl?.offsetLeft ?? 0;
    time.set(Math.min(Math.max(x / $width * $duration, 0), $duration));
  }

   function handleTimelinePointerUp(event) {
        selectedHandle.set(null);
    }

    // TODO: specifc enum type for side
    //let activeHandle: {layer: number, block: number, side: string} | null;

    //calculateDefauls();
    /*
    <!--{#each layers as layer, index}
        <Layer options={layer} on:selecthandle={selectHandle} />
    {/each}-->
    */

</script>
<svelte:window on:pointerup={handleTimelinePointerUp} on:pointermove={handleTimelinePointerMove}/>
<svelte:element

  this={tag}
  bind:this={timelineEl}
  bind:clientWidth={$width}
  class={uniqueClasses(`${containerClasses}${className ? ` ${className}` : ''}`)}
>

<div>
    <slot
    {currentTime}
    setTime={context.setTime}
    />
</div>

</svelte:element>




