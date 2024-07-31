import { createBrowserRouter } from 'react-router-dom';
import PersonalInfoPage from 'ui/pages/PersonalInfoPage';
import ErrorPage from '../pages/ErrorPage';
import HomePage from '../pages/HomePage';
import Layout from '../pages/Layout';
import { paths } from './paths';
import OtpPage from 'ui/pages/OtpPage';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		errorElement: <ErrorPage />,
		children: [
			{ index: true, path: paths.Home, element: <HomePage /> },
			{ path: paths.PersonalInfoPage, element: <PersonalInfoPage /> },
			{ path: paths.otp, element: <OtpPage /> }
		]
	}
]);

export default router;
