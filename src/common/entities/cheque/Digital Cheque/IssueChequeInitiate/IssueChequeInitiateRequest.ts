export interface IssueChequeInitiateRequest {
    sayadNo: number;
    amount: number;
    dueDate: string;
    description: string;
    reason: string;
    recievers: Reciever[];
}


export type Reciever = {
	name: string;
	shahabNo: string;
	nationalNo: string;
	customerType: 1 | 2;
};