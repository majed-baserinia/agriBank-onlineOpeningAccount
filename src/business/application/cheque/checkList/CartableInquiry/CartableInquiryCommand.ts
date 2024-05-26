import { IRequest } from '@Mediatr/index';
import { CartableInquiryResponse } from 'common/entities/cheque/chekList/CartableInquiry/CartableInquiryResponse';

export default class CartableInquiryCommand implements IRequest<CartableInquiryResponse> {
	customerNumber: number;

	constructor(CartableInquiryCommand: CartableInquiryCommand) {
		this.customerNumber = CartableInquiryCommand.customerNumber;
	}
}
