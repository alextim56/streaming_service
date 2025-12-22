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

export type AudioTrack = {
  id: number;
  title: string;
  artist: string;
  duration: number; 
  size_mb: number;
  encoded_audio: string; // base64-encoded аудио
}

// Функция проверки, соответствует ли объект типу AudioTrack
export function isAudioTrack(obj: any): obj is AudioTrack {
    return (
        typeof obj === 'object' &&
        typeof obj.id === 'number' &&
        typeof obj.title === 'string' &&
        typeof obj.artist === 'string' &&
        typeof obj.duration === 'number' &&
        typeof obj.size_mb === 'number' &&
        typeof obj.encoded_audio === 'string'
    );
}

// Функция проверки массива
export function isAudioTrackArray(arr: any): arr is AudioTrack[] {
    return Array.isArray(arr) && arr.every(isAudioTrack);
}