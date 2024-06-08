import { IRequestHandler, requestHandler } from '@Mediatr/index';
import APIClient from 'business/infrastructure/api-client';
import { TransferChequeVerifyOtp } from 'business/infrastructure/end-points';
import { TransferChequeVerifyOtpRequest } from 'common/entities/cheque/transferCheck/TransferChequeVerifyOtp/TransferChequeVerifyOtpRequest';
import { TransferChequeVerifyOtpResponse } from 'common/entities/cheque/transferCheck/TransferChequeVerifyOtp/TransferChequeVerifyOtpResponse';
import TransferChequeVerifyOtpCommand from './TransferChequeVerifyOtpCommand';

@requestHandler(TransferChequeVerifyOtpCommand)
export class TransferChequeVerifyOtpCommandHandler
	implements IRequestHandler<TransferChequeVerifyOtpCommand, TransferChequeVerifyOtpResponse>
{
	handle(value: TransferChequeVerifyOtpCommand): Promise<TransferChequeVerifyOtpResponse> {
		const apiClient = new APIClient<TransferChequeVerifyOtpRequest, TransferChequeVerifyOtpResponse>(
			TransferChequeVerifyOtp
		);
		return apiClient.post(<TransferChequeVerifyOtpRequest>{
			transferChequeKey: value.transferChequeKey,
			otpCode: value.otpCode,
			selectSingleSignatureLegal: value.selectSingleSignatureLegal
		});
	}
}
