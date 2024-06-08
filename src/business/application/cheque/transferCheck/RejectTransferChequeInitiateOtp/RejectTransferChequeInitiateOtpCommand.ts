import { IRequest } from '@Mediatr/index';
import { RejectTransferChequeInitiateOtpRequest } from 'common/entities/cheque/transferCheck/RejectTransferChequeInitiateOtp/RejectTransferChequeInitiateOtpRequest';

export default class RejectTransferChequeInitiateOtpCommand implements IRequest<RejectTransferChequeInitiateOtpRequest> {
	transferChequeKey: string;

	constructor(input: RejectTransferChequeInitiateOtpCommand) {
		this.transferChequeKey = input.transferChequeKey;
	}
}
