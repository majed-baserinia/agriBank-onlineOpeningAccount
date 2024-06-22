import { IRequest } from '@Mediatr/index';

export default class GivebackChequeInitiateCommand implements IRequest<{}> {
	customerNumber: number;
	sayadNo: number;
	description: string;
	toIban?: string;

	constructor(formData: GivebackChequeInitiateCommand) {
		this.description = formData.description;
		this.customerNumber = formData.customerNumber;
		this.sayadNo = formData.sayadNo;
		this.toIban = formData?.toIban;
	}
}
