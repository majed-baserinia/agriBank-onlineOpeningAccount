import { IRequest } from '@Mediatr/index';
import { GetObligationResponse } from 'common/entities/GetObligation/GetObligationResponse';

export default class GetObligationCommand implements IRequest<GetObligationResponse> {
	token: string;

	constructor(input: GetObligationCommand) {
		this.token = input?.token;
	}
}
