import { el, svg } from 'redom';
import '../../styles/style.scss';
import logo from '../../assets/images/sprite.svg';
import avatar from '../../assets/images/avatar/user.png';
import avatar2x from '../../assets/images/avatar/user@2x.png';
import avatarMobile from '../../assets/images/avatar/user-mobile.png';
import avatarMobile2x from '../../assets/images/avatar/user-mobile@2x.png';

export function getHeader() {
    const iconLogo = svg(
        'svg', { class: 'header__icon-logo', width: 184, height: 30 },
        svg('use', { xlink: { href: logo + '#icon-logo' } })
    );

    const iconSearch = svg(
        'svg', { class: 'search-form__image', width: 24, height: 24 },
        svg('use', { xlink: { href: logo + '#icon-search' } })
    );

    const iconUser = svg(
        'svg', { class: 'user-btn__icon', width: 16, height: 16 },
        svg('use', { xlink: { href: logo + '#icon-chevron' } })
    );

    const header: HTMLElement = el('header', { class: 'header' }, [
        el('div', { class: 'container' }, [
            el('div', { class: 'header__wrapper' }, [
                el('a', { class: 'header__logo', href: '#' }, [
                    iconLogo
                ]),
                el('div', { class: 'header__search' }, [
                    el('form', { class: 'search-form', action: '#' }, [
                        el('label', { class: 'search-form__label' }, [
                            el('input', { class: 'search-form__text', id: 'search-form__text', type: 'search', value: '',
                                placeholder: 'Что будем искать?' }),
                            iconSearch
                        ])
                    ])
                ]),
                el('div', { class: 'header__user' }, [
                    el('button', { class: 'user-btn' }, [
                        el('picture', { class: 'user-btn__picture' }, [
                            el('source', { media: '(max-width: 869px)', srcset: avatarMobile+' 1x, '+avatarMobile2x+' 2x', width: 25, height: 25 }),
                            el('img', { class: 'user-btn__avatar', src: avatar, srcset: avatar2x+' 2x', width: 42, height: 42, alt: 'Пользователь' })
                        ]),
                        el('span', { class: 'user-btn__name' }, 'username'),
                        iconUser
                    ])
                ]),
                el('div', { class: 'header__profile' }, [
                    el('ul', { class: 'menu-list' }, [
                        el('li', { class: 'menu-list__item' }, [
                            el('span', { class: 'menu-list__text' }, 'username')
                        ]),
                        el('li', { class: 'menu-list__item' }, [
                            el('button', { class: 'menu-list__btn', type: 'button' }, 'Профиль')
                        ]),
                        el('li', { class: 'menu-list__item' }, [
                            el('button', { class: 'menu-list__btn', type: 'button' }, 'Выйти')
                        ])
                    ])
                ])
            ])
        ])
    ]);
    return header;
};