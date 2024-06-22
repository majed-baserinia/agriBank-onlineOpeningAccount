import { IRequest } from '@Mediatr/index';
import { RejectGiveBackChequeVerifyOtpResponse } from 'common/entities/cheque/RejectGiveBackCheck/RejectGiveBackChequeVerifyOtp/GiveBackChequeVerifyOtpResponse';

export default class RejectGiveBackChequeVerifyOtpCommand implements IRequest<RejectGiveBackChequeVerifyOtpResponse> {
	transferChequeKey: string;
	otpCode: string;
	selectSingleSignatureLegal: boolean;

	constructor(formData: RejectGiveBackChequeVerifyOtpCommand) {
		this.transferChequeKey = formData.transferChequeKey;
		this.otpCode = formData.otpCode;
		this.selectSingleSignatureLegal = formData.selectSingleSignatureLegal;
	}
}
