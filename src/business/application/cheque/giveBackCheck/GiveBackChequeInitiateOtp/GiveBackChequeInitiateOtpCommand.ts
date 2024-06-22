import { IRequest } from '@Mediatr/index';

export default class GiveBackChequeInitiateOtpCommand implements IRequest<{}> {
	transferChequeKey: string;

	constructor(formData: GiveBackChequeInitiateOtpCommand) {
		this.transferChequeKey = formData.transferChequeKey;
	}
}
