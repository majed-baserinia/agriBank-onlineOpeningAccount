import { useChecklistData } from 'business/stores/checklistData/checklistData';

import useTransferChequeFinalize from './useTransferChequeFinalize';
import useRejectTransferChequeFinalize from './useRejectTransferChequeFinalize';

export default function useDetectFinalizeTransfer() {
	const { transferAction } = useChecklistData();
	if (transferAction === 'confirm') {
		return useTransferChequeFinalize;
	}
	if (transferAction === 'reject') {
		return useRejectTransferChequeFinalize;
	}
    return useTransferChequeFinalize;
}
