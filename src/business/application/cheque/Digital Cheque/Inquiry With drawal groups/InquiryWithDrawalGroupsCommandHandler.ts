import { IRequestHandler, requestHandler } from '@Mediatr/index';
import InquiryWithDrawalGroupsCommand from 'business/application/cheque/Digital Cheque/Inquiry With drawal groups/InquiryWithDrawalGroupsCommand';
import APIClient from 'business/infrastructure/api-client';

import { VerifyOtp } from 'business/infrastructure/end-points';
import { InquiryWithGroupRequest } from 'common/entities/cheque/Digital Cheque/Inquiry Groups/InquiryWithGroupRequest';
import { InquiryWithGroupResponse } from 'common/entities/cheque/Digital Cheque/Inquiry Groups/InquiryWithGroupResponse';

@requestHandler(InquiryWithDrawalGroupsCommand)
export class InquiryWithDrawalGroupsCommandHandler
	implements IRequestHandler<InquiryWithDrawalGroupsCommand, InquiryWithGroupResponse>
{
	handle(value: InquiryWithDrawalGroupsCommand): Promise<InquiryWithGroupResponse> {
		const apiClient = new APIClient<InquiryWithGroupRequest, InquiryWithGroupResponse>(VerifyOtp);
		return apiClient.post(<InquiryWithGroupRequest>{
			issueChequeKey: value.issueChequeKey
		});
	}
}
