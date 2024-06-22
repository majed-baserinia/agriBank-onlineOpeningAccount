import { IRequest } from '@Mediatr/index';

export default class RejectGiveBackChequeInitiateOtpCommand implements IRequest<{}> {
	transferChequeKey: string;

	constructor(formData: RejectGiveBackChequeInitiateOtpCommand) {
		this.transferChequeKey = formData.transferChequeKey;
	}
}
