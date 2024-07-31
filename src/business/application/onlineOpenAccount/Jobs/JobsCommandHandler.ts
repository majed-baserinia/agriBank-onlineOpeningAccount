import { IRequestHandler, requestHandler } from '@Mediatr/index';
import APIClient from 'business/infrastructure/api-client';
import { JobsRequest } from 'common/entities/Jobs/JobsRequest';
import { JobsResponse } from 'common/entities/Jobs/JobsResponse';
import JobsCommand from './JobsCommand';
import { Jobs } from 'business/infrastructure/end-points';

@requestHandler(JobsCommand)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class JobsCommandHandler implements IRequestHandler<JobsCommand, JobsResponse> {
	handle(value: JobsCommand): Promise<JobsResponse> {
		const apiClient = new APIClient<JobsRequest, JobsResponse>(Jobs);
		return apiClient.post(<JobsRequest>{
			code: value.code
		});
	}
}
