import { IRequestHandler, requestHandler } from '@Mediatr/index';
import APIClient from 'business/infrastructure/api-client';

import { RecieverNameInquiry } from 'business/infrastructure/end-points';
import { RecieverNameInquiryRequest } from 'common/entities/cheque/Digital Cheque/RecieverNameInquiry/RecieverNameInquiryRequest';
import { RecieverNameInquiryResponse } from 'common/entities/cheque/Digital Cheque/RecieverNameInquiry/RecieverNameInquiryResponse';
import RecieverNameInquiryCommand from './RecieverNameInquiryCommand';

@requestHandler(RecieverNameInquiryCommand)
export class RecieverNameInquiryCommandHandler
	implements IRequestHandler<RecieverNameInquiryCommand, RecieverNameInquiryResponse>
{
	handle(value: RecieverNameInquiryCommand): Promise<RecieverNameInquiryResponse> {
		const apiClient = new APIClient<RecieverNameInquiryRequest, RecieverNameInquiryResponse>(RecieverNameInquiry);
		return apiClient.post(<RecieverNameInquiryRequest>{
			IdCode: value.IdCode,
			IdType: value.IdType,
			SayadId: value.SayadId
		});
	}
}
