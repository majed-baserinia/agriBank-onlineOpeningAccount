import { Mediator } from '@Mediatr/index';
import { useQuery } from '@tanstack/react-query';
import CurrentAccountsQuery from 'business/application/cheque/Digital Cheque/Accounts/CurrentAccountsQuery';
import CurrentAccountResponse from 'common/entities/cheque/Digital Cheque/AccountResponse';

const mediator = new Mediator();

const useAccounts = () =>
	useQuery({
		queryKey: ['currentAccouns'],
		queryFn: () => mediator.send<CurrentAccountResponse[]>(new CurrentAccountsQuery()),
		staleTime: 0, //ms('30m')
		retry: false
	});

export default useAccounts;
