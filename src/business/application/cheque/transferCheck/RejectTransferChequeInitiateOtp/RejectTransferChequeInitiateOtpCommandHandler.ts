import { IRequestHandler, requestHandler } from '@Mediatr/index';
import APIClient from 'business/infrastructure/api-client';
import { RejectTransferChequeInitiateOtp } from 'business/infrastructure/end-points';
import { RejectTransferChequeInitiateOtpRequest } from 'common/entities/cheque/transferCheck/RejectTransferChequeInitiateOtp/RejectTransferChequeInitiateOtpRequest';
import { RejectTransferChequeInitiateOtpResponse } from 'common/entities/cheque/transferCheck/RejectTransferChequeInitiateOtp/RejectTransferChequeInitiateOtpResponse';
import RejectTransferChequeInitiateOtpCommand from './RejectTransferChequeInitiateOtpCommand';

@requestHandler(RejectTransferChequeInitiateOtpCommand)
export class RejectTransferChequeInitiateOtpCommandHandler
	implements IRequestHandler<RejectTransferChequeInitiateOtpCommand, RejectTransferChequeInitiateOtpResponse>
{
	handle(value: RejectTransferChequeInitiateOtpCommand): Promise<RejectTransferChequeInitiateOtpResponse> {
		const apiClient = new APIClient<
			RejectTransferChequeInitiateOtpRequest,
			RejectTransferChequeInitiateOtpResponse
		>(RejectTransferChequeInitiateOtp);
		return apiClient.post(<RejectTransferChequeInitiateOtpRequest>{
			transferChequeKey: value.transferChequeKey
		});
	}
}
