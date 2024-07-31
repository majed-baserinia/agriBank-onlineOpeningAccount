import { IRequest } from '@Mediatr/index';
import { SaveObligationResponse } from 'common/entities/SaveObligation/SaveObligationResponse';

export default class SaveObligationCommand implements IRequest<SaveObligationResponse> {
	token: string;

	constructor(input: SaveObligationCommand) {
		this.token = input?.token;
	}
}
