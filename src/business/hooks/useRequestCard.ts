import { Mediator } from '@Mediatr/index';
import { useMutation } from '@tanstack/react-query';
import RequestCardCommand from 'business/application/onlineOpenAccount/RequestCard/RequestCardCommand';
import { ErrorType } from 'common/entities/ErrorType';
import { RequestCardRequest } from 'common/entities/RequestCard/RequestCardRequest';
import { RequestCardResponse } from 'common/entities/RequestCard/RequestCardResponse';

const mediator = new Mediator();

export default function useRequestCard() {
	return useMutation<RequestCardResponse, ErrorType<RequestCardRequest>, RequestCardCommand>({
		mutationFn: (data: RequestCardCommand) => mediator.send<RequestCardResponse>(new RequestCardCommand(data)),
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
