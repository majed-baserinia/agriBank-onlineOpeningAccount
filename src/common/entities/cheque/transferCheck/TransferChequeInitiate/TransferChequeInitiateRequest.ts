export interface TransferChequeInitiateRequest {
	sayadNo: number;
	description: string;
	reason: string;
	toIban: string;
	recievers: Reciever[];
}
type Reciever = {
	name: string;
	shahabNo: string;
	nationalNo: string;
	customerType: number;
};
