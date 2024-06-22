import { IRequest } from '@Mediatr/index';
import { GiveBackChequeInitiateOtpResponse } from 'common/entities/cheque/GivebackCheck/GiveBackChequeInitiateOtp/GiveBackChequeInitiateOtpResponse';

export default class GiveBackChequeInitiateOtpCommand implements IRequest<GiveBackChequeInitiateOtpResponse> {
	transferChequeKey: string;

	constructor(formData: GiveBackChequeInitiateOtpCommand) {
		this.transferChequeKey = formData.transferChequeKey;
	}
}
