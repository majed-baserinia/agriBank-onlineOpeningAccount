import { IRequestHandler, requestHandler } from '@Mediatr/index';
import APIClient from 'business/infrastructure/api-client';
import { saveObligation } from 'business/infrastructure/end-points';
import { SaveObligationRequest } from 'common/entities/SaveObligation/SaveObligationRequest';
import { SaveObligationResponse } from 'common/entities/SaveObligation/SaveObligationResponse';
import SaveObligationCommand from './SaveObligationCommand';

@requestHandler(SaveObligationCommand)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class SaveObligationCommandHandler implements IRequestHandler<SaveObligationCommand, SaveObligationResponse> {
	handle(value: SaveObligationCommand): Promise<SaveObligationResponse> {
		const apiClient = new APIClient<SaveObligationRequest, SaveObligationResponse>(saveObligation);
		return apiClient.post(<SaveObligationRequest>{
			token: value.token
		});
	}
}
