import { IRequest } from '@Mediatr/index';
import { RejectTransferChequeVerifyOtpResponse } from 'common/entities/cheque/transferCheck/RejectTransferChequeVerifyOtp/RejectTransferChequeVerifyOtpResponse';

export default class RejectTransferChequeVerifyOtpCommand implements IRequest<RejectTransferChequeVerifyOtpResponse> {
	transferChequeKey: string;
	otpCode: string;
	selectSingleSignatureLegal: boolean;

	constructor(input: RejectTransferChequeVerifyOtpCommand) {
		this.transferChequeKey = input.transferChequeKey;
		this.otpCode = input.otpCode;
		this.selectSingleSignatureLegal = input.selectSingleSignatureLegal;
	}
}
