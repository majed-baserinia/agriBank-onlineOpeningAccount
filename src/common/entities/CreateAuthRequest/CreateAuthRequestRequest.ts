export interface CreateAuthRequestRequest {
	nationalCode: string;
	mobile: string;
	nationalCodeSerial: string;
	birthDate: string;
	accountTypeId: number;
	oneTimeLinkCode: string;
	identityIssueDate: string;
}
