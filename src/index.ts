import { el, setChildren } from 'redom';
import './styles/style.scss';
import logo from './assets/images/logo.svg';
import { authForm } from './view/pages/AuthPage';
import { getMainPage } from './view/pages/MainPage';
import type { UserType } from './types';

let user: UserType;

/*const header: HTMLElement = el('header', { class: 'page-header' }, [
    el('div', { class: 'page-header-text' }, 'Добро пожаловать в '),
    el('img', { class: 'page-header-logo', src: logo }),
]);*/

function setUser(data: UserType) {
    user = data;
    console.log('User set data is ', data);
    initApp();
}

function getUser() {
    console.log('User get data is ', user);
    return user;
}

function initAuth() {
    document.body.innerHTML = '';
    const mainEl = document.createElement('main');
    setChildren(document.body, [mainEl]);
    setChildren(mainEl, [authForm(setUser)]);
}

function showMainPage() {
    document.body.innerHTML = '';
    setChildren(document.body, getMainPage());
}

/*const authFormEl = authForm();

const appDiv: HTMLElement | null = document.querySelector('#app');
if (appDiv) {
    setChildren(appDiv, [authFormEl]);
}*/

async function initApp() {
    try {
        const user = getUser();
        if (!user) {
            initAuth();
            return;
        }
        showMainPage();
    } catch (error) {
        console.error(error);
    }
}

initApp();
