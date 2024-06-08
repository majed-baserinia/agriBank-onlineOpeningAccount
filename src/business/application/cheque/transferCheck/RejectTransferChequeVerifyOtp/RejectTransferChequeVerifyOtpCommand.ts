import { IRequest } from '@Mediatr/index';
import { RejectTransferChequeVerifyOtpRequest } from 'common/entities/cheque/transferCheck/RejectTransferChequeVerifyOtp/RejectTransferChequeVerifyOtpRequest';
import { TransferChequeVerifyOtpRequest } from 'common/entities/cheque/transferCheck/TransferChequeVerifyOtp/TransferChequeVerifyOtpRequest';

export default class RejectTransferChequeVerifyOtpCommand implements IRequest<RejectTransferChequeVerifyOtpRequest> {
	transferChequeKey: string;
	otpCode: string;
	selectSingleSignatureLegal: boolean;

	constructor(input: RejectTransferChequeVerifyOtpCommand) {
		this.transferChequeKey = input.transferChequeKey;
		this.otpCode = input.otpCode;
		this.selectSingleSignatureLegal = input.selectSingleSignatureLegal;
	}
}
