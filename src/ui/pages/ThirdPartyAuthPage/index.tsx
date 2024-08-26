import useCustomerDidKycOperation from 'business/hooks/useCustomerDidKycOperation';
import { usePreventNavigate } from 'business/hooks/usePreventNavigate';
import { useDataSteps } from 'business/stores/onlineOpenAccount/dataSteps';
import { useEffect, useState } from 'react';
import Loader from 'ui/htsc-components/loader/Loader';
import { paths } from 'ui/route-config/paths';

export default function ThirdPartyAuthPage() {
	const [url, setUrl] = useState('');
	const { orderId, token } = useDataSteps();
	const { mutate, isLoading } = useCustomerDidKycOperation();
	const { navigate } = usePreventNavigate();
	useEffect(() => {
		async function createUrlByOrderId() {
			try {
				const res = await fetch('/api-config-open-account.json');
				const apiConf = await res.json();
				const constructedUrl = `${apiConf.kycUrl}?orderId=${orderId}&redirectUrl=https://digitalbanking.bki.ir/onlineopeningaccount`;
				setUrl(constructedUrl);
			} catch {
				console.log("can't get the config file ");
			}
		}
		createUrlByOrderId();
	}, []);

	useEffect(() => {
		window.addEventListener('message', getResultFromWebView, false);
		return () => {
			window.removeEventListener('message', getResultFromWebView, false);
		};
	}, []);

	const getResultFromWebView = (e: MessageEvent) => {
		if (e.data.event_id === 'kycResponse') {
			// اتمام کار شرکت شاکلید
			// e.data.data.kycStatus === 'unAthorized';
			// e.data.data.kycStatus === 'InvalidOrderId';
			// e.data.data.kycStatus === 'InvalidKYCStatus';
			// e.data.data.kycStatus === 'Approved';
			// e.data.data.kycStatus === 'Reject';
			// e.data.data.kycStatus === 'Draft';
			// e.data.data.kycStatus === 'InProgress';

			// if (
			// 	e.data.data.kycStatus === 'Approved' ||
			// 	e.data.data.kycStatus === 'Reject' ||
			// 	e.data.data.kycStatus === 'InProgress'
			// ) {
			mutate(
				{ token: token! },
				{
					onSuccess: (res) => {
						navigate(paths.result, {
							state: { status: e.data.data.kycStatus === 'InProgress' ? 'Approved' : 'Reject' }
						});
					},
					onError: (err) => {
						navigate(paths.result, { state: { status: 'Reject' } });
					}
				}
			);
			// } else if (
			// 	e.data.data.kycStatus === 'InvalidOrderId' ||
			// 	e.data.data.kycStatus === 'InvalidKYCStatus' ||
			// 	e.data.data.kycStatus === 'unAthorized'
			// ) {
			// 	pushAlert({ type: 'error', messageText: e.data.data.kycStatus, hasConfirmAction: true });
			// }
		}
	};

	return url ? (
		<iframe
			style={{ width: '100vw', height: '100vh', border: 'none' }}
			allow="camera *;microphone *"
			scrolling="auto"
			src={url}
			allowFullScreen
		></iframe>
	) : (
		<Loader showLoader />
	);
}
