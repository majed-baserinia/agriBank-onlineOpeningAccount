export interface InquiryWithGroupResponse {
	issueChequeKey: string;
	withdrawalGroup: WithdrawalDetails[];
}
interface WithdrawalDetails {
	groupNumber: string;
	withdrawalGroups: withdrawalGroups[];
}
interface withdrawalGroups {
	customerNumber: number;
	name: string;
}
