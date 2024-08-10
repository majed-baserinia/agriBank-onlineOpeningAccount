import '@glidejs/glide/dist/css/glide.core.css';
import Carousel from './Root/Carousel';
import Slide from './Slide/Slide';

// TODO: everything exported from here should only expose props that are interchangeable between libraries
// basically this should be a facade and the underlying library should be able to be changed
export default {
	Root: Carousel,
	Slide: Slide
};
