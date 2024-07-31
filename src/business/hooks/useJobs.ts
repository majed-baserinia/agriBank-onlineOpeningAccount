import { Mediator } from '@Mediatr/index';
import { useMutation } from '@tanstack/react-query';
import JobsCommand from 'business/application/onlineOpenAccount/Jobs/JobsCommand';
import { ErrorType } from 'common/entities/ErrorType';
import { JobsRequest } from 'common/entities/Jobs/JobsRequest';
import { JobsResponse } from 'common/entities/Jobs/JobsResponse';

const mediator = new Mediator();

export default function useJobs() {
	return useMutation<JobsResponse, ErrorType<JobsRequest>, JobsCommand>({
		mutationFn: (data: JobsCommand) => mediator.send<JobsResponse>(new JobsCommand(data)),
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
