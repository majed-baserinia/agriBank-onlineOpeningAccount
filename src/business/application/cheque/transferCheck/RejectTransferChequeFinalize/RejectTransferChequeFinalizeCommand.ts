import { IRequest } from '@Mediatr/index';
import { RejectTransferChequeFinalizeResponse } from 'common/entities/cheque/transferCheck/RejectTransferChequeFinalize/RejectTransferChequeFinalizeResponse';
export default class RejectTransferChequeFinalizeCommand implements IRequest<RejectTransferChequeFinalizeResponse> {
	transferChequeKey: string;

	constructor(input: RejectTransferChequeFinalizeCommand) {
		this.transferChequeKey = input.transferChequeKey;
	}
}
