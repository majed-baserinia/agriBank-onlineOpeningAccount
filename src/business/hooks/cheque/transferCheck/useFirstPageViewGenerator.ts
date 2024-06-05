import { useChecklistData } from 'business/stores/checklistData/checklistData';
import { useEffect, useState } from 'react';
import useInquiryTransferStatus from './useInquiryTransferStatus';

export default function useFirstPageViewGenerator() {
	const { selectedCheck } = useChecklistData((store) => store);
	const { data: inqueryStatusResponse, error, mutate: inqueryStatus, isLoading } = useInquiryTransferStatus();
	const [view, setView] = useState<'1' | '2' | '3'>('1');

	useEffect(() => {
		if (selectedCheck) {
			inqueryStatus(
				{ sayadNo: selectedCheck.sayadNo, chequeHolderNationalCode: "" },
				{
					onError(error, variables, context) {
						setView('1');
					},
					onSuccess(data, variables, context) {
						//check if ther is receivers on the response object and if it is,
						//it means that the fist person already started the transfer and the view should be 2
						if (data.receivers.length > 0) {
							setView('2');
						} else {
							setView('1');
						}
					}
				}
			);
		}
		//call an api for checking if it is persional or company and if it is first person or not
		//set a time out for the api call and if has no response set the view to 3
	}, []);

	return { view, isLoading };
}
