import { RecieverRequest } from 'common/entities/cheque/Digital Cheque/IssueChequeInitiate/IssueChequeInitiateRequest';
import {
	CartableInquiryResponse,
	Check
} from 'common/entities/cheque/chekList/CartableInquiry/CartableInquiryResponse';
import { GetAllRelatedCustomersResponse } from 'common/entities/cheque/chekList/GetAllRelatedCustomers/GetAllRelatedCustomersResponse';
import { TransferChequeInitiateResponse } from 'common/entities/cheque/transferCheck/TransferChequeInitiate/TransferChequeInitiateResponse';
import { TransferChequeVerifyOtpResponse } from 'common/entities/cheque/transferCheck/TransferChequeVerifyOtp/TransferChequeVerifyOtpResponse';
import { create } from 'zustand';

interface Functions {
	addNewData: <T extends keyof chekListData>(data: Record<T, chekListData[T]>) => void;
	reset: () => void;
}

interface chekListData {
	transferAction?: 'confirm' | 'reject';
	relatedCustomers?: GetAllRelatedCustomersResponse;
	cartableListData?: CartableInquiryResponse;
	selectedCheck?: Check;
	basicCheckData?: { reason: { value: string; name: string }; description: string; toIban: string };
	otpTransferRequirments?: TransferChequeInitiateResponse;
	transferOverview?: TransferChequeVerifyOtpResponse;
	receivers?: RecieverRequest[];
	giveBackChequeInitiateResponse?: GivebackChequeInitiateResponse;
	GiveBackChequeVerifyOtpResponse?: GiveBackChequeVerifyOtpResponse;
	RejectGiveBackChequeInitiateResponse?: RejectGivebackChequeInitiateResponse;
}

export const useChecklistData = create<Functions & chekListData>((set) => ({
	addNewData: (data) => {
		set((store) => ({
			...store,
			...data
		}));
	},
	reset: () => {
		set((store) => ({}));
	}
}));
