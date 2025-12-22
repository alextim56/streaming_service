import { el, svg, setChildren } from 'redom';
import logo from '../../assets/images/sprite.svg';
import noimage from '../../assets/images/tracks/noimage.png';
import { getAllTracks } from '../../model/requestsClass';
import type { AudioTrack } from '../../types';

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

    const iconHeart = svg(
        'svg', { width: 24, height: 24 },
        svg('use', { xlink: { href: logo + '#icon-heart' } })
    );

    const iconBurger = svg(
        'svg', { width: 23, height: 4 },
        svg('use', { xlink: { href: logo + '#icon-burger' } })
    );

    const allTracksButton: HTMLElement = el('button', { class: 'aside-nav__btn', id: 'all-btn', disabled: false }, [
        iconMusicNotes2,
        iconPlaySmall2,
        el('span', { class: 'aside-nav__btn-text' }, 'Аудиокомпозиции')
    ]);

    allTracksButton.onclick = async e => {
        allTracksButton.setAttribute('disabled', 'disabled');
        const allTracks = await getAllTracks();
        if (allTracks) {
            renderTrackTable(allTracks);
        }
    };

    const trackTableBody: HTMLTableSectionElement = el('tbody', { class: 'track-table__body' });

    function renderTrackTable(tracks: AudioTrack[]) {
        trackTableBody.innerHTML = '';
        tracks.forEach(track => {
            const tableCol1: HTMLTableCellElement = el('td', { class: 'track-table__col' }, [
                el('span', { class: 'track-table__number' }, `${track.id}`)
            ]);
            tableCol1.classList.add('track-table__col--number');

            const trackCard: HTMLElement = el('div', { class: 'track-card' }, [
                el('img', { class: 'track-card__image', src: `${noimage}`, width: 60, height: 60 }),
                el('div', { class: 'track-card__wrapper' }, [
                    el('h3', { class: 'track-card__name' }, `${track.title}`),
                    el('span', { class: 'track-card__author' }, `${track.artist}`)
                ])
            ]);
            trackCard.classList.add('track-card--xl');

            const tableCol2: HTMLTableCellElement = el('td', { class: 'track-table__col' }, [
                trackCard
            ]);
            tableCol2.classList.add('track-table__col--track');

            const trackCardAlbum: HTMLElement = el('div', { class: 'track-card' }, [
                el('h3', { class: 'track-card__name' }, `${track.artist}`)
            ]);
            const tableCol3: HTMLTableCellElement = el('td', { class: 'track-table__col' }, [
                trackCardAlbum
            ]);
            tableCol3.classList.add('track-table__col--album');

            const trackCardAgo: HTMLElement = el('div', { class: 'track-card' }, [
                el('span', { class: 'track-card__ago' }, `6 дней назад`)
            ]);
            const tableCol4: HTMLTableCellElement = el('td', { class: 'track-table__col' }, [
                trackCardAgo
            ]);
            tableCol4.classList.add('track-table__col--date');

            const trackCardHeart: HTMLElement = el('div', { class: 'track-card' }, [
                [iconHeart]
            ]);
            const tableCol5: HTMLTableCellElement = el('td', { class: 'track-table__col' }, [
                trackCardHeart
            ]);
            tableCol5.classList.add('track-table__col--favorite');

            const trackCardDuration: HTMLElement = el('div', { class: 'track-card' }, [
                el('span', { class: 'track-card__duration' }, `${track.duration}`)
            ]);
            const tableCol6: HTMLTableCellElement = el('td', { class: 'track-table__col' }, [
                trackCardDuration
            ]);
            tableCol6.classList.add('track-table__col--duration');

            const trackCardBurger: HTMLElement = el('div', { class: 'track-card' }, [
                el('button', { class: 'track-card__burger', type: 'button' }, [
                    [iconBurger]
                ])
            ]);
            trackCardBurger.classList.add('track-card--centered');
            
            const tableCol7: HTMLTableCellElement = el('td', { class: 'track-table__col' }, [
                trackCardBurger
            ]);
            tableCol7.classList.add('track-table__col--burger');

            const tableRow: HTMLTableRowElement = el('tr', { class: 'track-table__row' }, [
                tableCol1,
                tableCol2,
                tableCol3,
                tableCol4,
                tableCol5,
                tableCol6,
                tableCol7
            ]);
            tableRow.setAttribute('data-id', `${track.id}`);

            trackTableBody.append(tableRow);
        });
    }

    const favTracksButton: HTMLElement = el('button', { class: 'aside-nav__btn', id: 'favorites-btn', disabled: false }, [
        iconMusicNotes1,
        iconPlaySmall1,
        el('span', { class: 'aside-nav__btn-text' }, 'Избранное')
    ]);

    favTracksButton.onclick = e => {
        favTracksButton.setAttribute('disabled', 'disabled');
    };

    const audioSection: HTMLElement = el('section', { class: 'audio' }, [
        el('div', { class: 'container' }, [
            el('h1', { class: 'visually-hidden' }, 'Прогрыватель аудио-треков'),
            el('div', { class: 'audio__wrapper' }, [
                el('aside', { className: 'aside-nav audio__nav' }, [
                    el('h2', { class: 'visually-hidden' }, 'Категории аудио-треков'),
                    el('ul', { class: 'aside-nav__list' }, [
                        el('li', { class: 'aside-nav__list-item' }, [
                            favTracksButton
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
                        trackTableBody
                    ])
                ])
            ])
        ])
    ]);
    return audioSection;
}