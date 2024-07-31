import { IRequestHandler, requestHandler } from '@Mediatr/index';
import APIClient from 'business/infrastructure/api-client';
import { getObligation } from 'business/infrastructure/end-points';
import { GetObligationRequest } from 'common/entities/GetObligation/GetObligationRequest';
import { GetObligationResponse } from 'common/entities/GetObligation/GetObligationResponse';
import GetObligationCommand from './GetObligationCommand';

@requestHandler(GetObligationCommand)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class GetObligationCommandHandler implements IRequestHandler<GetObligationCommand, GetObligationResponse> {
	handle(value: GetObligationCommand): Promise<GetObligationResponse> {
		const apiClient = new APIClient<GetObligationRequest, GetObligationResponse>(getObligation);
		return apiClient.post(<GetObligationRequest>{
			token: value.token
		});
	}
}
