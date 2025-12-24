import type { AudioTrack } from '../types';
export declare class TracksDataClass {
    private static instance;
    private _tracks;
    static getInstance(): TracksDataClass;
    getTracks(): Promise<AudioTrack[] | null>;
    get tracks(): AudioTrack[] | null;
    set tracks(tracks: AudioTrack[] | null);
    initialize(): Promise<void>;
    private constructor();
}
export declare const tracksData: TracksDataClass;
//# sourceMappingURL=tracksData.d.ts.map