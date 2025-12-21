import { el } from 'redom';
import type { UserType } from '../../types';

export function authForm(callback: (userData: UserType) => void) {
    const loginButton: HTMLElement = el('button', { class: 'auth-button', type: 'submit' }, 'Войти');
    loginButton.classList.add('btn');
    const regButton: HTMLElement = el('button', { class: 'reg-button', type: 'submit' }, 'Регистрация');
    regButton.classList.add('btn');

    const form: HTMLFormElement = el('form', { class: 'authForm', id: 'authForm' }, [
        el('label', { class: 'custom-label', for: 'user' }, 'Пользователь'),
        el('input', { class: 'custom-input', id: 'username', required: true, type: 'text', name: 'username', placeHolder: 'username', value: '' }, ''),
        el('label', { class: 'custom-label', for: 'password' }, 'Пароль'),
        el('input', { class: 'custom-input', id: 'password', required: true, type: 'password', name: 'password' }, ''),
        loginButton,
        regButton
    ]);

    form.addEventListener('submit', (event: Event) => {
        const target = event.target as HTMLFormElement;
        //const user: HTMLInputElement | null = target.querySelector('#username');
        //const pasw: HTMLInputElement | null = target.querySelector('#password');

        const formData = new FormData(target);
        
        let username = formData.get('username')?.toString();
        let password = formData.get('password')?.toString();
        if (username && password) {
            callback({ username: username, password: password });
        }
        //console.log({ username: username, password: password });

        //const formData = new FormData(form);
        //formData.forEach((value, key) => console.log(`${key}: ${value}`));
        // Получение отдельных значений
        //const username: string = formData.get('username') as string;
        //const password: string = formData.get('password') as string;

        // Преобразование в объект
        //const data = Object.fromEntries([...formData]);

        //console.log({ username, password });

        event.preventDefault();
    });

    return form;
}