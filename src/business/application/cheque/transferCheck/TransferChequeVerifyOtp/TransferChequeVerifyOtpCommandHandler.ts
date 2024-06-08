import { IRequestHandler, requestHandler } from '@Mediatr/index';
import APIClient from 'business/infrastructure/api-client';
import TransferChequeVerifyOtpCommand from './TransferChequeVerifyOtpCommand';
import { TransferChequeVerifyOtpResponse } from 'common/entities/cheque/transferCheck/TransferChequeVerifyOtp/TransferChequeVerifyOtpResponse';
import { TransferChequeVerifyOtpRequest } from 'common/entities/cheque/transferCheck/TransferChequeVerifyOtp/TransferChequeVerifyOtpRequest';
import { TransferChequeVerifyOtp } from 'business/infrastructure/end-points';

@requestHandler(TransferChequeVerifyOtpCommand)
export class TransferChequeVerifyOtpCommandHandler
	implements IRequestHandler<TransferChequeVerifyOtpCommand, TransferChequeVerifyOtpResponse>
{
	handle(value: TransferChequeVerifyOtpCommand): Promise<TransferChequeVerifyOtpResponse> {
		const apiClient = new APIClient<TransferChequeVerifyOtpRequest, TransferChequeVerifyOtpResponse>(TransferChequeVerifyOtp);
		return apiClient.post(<TransferChequeVerifyOtpRequest>{
			transferChequeKey: value.transferChequeKey
		});
	}
}
