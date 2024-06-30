import { IRequestHandler, requestHandler } from '@Mediatr/index';
import APIClient from 'business/infrastructure/api-client';
import { ReceiverInquiryCheque } from 'business/infrastructure/end-points';
import { ReceiverInquiryChequeRequest } from 'common/entities/cheque/cashCheck/ReceiverInquiryCheque/ReceiverInquiryChequeRequest';
import { ReceiverInquiryChequeResponse } from 'common/entities/cheque/cashCheck/ReceiverInquiryCheque/ReceiverInquiryChequeResponse';
import ReceiverInquiryChequeCommand from './ReceiverInquiryChequeCommand';

@requestHandler(ReceiverInquiryChequeCommand)
export class ReceiverInquiryChequeCommandHandler
	implements IRequestHandler<ReceiverInquiryChequeCommand, ReceiverInquiryChequeResponse>
{
	handle(value: ReceiverInquiryChequeCommand): Promise<ReceiverInquiryChequeResponse> {
		const apiClient = new APIClient<ReceiverInquiryChequeRequest, ReceiverInquiryChequeResponse>(
			ReceiverInquiryCheque
		);
		return apiClient.post(<ReceiverInquiryChequeRequest>{
			sayadNo: value.sayadNo
		});
	}
}
