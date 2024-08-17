import { IRequestHandler, requestHandler } from '@Mediatr/index';
import APIClient from 'business/infrastructure/api-client';
import { CustomerDidKycOperation } from 'business/infrastructure/end-points';

import CustomerDidKycOperationCommand from './CustomerDidKycOperationCommand';
import { CustomerDidKycOperationResponse } from 'common/entities/CustomerDidKycOperation/CustomerDidKycOperationResponse';
import { CustomerDidKycOperationRequest } from 'common/entities/CustomerDidKycOperation/CustomerDidKycOperationRequest';

@requestHandler(CustomerDidKycOperationCommand)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class CustomerDidKycOperationCommandHandler
	implements IRequestHandler<CustomerDidKycOperationCommand, CustomerDidKycOperationResponse>
{
	handle(value: CustomerDidKycOperationCommand): Promise<CustomerDidKycOperationResponse> {
		const apiClient = new APIClient<CustomerDidKycOperationRequest, CustomerDidKycOperationResponse>(
			CustomerDidKycOperation
		);
		return apiClient.post(<CustomerDidKycOperationRequest>{
			token: value.token
		});
	}
}
