import { IRequest } from '@Mediatr/index';
import { GiveBackChequeVerifyOtpResponse } from 'common/entities/cheque/GivebackCheck/GiveBackChequeVerifyOtp/GiveBackChequeVerifyOtpResponse';

export default class GiveBackChequeVerifyOtpCommand implements IRequest<GiveBackChequeVerifyOtpResponse> {
	transferChequeKey: string;
	otpCode: string;
	selectSingleSignatureLegal: boolean;

	constructor(formData: GiveBackChequeVerifyOtpCommand) {
		this.transferChequeKey = formData.transferChequeKey;
		this.otpCode = formData.otpCode;
		this.selectSingleSignatureLegal = formData.selectSingleSignatureLegal;
	}
}
