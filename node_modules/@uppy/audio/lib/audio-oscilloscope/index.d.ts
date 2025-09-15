type MaybeFunction<T> = T | (() => T);
interface AudioOscilloscopeOptions {
    canvas?: {
        width?: number;
        height?: number;
    };
    canvasContext?: {
        width?: MaybeFunction<number>;
        height?: MaybeFunction<number>;
        lineWidth?: MaybeFunction<number>;
        fillStyle?: MaybeFunction<string>;
        strokeStyle?: MaybeFunction<string>;
    };
    onDrawFrame?: (oscilloscope: AudioOscilloscope) => void;
}
export default class AudioOscilloscope {
    #private;
    private canvas;
    private canvasContext;
    private width;
    private height;
    private analyser;
    private bufferLength;
    private dataArray?;
    private onDrawFrame;
    private streamSource?;
    private audioContext?;
    source?: AudioBufferSourceNode;
    constructor(canvas: HTMLCanvasElement, options?: AudioOscilloscopeOptions);
    addSource(streamSource: MediaStreamAudioSourceNode): void;
    draw(): void;
}
export {};
//# sourceMappingURL=index.d.ts.map