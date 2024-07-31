import { Mediator } from '@Mediatr/index';
import { useMutation } from '@tanstack/react-query';
import SaveAddressCommand from 'business/application/onlineOpenAccount/SaveAddress/SaveAddressCommand';
import { ErrorType } from 'common/entities/ErrorType';
import { SaveAddressRequest } from 'common/entities/SaveAddress/SaveAddressRequest';
import { SaveAddressResponse } from 'common/entities/SaveAddress/SaveAddressResponse';

const mediator = new Mediator();

export default function useSaveAddress() {
	return useMutation<SaveAddressResponse, ErrorType<SaveAddressRequest>, SaveAddressCommand>({
		mutationFn: (data: SaveAddressCommand) => mediator.send<SaveAddressResponse>(new SaveAddressCommand(data)),
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
