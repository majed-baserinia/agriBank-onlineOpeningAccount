import { IRequestHandler, requestHandler } from '@Mediatr/index';
import APIClient from 'business/infrastructure/api-client';
import { saveAddress } from 'business/infrastructure/end-points';
import { SaveAddressRequest } from 'common/entities/SaveAddress/SaveAddressRequest';
import { SaveAddressResponse } from 'common/entities/SaveAddress/SaveAddressResponse';
import SaveAddressCommand from './SaveAddressCommand';

@requestHandler(SaveAddressCommand)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class SaveAddressCommandHandler implements IRequestHandler<SaveAddressCommand, SaveAddressResponse> {
	handle(value: SaveAddressCommand): Promise<SaveAddressResponse> {
		const apiClient = new APIClient<SaveAddressRequest, SaveAddressResponse>(saveAddress);
		return apiClient.post(<SaveAddressRequest>{
			provinceId: value.provinceId,
			cityId: value.cityId,
			branchCode: value.branchCode,
			postalCode: value.postalCode,
			village: value.village,
			mainStreet: value.mainStreet,
			alley: value.alley,
			phone: value.phone,
			jobDetailId: value.jobDetailId,
			token: value.token
		});
	}
}
