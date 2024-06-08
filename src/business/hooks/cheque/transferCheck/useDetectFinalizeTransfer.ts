import { useChecklistData } from 'business/stores/checklistData/checklistData';
import useRejectTransfercCequeFinalize from './useRejectTransfercCequeFinalize';
import useTransferChequeFinalize from './useTransferChequeFinalize';

export default function useDetectFinalizeTransfer() {
	const { transferAction } = useChecklistData();
	if (transferAction === 'confirm') {
		return useTransferChequeFinalize;
	}
	if (transferAction === 'reject') {
		return useRejectTransfercCequeFinalize;
	}
    return useTransferChequeFinalize;
}
