import { IRequest } from '@Mediatr/index';

export default class RejectGiveBackChequeFinalizeCommand implements IRequest<{}> {
	transferChequeKey: string;
	

	constructor(formData: RejectGiveBackChequeFinalizeCommand) {
		this.transferChequeKey = formData.transferChequeKey;
		
	}
}
