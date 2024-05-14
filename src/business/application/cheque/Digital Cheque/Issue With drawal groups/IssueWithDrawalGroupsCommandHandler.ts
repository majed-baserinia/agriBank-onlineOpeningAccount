import { IRequestHandler, requestHandler } from '@Mediatr/index';
import IssueWithDrawalGroupsCommand from 'business/application/cheque/Digital Cheque/Issue With drawal groups/IssueWithDrawalGroupsCommand';
import APIClient from 'business/infrastructure/api-client';
import { IssueChequeIssueWithDrawalGroup } from 'business/infrastructure/end-points';
import { IssueWithGroupRequest } from 'common/entities/cheque/Digital Cheque/Issue Groups/IssueWithGroupRequest';
import { IssueWithGroupResponse } from 'common/entities/cheque/Digital Cheque/Issue Groups/IssueWithGroupResponse';

@requestHandler(IssueWithDrawalGroupsCommand)
export class IssueWithDrawalGroupsCommandHandler
	implements IRequestHandler<IssueWithDrawalGroupsCommand, IssueWithGroupResponse>
{
	handle(value: IssueWithDrawalGroupsCommand): Promise<IssueWithGroupResponse> {
		const apiClient = new APIClient<IssueWithGroupRequest, IssueWithGroupResponse>(IssueChequeIssueWithDrawalGroup);
		return apiClient.post(<IssueWithGroupRequest>{
			isSequentional: value.isSequentional,
			withDrawalGroups: value.withDrawalGroups
		});
	}
}
