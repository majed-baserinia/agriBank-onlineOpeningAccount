import { IRequest } from '@Mediatr/index';
import { InquiryTransferStatusRequest } from 'common/entities/cheque/transferCheck/InquiryTransferStatus/InquiryTransferStatusRequest';

export default class InquiryTransferStatusCommand implements IRequest<InquiryTransferStatusRequest> {
	sayadNo: number;
	chequeHolderNationalCode: string;

	constructor(input: InquiryTransferStatusCommand) {
		this.sayadNo = input.sayadNo;
		this.chequeHolderNationalCode = input.chequeHolderNationalCode;
	}
}
