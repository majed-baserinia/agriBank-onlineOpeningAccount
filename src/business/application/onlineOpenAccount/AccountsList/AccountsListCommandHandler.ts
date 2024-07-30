import { IRequestHandler, requestHandler } from '@Mediatr/index';
import APIClient from 'business/infrastructure/api-client';
import { getAccountsList } from 'business/infrastructure/end-points';
import { AccountsListRequest } from 'common/entities/AccountsList/AccountsListRequest';
import { AccountsListResponse } from 'common/entities/AccountsList/AccountsListResponse';
import AccountsListCommand from './AccountsListCommand';

@requestHandler(AccountsListCommand)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class AccountsListCommandHandler implements IRequestHandler<AccountsListCommand, AccountsListResponse> {
	handle(value: AccountsListCommand): Promise<AccountsListResponse> {
		const apiClient = new APIClient<AccountsListRequest, AccountsListResponse>(getAccountsList);
		return apiClient.post(<AccountsListRequest>{
			requestTypeId: value.requestTypeId
		});
	}
}
