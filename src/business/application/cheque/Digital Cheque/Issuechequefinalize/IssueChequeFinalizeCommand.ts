import { IRequest } from '@Mediatr/index';
import { IssueChequeFinalizeResponse } from 'common/entities/cheque/Digital Cheque/IssueChequeFinalize/IssueChequeFinalizeResponse';

export default class IssueChequeFinalizeCommand implements IRequest<IssueChequeFinalizeResponse> {
	issueChequeKey: string;

	constructor(IssueChequeFinalizeCommand: IssueChequeFinalizeCommand) {
		this.issueChequeKey = IssueChequeFinalizeCommand.issueChequeKey;
	}
}
