import { IRequestHandler, requestHandler } from '@Mediatr/index';
import APIClient from 'business/infrastructure/api-client';
import { TransferChequeInitiate } from 'business/infrastructure/end-points';
import { TransferChequeInitiateRequest } from 'common/entities/cheque/transferCheck/TransferChequeInitiate/TransferChequeInitiateRequest';
import { TransferChequeInitiateResponse } from 'common/entities/cheque/transferCheck/TransferChequeInitiate/TransferChequeInitiateResponse';
import TransferChequeInitiateCommand from './TransferChequeInitiateCommand';

@requestHandler(TransferChequeInitiateCommand)
export class TransferChequeInitiateCommandHandler
	implements IRequestHandler<TransferChequeInitiateCommand, TransferChequeInitiateResponse>
{
	handle(value: TransferChequeInitiateCommand): Promise<TransferChequeInitiateResponse> {
		const apiClient = new APIClient<TransferChequeInitiateRequest, TransferChequeInitiateResponse>(
			TransferChequeInitiate
		);
		return apiClient.post(<TransferChequeInitiateRequest>{
			sayadNo: value.sayadNo,
			description: value.description,
			reason: value.reason,
			recievers: value.recievers,
			toIban: value.toIban
		});
	}
}
