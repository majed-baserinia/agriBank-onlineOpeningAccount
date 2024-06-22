
import { Mediator } from '@Mediatr/index';
import { useMutation } from '@tanstack/react-query';
import GivebackChequeInitiateCommand from 'business/application/cheque/giveBackCheck/GivebackChequeInitiate/GivebackChequeInitiateCommand';
import RejectGivebackChequeInitiateCommand from 'business/application/cheque/rejectGiveBackCheck/RejectGiveBackCheckInitiate/RejectGivebackChequeInitiateCommand';
import { ErrorType } from 'common/entities/ErrorType';

const mediator = new Mediator();

export default function useRejectGivebackChequeInitiate() {
	return useMutation<
		RejectGivebackChequeInitiateResponse,
		ErrorType<RejectGivebackChequeInitiateRequest>,
		RejectGivebackChequeInitiateCommand
	>({
		mutationFn: (data: RejectGivebackChequeInitiateCommand) =>
			mediator.send<RejectGivebackChequeInitiateResponse>(new RejectGivebackChequeInitiateCommand(data)),
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
