import '@glidejs/glide/dist/css/glide.core.css';
import Root from './Root/Root';
import Slide from './Slide/Slide';

// TODO: everything exported from here should only expose props that are interchangeable between libraries
// basically this should be a facade and the underlying library should be able to be changed
export default {
	Root: Root,
	Slide: Slide
};
