export interface IssueWithGroupRequest {
	isSequentional: boolean;
	withDrawalGroup: WithdrawalDetails[];
}
export interface WithdrawalDetails {
	groupNumber: string;
	withdrawalGroups: withdrawalGroups[];
}
interface withdrawalGroups {
	customerNumber: number;
	name: string;
}
