import { IRequest } from '@Mediatr/index';
import { InquiryWithGroupResponse } from 'common/entities/cheque/Digital Cheque/Inquiry Groups/InquiryWithGroupResponse';

export default class InquiryWithDrawalGroupsCommand implements IRequest<InquiryWithGroupResponse> {
	issueChequeKey: string;

	constructor(InquiryWithDrawalGroupsCommand: InquiryWithDrawalGroupsCommand) {
		this.issueChequeKey = InquiryWithDrawalGroupsCommand.issueChequeKey;
	}
}
