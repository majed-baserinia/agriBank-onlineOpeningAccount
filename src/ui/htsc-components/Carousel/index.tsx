import '@splidejs/react-splide/css/core';
import Carousel from './Carousel';
import Slide from './Slide';

// TODO: everything exported from here should only expose props that are interchangeable between libraries
// basically this should be a facade and the underlying library should be able to be changed
export default {
	Root: Carousel,
	Slide: Slide
};
