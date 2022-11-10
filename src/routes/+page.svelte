<script lang="ts">

    import { Timeline, Layer, Timebar, Block } from "$lib";
    import { quadOut } from "svelte/easing";
    import { data } from "./data";

/*
 TODO: 
 intital distribution
    - evenly distribute blocks with default gaps respecting validations
    - set blocks to default to a fraction of total duration

 validations options
    duration: min, max, default, fixed
    inTime: min, max, default, fixed, link
    outTime: min, max, default, fixed, link
*/

    //$: duration = timelineOptions.duration;
    let duration = data.duration;

    /*
            <label for="footageintime">Footage in, binding example:</label>
        <input id="footageintime" type="number" bind:value={timelineOptions.layers[0].blocks[0].inTime}/>

        <label for="duration">Change duration:</label>
        <input id="duration" type="number" on:change={() => { timelineOptions.duration = duration; }} bind:value={duration}/>

        <button>TODO: add layer, add block button</button>
        */

</script>

<header class="p-6">
    <h1 class="text-4xl">Svelte Timeline Editor</h1>
</header>

<main class="p-6">
    <section class="pb-6">
        <h2 class="text-2xl">Getting started</h2>
        pnpm install -D svelte-timeline-editor
    </section>

    <section class="pb-6">
        <h2 class="text-2xl">Example</h2>

        <Timeline
            options={{duration}}
            let:currentTime={value}
            let:setTime
            >

            <Timebar/>

            {#each data.layers as datum (datum.title)}
            <Layer
                data={datum}
                let:datum
            >
            </Layer>
            {/each}

        </Timeline>

    </section>

</main>

