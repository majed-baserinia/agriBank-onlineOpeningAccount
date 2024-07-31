import { Mediator } from '@Mediatr/index';
import { useMutation } from '@tanstack/react-query';
import CreateAuthRequestCommand from 'business/application/onlineOpenAccount/CreateAuthRequest/CreateAuthRequestCommand';
import { CreateAuthRequestRequest } from 'common/entities/CreateAuthRequest/CreateAuthRequestRequest';
import { CreateAuthRequestResponse } from 'common/entities/CreateAuthRequest/CreateAuthRequestResponse';
import { ErrorType } from 'common/entities/ErrorType';

const mediator = new Mediator();

export default function useCreateAuthRequest() {
	return useMutation<CreateAuthRequestResponse, ErrorType<CreateAuthRequestRequest>, CreateAuthRequestCommand>({
		mutationFn: (data: CreateAuthRequestCommand) =>
			mediator.send<CreateAuthRequestResponse>(new CreateAuthRequestCommand(data)),
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
