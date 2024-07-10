export interface InquiryTransferStatusRespone {
	sayadId: string;
	branchCode: string;
	bankCode: string;
	amount: string;
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
	giveBack: number;
	curTransferDescription: string;
	curTransferReason: string;
	curTransferReasonDescription: string;
	holders: Holder[];
	receivers: InquiryTransferStatusReceiver[];
}

export interface Holder {
	name: string;
	nationalNo: string;
	customerType: 1 | 2 | 3 | 4;
	customerTypeDescription: string;
	lastActionDate: string;
	acceptTransfer: 0 | 1 | 2;
	acceptTransferDescription: string;
}

export interface InquiryTransferStatusReceiver {
	name: string;
	shahabNo: string;
	nationalNo: string;
	customerType: 1 | 2 | 3 | 4;
	customerTypeDescription: string;
}
