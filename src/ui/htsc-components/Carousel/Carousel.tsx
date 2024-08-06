import { Options, Splide, SplideProps } from '@splidejs/react-splide';

export type Props = SplideProps & {
	/**
	 * sets a sensible defaults for the carousel root.
	 * for instance enables rewind/rewindByDrag which is most-likely the case for
	 * most use cases
	 */
	setDefaultOptions?: true;
};

export default function Carousel({ setDefaultOptions, options, ...restProps }: Props) {
	const newOptions: Options | undefined = setDefaultOptions
		? {
				arrows: false,
				rewind: true,
				rewindByDrag: true,
				pagination: false,
				wheel: true,
				keyboard: 'focused',
				...options
			}
		: options;

	return (
		<Splide
			{...restProps}
			options={newOptions}
		></Splide>
	);
}
