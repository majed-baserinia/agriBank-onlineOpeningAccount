import { IRequest } from '@Mediatr/index';
import { InquiryTransferStatusRequest } from 'common/entities/cheque/transferCheck/InquiryTransferStatus/InquiryTransferStatusRequest';

export default class InquiryTransferStatusCommand implements IRequest<InquiryTransferStatusRequest> {
	sayadNo: number;

	constructor(input: InquiryTransferStatusCommand) {
		this.sayadNo = input.sayadNo;
	}
}
