export type UserType = {
    username: string;
    password: string;
    token?: string;
} | null;
export declare function isUserType(data: any): data is UserType;
export declare function isUserTokenType(data: any): data is UserType;
export type AudioTrack = {
    id: number;
    title: string;
    artist: string;
    duration: number;
    size_mb: number;
    encoded_audio: string;
};
export declare function isAudioTrack(obj: any): obj is AudioTrack;
export declare function isAudioTrackArray(arr: any): arr is AudioTrack[];
//# sourceMappingURL=types.d.ts.map