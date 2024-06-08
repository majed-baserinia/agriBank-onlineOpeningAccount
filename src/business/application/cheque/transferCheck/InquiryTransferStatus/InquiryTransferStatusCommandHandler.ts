import { IRequestHandler, requestHandler } from '@Mediatr/index';
import APIClient from 'business/infrastructure/api-client';
import { InquiryTransferStatus } from 'business/infrastructure/end-points';
import { InquiryTransferStatusRequest } from 'common/entities/cheque/transferCheck/InquiryTransferStatus/InquiryTransferStatusRequest';
import { InquiryTransferStatusRespone } from 'common/entities/cheque/transferCheck/InquiryTransferStatus/InquiryTransferStatusResponse';
import InquiryTransferStatusCommand from './InquiryTransferStatusCommand';

@requestHandler(InquiryTransferStatusCommand)
export class InquiryTransferStatusCommandHandler
	implements IRequestHandler<InquiryTransferStatusCommand, InquiryTransferStatusRespone>
{
	handle(value: InquiryTransferStatusCommand): Promise<InquiryTransferStatusRespone> {
		const apiClient = new APIClient<InquiryTransferStatusRequest, InquiryTransferStatusRespone>(
			InquiryTransferStatus
		);
		return apiClient.post(<InquiryTransferStatusRequest>{
			sayadNo: value.sayadNo,
			chequeHolderNationalCode: value.chequeHolderNationalCode
		});
	}
}
