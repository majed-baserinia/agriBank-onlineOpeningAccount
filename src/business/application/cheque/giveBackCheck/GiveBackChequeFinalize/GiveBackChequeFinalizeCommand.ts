import { IRequest } from '@Mediatr/index';

export default class GiveBackChequeFinalizeCommand implements IRequest<{}> {
	transferChequeKey: string;
	

	constructor(formData: GiveBackChequeFinalizeCommand) {
		this.transferChequeKey = formData.transferChequeKey;
		
	}
}
