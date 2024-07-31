import { IRequestHandler, requestHandler } from '@Mediatr/index';
import APIClient from 'business/infrastructure/api-client';
import { CitiesRequest } from 'common/entities/Cities/CitiesRequest';
import { CitiesResponse } from 'common/entities/Cities/CitiesResponse';
import CitiesCommand from './CitiesCommand';
import { Cities } from 'business/infrastructure/end-points';

@requestHandler(CitiesCommand)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class CitiesCommandHandler implements IRequestHandler<CitiesCommand, CitiesResponse> {
	handle(value: CitiesCommand): Promise<CitiesResponse> {
		const apiClient = new APIClient<CitiesRequest, CitiesResponse>(Cities);
		return apiClient.post(<CitiesRequest>{
			provinceId: value.provinceId
		});
	}
}
