import { IRequestHandler, requestHandler } from '@Mediatr/index';
import CurrentAccountsQuery from 'business/application/Accounts/CurrentAccountsQuery';
import APIClient from 'business/infrastructure/api-client';
import { CurrentAccounts } from 'business/infrastructure/end-points';
import CurrentAccountResponse from 'common/entities/AccountResponse';

@requestHandler(CurrentAccountsQuery)
export class CurrentAccountsQueryHandler implements IRequestHandler<CurrentAccountsQuery, CurrentAccountResponse[]> {
	handle(value: CurrentAccountsQuery): Promise<CurrentAccountResponse[]> {
		const apiClient = new APIClient<null, CurrentAccountResponse[]>(CurrentAccounts);
		return apiClient.getAll({});
	}
}
