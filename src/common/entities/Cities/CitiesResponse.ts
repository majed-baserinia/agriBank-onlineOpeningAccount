export interface CitiesResponse {
	ok: boolean;
	status: number;
	detail: string;
	totalCount: number;
	errors: string[];
	data: City[];
}

type City = {
	id: string;
	title: string;
};
