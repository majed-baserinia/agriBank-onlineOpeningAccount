import { Mediator } from '@Mediatr/index';
import { useMutation } from '@tanstack/react-query';
import RejectTransfercCequeFinalizeCommand from 'business/application/cheque/transferCheck/RejectTransfercCequeFinalize/RejectTransfercCequeFinalizeCommand';
import { ErrorType } from 'common/entities/ErrorType';
import { RejectTransfercCequeFinalizeRequest } from 'common/entities/cheque/transferCheck/RejectTransfercCequeFinalize/RejectTransfercCequeFinalizeRequest';
import { RejectTransfercCequeFinalizeResponse } from 'common/entities/cheque/transferCheck/RejectTransfercCequeFinalize/RejectTransfercCequeFinalizeResponse';

const mediator = new Mediator();

export default function useRejectTransfercCequeFinalize() {
	return useMutation<
		RejectTransfercCequeFinalizeResponse,
		ErrorType<RejectTransfercCequeFinalizeRequest>,
		RejectTransfercCequeFinalizeCommand
	>({
		mutationFn: (data: RejectTransfercCequeFinalizeCommand) =>
			mediator.send<RejectTransfercCequeFinalizeResponse>(new RejectTransfercCequeFinalizeCommand(data)),
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
