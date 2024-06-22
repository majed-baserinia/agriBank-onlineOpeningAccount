import { IRequest } from '@Mediatr/index';
import { InquiryTransferStatusRespone } from 'common/entities/cheque/transferCheck/InquiryTransferStatus/InquiryTransferStatusResponse';

export default class InquiryTransferStatusCommand implements IRequest<InquiryTransferStatusRespone> {
	sayadNo: number;
	chequeHolderNationalCode: string;

	constructor(input: InquiryTransferStatusCommand) {
		this.sayadNo = input.sayadNo;
		this.chequeHolderNationalCode = input.chequeHolderNationalCode;
	}
}
