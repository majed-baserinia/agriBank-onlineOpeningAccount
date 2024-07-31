import { IRequestHandler, requestHandler } from '@Mediatr/index';
import APIClient from 'business/infrastructure/api-client';
import { Provinces } from 'business/infrastructure/end-points';

import { ProvincesRequest } from 'common/entities/Provinces/ProvincesRequest';
import { ProvincesResponse } from 'common/entities/Provinces/ProvincesResponse';
import ProvincesCommand from './ProvincesCommand';

@requestHandler(ProvincesCommand)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class ProvincesCommandHandler implements IRequestHandler<ProvincesCommand, ProvincesResponse> {
	handle(value: ProvincesCommand): Promise<ProvincesResponse> {
		const apiClient = new APIClient<ProvincesRequest, ProvincesResponse>(Provinces);
		return apiClient.post(<ProvincesRequest>{});
	}
}
