import { IRequest } from '@Mediatr/index';
import { CartableInquiryResponse } from 'common/entities/cheque/chekList/CartableInquiry/CartableInquiryResponse';
import { ChakadDeactivateCustomerResponse } from 'common/entities/cheque/deactivation/ChakadDeactivateCustomer/ChakadDeactivateCustomerResponse';

export default class ChakadDeactivateCustomerCommand implements IRequest<ChakadDeactivateCustomerResponse> {
	customerNumber: number;

	constructor(input: ChakadDeactivateCustomerCommand) {
		this.customerNumber = input.customerNumber;
	}
}
