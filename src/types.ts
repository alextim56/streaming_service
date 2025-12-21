export type UserType = {
  username: string;
  password: string;
  token?: string;
} | null;

// type guard функция
export function isUserType(data: any): data is UserType {
  return (
    data &&
    typeof data.username === 'string' &&
    typeof data.password === 'string' &&
    typeof data.token === 'string' || data.token === 'undefined'
  );
}

// type guard функция
export function isUserTokenType(data: any): data is UserType {
  return (
    data &&
    typeof data.username === 'string' &&
    typeof data.token === 'string' || data.token === 'undefined'
  );
}