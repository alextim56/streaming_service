import { setChildren } from 'redom';
import { getHeader } from '../components/Header';
import { getAudioSection } from '../components/Audio';

export function getMainPage() {
	const header = getHeader();
	const mainSection = document.createElement('main');
	const audioSection = getAudioSection();
	setChildren(mainSection, [audioSection]);
	return [header, mainSection];
}