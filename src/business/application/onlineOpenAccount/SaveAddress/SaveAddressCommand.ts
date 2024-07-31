import { IRequest } from '@Mediatr/index';
import { SaveAddressResponse } from 'common/entities/SaveAddress/SaveAddressResponse';

export default class SaveAddressCommand implements IRequest<SaveAddressResponse> {
	provinceId: number;
	cityId: number;
	branchCode: string;
	postalCode: string;
	village: string;
	mainStreet: string;
	alley: string;
	phone: string;
	jobDetailId: number;
	token: string;

	constructor(input: SaveAddressCommand) {
		this.provinceId = input.provinceId;
		this.cityId = input.cityId;
		this.branchCode = input.branchCode;
		this.postalCode = input.postalCode;
		this.village = input.village;
		this.mainStreet = input.mainStreet;
		this.alley = input.alley;
		this.phone = input.phone;
		this.jobDetailId = input.jobDetailId;
		this.token = input.token;
	}
}
