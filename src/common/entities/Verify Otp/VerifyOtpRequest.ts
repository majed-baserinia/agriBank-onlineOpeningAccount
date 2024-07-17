export interface VerifyOtpRequest {
	issueChequeKey: string;
	otpCode: string;
	signSingleSignatureLegal: boolean;
}
