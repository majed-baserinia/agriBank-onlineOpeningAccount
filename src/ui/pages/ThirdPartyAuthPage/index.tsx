import { useDataSteps } from 'business/stores/onlineOpenAccount/dataSteps';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { paths } from 'ui/route-config/paths';

export default function ThirdPartyAuthPage() {
	const navigate = useNavigate();
	const url = useRef('');
	const { orderId } = useDataSteps();

	useEffect(() => {
		createUrlByOrderId();
	}, []);

	useEffect(() => {
		window.addEventListener('message', getResultFromWebView, false);
		return () => {
			window.removeEventListener('message', getResultFromWebView, false);
		};
	}, []);

	async function createUrlByOrderId() {
		try {
			const res = await fetch('/onlineOpeningAccount/api-config.json');
			const apiConf = await res.json();
			const constructedUrl = `${apiConf.kycUrl}?orderId=${orderId}`;
			url.current = constructedUrl;
		} catch {
			console.log("can't get the config file ");
		}
	}

	const getResultFromWebView = (e: MessageEvent) => {
		if (e.data.event_id === 'kycResponse') {
			// اتمام کار شرکت شاکلید
			navigate(paths.result);
		}
	};

	return (
		<iframe
			style={{ width: '100vw', height: '100vh', border: 'none' }}
			allow="camera *;microphone *"
			scrolling="auto"
			src={url.current}
			allowFullScreen
		></iframe>
	);
}
