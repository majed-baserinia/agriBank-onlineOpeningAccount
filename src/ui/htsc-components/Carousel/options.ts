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
	 * * this will wrap `Slide` components in an additional div
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
