import { IRequest } from '@Mediatr/index';
import { RecieverRequest } from 'common/entities/cheque/Digital Cheque/IssueChequeInitiate/IssueChequeInitiateRequest';
import { TransferChequeInitiateRequest } from 'common/entities/cheque/transferCheck/TransferChequeInitiate/TransferChequeInitiateRequest';

export default class RejectTransferChequeInitiateCommand implements IRequest<TransferChequeInitiateRequest> {
	customerNumber: number;
	sayadNo: number;
	description: string;
	reason: string;
	toIban?: string;
	receivers: RecieverRequest[];

	constructor(input: RejectTransferChequeInitiateCommand) {
		this.customerNumber = input.customerNumber;
		this.sayadNo = input.sayadNo;
		this.description = input.description;
		this.reason = input.reason;
		this.toIban = input.toIban;
		this.receivers = input.receivers;
	}
}
