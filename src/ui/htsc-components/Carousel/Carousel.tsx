import { useTheme } from '@mui/material';
import { Options, Splide, SplideProps } from '@splidejs/react-splide';
import styles from './styles.module.css';

export type Props = SplideProps & {
	/**
	 * sets a sensible defaults for the carousel root.
	 * for instance enables rewind/rewindByDrag which is most-likely the case for
	 * most use cases
	 */
	setDefaultOptions?: boolean;
	/**
	 * will fade/reduce-opacity of every slide expect the active one
	 */
	focusCenter?: {
		enable: true;
		/**
		 * the scaling factor of active element
		 */
		scalingFactor?: number;
		inactiveSlideOpacity?: number;
	};
};

export default function Carousel({ focusCenter, className, options, setDefaultOptions = true, ...restProps }: Props) {
	const theme = useTheme();

	const newOptions: Options | undefined = setDefaultOptions
		? {
				arrows: false,
				rewind: true,
				rewindByDrag: true,
				pagination: false,
				wheel: true,
				keyboard: 'focused',
				direction: theme.direction,
				...options
			}
		: options;

	if (focusCenter?.enable) {
		className += ` ${styles['focus-center']}`;
	}

	return (
		<Splide
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
}
