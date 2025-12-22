export type UserType = {
    username: string;
    password: string;
    token?: string;
} | null;
export declare function isUserType(data: any): data is UserType;
export declare function isUserTokenType(data: any): data is UserType;
//# sourceMappingURL=types.d.ts.map