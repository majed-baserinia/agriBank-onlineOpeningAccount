import { Mediator } from '@Mediatr/index';
import { useMutation } from '@tanstack/react-query';
import SaveNationalCodeImageCommand from 'business/application/onlineOpenAccount/SaveNationalCodeImage/SaveNationalCodeImageCommand';
import { ErrorType } from 'common/entities/ErrorType';
import { SaveNationalCodeImageRequest } from 'common/entities/SaveNationalCodeImage/SaveNationalCodeImageRequest';
import { SaveNationalCodeImageResponse } from 'common/entities/SaveNationalCodeImage/SaveNationalCodeImageResponse';

const mediator = new Mediator();

export default function useSaveNationalCodeImage() {
	return useMutation<
		SaveNationalCodeImageResponse,
		ErrorType<SaveNationalCodeImageRequest>,
		SaveNationalCodeImageCommand
	>({
		mutationFn: (data: SaveNationalCodeImageCommand) =>
			mediator.send<SaveNationalCodeImageResponse>(new SaveNationalCodeImageCommand(data)),
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
