import { IRequestHandler, requestHandler } from '@Mediatr/index';
import APIClient from 'business/infrastructure/api-client';
import { getCheckbooks } from 'business/infrastructure/end-points';
import { GetCheckbooksRequest } from 'common/entities/cheque/Digital Cheque/GetCheckbooks/GetCheckbooksRequest';
import { GetCheckbooksResponse } from 'common/entities/cheque/Digital Cheque/GetCheckbooks/GetCheckbooksResponse';
import GetCheckbooksQuery from './GetCheckbooksQuery';

@requestHandler(GetCheckbooksQuery)
export class GetCheckbooksQueryHandler implements IRequestHandler<GetCheckbooksQuery, GetCheckbooksResponse> {
	handle(value: GetCheckbooksRequest): Promise<GetCheckbooksResponse> {
		const apiClient = new APIClient<GetCheckbooksRequest, GetCheckbooksResponse>(getCheckbooks);
		return apiClient.get(value.accountNumber);
	}
}
