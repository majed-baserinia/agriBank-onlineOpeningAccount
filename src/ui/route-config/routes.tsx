import { createBrowserRouter } from 'react-router-dom';
import LocationInfoPage from 'ui/pages/LocationInfo';
import ObligationPage from 'ui/pages/ObligationPage';
import OtpPage from 'ui/pages/OtpPage';
import PersonalInfoPage from 'ui/pages/PersonalInfoPage';
import ErrorPage from '../pages/ErrorPage';
import HomePage from '../pages/HomePage';
import Layout from '../pages/Layout';
import { paths } from './paths';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		errorElement: <ErrorPage />,
		children: [
			{ index: true, path: paths.Home, element: <HomePage /> },
			{ path: paths.PersonalInfoPage, element: <PersonalInfoPage /> },
			{ path: paths.otp, element: <OtpPage /> },
			{ path: paths.obligation, element: <ObligationPage /> },
			{ path: paths.locationInfo, element: <LocationInfoPage /> }
		]
	}
]);

export default router;
