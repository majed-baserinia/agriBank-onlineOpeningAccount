import { Mediator } from '@Mediatr/index';
import { useMutation } from '@tanstack/react-query';
import ReceiverInquiryChequeCommand from 'business/application/cheque/cashCheck/ReceiverInquiryCheque/ReceiverInquiryChequeCommand';
import { ErrorType } from 'common/entities/ErrorType';
import { ReceiverInquiryChequeRequest } from 'common/entities/cheque/cashCheck/ReceiverInquiryCheque/ReceiverInquiryChequeRequest';
import { ReceiverInquiryChequeResponse } from 'common/entities/cheque/cashCheck/ReceiverInquiryCheque/ReceiverInquiryChequeResponse';

const mediator = new Mediator();

export default function useReceiverInquiryCheque() {
	return useMutation<
		ReceiverInquiryChequeResponse,
		ErrorType<ReceiverInquiryChequeRequest>,
		ReceiverInquiryChequeCommand
	>({
		mutationFn: (data: ReceiverInquiryChequeCommand) =>
			mediator.send<ReceiverInquiryChequeResponse>(new ReceiverInquiryChequeCommand(data)),
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
