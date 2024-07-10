import { Reciever, Signer } from 'common/entities/cheque/Digital Cheque/Issue Groups/IssueWithGroupResponse';
import { Holder } from 'common/entities/cheque/transferCheck/InquiryTransferStatus/InquiryTransferStatusResponse';

export type Props = {
	recievers?: Reciever[];
	signers?: Signer[];
	holders?: Holder[];
};
