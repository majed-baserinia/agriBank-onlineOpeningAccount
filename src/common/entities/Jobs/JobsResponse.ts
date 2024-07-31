export interface JobsResponse {
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
};
