import { IRequestHandler, requestHandler } from '@Mediatr/index';
import APIClient from 'business/infrastructure/api-client';
import { verificationOTP } from 'business/infrastructure/end-points';
import { VerificationOTPRequest } from 'common/entities/VerificationOTP/VerificationOTPRequest';
import { VerificationOTPResponse } from 'common/entities/VerificationOTP/VerificationOTPResponse';
import VerificationOTPCommand from './VerificationOTPCommand';

@requestHandler(VerificationOTPCommand)
export class VerificationOTPCommandHandler implements IRequestHandler<VerificationOTPCommand, VerificationOTPResponse> {
	handle(value: VerificationOTPCommand): Promise<VerificationOTPResponse> {
		const apiClient = new APIClient<VerificationOTPRequest, VerificationOTPResponse>(verificationOTP);
		return apiClient.post(<VerificationOTPRequest>{
			nationalCode: value.nationalCode,
			mobile: value.mobile,
			verifyCode: value.verifyCode
		});
	}
}
