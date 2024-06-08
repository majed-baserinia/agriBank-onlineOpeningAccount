import { IRequestHandler, requestHandler } from '@Mediatr/index';
import APIClient from 'business/infrastructure/api-client';
import { RejectTransferChequeInitiate } from 'business/infrastructure/end-points';
import { RejectTransferChequeInitiateRequest } from 'common/entities/cheque/transferCheck/RejectTransferChequeInitiate/RejectTransferChequeInitiateRequest';
import { RejectTransferChequeInitiateResponse } from 'common/entities/cheque/transferCheck/RejectTransferChequeInitiate/RejectTransferChequeInitiateResponse';
import RejectTransferChequeInitiateCommand from './RejectTransferChequeInitiateCommand';

@requestHandler(RejectTransferChequeInitiateCommand)
export class RejectTransferChequeInitiateCommandHandler
	implements IRequestHandler<RejectTransferChequeInitiateCommand, RejectTransferChequeInitiateResponse>
{
	handle(value: RejectTransferChequeInitiateCommand): Promise<RejectTransferChequeInitiateResponse> {
		const apiClient = new APIClient<RejectTransferChequeInitiateRequest, RejectTransferChequeInitiateResponse>(
			RejectTransferChequeInitiate
		);
		return apiClient.post(<RejectTransferChequeInitiateRequest>{
			customerNumber: value.customerNumber,
			sayadNo: value.sayadNo,
			description: value.description,
			reason: value.reason,
			recievers: value.recievers,
			toIban: value.toIban
		});
	}
}
