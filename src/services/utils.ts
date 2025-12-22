export function formatTime(time: number): string {
    return time < 10 ? `0${time}` : `${time}`;
};

export const toMinAndSec = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration - minutes * 60;
    return `${formatTime(minutes)}:${formatTime(seconds)}`;
}