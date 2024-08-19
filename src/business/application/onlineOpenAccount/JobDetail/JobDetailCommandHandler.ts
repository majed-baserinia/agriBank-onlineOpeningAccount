import { IRequestHandler, requestHandler } from '@Mediatr/index';
import APIClient from 'business/infrastructure/api-client';

import { JobDetail } from 'business/infrastructure/end-points';
import { JobDetailRequest } from 'common/entities/JobDetail/JobDetailRequest';
import { JobDetailResponse } from 'common/entities/JobDetail/JobDetailResponse';
import JobDetailCommand from './JobDetailCommand';

@requestHandler(JobDetailCommand)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class JobDetailCommandHandler implements IRequestHandler<JobDetailCommand, JobDetailResponse> {
	handle(value: JobDetailCommand): Promise<JobDetailResponse> {
		const apiClient = new APIClient<JobDetailRequest, JobDetailResponse>(JobDetail);
		return apiClient.post(<JobDetailRequest>{
			code: value.code,
			jobId: value.jobId
		});
	}
}
