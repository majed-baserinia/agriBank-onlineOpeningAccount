import { IRequestHandler, requestHandler } from '@Mediatr/index';
import APIClient from 'business/infrastructure/api-client';
import { ChakadDeactivateCustomer } from 'business/infrastructure/end-points';
import { ChakadDeactivateCustomerRequest } from 'common/entities/cheque/deactivation/ChakadDeactivateCustomer/ChakadDeactivateCustomerRequest';
import { ChakadDeactivateCustomerResponse } from 'common/entities/cheque/deactivation/ChakadDeactivateCustomer/ChakadDeactivateCustomerResponse';
import ChakadDeactivateCustomerCommand from './ChakadDeactivateCustomerCommand';

@requestHandler(ChakadDeactivateCustomerCommand)
export class ChakadDeactivateCustomerCommandHandler
	implements IRequestHandler<ChakadDeactivateCustomerCommand, ChakadDeactivateCustomerResponse>
{
	handle(value: ChakadDeactivateCustomerCommand): Promise<ChakadDeactivateCustomerResponse> {
		const apiClient = new APIClient<ChakadDeactivateCustomerRequest, ChakadDeactivateCustomerResponse>(
			ChakadDeactivateCustomer
		);
		return apiClient.post(<ChakadDeactivateCustomerRequest>{
			customerNumber: value.customerNumber
		});
	}
}
