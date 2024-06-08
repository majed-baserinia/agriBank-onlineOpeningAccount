import { RecieverRequest } from 'common/entities/cheque/Digital Cheque/IssueChequeInitiate/IssueChequeInitiateRequest';
import { SetStateAction } from 'react';

export type CheckReceiversProps = {
	getRceivers: (recievers: RecieverRequest[]) => void;
};

export type AddFormProps = {
	setReceivers: (value: SetStateAction<RecieverRequest[]>) => void;
	setOpen: (value: SetStateAction<boolean>) => void;
};

export type ListProps = {
	receivers: RecieverRequest[];
	setReceivers: (value: SetStateAction<RecieverRequest[]>) => void;
};
