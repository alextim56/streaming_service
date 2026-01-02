import { el, svg } from 'redom';
import logo from '../../assets/images/sprite.svg';
import noimage from '../../assets/images/tracks/noimage.png';
import * as audioTracks from '../../assets/audio';
import type { AudioTrack } from '../../types';
import { audioData } from '../../model/AudioClass';
import { setFooterAudioTrack } from './Footer'; 

export function getTrackCardElement(track: AudioTrack): HTMLElement {
    const trackCard: HTMLDivElement = el('div', { class: 'track-card' }, [
        el('img', { class: 'track-card__image', src: `${noimage}`, width: 60, height: 60 }),
        el('div', { class: 'track-card__wrapper' }, [
            el('h3', { class: 'track-card__name' }, `${track.title}`),
            el('span', { class: 'track-card__author' }, `${track.artist}`)
        ])
    ]);
    trackCard.classList.add('track-card--xl');
    trackCard.onclick = e => {
        //const decodedString = atob(track.encoded_audio);
        //console.log('Encoded data is: ' + decodedString);

        if (audioData.tracks) {
            const someTrack = audioData.tracks.find(x => x.id === track.id);
            if (someTrack) {
                setFooterAudioTrack(someTrack);
                audioData.currentTrack = someTrack;
                audioData.play();
            }
        }
    };

    return trackCard;
}

export function getTrackCardNameElement(track: AudioTrack): HTMLElement {
    const trackCard: HTMLDivElement = el('div', { class: 'track-card' }, [
        el('span', { class: 'track-card__name' }, track.artist)
    ]);

    return trackCard;
}

export function getTrackCardAgoElement(track: AudioTrack): HTMLElement {
    const trackCard: HTMLDivElement = el('div', { class: 'track-card' }, [
        el('span', { class: 'track-card__ago' }, `6 дней назад`)
    ]);

    return trackCard;
}

export function getTrackCardHeartElement(): HTMLElement {
    const iconHeart = svg(
        'svg', { class: 'track-card__heart', width: 24, height: 24 },
        svg('use', { xlink: { href: logo + '#icon-heart' } })
    );

    const trackCard: HTMLDivElement = el('div', { class: 'track-card' }, [
        [iconHeart]
    ]);

    return trackCard;
}