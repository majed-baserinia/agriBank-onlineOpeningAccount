import { IRequest } from '@Mediatr/index';
import { CheckInitiateOtpResponse } from 'common/entities/cheque/Digital Cheque/CheckInitiateOtp/CheckInitiateOtpResponse';

export default class VerifyOtpCommand implements IRequest<CheckInitiateOtpResponse> {
	issueChequeKey: string;
	otpCode: string;
	signSingleSignatureLegal: boolean;

	constructor(VerifyOtpCommand: VerifyOtpCommand) {
		this.issueChequeKey = VerifyOtpCommand.issueChequeKey;
		this.otpCode = VerifyOtpCommand.otpCode;
		this.signSingleSignatureLegal = VerifyOtpCommand.signSingleSignatureLegal;
	}
}
