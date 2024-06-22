import { Mediator } from '@Mediatr/index';
import { useMutation } from '@tanstack/react-query';
import GivebackChequeInitiateCommand from 'business/application/cheque/giveBackCheck/GivebackChequeInitiate/GivebackChequeInitiateCommand';
import { ErrorType } from 'common/entities/ErrorType';

const mediator = new Mediator();

export default function useGivebackChequeInitiate() {
	return useMutation<
		GivebackChequeInitiateResponse,
		ErrorType<GivebackChequeInitiateRequest>,
		GivebackChequeInitiateCommand
	>({
		mutationFn: (data: GivebackChequeInitiateCommand) =>
			mediator.send<GivebackChequeInitiateResponse>(new GivebackChequeInitiateCommand(data)),
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
