import { Mediator } from '@Mediatr/index';
import { useMutation } from '@tanstack/react-query';
import GetBranchesCommand from 'business/application/onlineOpenAccount/GetBranches/GetBranchesCommand';
import { ErrorType } from 'common/entities/ErrorType';
import { GetBranchesRequest } from 'common/entities/GetBranches/GetBranchesRequest';
import { GetBranchesResponse } from 'common/entities/GetBranches/GetBranchesResponse';

const mediator = new Mediator();

export default function useGetBranches() {
	return useMutation<GetBranchesResponse, ErrorType<GetBranchesRequest>, GetBranchesCommand>({
		mutationFn: (data: GetBranchesCommand) => mediator.send<GetBranchesResponse>(new GetBranchesCommand(data)),
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
