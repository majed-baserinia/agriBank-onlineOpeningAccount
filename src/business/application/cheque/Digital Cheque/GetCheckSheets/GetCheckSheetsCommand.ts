import { IRequest } from '@Mediatr/index';
import { GetCheckSheetsResponse } from 'common/entities/cheque/Digital Cheque/GetChecksheets/GetChecksheetsResponse';

export default class GetChecksheetsCommand implements IRequest<GetCheckSheetsResponse> {
	accountNumber: string;
	startChequeNo: string;
	endChequeNo: string;

	constructor(GetChecksheetsCommand: GetChecksheetsCommand) {
		this.accountNumber = GetChecksheetsCommand.accountNumber;
		this.startChequeNo = GetChecksheetsCommand.startChequeNo;
		this.endChequeNo = GetChecksheetsCommand.endChequeNo;
	}
}
