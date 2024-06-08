import { Reciever, Signer } from 'common/entities/cheque/Digital Cheque/Issue Groups/IssueWithGroupResponse';

export type Props = {
	recievers?: Reciever[];
	signers?: Signer[];
	holders?: Holders[];
};

type Holders = {
	name: string;
	nationalNo: string;
	customerType: 1 | 2 | 3 | 4;
	customerTypeDescription: string;
	lastActionDate: string;
	acceptTransfer: 0 | 1;
	acceptTransferDescription: string;
};
