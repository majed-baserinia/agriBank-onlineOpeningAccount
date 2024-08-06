import { useRef } from 'react';

export default function ThirdPartyAuthPage() {
	const url = useRef('');

	return (
		<iframe
			style={{ width: '100vw', height: '100vh', border: 'none' }}
			src={url.current}
			allowFullScreen
		></iframe>
	);
}
