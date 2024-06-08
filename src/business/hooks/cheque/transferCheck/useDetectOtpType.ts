import { useChecklistData } from 'business/stores/checklistData/checklistData';
import { useEffect } from 'react';
import useRejectTransferChequeInitiateOtp from './useRejectTransferChequeInitiateOtp';
import useRejectTransferChequeVerifyOtp from './useRejectTransferChequeVerifyOtp';
import useTransferChequeInitiateOtp from './useTransferChequeInitiateOtp';
import useTransferChequeVerifyOtp from './useTransferChequeVerifyOtp';

export default function useDetectOtpType() {
	const { transferAction } = useChecklistData();

	let initOtp = useTransferChequeInitiateOtp;
	let verifyOtp = useTransferChequeVerifyOtp;

	useEffect(() => {
		if (transferAction === 'confirm') {
			initOtp = useTransferChequeInitiateOtp;
			verifyOtp = useTransferChequeVerifyOtp;
		}
		if (transferAction === 'reject') {
			initOtp = useRejectTransferChequeInitiateOtp;
			verifyOtp = useRejectTransferChequeVerifyOtp;
		}
	}, []);

	return {
		initOtp,
		verifyOtp
	};
}
