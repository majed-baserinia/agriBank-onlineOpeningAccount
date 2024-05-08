import { IRequestHandler, requestHandler } from '@Mediatr/index';
import APIClient from 'business/infrastructure/api-client';

import { IssueChequeVerifyInitiate } from 'business/infrastructure/end-points';
import { IssueChequeVerifyInitiateRequest } from 'common/entities/cheque/Digital Cheque/IssueChequeVerifyInitiate/IssueChequeVerifyInitiateRequet';
import { IssueChequeVerifyInitiateResponse } from 'common/entities/cheque/Digital Cheque/IssueChequeVerifyInitiate/IssueChequeVerifyInitiateResponse';
import IssueChequeVerifyInitiateCommand from './IssueChequeVerifyInitiateCommand';

@requestHandler(IssueChequeVerifyInitiateCommand)
export class IssueChequeVerifyInitiateCommandHandler
	implements IRequestHandler<IssueChequeVerifyInitiateCommand, IssueChequeVerifyInitiateResponse>
{
	handle(value: IssueChequeVerifyInitiateCommand): Promise<IssueChequeVerifyInitiateResponse> {
		const apiClient = new APIClient<IssueChequeVerifyInitiateRequest, IssueChequeVerifyInitiateResponse>(
			IssueChequeVerifyInitiate
		);
		return apiClient.post(<IssueChequeVerifyInitiateRequest>{
			issueChequeKey: value.issueChequeKey,
			otpCode: value.otpCode,
			signSingleSignatureLegal: value.signSingleSignatureLegal
		});
	}
}
