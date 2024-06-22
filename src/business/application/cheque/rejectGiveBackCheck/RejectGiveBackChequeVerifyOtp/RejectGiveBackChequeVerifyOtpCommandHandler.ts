import { IRequestHandler, requestHandler } from '@Mediatr/index';
import APIClient from 'business/infrastructure/api-client';

import { RejectGiveBackChequeVerifyOtp } from 'business/infrastructure/end-points';
import { RejectGiveBackChequeVerifyOtpRequest } from 'common/entities/cheque/RejectGiveBackCheck/RejectGiveBackChequeVerifyOtp/GiveBackChequeVerifyOtpRequest';
import { RejectGiveBackChequeVerifyOtpResponse } from 'common/entities/cheque/RejectGiveBackCheck/RejectGiveBackChequeVerifyOtp/GiveBackChequeVerifyOtpResponse';
import RejectGiveBackChequeVerifyOtpCommand from './RejectGiveBackChequeVerifyOtpCommand';

@requestHandler(RejectGiveBackChequeVerifyOtpCommand)
export class RejectGiveBackChequeVerifyOtpCommandHandler
	implements IRequestHandler<RejectGiveBackChequeVerifyOtpCommand, RejectGiveBackChequeVerifyOtpResponse>
{
	handle(value: RejectGiveBackChequeVerifyOtpCommand): Promise<RejectGiveBackChequeVerifyOtpResponse> {
		const apiClient = new APIClient<RejectGiveBackChequeVerifyOtpRequest, RejectGiveBackChequeVerifyOtpResponse>(
			RejectGiveBackChequeVerifyOtp
		);
		return apiClient.post(<RejectGiveBackChequeVerifyOtpRequest>{
			transferChequeKey: value.transferChequeKey,
			otpCode: value.otpCode,
			selectSingleSignatureLegal: value.selectSingleSignatureLegal
		});
	}
}
