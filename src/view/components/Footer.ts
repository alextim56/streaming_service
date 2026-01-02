import { el, svg } from 'redom';
import logo from '../../assets/images/sprite.svg';
import type { AudioTrack } from '../../types';
import { audioData } from '../../model/AudioClass';
import { getTrackCardElement, getTrackCardNameElement, getTrackCardAgoElement, getTrackCardHeartElement } from './TrackCard';

const iconSpeaker = svg(
    'svg', { class: 'player__speaker', width: 16, height: 16 },
    svg('use', { xlink: { href: logo + '#icon-speaker' } })
);

const iconShuffle = svg(
    'svg', { width: 16, height: 16 },
    svg('use', { xlink: { href: logo + '#icon-shuffle' } })
);

const iconBack = svg(
    'svg', { width: 16, height: 16 },
    svg('use', { xlink: { href: logo + '#icon-skipback' } })
);

const iconPlay = svg(
    'svg', { width: 40, height: 40 },
    svg('use', { xlink: { href: logo + '#icon-play' } })
);

const iconForward = svg(
    'svg', { width: 16, height: 16 },
    svg('use', { xlink: { href: logo + '#icon-skipforward' } })
);

const iconRepeat = svg(
    'svg', { width: 16, height: 16 },
    svg('use', { xlink: { href: logo + '#icon-repeat' } })
);

export function setFooterAudioTrack(track: AudioTrack) {
    const footerElement = document.querySelector('.footer');
    if (footerElement) {
        footerElement.classList.add('footer--active');
        const footerTrackElement = document.querySelector('.footer__track');
        if (footerTrackElement) {
            footerTrackElement.innerHTML = '';
            footerTrackElement.append(getTrackCardElement(track));
        }
    }
}

export const elapsedElement = el('span', { class: 'player__elapsed' });
export const progressElement = el('progress', { class: 'player__bar', value: 0, max: 100 });
export const playerTotalElement = el('span', { class: 'player__total' });

export function getFooterElement(): HTMLElement {
    const playButton = el('button', { class: 'player__play' }, [iconPlay]);
    playButton.onclick = e => {
        if (audioData.tracks) {
            audioData.play();
        }
    };

    const player = el('div', { class: 'player' }, [
        el('div', { class: 'player__controls' }, [
            el('button', { class: 'player__shuffle' }, [iconShuffle]),
            el('button', { class: 'player__back' }, [iconBack]),
            playButton,
            el('button', { class: 'player__forward' }, [iconForward]),
            el('button', { class: 'player__repeat' }, [iconRepeat])
        ]),
        el('div', { class: 'player__progress' }, [
            elapsedElement,
            progressElement,
            playerTotalElement
        ])
    ]);

    const playerSmall = el('div', { class: 'player' }, [
        el('div', { class: 'player__progress' }, [
            el('span', { class: 'player__elapsed' }, '0:26'),
            el('progress', { class: 'player__bar', value: 26, max: 100 }),
            el('span', { class: 'player__total' }, '6:55')
        ])
    ]);
    playerSmall.classList.add('player--small');

    const playerSmallButton = el('div', { class: 'player' }, [
        el('div', { class: 'player__progress' }, [
            el('span', { class: 'player__elapsed' }, '0:26'),
            el('progress', { class: 'player__bar', value: 26, max: 100 }),
            el('span', { class: 'player__total' }, '6:55')
        ])
    ]);
    playerSmallButton.classList.add('player--small');

    const footerPlayerXl = el('div', { class: 'footer__player' }, [playerSmall]);
    footerPlayerXl.classList.add('footer__player--xl');

    const footerVolume = el('div', { class: 'footer__volume' }, [
        el('div', { class: 'player__volume' }, [
            iconSpeaker,
            el('input', { class: 'player__sound', type: 'range', min: 0, max: 10, step: 1 })
        ])
    ]);
    footerVolume.classList.add('player');

    const footer: HTMLElement = el('footer', { class: 'footer' }, [
        el('div', { class: 'footer__content' }, [
            el('div', { class: 'footer__track' }),
            el('div', { class: 'footer__player' }, [
                player,
                playerSmall
            ]),
            footerPlayerXl,
            footerVolume
        ])
    ]);

    return footer;
}