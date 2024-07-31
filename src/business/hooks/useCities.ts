import { Mediator } from '@Mediatr/index';
import { useMutation } from '@tanstack/react-query';
import CitiesCommand from 'business/application/onlineOpenAccount/Cities/CitiesCommand';
import { CitiesRequest } from 'common/entities/Cities/CitiesRequest';
import { CitiesResponse } from 'common/entities/Cities/CitiesResponse';
import { ErrorType } from 'common/entities/ErrorType';

const mediator = new Mediator();

export default function useCities() {
	return useMutation<CitiesResponse, ErrorType<CitiesRequest>, CitiesCommand>({
		mutationFn: (data: CitiesCommand) => mediator.send<CitiesResponse>(new CitiesCommand(data)),
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
