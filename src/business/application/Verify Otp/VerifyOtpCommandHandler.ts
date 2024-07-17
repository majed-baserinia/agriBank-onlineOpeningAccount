import { IRequestHandler, requestHandler } from '@Mediatr/index';
import VerifyOtpCommand from 'business/application/Verify Otp/VerifyOtpCommand';
import APIClient from 'business/infrastructure/api-client';

import { VerifyOtp } from 'business/infrastructure/end-points';
import { VerifyOtpRequest } from 'common/entities/Verify Otp/VerifyOtpRequest';
import { VerifyOtpResponse } from 'common/entities/Verify Otp/VerifyOtpResponse';

@requestHandler(VerifyOtpCommand)
export class VerifyOtpCommandHandler implements IRequestHandler<VerifyOtpCommand, VerifyOtpResponse> {
	handle(value: VerifyOtpCommand): Promise<VerifyOtpResponse> {
		const apiClient = new APIClient<VerifyOtpRequest, VerifyOtpResponse>(VerifyOtp);
		return apiClient.post(<VerifyOtpRequest>{
			issueChequeKey: value.issueChequeKey
		});
	}
}
