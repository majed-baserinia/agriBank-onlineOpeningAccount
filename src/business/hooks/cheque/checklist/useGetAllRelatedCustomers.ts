import { Mediator } from '@Mediatr/index';
import { useQuery } from '@tanstack/react-query';
import GetAllRelatedCustomersQuery from 'business/application/cheque/checkList/GetAllRelatedCustomers/GetAllRelatedCustomersQuery';
import { ErrorType } from 'common/entities/ErrorType';
import { GetAllRelatedCustomersResponse } from 'common/entities/cheque/chekList/GetAllRelatedCustomers/GetAllRelatedCustomersResponse';

const mediator = new Mediator();

const useGetAllRelatedCustomers = (serviceName: string) =>
	useQuery<GetAllRelatedCustomersResponse, ErrorType<{}>, GetAllRelatedCustomersResponse>({
		queryKey: ['GetAllRelatedCustomers'],
		queryFn: () => mediator.send<GetAllRelatedCustomersResponse>(new GetAllRelatedCustomersQuery(serviceName)),
		staleTime: 0, //ms('30m')
		retry: false
	});

export default useGetAllRelatedCustomers;
