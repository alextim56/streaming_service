export interface IUser {
    username: string;
    password: string;
}

export class User implements IUser {
    constructor(
        public username: string,
        public password: string
    ) {}

    // Статический фабричный метод
    static create(username: string, password: string): User {
        return new User(username, password);
    }
}

// Экспорт экземпляра
export const appUser: IUser = new User("appUser", "appPassword123");