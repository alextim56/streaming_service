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

    // Режимы воспроизведения
    private _repeatMode: 'none' | 'one' | 'all' = 'none';
    private _shuffleMode: boolean = false;
    private _shuffledTracks: AudioTrack[] | null = null;
    private _shuffleHistory: AudioTrack[] = [];

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
        // При смене треков сбрасываем перемешанный список
        this._shuffledTracks = null;
        this._shuffleHistory = [];
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

            // Событие при завершении трека
            this._audio.addEventListener('ended', () => {
                if (this._repeatMode === 'one') {
                    // Повтор текущего трека
                    if (this._audio) {
                        this._audio.currentTime = 0;
                        this._audio.play();
                    }
                } else {
                    // Переход к следующему треку
                    this.playNext();
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
            this._currentTrack = track;

            // Добавляем трек в историю для shuffle
            if (this._shuffleMode && !this._shuffleHistory.some(t => t.id === track.id)) {
                this._shuffleHistory.push(track);
            }
        }
    }

    set isPlaying(playing: boolean) {
        this._isPlaying = playing;
    }

    get isPlaying() {
        return this._isPlaying;
    }

    // Геттеры и сеттеры для режимов
    get repeatMode(): 'none' | 'one' | 'all' {
        return this._repeatMode;
    }

    set repeatMode(mode: 'none' | 'one' | 'all') {
        this._repeatMode = mode;
    }

    get shuffleMode(): boolean {
        return this._shuffleMode;
    }

    set shuffleMode(enabled: boolean) {
        this._shuffleMode = enabled;

        if (enabled && this._tracks) {
            // Включаем shuffle - создаем перемешанный список
            this._shuffledTracks = this.shuffleArray([...this._tracks]);

            // Если есть текущий трек, ставим его в начало перемешанного списка
            if (this._currentTrack && this._shuffledTracks) {
                const currentTrackId = this._currentTrack.id;

                // Находим текущий трек
                const currentTrack = this._shuffledTracks.find(t => t.id === currentTrackId);

                if (currentTrack) {
                    // Удаляем текущий трек из его позиции и добавляем в начало
                    this._shuffledTracks = [
                        currentTrack,
                        ...this._shuffledTracks.filter(t => t.id !== currentTrackId)
                    ];
                }
            }

            this._shuffleHistory = this._currentTrack ? [this._currentTrack] : [];
        } else {
            // Выключаем shuffle
            this._shuffledTracks = null;
            this._shuffleHistory = [];
        }
    }

    play() {
        if (this._audio) {
            if (this.isPlaying) {
                this._audio.pause();
            } else {
                this._audio.play();
            }
        }
    }

    // Метод для воспроизведения следующего трека
    playNext(): void {
        if (!this._tracks || !this._currentTrack) return;

        if (this._shuffleMode && this._shuffledTracks) {
            // Режим shuffle
            this.playNextShuffle();
        } else {
            // Обычный режим
            this.playNextNormal();
        }
    }

    private playNextNormal(): void {
        if (!this._tracks || !this._currentTrack) return;

        const currentIndex = this._tracks.findIndex(track => track.id === this._currentTrack!.id);
        let nextIndex: number;

        if (currentIndex === this._tracks.length - 1) {
            // Последний трек
            if (this._repeatMode === 'all') {
                nextIndex = 0; // Зацикливаем на начало
            } else {
                return; // Останавливаемся на последнем треке
            }
        } else {
            nextIndex = currentIndex + 1;
        }

        const nextTrack = this._tracks[nextIndex];
        if (nextTrack) {
            this.currentTrack = nextTrack;
            if (this._audio) {
                this._audio.play();
                this.isPlaying = true;
            }
        }
    }

    private playNextShuffle(): void {
        if (!this._shuffledTracks || !this._currentTrack) return;

        const currentIndex = this._shuffledTracks.findIndex(track => track.id === this._currentTrack!.id);
        let nextIndex = currentIndex + 1;

        // Проверяем, достигли ли конца перемешанного списка
        if (nextIndex >= this._shuffledTracks.length) {
            if (this._repeatMode === 'all') {
                // Перемешиваем заново и начинаем сначала
                this._shuffledTracks = this.shuffleArray([...this._tracks!]);
                this._shuffleHistory = [];
                nextIndex = 0;
            } else {
                return; // Останавливаемся на последнем треке
            }
        }

        // Проверяем, что nextIndex в пределах массива
        if (nextIndex < 0 || nextIndex >= this._shuffledTracks.length) return;

        let nextTrack = this._shuffledTracks[nextIndex];

        if (!nextTrack) return;

        // Проверяем, не играли ли этот трек недавно
        if (this._shuffleHistory.some(t => t.id === nextTrack!.id)) {
            // Ищем следующий непроигранный трек
            for (let i = nextIndex + 1; i < this._shuffledTracks.length; i++) {
                const candidate = this._shuffledTracks[i];
                // Проверяем, что candidate существует
                if (candidate && !this._shuffleHistory.some(t => t.id === candidate.id)) {
                    nextTrack = candidate;
                    break;
                }
            }
        }

        // Проверяем, что nextTrack существует
        if (nextTrack) {
            this.currentTrack = nextTrack;
            if (this._audio) {
                this._audio.play();
                this.isPlaying = true;
            }
        }
    }

    // Метод для воспроизведения предыдущего трека
    playPrior(): void {
        if (!this._tracks || !this._currentTrack) return;

        if (this._shuffleMode && this._shuffledTracks) {
            // Режим shuffle
            this.playPriorShuffle();
        } else {
            // Обычный режим
            this.playPriorNormal();
        }
    }

    private playPriorNormal(): void {
        if (!this._tracks || !this._currentTrack) return;

        const currentIndex = this._tracks.findIndex(track => track.id === this._currentTrack!.id);
        let priorIndex: number;

        if (currentIndex === 0) {
            // Первый трек
            if (this._repeatMode === 'all') {
                priorIndex = this._tracks.length - 1; // Зацикливаем на конец
            } else {
                return; // Останавливаемся на первом треке
            }
        } else {
            priorIndex = currentIndex - 1;
        }

        const priorTrack = this._tracks[priorIndex];
        if (priorTrack) {  // Явная проверка
            this.currentTrack = priorTrack;
            if (this._audio) {
                this._audio.play();
                this.isPlaying = true;
            }
        }
    }

    private playPriorShuffle(): void {
        if (!this._shuffledTracks || !this._currentTrack || this._shuffleHistory.length <= 1) return;

        // Для shuffle возвращаемся к предыдущему треку из истории
        const historyIndex = this._shuffleHistory.findIndex(t => t.id === this._currentTrack!.id);

        if (historyIndex > 0) {
            const priorTrack = this._shuffleHistory[historyIndex - 1];
            if (priorTrack) {
                this.currentTrack = priorTrack;
            }
            if (this._audio) {
                this._audio.play();
                this.isPlaying = true;
            }
        }
    }

    // Метод для воспроизведения трека по индексу
    playTrackById(id: number): void {
        if (!this._tracks) return;

        const track = this._tracks.find(track => track.id === id);
        if (track) {
            this.currentTrack = track;
            if (this._audio) {
                this._audio.play();
                this.isPlaying = true;
            }
        }
    }

    // Вспомогательный метод для перемешивания массива (алгоритм Фишера-Йетса)
    private shuffleArray(array: AudioTrack[]): AudioTrack[] {
        const shuffled = [...array];

        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));

            const itemI = shuffled[i];
            const itemJ = shuffled[j];

            // Проверяем, что значения не undefined
            if (itemI !== undefined && itemJ !== undefined) {
                shuffled[i] = itemJ;
                shuffled[j] = itemI;
            }
        }

        return shuffled;
    }

    // Метод для получения следующего трека (без воспроизведения)
    getNextTrack(): AudioTrack | null {
        if (!this._tracks || !this._currentTrack) return null;

        if (this._shuffleMode && this._shuffledTracks) {
            const currentIndex = this._shuffledTracks.findIndex(track => track.id === this._currentTrack!.id);
            const nextIndex = (currentIndex + 1) % this._shuffledTracks.length;
            return this._shuffledTracks[nextIndex] || null;
        } else {
            const currentIndex = this._tracks.findIndex(track => track.id === this._currentTrack!.id);
            const nextIndex = (currentIndex + 1) % this._tracks.length;
            return this._tracks[nextIndex] || null;
        }
    }

    // Метод для получения предыдущего трека (без воспроизведения)
    getPriorTrack(): AudioTrack | null {
        if (!this._tracks || !this._currentTrack) return null;

        if (this._shuffleMode && this._shuffledTracks) {
            const currentIndex = this._shuffledTracks.findIndex(track => track.id === this._currentTrack!.id);
            const priorIndex = currentIndex <= 0 ? this._shuffledTracks.length - 1 : currentIndex - 1;
            return this._shuffledTracks[priorIndex] || null;
        } else {
            const currentIndex = this._tracks.findIndex(track => track.id === this._currentTrack!.id);
            const priorIndex = currentIndex <= 0 ? this._tracks.length - 1 : currentIndex - 1;
            return this._tracks[priorIndex] || null;
        }
    }

    // Дополнительный метод для инициализации
    async initialize(): Promise<void> {
        if (!this._tracks) {
            await this.getTracks();
        }
    }

    private constructor() {
        this.initialize();
    }
}

// Экспортируем singleton
export const audioData = AudioClass.getInstance();