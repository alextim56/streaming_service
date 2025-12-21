import { el, svg } from 'redom';
import logo from '../../assets/images/sprite.svg';

function buttonCliked() {
    console.log('Cliked!');
}

export function getAudioSection(): HTMLElement {
    const iconMusicNotes1 = svg(
        'svg', { class: 'aside-nav__btn-icon', width: 32, height: 32 },
        svg('use', { xlink: { href: logo + '#icon-musicnotes' } })
    );
    const iconPlaySmall1 = svg(
        'svg', { class: 'aside-nav__btn-icon', width: 24, height: 24 },
        svg('use', { xlink: { href: logo + '#icon-play-small' } })
    );
    iconPlaySmall1.classList.add('aside-nav__btn-icon--small');

    const iconMusicNotes2 = svg(
        'svg', { class: 'aside-nav__btn-icon', width: 32, height: 32 },
        svg('use', { xlink: { href: logo + '#icon-musicnotes' } })
    );
    const iconPlaySmall2 = svg(
        'svg', { class: 'aside-nav__btn-icon', width: 24, height: 24 },
        svg('use', { xlink: { href: logo + '#icon-play-small' } })
    );
    iconPlaySmall2.classList.add('aside-nav__btn-icon--small');

    const iconCalendar = svg(
        'svg', { width: 16, height: 16 },
        svg('use', { xlink: { href: logo + '#icon-calendar' } })
    );

    const iconClock = svg(
        'svg', { width: 16, height: 16 },
        svg('use', { xlink: { href: logo + '#icon-clock' } })
    );

    const allTracksButton: HTMLElement = el('button', { class: 'aside-nav__btn', id: 'all-btn', disabled: false }, [
        iconMusicNotes2,
        iconPlaySmall2,
        el('span', { class: 'aside-nav__btn-text' }, 'Аудиокомпозиции')
    ]);

    allTracksButton.onclick = e => {
        allTracksButton.setAttribute('disabled', 'disabled');
    };

    const audioSection: HTMLElement = el('section', { class: 'audio' }, [
        el('div', { class: 'container' }, [
            el('h1', { class: 'visually-hidden' }, 'Прогрыватель аудио-треков'),
            el('div', { class: 'audio__wrapper' }, [
                el('aside', { className: 'aside-nav audio__nav' }, [
                    el('h2', { class: 'visually-hidden' }, 'Категории аудио-треков'),
                    el('ul', { class: 'aside-nav__list' }, [
                        el('li', { class: 'aside-nav__list-item' }, [
                            el('button', { class: 'aside-nav__btn', id: 'favorites-btn', onclick: () => buttonCliked }, [
                                iconMusicNotes1,
                                iconPlaySmall1,
                                el('span', { class: 'aside-nav__btn-text' }, 'Избранное')
                            ])
                        ]),
                        el('li', { class: 'aside-nav__list-item' }, [
                            allTracksButton
                        ])
                    ])
                ]),
                el('div', { class: 'audio__gallery' }, [
                    el('h2', { class: 'audio__gallery-heading' }, 'Аудиофайлы и треки'),
                    el('table', { class: 'track-table' }, [
                        el('thead', { class: 'track-table__header' }, [
                            el('tr', [
                                el('th', { class: 'track-table__col' }, '№'),
                                el('th', { class: 'track-table__col' }, 'Название'),
                                el('th', { class: 'track-table__col' }, 'Альбом'),
                                el('th', { class: 'track-table__col' }, [iconCalendar]),
                                el('th', { class: 'track-table__col' }),
                                el('th', { class: 'track-table__col' }, [iconClock]),
                                el('th', { class: 'track-table__col' })
                            ])
                        ]),
                        el('tbody', { class: 'track-table__body' })
                    ])
                ])
            ])
        ])
    ]);
    return audioSection;
}