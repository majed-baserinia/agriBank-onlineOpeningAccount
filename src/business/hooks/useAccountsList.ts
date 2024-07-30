import { Mediator } from '@Mediatr/index';
import { useMutation } from '@tanstack/react-query';
import { ErrorType } from 'common/entities/ErrorType';

import AccountsListCommand from 'business/application/onlineOpenAccount/AccountsList/AccountsListCommand';
import { AccountsListRequest } from 'common/entities/AccountsList/AccountsListRequest';
import { AccountsListResponse } from 'common/entities/AccountsList/AccountsListResponse';

const mediator = new Mediator();

export default function useAccountsList() {
	return useMutation<AccountsListResponse, ErrorType<AccountsListRequest>, AccountsListCommand>({
		mutationFn: (data: AccountsListCommand) => mediator.send<AccountsListResponse>(new AccountsListCommand(data)),
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
