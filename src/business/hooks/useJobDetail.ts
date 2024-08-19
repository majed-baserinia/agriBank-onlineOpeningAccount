import { Mediator } from '@Mediatr/index';
import { useMutation } from '@tanstack/react-query';
import JobDetailCommand from 'business/application/onlineOpenAccount/JobDetail/JobDetailCommand';
import { ErrorType } from 'common/entities/ErrorType';
import { JobDetailRequest } from 'common/entities/JobDetail/JobDetailRequest';
import { JobDetailResponse } from 'common/entities/JobDetail/JobDetailResponse';

const mediator = new Mediator();

export default function useJobDetail() {
	return useMutation<JobDetailResponse, ErrorType<JobDetailRequest>, JobDetailCommand>({
		mutationFn: (data: JobDetailCommand) => mediator.send<JobDetailResponse>(new JobDetailCommand(data)),
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
