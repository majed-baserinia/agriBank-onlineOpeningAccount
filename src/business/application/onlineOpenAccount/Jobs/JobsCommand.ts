import { IRequest } from '@Mediatr/index';
import { JobsResponse } from 'common/entities/Jobs/JobsResponse';

export default class JobsCommand implements IRequest<JobsResponse> {
	code: string;

	constructor(input: JobsCommand) {
		this.code = input.code;
	}
}
