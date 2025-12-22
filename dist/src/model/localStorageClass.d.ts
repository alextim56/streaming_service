import type { UserType } from '../types';
export declare class LocalStorageClass {
    private static instance;
    private _grantedUser;
    static getInstance(): LocalStorageClass;
    get grantedUser(): UserType;
    set grantedUser(user: UserType | null);
    private constructor();
}
export declare const localStorageClass: LocalStorageClass;
//# sourceMappingURL=localStorageClass.d.ts.map