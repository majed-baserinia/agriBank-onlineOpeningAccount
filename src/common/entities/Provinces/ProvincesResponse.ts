export interface ProvincesResponse {
	ok: boolean;
	status: number;
	detail: string;
	totalCount: number;
	errors: string[];
	data: Province[];
}

type Province = {
	id: string;
	title: string;
};
