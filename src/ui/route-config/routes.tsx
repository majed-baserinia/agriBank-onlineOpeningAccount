import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from '../pages/ErrorPage';
import HomePage from '../pages/HomePage';
import Layout from '../pages/Layout';
import { paths } from './paths';
import PersonalInfoPage from 'ui/pages/PersonalInfoPage';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		errorElement: <ErrorPage />,
		children: [
			{ index: true, path: paths.Home, element: <HomePage /> },
			{  path: paths.PersonalInfoPage, element: <PersonalInfoPage /> }
		]
	}
]);

export default router;
