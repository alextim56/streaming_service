export function formatTime(time: number): string {
    return time < 10 ? `0${time}` : `${time}`;
};

export const toMinAndSec = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration - minutes * 60;
    return `${Math.floor(duration / 60)}:${Math.floor(duration % 60).toString().padStart(2, '0')}`
    //return `${formatTime(minutes)}:${formatTime(seconds)}`;
}