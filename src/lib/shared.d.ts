import type { Writable } from "svelte/store";

interface TimelineBlock {
    value: number;
    //[key: string]: any;

    id?: number,
    layer?: number,
    title?: string,
    inTime?: number;
    outTime?: number;
    //parent: Layer;
    validation?: ValidationOptions;

  }

interface TimelineLayer {
    /**
     * Title must be unique because it's
     * used as a key
     */
    title: string;
  
    /**
     * Specify the chart bar color.
     * @default "#333"
     * @example "red"
     * @example "#f00"
     */
    color?: string;
  
    /**
     * Blocks on the layer
     */
    blocks: TimelineBlock[];
  }

export interface TimelineOptions {
  
    /**
     * Specify the format for displaying times.
     * @default "HH:mm:ss:SSS"
     */
    timeFormat?: string;

    /**
     * Specify the initial duration of the timeline in milliseconds.
     * @default 30000
     */
    duration?: number;
  }

export interface TimelineContext {
    time: Writable<number>;
    width: Writable<number>;
    //duration: Writable<number>;
    //valuesByKey: Writable<BarChartRaceValuesByKey>;
    //range: Writable<BarChartRaceRange>;
    options: Writable<Required<TimelineOptions>>;
    setTime: (value: number) => void;
  }

export type TimelineData = TimelineLayer[];

type ValidationOptions = {
    duration?: {
        min?: number,
        max?: number,
        constant?: number,
    }
}

type BlockOptions = {
    id?: number,
    layer?: number,
    title?: string,
    inTime?: number;
    outTime?: number;
    //parent: Layer;
    validation?: ValidationOptions;
}

type LayerOptions = {
    id?: number,
    inTime?: number;
    outTime?: number;
    parent?: Layer;
    title: string;
    blocks: Array<LayerOptions | BlockOptions>;
}




