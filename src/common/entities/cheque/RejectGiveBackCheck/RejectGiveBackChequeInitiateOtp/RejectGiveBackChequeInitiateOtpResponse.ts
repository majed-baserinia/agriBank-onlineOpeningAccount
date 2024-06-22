export interface RejectGiveBackChequeInitiateOtpResponse {
	transferChequeKey: string;
	message: string;
	lifeTime: number;
	codeLength: number;
}
