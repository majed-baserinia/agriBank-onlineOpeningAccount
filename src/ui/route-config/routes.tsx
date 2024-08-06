import { createBrowserRouter } from 'react-router-dom';
import LocationInfoPage from 'ui/pages/LocationInfoPage';
import NationalCardImagePage from 'ui/pages/NationalCardImagePage';
import ObligationPage from 'ui/pages/ObligationPage';
import OtpPage from 'ui/pages/OtpPage';
import PersonalInfoPage from 'ui/pages/PersonalInfoPage';
import SelectAddressPage from 'ui/pages/SelectAddressPage';
import SelectCardPage from 'ui/pages/SelectCardPage';
import SelectCardTypePage from 'ui/pages/SelectCardTypePage';
import ThirdPartyAuthPage from 'ui/pages/ThirdPartyAuthPage';
import ErrorPage from '../pages/ErrorPage';
import HomePage from '../pages/HomePage';
import Layout from '../pages/Layout';
import { paths } from './paths';
import ResultPage from 'ui/pages/ResultPage';

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
			{ path: paths.locationInfo, element: <LocationInfoPage /> },
			{ path: paths.selectCard, element: <SelectCardPage /> },
			{ path: paths.selectAddress, element: <SelectAddressPage /> },
			{ path: paths.selectCardType, element: <SelectCardTypePage /> },
			{ path: paths.nationalCardImage, element: <NationalCardImagePage /> },
			{ path: paths.thirdPartyAuth, element: <ThirdPartyAuthPage /> },
			{ path: paths.result, element: <ResultPage /> }
		]
	}
]);

export default router;
