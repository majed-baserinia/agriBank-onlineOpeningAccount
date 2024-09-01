import useInitialSettingStore, { InitialSetting } from 'business/stores/initial-setting-store';
import { useEffect, useState } from 'react';
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
	const needsInitData = import.meta.env.VITE_APP_NEEDS_INIT_POSTMESSAGE === 'true';
	const [receivedInitPostmessage, setReceivedInitPostMessage] = useState(!needsInitData);

	useEffect(() => {
		window.addEventListener('message', onRecievePostMessage);
		let interval: NodeJS.Timeout;

		if (checkIsInIframe() && !receivedInitPostmessage) {
			let sendLimit = 20;
			interval = setInterval(() => {
				sendPostmessage('iFrameReady', 'Hi Parent');
				sendLimit--;
				if (sendLimit === 0 && !receivedInitPostmessage) {
					sendPostmessage('isFinishedBack', 'true');
					clearInterval(interval);
				}
			}, 300);
		} else {
			setReceivedInitPostMessage(true);
		}

		// Clean up the event listener on unmount
		return () => {
			window.removeEventListener('message', onRecievePostMessage);
			if (interval) {
				clearInterval(interval);
			}
		};
	}, []);

	const onRecievePostMessage = (event: MessageEvent) => {
		const type = event.data.type;
		if (type === 'initiateIFrame') initiateIFrameHadnler(event.data.data);
		if (type === 'goback') goBackHandler();
	};

	const initiateIFrameHadnler = (data: InitialSetting) => {
		setReceivedInitPostMessage(true);
		setSettings(data);
	};

	const goBackHandler = () => {
		//set the "base" proberty in the viteconfig file to the base url of the project to access import.meta.env.BASE_URL
		const basePath = import.meta.env.BASE_URL;
		if (window.location.pathname == basePath) {
			sendPostmessage('isFinishedBack', 'true');
		}
		navigate(-1);
	};

	return { readyToLoad: receivedInitPostmessage, checkIsInIframe };
};

export default useInitPostMessage;
