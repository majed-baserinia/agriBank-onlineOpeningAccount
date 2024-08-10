import Glide from '@glidejs/glide/dist/glide.modular.esm';
import { RefObject, useEffect, useState } from 'react';
import type { GlideOptions } from 'ui/htsc-components/Carousel/Root/Carousel';
import { GlideEvents, mappedEventToGlideEvent } from 'ui/htsc-components/Carousel/Root/Events';

export function useInitializeGlider(element: RefObject<HTMLElement>, options: GlideOptions & GlideEvents) {
	const [glide, setGlide] = useState<Glide | null>(null);

	useEffect(() => {
		const glide = new Glide(element.current!, options).mount();
		setGlide(glide);

		const events = Object.entries(options).filter(([key, value]) => {
			return key.startsWith('on');
		});

		events.forEach(([key, value]) => {
			glide.on(mappedEventToGlideEvent(key), value as (...args: any) => void);
		});

		return () => {
			setGlide(null);
			glide.destroy();
		};
	}, [element.current]);

	return { glide };
}
