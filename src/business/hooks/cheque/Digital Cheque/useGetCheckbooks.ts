import { Mediator } from '@Mediatr/index';
import { useMutation } from '@tanstack/react-query';
import GetCheckbooksQuery from 'business/application/cheque/Digital Cheque/GetCheckbooks/GetCheckbooksQuery';
import { ErrorType } from 'common/entities/ErrorType';
import { GetCheckbooksRequest } from 'common/entities/cheque/Digital Cheque/GetCheckbooks/GetCheckbooksRequest';
import { GetCheckbooksResponse } from 'common/entities/cheque/Digital Cheque/GetCheckbooks/GetCheckbooksResponse';

const mediator = new Mediator();

export default function useGetCheckbooks() {
	return useMutation<GetCheckbooksResponse, ErrorType<GetCheckbooksRequest>, GetCheckbooksQuery>({
		mutationFn: (data: GetCheckbooksQuery) =>
			mediator.send<GetCheckbooksResponse>(new GetCheckbooksQuery(data.accountNumber)),
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
