import type { UserType } from '../types';
import { isUserTokenType } from '../types';
import { storageKey } from '../../config';

export class LocalStorageClass {
  private static instance: LocalStorageClass;
  private _grantedUser: UserType = null;

  static getInstance(): LocalStorageClass {
    if (!LocalStorageClass.instance) {
      LocalStorageClass.instance = new LocalStorageClass();
    }
    return LocalStorageClass.instance;
  }

  get grantedUser(): UserType {
    const user = localStorage.getItem(storageKey);
    if (user) {
        const parsed = JSON.parse(user);
        if (isUserTokenType(parsed)) {
            return parsed;
        }
    }
    
    return this._grantedUser;
  }

  set grantedUser(user: UserType | null) {
    this._grantedUser = user;
    localStorage.setItem(storageKey, JSON.stringify({ username: user?.username, token: user?.token }));
  }

  private constructor() {}
}

// Экспортируем singleton
export const localStorageClass = LocalStorageClass.getInstance();