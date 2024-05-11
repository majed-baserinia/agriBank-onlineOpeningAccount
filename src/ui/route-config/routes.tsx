import { createBrowserRouter } from 'react-router-dom';
import AddReceivers from 'ui/pages/IssueCheck/AddRecievers';
import CheckInfo from 'ui/pages/IssueCheck/CheckInfo';
import OtpCheck from 'ui/pages/IssueCheck/OtpCheck';
import OverView from 'ui/pages/IssueCheck/OverView';
import SelectAccount from 'ui/pages/IssueCheck/SelectAccount';
import SignatureGroup from 'ui/pages/IssueCheck/SignatureGroup';
import SignatureRegistration from 'ui/pages/IssueCheck/SignatureRegistration';
import ActivationFirstStep from 'ui/pages/activation/ActivationFirstStep';
import ActivationSecondStep from 'ui/pages/activation/ActivationSecondStep';
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
			{
				path: paths.Activation.firstStepPath,
				element: <ActivationFirstStep />
			},
			{
				path: paths.Activation.secondStepPath,
				element: <ActivationSecondStep />
			},
			{
				path: paths.IssueCheck.SelectAccountPath,
				element: <SelectAccount />
			},
			{
				path: paths.IssueCheck.CheckInfoPath,
				element: <CheckInfo />
			},
			{
				path: paths.IssueCheck.addReceiversPath,
				element: <AddReceivers />
			},
			{
				path: paths.IssueCheck.SignatureRegistrationPath,
				element: <SignatureRegistration />
			},
			{
				path: paths.IssueCheck.SignatureGroupPath,
				element: <SignatureGroup />
			},
			{
				path: paths.IssueCheck.OverViewPath,
				element: <OverView />
			},
			{
				path: paths.IssueCheck.OtpCheckPath,
				element: <OtpCheck />
			}
		]
	}
]);

export default router;
