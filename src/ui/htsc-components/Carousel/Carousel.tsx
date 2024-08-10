import { useTheme } from '@mui/material';
import { Options, Splide, SplideProps } from '@splidejs/react-splide';
import { forwardRef } from 'react';
import styles from './styles.module.css';

export type Props = SplideProps & {
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

/**
 * A carousel using Splide under the hood, for more info please refer to Splide docs.
 * * Although you can use anything to create rows in this carousel but its highly discouraged to do so, always use Carousel.Slide
 */
export const Carousel = forwardRef<Splide, Props>(function (
	{ focusActiveSlide: focusCenter, className, options, setDefaultOptions = true, ...restProps },
	ref
) {
	const theme = useTheme();

	const newOptions: Options | undefined = setDefaultOptions
		? {
				arrows: false,
				rewind: true,
				rewindByDrag: true,
				pagination: false,
				wheel: true,
				keyboard: 'focused',
				speed: 500,
				flickPower: 300,
				flickMaxPages: 1,
				isNavigation: true,
				direction: theme.direction,
				...options
			}
		: options;

	if (focusCenter?.enabled) {
		className += ` ${styles['focus-center']}`;
	}

	return (
		<Splide
			ref={ref}
			className={className}
			style={
				{
					'--inactive-slide-opacity': focusCenter?.inactiveSlideOpacity ?? 0.5,
					'--scaling-factor': focusCenter?.scalingFactor ?? 1.2
				} as React.CSSProperties
			}
			options={newOptions}
			{...restProps}
		></Splide>
	);
});

export default Carousel;
