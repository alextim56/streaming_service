import { el, setChildren } from 'redom';
import './styles/style.scss';
import { authForm } from './view/pages/AuthPage';
import { getMainPage } from './view/pages/MainPage';
import type { UserType } from './types';
import { localStorageClass } from './model/localStorageClass';
import { getAllTracks, checkConnected } from './model/requestsClass';

async function setUser(newUser: UserType) {
    if (newUser) {
        const { username, password } = newUser;
        console.log('User set data is ', newUser);

        try {
            const response = await fetch('http://127.0.0.1:8000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });
            console.log(response);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Сохраняем токен, если сервер его возвращает
            if (data.token) {
                localStorageClass.grantedUser = {
                    ...newUser,
                    token: data.token
                };
                console.log('new user is: ', localStorageClass.grantedUser);
                initApp();
                return true;
            }
        } catch (error) {
            console.error('Login failed:', error);
            return false;
        }
    }
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

async function initApp() {
    try {
        // проверка соединения
        const isConnected = await checkConnected();
        console.log('Проверка связи - !!!!' + isConnected);
        if (!isConnected) {
            initAuth();
            return;
        }
        showMainPage();
    } catch (error) {
        console.error(error);
    }
}

initApp();
