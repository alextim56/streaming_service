import { setChildren } from 'redom';
import { getHeader } from '../components/Header';
import { getAudioSection } from '../components/AudioSection';
import { getFooterElement } from '../components/Footer';

export function getMainPage() {
	const header = getHeader();
	const mainSection = document.createElement('main');
	const audioSection = getAudioSection();
	const footerElement = getFooterElement();
	setChildren(mainSection, [audioSection]);
	return [header, mainSection, footerElement];
}