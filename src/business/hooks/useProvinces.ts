import { Mediator } from '@Mediatr/index';
import { useMutation } from '@tanstack/react-query';
import ProvincesCommand from 'business/application/onlineOpenAccount/Provinces/ProvincesCommand';
import { ErrorType } from 'common/entities/ErrorType';
import { ProvincesRequest } from 'common/entities/Provinces/ProvincesRequest';
import { ProvincesResponse } from 'common/entities/Provinces/ProvincesResponse';

const mediator = new Mediator();

export default function useProvinces() {
	return useMutation<ProvincesResponse, ErrorType<ProvincesRequest>, ProvincesCommand>({
		mutationFn: (data: ProvincesCommand) => mediator.send<ProvincesResponse>(new ProvincesCommand()),
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
