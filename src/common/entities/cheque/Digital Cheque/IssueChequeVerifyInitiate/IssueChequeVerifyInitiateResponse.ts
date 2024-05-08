export interface IssueChequeVerifyInitiateResponse {
	issueChequeKey: string;
	needInquiryWithDrawalGroup: boolean;
	issueChequeOverView: issueChequeOverView;
}

export interface issueChequeOverView {
	sayadNo: number;
	seri: string;
	serial: string;
	amount: number;
	dueDate: string;
	reason: string;
	description: string;
	toIBAN: string;
	signers: Signers;
	recievers: Recievers;
}

type Signers = {
	groupNumber: string;
	withdrawalGroups: {
		customerNumber: number;
		name: string;
	}[];
}[];

type Recievers = {
	name: string;
	shahabNo: string;
	nationalNo: string;
	customerTypeDescription: string;
}[];
