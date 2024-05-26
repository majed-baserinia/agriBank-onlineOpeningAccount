import { IRequestHandler, requestHandler } from '@Mediatr/index';
import APIClient from 'business/infrastructure/api-client';
import { IssueChequeIssueWithDrawalGroup } from 'business/infrastructure/end-points';
import { CartableInquiryRequest } from 'common/entities/cheque/chekList/CartableInquiry/CartableInquiryRequest';
import { CartableInquiryResponse } from 'common/entities/cheque/chekList/CartableInquiry/CartableInquiryResponse';
import CartableInquiryCommand from './CartableInquiryCommand';

@requestHandler(CartableInquiryCommand)
export class CartableInquiryCommandHandler implements IRequestHandler<CartableInquiryCommand, CartableInquiryResponse> {
	handle(value: CartableInquiryCommand): Promise<CartableInquiryResponse> {
		const apiClient = new APIClient<CartableInquiryRequest, CartableInquiryResponse>(
			IssueChequeIssueWithDrawalGroup
		);
		return apiClient.post(<CartableInquiryRequest>{
			customerNumber: value.customerNumber
		});
	}
}
