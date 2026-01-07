import type { AudioTrack } from '../types';
import { getAllTracks } from './requestsClass';
import { elapsedElement, progressElement, playerTotalElement } from '../view/components/Footer';
import { toMinAndSec } from '../services/utils';
import * as audioTracks from '../assets/audio';

export class AudioClass {
    private static instance: AudioClass;
    private _tracks: AudioTrack[] | null = null;
    private _currentTrack: AudioTrack | null = null;
    private _audio: HTMLAudioElement | null = null;
    private _isPlaying: boolean = false;

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
            const indx = (track.id - 1) % audioTracks.tracks.length;
            if (this._audio) {
                this._audio.pause();
            }
            this._audio = new Audio(audioTracks.tracks[indx]);
            if (progressElement) {
                progressElement.value = 0;
                progressElement.max = 1000;
            }

            // Ждем загрузки метаданных (включая длительность)
            this._audio.addEventListener('loadedmetadata', () => {
                if (this._audio && playerTotalElement) {
                    playerTotalElement.textContent = `${toMinAndSec(this._audio.duration)}`;
                    progressElement.max = this._audio.duration;
                }
            });

            this._audio.addEventListener('timeupdate', () => {
                if (this._audio && elapsedElement && progressElement) {
                    elapsedElement.textContent = `${toMinAndSec(this._audio.currentTime)}`;
                    progressElement.value = this._audio.currentTime;
                }
            });

            // Начинаем загрузку
            this._audio.load();

            this.isPlaying = false;
            this._audio.onplay = e => {
                this.isPlaying = true;
            }
            this._audio.onpause = e => {
                this.isPlaying = false;
            }
            //console.log(this._audio.duration);
            this._currentTrack = track;
        }
    }

    set isPlaying(playing: boolean) {
        this._isPlaying = playing;
    }

    get isPlaying() {
        return this._isPlaying;
    }

    play() {
        if (this._audio) {
            /*const indx = (this.currentTrack.id - 1) % audioTracks.tracks.length;

            if (this._audio) {
                this._audio.pause();
            }
            this._audio = new Audio(audioTracks.tracks[indx]);*/
            if (this.isPlaying) {
                this._audio.pause();
            } else {
                this._audio.play();
            }

            /*const indx = (this._currentTrack.id - 1) % audioTracks.tracks.length;

            console.log(this._audio);
            if (this._audio?.played) {
                this._audio.pause();
            } else if (this._audio?.paused) {
                this._audio.play();
            }

            if (!this._audio || this._audio.src != audioTracks.tracks[indx]) {
                this._audio = new Audio(audioTracks.tracks[indx]);
                this._audio.play();
            }*/
            //console.log(this._audio?.played);
            //console.log(this._audio);
            //this._audio.play();
            /*if (this._audio?.played) {
                this._audio.pause();
            } else if (this._audio?.paused) {
                this._audio.play();
            }*/
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