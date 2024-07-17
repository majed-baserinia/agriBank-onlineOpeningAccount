import { IRequest } from '@Mediatr/index';
import { CheckInitiateOtpResponse } from 'common/entities/CheckInitiateOtp/CheckInitiateOtpResponse';

export default class CheckInitiateOtpCommand implements IRequest<CheckInitiateOtpResponse> {
	issueChequeKey?: string;

	constructor(CheckInitiateOtpCommand: CheckInitiateOtpCommand) {
		this.issueChequeKey = CheckInitiateOtpCommand.issueChequeKey;
	}
}
