import { Mediator } from '@Mediatr/index';
import { useMutation } from '@tanstack/react-query';
import CartableInquiryCommand from 'business/application/cheque/checkList/CartableInquiry/CartableInquiryCommand';
import { ErrorType } from 'common/entities/ErrorType';
import { CartableInquiryRequest } from 'common/entities/cheque/chekList/CartableInquiry/CartableInquiryRequest';
import { CartableInquiryResponse } from 'common/entities/cheque/chekList/CartableInquiry/CartableInquiryResponse';

const mediator = new Mediator();

export default function useCartableInquiryCommand() {
	return useMutation<CartableInquiryResponse, ErrorType<CartableInquiryRequest>, CartableInquiryCommand>({
		mutationFn: (data: CartableInquiryCommand) =>
			mediator.send<CartableInquiryResponse>(new CartableInquiryCommand(data)),
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
