import { IRequest } from '@Mediatr/index';
import { TransferChequeVerifyOtpRequest } from 'common/entities/cheque/transferCheck/TransferChequeVerifyOtp/TransferChequeVerifyOtpRequest';

export default class TransferChequeVerifyOtpCommand implements IRequest<TransferChequeVerifyOtpRequest> {
	transferChequeKey: string;
	otpCode: string;
	selectSingleSignatureLegal: boolean;

	constructor(input: TransferChequeVerifyOtpCommand) {
		this.transferChequeKey = input.transferChequeKey;
		this.otpCode = input.otpCode;
		this.selectSingleSignatureLegal = input.selectSingleSignatureLegal;
	}
}
