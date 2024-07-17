import { Mediator } from '@Mediatr/index';
import { QueryKey, useQuery } from '@tanstack/react-query';
import CurrentAccountsQuery from 'business/application/Accounts/CurrentAccountsQuery';
import { ErrorType } from 'common/entities/ErrorType';
import CurrentAccountResponse from 'common/entities/AccountResponse';

const mediator = new Mediator();

const useAccounts = () =>
	useQuery<CurrentAccountResponse[], ErrorType<{}>, CurrentAccountResponse[], QueryKey>({
		queryKey: ['currentAccouns'],
		queryFn: () => mediator.send<CurrentAccountResponse[]>(new CurrentAccountsQuery()),
		staleTime: 0, //ms('30m')
		retry: false,
	});

export default useAccounts;
