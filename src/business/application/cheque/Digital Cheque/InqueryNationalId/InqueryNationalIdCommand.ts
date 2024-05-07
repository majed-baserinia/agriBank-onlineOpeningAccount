import { IRequest } from '@Mediatr/index';
import { GetCheckSheetsResponse } from 'common/entities/cheque/Digital Cheque/GetChecksheets/GetChecksheetsResponse';

export default class InqueryNationalIdCommand implements IRequest<GetCheckSheetsResponse> {
	nationalId: string;

	constructor(InqueryNationalIdCommand: InqueryNationalIdCommand) {
		this.nationalId = InqueryNationalIdCommand.nationalId;
	}
}
