<script lang="ts">
    import { getContext } from "svelte";
    import type { TimelineContext } from "./shared";
    import { contextKey } from '../timeline';

    /** Specify a slider id. */ // TODO: uuid 
    export let id = "slider-" + Math.random().toString(36);
  
    const { time, duration, width }: TimelineContext = getContext(contextKey);
  
    //$: max = $range[$range.length - 1];
    //$: min = $range[0];

    //let min = 0;
    //let max = 60000;

    let titleWidth : number; 
    let titlePos : number;

    $: {
        const p = $time * $width / $duration;
        const diff = $width - titleWidth;
        if(p > diff) {
            titlePos = diff
        } else {
            titlePos = p
        }
    }
    
    /*<input
    {...$$restProps}
    type="range"
    bind:value={$duration}
    {id}
    {min}
    {max}
    on:input={(e) => setDuration(Number(e.currentTarget.value))}
  />
  <label for={id}>{labelText + "" || $duration}</label>*/
  </script>
  
  <div class="flex relative">
    <div class="flex-none"><em class="group-hover:invisible">0</em></div> 
    <div class="flex-1"> 
        <div class="absolute invisible group-hover:visible left-0 bg-slate-50" bind:clientWidth={titleWidth} style="left:{titlePos}px;">{Math.round($time)}</div>
    </div> 
    <div class="flex-none text-right"><em class="group-hover:invisible">{$duration}</em></div>
</div>
  
  <!-- @component `Timebar` must be descendent of `Timeline`. -->