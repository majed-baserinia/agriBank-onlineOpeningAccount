import { IRequest } from '@Mediatr/index';
import { GetBranchesResponse } from 'common/entities/GetBranches/GetBranchesResponse';

export default class GetBranchesCommand implements IRequest<GetBranchesResponse> {
	branchSearch: string;

	constructor(input: GetBranchesCommand) {
		this.branchSearch = input?.branchSearch;
	}
}
