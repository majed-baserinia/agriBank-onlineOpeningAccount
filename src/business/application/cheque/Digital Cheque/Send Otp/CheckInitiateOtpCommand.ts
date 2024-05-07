import { IRequest } from '@Mediatr/index';
import { CheckInitiateOtpResponse } from 'common/entities/cheque/Digital Cheque/CheckInitiateOtp/CheckInitiateOtpResponse';

export default class CheckInitiateOtpCommand implements IRequest<CheckInitiateOtpResponse> {
	issueChequeKey?: string;

	constructor(CheckInitiateOtpCommand: CheckInitiateOtpCommand) {
		this.issueChequeKey = CheckInitiateOtpCommand.issueChequeKey;
	}
}
