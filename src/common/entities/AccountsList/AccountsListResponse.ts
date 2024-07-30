export interface AccountsListResponse {
	data: Account[];
	ok: boolean;
	status: number;
	detail: string;
	totalCount: number;
	errors: null;
}

type Account = {
	id: string;
	title: string;
	hasCard: boolean;
	isCurrency: boolean;
};
