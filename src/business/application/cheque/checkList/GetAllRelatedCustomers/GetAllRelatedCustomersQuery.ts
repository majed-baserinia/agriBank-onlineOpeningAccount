import { IRequest } from '@Mediatr/index';
import { GetAllRelatedCustomersResponse } from 'common/entities/cheque/chekList/GetAllRelatedCustomers/GetAllRelatedCustomersResponse';

export default class GetAllRelatedCustomersQuery implements IRequest<GetAllRelatedCustomersResponse> {
	serviceName: string;

	constructor(serviceName: string) {
		this.serviceName = serviceName;
	}
}
