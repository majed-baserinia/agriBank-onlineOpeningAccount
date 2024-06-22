import { IRequest } from '@Mediatr/index';
import { TransferChequeInitiateOtpResponse } from 'common/entities/cheque/transferCheck/TransferChequeInitiateOtp/TransferChequeInitiateOtpResponse';

export default class TransferChequeInitiateOtpCommand implements IRequest<TransferChequeInitiateOtpResponse> {
	transferChequeKey: string;

	constructor(input: TransferChequeInitiateOtpCommand) {
		this.transferChequeKey = input.transferChequeKey;
	}
}
