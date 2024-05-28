export type SignerData = {
	customerNumber: number;
	name: string;
};

export type ReceiverData = {
	name: string;
	shahabNo: string;
	nationalNo: string;
	customerType: 1 | 2 | 3 | 4;
};

export type Props =
	| {
			type: 'receiver';
			receiverData: ReceiverData;
	  }
	| {
			type: 'signer';
			signerData: SignerData;
	  };
