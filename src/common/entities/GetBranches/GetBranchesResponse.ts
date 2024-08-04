export type GetBranchesResponse = Branch[];

type Branch = {
	provinceName: string;
	cityName: string;
	branchName: string;
	branchCode: string;
	isCurrency: boolean;
};
