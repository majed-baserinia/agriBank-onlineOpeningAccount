import { IRequest } from '@Mediatr/index';
import { TransferChequeFinalizeResponse } from 'common/entities/cheque/transferCheck/TransferChequeFinalize/TransferChequeFinalizeResponse';

export default class TransferChequeFinalizeCommand implements IRequest<TransferChequeFinalizeResponse> {
	transferChequeKey: string;

	constructor(input: TransferChequeFinalizeCommand) {
		this.transferChequeKey = input.transferChequeKey;
	}
}
