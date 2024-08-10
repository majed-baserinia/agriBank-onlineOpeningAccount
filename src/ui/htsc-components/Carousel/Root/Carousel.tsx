import Glide from '@glidejs/glide';
import { Theme, useTheme } from '@mui/material';
import React, { useRef } from 'react';
import { GlideEvents } from 'ui/htsc-components/Carousel/Root/Events';
import { useInitializeGlider } from 'ui/htsc-components/Carousel/Root/useInitializeGlider';
import Track from 'ui/htsc-components/Carousel/Track';
import styles from './styles.module.css';

export type GlideOptions = Partial<Glide.Options> & {
	/**
	 * sets a sensible defaults for the carousel root.
	 * for instance enables rewind/rewindByDrag which is most-likely the case for
	 * most use cases
	 */
	setDefaultOptions?: boolean;
	/**
	 * creates a focus effect on the active slide by reducing the opacity of none-active slides and
	 * scaling the active one
	 * * you must add the `slide-is-root` data attribute to the root of your slide elements for this to work
	 */
	focusActiveSlide?: {
		enabled: true;
		/**
		 * the scaling factor of active element
		 */
		scalingFactor?: number;
		inactiveSlideOpacity?: number;
	};
};

export type Props = GlideOptions & {
	className?: string;
	children: React.ReactNode;
} & GlideEvents;

/**
 * A carousel using glidejs under the hood, for more info please refer to glidejs docs.
 * * Although you can use anything to create rows in this carousel but its highly discouraged to do so, always use Carousel.Slide
 */
export default function Carousel({ className, focusActiveSlide, setDefaultOptions = true, ...restProps }: Props) {
	const rootRef = useRef<HTMLDivElement>(null);
	const theme = useTheme();
	const { glide } = useInitializeGlider(rootRef, getGliderOptions(theme, restProps, setDefaultOptions));

	if (focusActiveSlide?.enabled) {
		className += ` ${styles['focus-center']}`;
	}

	return (
		<div
			className="glide"
			ref={rootRef}
			style={
				{
					'--inactive-slide-opacity': focusActiveSlide?.inactiveSlideOpacity ?? 0.5,
					'--scaling-factor': focusActiveSlide?.scalingFactor ?? 1.2
				} as React.CSSProperties
			}
		>
			<Track
				className={className}
				{...restProps}
			></Track>
		</div>
	);
}

function getGliderOptions(theme: Theme, options: Partial<Glide.Options>, setDefaultOptions: boolean) {
	return setDefaultOptions
		? {
				direction: theme.direction,
				...options
			}
		: options;
}
