export interface CheckInitiateOtpResponse {
	issueChequeKey: string;
	message: string;
	lifeTime: number;
	codeLength: number;
}
