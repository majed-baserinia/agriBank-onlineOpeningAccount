export interface TransferChequeVerifyOtpRequest {
	transferChequeKey: string;
	otpCode: string;
	selectSingleSignatureLegal: boolean;
}
