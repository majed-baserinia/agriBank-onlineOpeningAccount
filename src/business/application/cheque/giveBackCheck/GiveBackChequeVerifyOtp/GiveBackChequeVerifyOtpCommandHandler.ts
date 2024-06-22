import { IRequestHandler, requestHandler } from '@Mediatr/index';
import APIClient from 'business/infrastructure/api-client';

import { GiveBackChequeVerifyOtp } from 'business/infrastructure/end-points';
import GiveBackChequeVerifyOtpCommand from './GiveBackChequeVerifyOtpCommand';

@requestHandler(GiveBackChequeVerifyOtpCommand)
export class GiveBackChequeVerifyOtpCommandHandler
	implements IRequestHandler<GiveBackChequeVerifyOtpCommand, GiveBackChequeVerifyOtpResponse>
{
	handle(value: GiveBackChequeVerifyOtpCommand): Promise<GiveBackChequeVerifyOtpResponse> {
		const apiClient = new APIClient<GiveBackChequeVerifyOtpRequest, GiveBackChequeVerifyOtpResponse>(
			GiveBackChequeVerifyOtp
		);
		return apiClient.post(<GiveBackChequeVerifyOtpRequest>{
			transferChequeKey: value.transferChequeKey,
			otpCode: value.otpCode,
			selectSingleSignatureLegal: value.selectSingleSignatureLegal
		});
	}
}
