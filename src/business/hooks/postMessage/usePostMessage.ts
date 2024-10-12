import { useEffect, useRef } from 'react';

type Props = {
	callback: (e: MessageEvent<any>) => void;
	message?: any;
};
export default function usePostMessage(props: Props) {
	const { callback, message } = props;
	const hasSentAlready = useRef(false);

	useEffect(() => {

		if (!hasSentAlready.current) {
			hasSentAlready.current = true;
			window.addEventListener('message', callback, false);
			message ? window.parent.postMessage(message, '*') : null;
		}
		
		return () => {
			window.removeEventListener('message', callback);
		};
	}, []);
}
