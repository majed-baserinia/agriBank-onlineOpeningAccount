import { IRequest } from '@Mediatr/index';
import { AccountsListResponse } from 'common/entities/AccountsList/AccountsListResponse';


export default class AccountsListCommand implements IRequest<AccountsListResponse> {
	requestTypeId?: number;

	constructor(input: AccountsListCommand) {
		this.requestTypeId = input?.requestTypeId;
	}
}

