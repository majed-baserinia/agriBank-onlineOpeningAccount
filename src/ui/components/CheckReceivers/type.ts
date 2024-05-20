import { Reciever } from 'common/entities/cheque/Digital Cheque/IssueChequeInitiate/IssueChequeInitiateRequest';
import { SetStateAction } from 'react';

export type CheckReceiversProps = {
	getRceivers: (recievers: Reciever[]) => void;
};

export type AddFormProps = {
	setReceivers: (value: SetStateAction<Reciever[]>) => void;
	setOpen: (value: SetStateAction<boolean>) => void;
};

export type ListProps = {
	receivers: Reciever[];
	setReceivers: (value: SetStateAction<Reciever[]>) => void;
};
