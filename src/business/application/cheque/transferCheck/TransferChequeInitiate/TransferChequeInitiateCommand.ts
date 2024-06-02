import { IRequest } from '@Mediatr/index';
import { RecieverRequest } from 'common/entities/cheque/Digital Cheque/IssueChequeInitiate/IssueChequeInitiateRequest';
import { TransferChequeInitiateRequest } from 'common/entities/cheque/transferCheck/TransferChequeInitiate/TransferChequeInitiateRequest';

export default class TransferChequeInitiateCommand implements IRequest<TransferChequeInitiateRequest> {
	sayadNo: number;
	description: string;
	reason: string;
	toIban?: string;
	recievers: RecieverRequest[];

	constructor(input: TransferChequeInitiateCommand) {
		this.sayadNo = input.sayadNo;
		this.description = input.description;
		this.reason = input.reason;
		this.toIban = input.toIban;
		this.recievers = input.recievers;
	}
}
