export interface IssueChequeVerifyInitiateRequest {
	issueChequeKey: string;
	otpCode: string;
	signSingleSignatureLegal: boolean;
}
