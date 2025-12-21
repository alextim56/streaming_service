//const User = require('../../models/UserClass');
import type { UserType } from '../types';
import { localStorageClass } from '../model/localStorageClass';

export async function loginUser(newUser: UserType) {
    if (newUser) {
        const { username, password } = newUser;

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

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                const data = await response.json();

                // Сохраняем токен, если сервер его возвращает
                if (data.token) {
                    localStorageClass.grantedUser = {
                        ...newUser,
                        token: data.token
                    };
                    return true;
                }
            }
        } catch (error) {
            console.error('Login failed:', error);
            return false;
        }
    }
}

export async function getAllTracks() {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/tracks', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorageClass.grantedUser?.token}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Login failed:', error);
        return null;
    }
}

export async function checkConnected() {
    try {
        const result = await getAllTracks();
        return result !== null;
    } catch (error) {
        return false;
    }
}