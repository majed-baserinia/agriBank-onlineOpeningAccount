import { CartableInquiryResponse } from 'common/entities/cheque/chekList/CartableInquiry/CartableInquiryResponse';
import { GetAllRelatedCustomersResponse } from 'common/entities/cheque/chekList/GetAllRelatedCustomers/GetAllRelatedCustomersResponse';
import { create } from 'zustand';

interface chekListData {
	relatedCustomers?: GetAllRelatedCustomersResponse;
	cartableListData?: CartableInquiryResponse;
	sayadNo?: number
	addNewData: (data: {}) => void;
}

export const useChecklistData = create<chekListData>((set) => ({
	addNewData: (data) => {
		set((store) => ({
			...store,
			...data
		}));
	}
}));
