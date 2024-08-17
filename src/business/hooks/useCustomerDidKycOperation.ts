import { Mediator } from '@Mediatr/index';
import { useMutation } from '@tanstack/react-query';
import CustomerDidKycOperationCommand from 'business/application/onlineOpenAccount/CustomerDidKycOperation/CustomerDidKycOperationCommand';
import { CustomerDidKycOperationRequest } from 'common/entities/CustomerDidKycOperation/CustomerDidKycOperationRequest';
import { CustomerDidKycOperationResponse } from 'common/entities/CustomerDidKycOperation/CustomerDidKycOperationResponse';

import { ErrorType } from 'common/entities/ErrorType';

const mediator = new Mediator();

export default function useCustomerDidKycOperation() {
	return useMutation<
		CustomerDidKycOperationResponse,
		ErrorType<CustomerDidKycOperationRequest>,
		CustomerDidKycOperationCommand
	>({
		mutationFn: (data: CustomerDidKycOperationCommand) =>
			mediator.send<CustomerDidKycOperationResponse>(new CustomerDidKycOperationCommand(data)),
		onMutate: (variables) => {
			return () => variables;
		},
		onSuccess: (data) => {
			return () => data;
		},
		onError: (error, variables) => {
			return () => variables;
		}
	});
}
