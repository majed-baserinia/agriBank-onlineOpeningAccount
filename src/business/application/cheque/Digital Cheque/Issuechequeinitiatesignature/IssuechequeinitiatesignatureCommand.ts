import { IRequest } from '@Mediatr/index';
import { IssueChequeInitiateSignatureResponse } from 'common/entities/cheque/Digital Cheque/IssueChequeInitiateSignature/IssueChequeInitiateSignatureResponse';

export default class IssueChequeInitiateSignatureCommand implements IRequest<IssueChequeInitiateSignatureResponse> {
	issueChequeKey: string;

	constructor(IssueChequeInitiateSignatureCommand: IssueChequeInitiateSignatureCommand) {
		this.issueChequeKey = IssueChequeInitiateSignatureCommand.issueChequeKey;
	}
}
