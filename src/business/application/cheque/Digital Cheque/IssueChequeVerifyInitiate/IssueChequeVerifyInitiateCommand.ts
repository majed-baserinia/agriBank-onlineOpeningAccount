import { IRequest } from '@Mediatr/index';
import { IssueChequeVerifyInitiateResponse } from 'common/entities/cheque/Digital Cheque/IssueChequeVerifyInitiate/IssueChequeVerifyInitiateResponse';

export default class IssueChequeVerifyInitiateCommand implements IRequest<IssueChequeVerifyInitiateResponse> {
	issueChequeKey: string;
	otpCode: string;
	signSingleSignatureLegal: boolean;

	constructor(IssueChequeVerifyInitiateCommand: IssueChequeVerifyInitiateCommand) {
		this.issueChequeKey = IssueChequeVerifyInitiateCommand.issueChequeKey;
		this.otpCode = IssueChequeVerifyInitiateCommand.otpCode;
		this.signSingleSignatureLegal = IssueChequeVerifyInitiateCommand.signSingleSignatureLegal;
	}
}
