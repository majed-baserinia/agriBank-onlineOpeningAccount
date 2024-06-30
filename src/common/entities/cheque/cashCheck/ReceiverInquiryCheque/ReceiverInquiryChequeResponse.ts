export interface ReceiverInquiryChequeResponse {
	sayadId: string;
	branchCode: string;
	bankCode: string;
	amount: number;
	dueDate: string;
	description: string;
	serialNo: string;
	seriesNo: string;
	fromIban: string;
	reason: string;
	reasonDescription: string;
	currency: number;
	currencyDescription: string;
	chequeStatus: number;
	chequeStatusDescription: string;
	chequeType: number;
	chequeTypeDescription: string;
	chequeMedia: number;
	chequeMediaDescription: string;
	blockStatus: number;
	blockStatusDescription: string;
	guaranteeStatus: number;
	guaranteeStatusDescription: string;
	locked: number;
	lockedDescription: string;
	holders: {
		name: string;
		nationalNo: string;
		customerType: 1 | 2 | 3 | 4;
		customerTypeDescription: string;
	}[];
	signers: {
		name: string;
		legalStamp: number;
		legalStampDescription: string;
	}[];
	lockerBankCode: string;
	lockerBranchCode: string;
	issueDate: string;
}
