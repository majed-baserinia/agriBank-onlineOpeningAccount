import { IRequest } from '@Mediatr/index';

export default class RejectGiveBackChequeVerifyOtpCommand implements IRequest<{}> {
	transferChequeKey: string;
	otpCode: string;
	selectSingleSignatureLegal: boolean;

	constructor(formData: RejectGiveBackChequeVerifyOtpCommand) {
		this.transferChequeKey = formData.transferChequeKey;
		this.otpCode = formData.otpCode;
		this.selectSingleSignatureLegal = formData.selectSingleSignatureLegal;
	}
}
