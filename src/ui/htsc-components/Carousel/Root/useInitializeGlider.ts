import Glide from '@glidejs/glide';
import { RefObject, useEffect, useState } from 'react';
import { GlideEvents, mappedEventToGlideEvent } from 'ui/htsc-components/Carousel/events';
import { GlideOptions } from 'ui/htsc-components/Carousel/options';

export function useInitializeGlider(element: RefObject<HTMLElement>, options: GlideOptions & GlideEvents) {
	const [glide, setGlide] = useState<Glide | null>(null);

	useEffect(() => {
		const glide = new Glide(element.current!, options).mount();

		const events = Object.entries(options).filter(([key, value]) => {
			return key.startsWith('on');
		});

		events.forEach(([key, value]) => {
			glide.on(mappedEventToGlideEvent(key), value as (...args: any) => void);
		});

		setGlide(glide);

		return () => {
			glide.destroy();
			setGlide(null);
		};
	}, [element.current]);

	return { glide };
}
