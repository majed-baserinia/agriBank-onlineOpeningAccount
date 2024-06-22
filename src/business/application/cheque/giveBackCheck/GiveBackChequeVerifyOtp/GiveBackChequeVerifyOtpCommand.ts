import { IRequest } from '@Mediatr/index';

export default class GiveBackChequeVerifyOtpCommand implements IRequest<{}> {
	transferChequeKey: string;
	otpCode: string;
	selectSingleSignatureLegal: boolean;

	constructor(formData: GiveBackChequeVerifyOtpCommand) {
		this.transferChequeKey = formData.transferChequeKey;
		this.otpCode = formData.otpCode;
		this.selectSingleSignatureLegal = formData.selectSingleSignatureLegal;
	}
}
