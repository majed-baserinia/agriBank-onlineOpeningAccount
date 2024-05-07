import { IRequestHandler, requestHandler } from '@Mediatr/index';
import APIClient from 'business/infrastructure/api-client';

import { getChecksheets } from 'business/infrastructure/end-points';
import { CheckInitiateOtpRequest } from 'common/entities/cheque/Digital Cheque/CheckInitiateOtp/CheckInitiateOtpRequest';
import { CheckInitiateOtpResponse } from 'common/entities/cheque/Digital Cheque/CheckInitiateOtp/CheckInitiateOtpResponse';
import CheckInitiateOtpCommand from './CheckInitiateOtpCommand';

@requestHandler(CheckInitiateOtpCommand)
export class CheckInitiateOtpCommandHandler
	implements IRequestHandler<CheckInitiateOtpCommand, CheckInitiateOtpResponse>
{
	handle(value: CheckInitiateOtpCommand): Promise<CheckInitiateOtpResponse> {
		const apiClient = new APIClient<CheckInitiateOtpRequest, CheckInitiateOtpResponse>(getChecksheets);
		return apiClient.post(<CheckInitiateOtpRequest>{
			issueChequeKey: value.issueChequeKey
		});
	}
}
