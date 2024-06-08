export interface RejectTransferChequeVerifyOtpRequest {
	transferChequeKey: string;
	otpCode: string;
	selectSingleSignatureLegal: boolean;
}
