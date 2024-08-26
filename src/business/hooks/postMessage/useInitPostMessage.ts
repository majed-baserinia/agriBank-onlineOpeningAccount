import useInitialSettingStore, { InitialSetting } from 'business/stores/initial-setting-store';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { postMessageTypes } from './types';

const checkIsInIframe = () => {
	return !(window.self === window.top);
};

export const sendPostmessage = (type: postMessageTypes, data: string) => {
	const parentWindow = window.parent;
	parentWindow.postMessage({ type: type, data: data }, '*');
};

const useInitPostMessage = () => {
	const navigate = useNavigate();
	const { settings, setSettings } = useInitialSettingStore((s) => s);

	useEffect(() => {
		window.addEventListener('message', onRecievePostMessage);
		if (checkIsInIframe()) sendPostmessage('iFrameReady', 'Hi Parent');

		// Clean up the event listener on unmount
		return () => {
			window.removeEventListener('message', onRecievePostMessage);
		};
	}, []);

	const onRecievePostMessage = (event: MessageEvent) => {
		const type = event.data.type;
		if (type === 'initiateIFrame') initiateIFrameHadnler(event.data.data);
		if (type === 'goback') goBackHandler();
	};

	const initiateIFrameHadnler = (data: InitialSetting) => {
		setSettings(data);
	};

	const goBackHandler = () => {
		//set the "base" proberty in the viteconfig file to the base url of the project to access import.meta.env.BASE_URL
		const basePath = import.meta.env.BASE_URL;
		if (window.location.pathname == basePath) {
			sendPostmessage('isFinishedBack', 'true');
		}
	};

	return [checkIsInIframe()];
};

export default useInitPostMessage;
