import { Mediator } from '@Mediatr/index';
import { useQuery } from '@tanstack/react-query';
import GetCodesQuery from 'business/application/cheque/Digital Cheque/GetCodes/GetCodesQuery';
import { GetCodeResponse } from 'common/entities/cheque/Digital Cheque/GetCodesResponse';

const mediator = new Mediator();

export default function useGetReasonCodes() {
	useQuery({
		queryKey: ['currentAccouns'],
		queryFn: () => mediator.send<GetCodeResponse>(new GetCodesQuery()),
		staleTime: 0, //ms('30m')
		retry: false
	});
}
