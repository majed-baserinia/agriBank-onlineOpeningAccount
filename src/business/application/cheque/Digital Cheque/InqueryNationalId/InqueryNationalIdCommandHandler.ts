import { IRequestHandler, requestHandler } from '@Mediatr/index';
import APIClient from 'business/infrastructure/api-client';

import { getChecksheets } from 'business/infrastructure/end-points';
import { GetCheckSheetsRequest } from 'common/entities/cheque/Digital Cheque/GetChecksheets/GetChecksheetsRequest';
import { GetCheckSheetsResponse } from 'common/entities/cheque/Digital Cheque/GetChecksheets/GetChecksheetsResponse';
import InqueryNationalIdCommand from './InqueryNationalIdCommand';

@requestHandler(InqueryNationalIdCommand)
export class InqueryNationalIdCommandHandler
	implements IRequestHandler<InqueryNationalIdCommand, GetCheckSheetsResponse>
{
	handle(value: InqueryNationalIdCommand): Promise<GetCheckSheetsResponse> {
		const apiClient = new APIClient<GetCheckSheetsRequest, GetCheckSheetsResponse>(getChecksheets);
		return apiClient.post(<GetCheckSheetsRequest>{
			nationalId: value.nationalId
		});
	}
}
