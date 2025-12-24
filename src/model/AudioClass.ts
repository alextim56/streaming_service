import type { AudioTrack } from '../types';
import { getAllTracks } from './requestsClass';
import * as audioTracks from '../assets/audio';

export class AudioClass {
    private static instance: AudioClass;
    private _tracks: AudioTrack[] | null = null;
    private _currentTrack: AudioTrack | null = null;
    private _audio: HTMLAudioElement | null = null;

    static getInstance(): AudioClass {
        if (!AudioClass.instance) {
            AudioClass.instance = new AudioClass();
        }
        return AudioClass.instance;
    }

    async getTracks(): Promise<AudioTrack[] | null> {
        try {
            const allTracks = await getAllTracks();
            this._tracks = allTracks;
            return allTracks;
        } catch (error) {
            console.error("Failed to get tracks:", error);
            this._tracks = null;
            return null;
        }
    }

    get tracks(): AudioTrack[] | null {
        return this._tracks;
    }

    set tracks(tracks: AudioTrack[] | null) {
        this._tracks = tracks;
    }

    get currentTrack(): AudioTrack | null {
        return this._currentTrack;
    }

    set currentTrack(track: AudioTrack | null) {
        if (track) {
            this._currentTrack = track;
        }
    }

    play() {
        if (this._currentTrack) {
            const indx = (this._currentTrack.id - 1) % audioTracks.tracks.length;

            console.log(this._audio);
            if (this._audio?.played) {
                this._audio.pause();
            } else if (this._audio?.paused) {
                this._audio.play();
            }

            if (!this._audio || this._audio.src != audioTracks.tracks[indx]) {
                this._audio = new Audio(audioTracks.tracks[indx]);
                this._audio.play();
            }
        }
    }

    pause() {
        if (this._audio) {
            this._audio.pause();
        }
    }

    // Дополнительный метод для инициализации
    async initialize(): Promise<void> {
        if (!this._tracks) {
            await this.getTracks();
        }
    }

    private constructor() { this.initialize(); }
}

// Экспортируем singleton
export const audioData = AudioClass.getInstance();