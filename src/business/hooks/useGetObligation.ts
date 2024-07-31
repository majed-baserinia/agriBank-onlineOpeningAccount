import { Mediator } from '@Mediatr/index';
import { useMutation } from '@tanstack/react-query';
import GetObligationCommand from 'business/application/onlineOpenAccount/GetObligation/GetObligationCommand';
import { ErrorType } from 'common/entities/ErrorType';
import { GetObligationRequest } from 'common/entities/GetObligation/GetObligationRequest';
import { GetObligationResponse } from 'common/entities/GetObligation/GetObligationResponse';

const mediator = new Mediator();

export default function useGetObligation() {
	return useMutation<GetObligationResponse, ErrorType<GetObligationRequest>, GetObligationCommand>({
		mutationFn: (data: GetObligationCommand) =>
			mediator.send<GetObligationResponse>(new GetObligationCommand(data)),
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
