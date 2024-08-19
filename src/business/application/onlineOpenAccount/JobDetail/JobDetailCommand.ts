import { IRequest } from '@Mediatr/index';
import { JobDetailResponse } from 'common/entities/JobDetail/JobDetailResponse';

export default class JobDetailCommand implements IRequest<JobDetailResponse> {
	code: string;
	jobId: string;

	constructor(input: JobDetailCommand) {
		this.code = input.code;
		this.jobId = input.jobId;
	}
}
