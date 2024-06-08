import { IRequest } from '@Mediatr/index';
import { TransferChequeInitiateOtpRequest } from 'common/entities/cheque/transferCheck/TransferChequeInitiateOtp/TransferChequeInitiateOtpRequest';

export default class TransferChequeInitiateOtpCommand implements IRequest<TransferChequeInitiateOtpRequest> {
	transferChequeKey: string;

	constructor(input: TransferChequeInitiateOtpCommand) {
		this.transferChequeKey = input.transferChequeKey;
	}
}
