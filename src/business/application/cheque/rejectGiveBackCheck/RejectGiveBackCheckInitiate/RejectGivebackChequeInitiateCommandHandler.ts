import { IRequestHandler, requestHandler } from '@Mediatr/index';
import APIClient from 'business/infrastructure/api-client';

import RejectGivebackChequeInitiateCommand from './RejectGivebackChequeInitiateCommand';
import { RejectGivebackChequeInitiate } from 'business/infrastructure/end-points';

@requestHandler(RejectGivebackChequeInitiateCommand)
export class RejectGivebackChequeInitiateCommandHandler
	implements IRequestHandler<RejectGivebackChequeInitiateCommand, RejectGivebackChequeInitiateResponse>
{
	handle(value: RejectGivebackChequeInitiateCommand): Promise<RejectGivebackChequeInitiateResponse> {
		const apiClient = new APIClient<RejectGivebackChequeInitiateRequest, RejectGivebackChequeInitiateResponse>(
			RejectGivebackChequeInitiate
		);
		return apiClient.post(<RejectGivebackChequeInitiateRequest>{
			customerNumber: value.customerNumber,
			sayadNo: value.sayadNo,
			description: value.description,
			toIban: value.toIban
		});
	}
}
