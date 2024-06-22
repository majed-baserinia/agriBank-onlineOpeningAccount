import { Mediator } from '@Mediatr/index';
import { useMutation } from '@tanstack/react-query';
import GiveBackChequeFinalizeCommand from 'business/application/cheque/giveBackCheck/GiveBackChequeFinalize/GiveBackChequeFinalizeCommand';
import { ErrorType } from 'common/entities/ErrorType';

const mediator = new Mediator();

export default function useGiveBackChequeFinalize() {
	return useMutation<
		GiveBackChequeFinalizeResponse,
		ErrorType<GiveBackChequeFinalizeRequest>,
		GiveBackChequeFinalizeCommand
	>({
		mutationFn: (data: GiveBackChequeFinalizeCommand) =>
			mediator.send<GiveBackChequeFinalizeResponse>(new GiveBackChequeFinalizeCommand(data)),
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
