import usePostMessage from 'business/hooks/postMessage/usePostMessage';
import useCustomerDidKycOperation from 'business/hooks/useCustomerDidKycOperation';
import { usePreventNavigate } from 'business/hooks/usePreventNavigate';
import useInitialSettingStore from 'business/stores/initial-setting-store';
import { useDataSteps } from 'business/stores/onlineOpenAccount/dataSteps';
import { useEffect, useState } from 'react';
import { paths } from 'ui/route-config/paths';
import { Loader } from "@agribank/ui/components/Loader";

export default function ThirdPartyAuthPage() {
	const { settings } = useInitialSettingStore((s) => s);
	const [url, setUrl] = useState('');
	const { kycUrl, token } = useDataSteps();
	const { mutate } = useCustomerDidKycOperation();
	const { navigate } = usePreventNavigate();
	usePostMessage({ callback: getResultFromWebView });

	useEffect(() => {
		if (kycUrl && settings.language && settings.themeName) {
			const constructedUrl = kycUrl.replace('{lang}', settings.language).replace('{theme}', settings.themeName);
			setUrl(constructedUrl);
		}
	}, []);

	function getResultFromWebView(e: MessageEvent) {
		if (e.data.event_id === 'kycResponse') {
			// e.data.data.kycStatus === 'unAthorized';
			// e.data.data.kycStatus === 'InvalidOrderId';
			// e.data.data.kycStatus === 'InvalidKYCStatus';
			// e.data.data.kycStatus === 'Approved';
			// e.data.data.kycStatus === 'Reject';
			// e.data.data.kycStatus === 'Draft';
			// e.data.data.kycStatus === 'InProgress';

			mutate(
				{ token: token! },
				{
					onSuccess: (res) => {
						navigate(paths.result, {
							state: {
								status:
									e.data.data.kycStatus === 'InProgress' || e.data.data.kycStatus === 'Approved'
										? 'Approved'
										: 'Reject'
							}
						});
					},
					onError: (err) => {
						navigate(paths.result, { state: { status: 'Reject' } });
					}
				}
			);
		}
	}

	return url ? (
		<iframe
			style={{ width: '100vw', height: '100vh', border: 'none' }}
			allow="accelerometer *; gyroscope *;camera *;microphone *;"
			scrolling="auto"
			src={url}
			allowFullScreen
		></iframe>
	) : (
		<Loader.Controlled showLoader />
		// <Loader showLoader />
	);
}
