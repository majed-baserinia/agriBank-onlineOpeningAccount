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
import ChecksList from 'ui/pages/receivedChecksList/ChecksList';
import SelectCheckList from 'ui/pages/receivedChecksList/SelectCheckList';
import ErrorPage from '../pages/ErrorPage';
import HomePage from '../pages/HomePage';
import Layout from '../pages/Layout';
import { paths } from './paths';
import Details from 'ui/pages/receivedChecksList/Details';
import CheckNewInfo from 'ui/pages/receivedChecksList/TransferCheck/CheckNewInfo';
import AddNewReceivers from 'ui/pages/receivedChecksList/TransferCheck/AddNewReceivers';
import OtpTransferConfirmation from 'ui/pages/receivedChecksList/TransferCheck/OtpTransferConfirmation';
import TransferSignatureGroup from 'ui/pages/receivedChecksList/TransferCheck/TransferSignatureGroup';
import TransferOverView from 'ui/pages/receivedChecksList/TransferCheck/TransferOverView';
import CashingCehck from 'ui/pages/receivedChecksList/CashingCehck';
import SelectTransferredCheckList from 'ui/pages/transferredChecks/SelectTransferredCheckList';
import TransferredChecksList from 'ui/pages/transferredChecks/TransferredChecksList';
import TransferredCheckDetail from 'ui/pages/transferredChecks/TransferredCheckDetail';
import GiveBackCheck from 'ui/pages/receivedChecksList/GiveBack/GiveBackCheckInitiate';
import GiveBackCheckInitiate from 'ui/pages/receivedChecksList/GiveBack/GiveBackCheckInitiate';
import GiveBackCheckOTP from 'ui/pages/receivedChecksList/GiveBack/GiveBackCheckOTP';
import GiveBackCheckSignature from 'ui/pages/receivedChecksList/GiveBack/GiveBackCheckSignature';

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
			},
			{
				path: paths.ReceivedChecksList.SelectCheckList,
				element: <SelectCheckList />
			},

			{
				path: paths.ReceivedChecksList.ChecksList,
				element: <ChecksList />
			},
			{
				path: paths.ReceivedChecksList.Detail,
				element: <Details />
			},
			{
				path: paths.ReceivedChecksList.TransferCheck,
				element: <CheckNewInfo />
			},
			{
				path: paths.ReceivedChecksList.AddNewReceivers,
				element: <AddNewReceivers />
			},
			{
				path: paths.ReceivedChecksList.OtpTransferConfirmation,
				element: <OtpTransferConfirmation />
			},
			{
				path: paths.ReceivedChecksList.TransferSignatureGroup,
				element: <TransferSignatureGroup />
			},
			{
				path: paths.ReceivedChecksList.TransferOverView,
				element: <TransferOverView />
			},
			{
				path: paths.ReceivedChecksList.CashingCehck,
				element: <CashingCehck />
			},
			{
				path: paths.TransferredChecks.SelectTransferredCheckList,
				element: <SelectTransferredCheckList />
			},
			{
				path: paths.TransferredChecks.TransferredChecksList,
				element: <TransferredChecksList />
			},
			{
				path: paths.TransferredChecks.TransferredCheckDetail,
				element: <TransferredCheckDetail />
			},
			{
				path: paths.ReceivedChecksList.GiveBackCheckInitiate,
				element: <GiveBackCheckInitiate />
			},
			{
				path: paths.ReceivedChecksList.GiveBackCheckOTP,
				element: <GiveBackCheckOTP />
			},
			{
				path: paths.ReceivedChecksList.GiveBackCheckSignature,
				element: <GiveBackCheckSignature />
			},
		]
	}
]);

export default router;
