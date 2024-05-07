import { IRequestHandler, requestHandler } from '@Mediatr/index';
import VerifyOtpCommand from 'business/application/cheque/Digital Cheque/Verify Otp/VerifyOtpCommand';
import APIClient from 'business/infrastructure/api-client';

import { VerifyOtp } from 'business/infrastructure/end-points';
import { VerifyOtpRequest } from 'common/entities/cheque/Digital Cheque/Verify Otp/VerifyOtpRequest';
import { VerifyOtpResponse } from 'common/entities/cheque/Digital Cheque/Verify Otp/VerifyOtpResponse';

@requestHandler(VerifyOtpCommand)
export class VerifyOtpCommandHandler implements IRequestHandler<VerifyOtpCommand, VerifyOtpResponse> {
	handle(value: VerifyOtpCommand): Promise<VerifyOtpResponse> {
		const apiClient = new APIClient<VerifyOtpRequest, VerifyOtpResponse>(VerifyOtp);
		return apiClient.post(<VerifyOtpRequest>{
			issueChequeKey: value.issueChequeKey
		});
	}
}
