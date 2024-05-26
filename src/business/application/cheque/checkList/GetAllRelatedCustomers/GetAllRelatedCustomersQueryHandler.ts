import { IRequestHandler, requestHandler } from '@Mediatr/index';
import APIClient from 'business/infrastructure/api-client';
import { GetAllRelatedCustomers } from 'business/infrastructure/end-points';
import { GetAllRelatedCustomersResponse } from 'common/entities/cheque/chekList/GetAllRelatedCustomers/GetAllRelatedCustomersResponse';
import GetAllRelatedCustomersQuery from './GetAllRelatedCustomersQuery';

@requestHandler(GetAllRelatedCustomersQuery)
export class GetAllRelatedCustomersQueryHandler
	implements IRequestHandler<GetAllRelatedCustomersQuery, GetAllRelatedCustomersResponse>
{
	handle(value: GetAllRelatedCustomersQuery): Promise<GetAllRelatedCustomersResponse> {
		const apiClient = new APIClient<null, GetAllRelatedCustomersResponse>(
			GetAllRelatedCustomers + '/' + value.serviceName
		);
		return apiClient.getAll({});
	}
}
