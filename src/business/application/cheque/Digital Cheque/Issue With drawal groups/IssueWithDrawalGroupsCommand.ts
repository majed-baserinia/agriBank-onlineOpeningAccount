import { IRequest } from '@Mediatr/index';
import { WithdrawalDetails } from 'common/entities/cheque/Digital Cheque/Issue Groups/IssueWithGroupRequest';
import { IssueWithGroupResponse } from 'common/entities/cheque/Digital Cheque/Issue Groups/IssueWithGroupResponse';

export default class IssueWithDrawalGroupsCommand implements IRequest<IssueWithGroupResponse> {
	issueChequeKey: string;
	isSequentional: boolean;
	withDrawalGroup: WithdrawalDetails[];

	constructor(IssueWithDrawalGroupsCommand: IssueWithDrawalGroupsCommand) {
		this.issueChequeKey = IssueWithDrawalGroupsCommand.issueChequeKey;
		this.isSequentional = IssueWithDrawalGroupsCommand.isSequentional;
		this.withDrawalGroup = IssueWithDrawalGroupsCommand.withDrawalGroup;
	}
}
