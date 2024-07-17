import { IRequestHandler, requestHandler } from '@Mediatr/index';
import APIClient from 'business/infrastructure/api-client';

import { CheckInitiateOtpRequest } from 'common/entities/CheckInitiateOtp/CheckInitiateOtpRequest';
import { CheckInitiateOtpResponse } from 'common/entities/CheckInitiateOtp/CheckInitiateOtpResponse';
import CheckInitiateOtpCommand from './CheckInitiateOtpCommand';
import { Transferchequeinitiateotp } from 'business/infrastructure/end-points';

@requestHandler(CheckInitiateOtpCommand)
export class CheckInitiateOtpCommandHandler
	implements IRequestHandler<CheckInitiateOtpCommand, CheckInitiateOtpResponse>
{
	handle(value: CheckInitiateOtpCommand): Promise<CheckInitiateOtpResponse> {
		const apiClient = new APIClient<CheckInitiateOtpRequest, CheckInitiateOtpResponse>(Transferchequeinitiateotp);
		return apiClient.post(<CheckInitiateOtpRequest>{
			issueChequeKey: value.issueChequeKey
		});
	}
}
