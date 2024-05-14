import { IRequest } from '@Mediatr/index';
import { WithdrawalDetails } from 'common/entities/cheque/Digital Cheque/Issue Groups/IssueWithGroupRequest';
import { IssueWithGroupResponse } from 'common/entities/cheque/Digital Cheque/Issue Groups/IssueWithGroupResponse';

export default class IssueWithDrawalGroupsCommand implements IRequest<IssueWithGroupResponse> {
	issueChequeKey: string;
	withDrawalGroup: WithdrawalDetails[];

	constructor(IssueWithDrawalGroupsCommand: IssueWithDrawalGroupsCommand) {
		this.issueChequeKey = IssueWithDrawalGroupsCommand.issueChequeKey;
		this.withDrawalGroup = IssueWithDrawalGroupsCommand.withDrawalGroup;
	}
}
