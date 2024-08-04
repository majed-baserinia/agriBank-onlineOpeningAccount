import { IRequestHandler, requestHandler } from '@Mediatr/index';
import APIClient from 'business/infrastructure/api-client';

import { GetBranches } from 'business/infrastructure/end-points';
import { GetBranchesRequest } from 'common/entities/GetBranches/GetBranchesRequest';
import { GetBranchesResponse } from 'common/entities/GetBranches/GetBranchesResponse';
import GetBranchesCommand from './GetBranchesCommand';

@requestHandler(GetBranchesCommand)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class GetBranchesCommandHandler implements IRequestHandler<GetBranchesCommand, GetBranchesResponse> {
	handle(value: GetBranchesCommand): Promise<GetBranchesResponse> {
		const apiClient = new APIClient<GetBranchesRequest, GetBranchesResponse>(GetBranches);
		return apiClient.post(<GetBranchesRequest>{
			branchSearch: value.branchSearch
		});
	}
}
