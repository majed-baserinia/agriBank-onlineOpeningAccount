import { IRequest } from '@Mediatr/index';
import { VerificationOTPResponse } from 'common/entities/VerificationOTP/VerificationOTPResponse';

export default class VerificationOTPCommand implements IRequest<VerificationOTPResponse> {
	nationalCode: string;
	mobile: string;
	verifyCode: string;

	constructor(formData: VerificationOTPCommand) {
		this.nationalCode = formData.nationalCode;
		this.mobile = formData.mobile;
		this.verifyCode = formData.verifyCode;
	}
}
