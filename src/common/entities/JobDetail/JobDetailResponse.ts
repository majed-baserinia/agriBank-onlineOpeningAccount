export interface JobDetailResponse {
	ok: boolean;
	status: number;
	detail: string;
	totalCount: number;
	errors: string[];
	data: Job[];
}

type Job = {
	id: string;
	title: string;
	jobId: string;
};
