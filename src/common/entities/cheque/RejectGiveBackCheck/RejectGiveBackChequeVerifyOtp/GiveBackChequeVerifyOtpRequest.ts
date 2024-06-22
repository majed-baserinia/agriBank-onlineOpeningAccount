export interface RejectGiveBackChequeVerifyOtpRequest {
	transferChequeKey: string;
	otpCode: string;
	selectSingleSignatureLegal: boolean;
}
