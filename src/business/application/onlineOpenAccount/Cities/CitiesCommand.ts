import { IRequest } from '@Mediatr/index';
import { CitiesResponse } from 'common/entities/Cities/CitiesResponse';

export default class CitiesCommand implements IRequest<CitiesResponse> {
	provinceId: number;

	constructor(input: CitiesCommand) {
		this.provinceId = input?.provinceId;
	}
}
