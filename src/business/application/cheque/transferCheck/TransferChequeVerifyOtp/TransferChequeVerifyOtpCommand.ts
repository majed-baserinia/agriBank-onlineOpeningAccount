import { IRequest } from '@Mediatr/index';
import { TransferChequeVerifyOtpResponse } from 'common/entities/cheque/transferCheck/TransferChequeVerifyOtp/TransferChequeVerifyOtpResponse';

export default class TransferChequeVerifyOtpCommand implements IRequest<TransferChequeVerifyOtpResponse> {
	transferChequeKey: string;
	otpCode: string;
	selectSingleSignatureLegal: boolean;

	constructor(input: TransferChequeVerifyOtpCommand) {
		this.transferChequeKey = input.transferChequeKey;
		this.otpCode = input.otpCode;
		this.selectSingleSignatureLegal = input.selectSingleSignatureLegal;
	}
}
