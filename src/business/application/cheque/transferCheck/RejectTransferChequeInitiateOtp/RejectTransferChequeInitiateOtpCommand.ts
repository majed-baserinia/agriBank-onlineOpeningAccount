import { IRequest } from '@Mediatr/index';
import { RejectTransferChequeInitiateOtpResponse } from 'common/entities/cheque/transferCheck/RejectTransferChequeInitiateOtp/RejectTransferChequeInitiateOtpResponse';

export default class RejectTransferChequeInitiateOtpCommand
	implements IRequest<RejectTransferChequeInitiateOtpResponse>
{
	transferChequeKey: string;

	constructor(input: RejectTransferChequeInitiateOtpCommand) {
		this.transferChequeKey = input.transferChequeKey;
	}
}
