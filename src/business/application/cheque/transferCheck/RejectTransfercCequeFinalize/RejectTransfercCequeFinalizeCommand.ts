import { IRequest } from '@Mediatr/index';
import { RejectTransfercCequeFinalizeResponse } from 'common/entities/cheque/transferCheck/RejectTransfercCequeFinalize/RejectTransfercCequeFinalizeResponse';

export default class RejectTransfercCequeFinalizeCommand implements IRequest<RejectTransfercCequeFinalizeResponse> {
	transferChequeKey: string;

	constructor(input: RejectTransfercCequeFinalizeCommand) {
		this.transferChequeKey = input.transferChequeKey;
	}
}
