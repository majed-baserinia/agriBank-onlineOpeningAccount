import { Mediator } from '@Mediatr/index';
import { useMutation } from '@tanstack/react-query';
import SaveObligationCommand from 'business/application/onlineOpenAccount/SaveObligation/SaveObligationCommand';
import { ErrorType } from 'common/entities/ErrorType';
import { SaveObligationRequest } from 'common/entities/SaveObligation/SaveObligationRequest';
import { SaveObligationResponse } from 'common/entities/SaveObligation/SaveObligationResponse';

const mediator = new Mediator();

export default function useSaveObligation() {
	return useMutation<SaveObligationResponse, ErrorType<SaveObligationRequest>, SaveObligationCommand>({
		mutationFn: (data: SaveObligationCommand) =>
			mediator.send<SaveObligationResponse>(new SaveObligationCommand(data)),
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
