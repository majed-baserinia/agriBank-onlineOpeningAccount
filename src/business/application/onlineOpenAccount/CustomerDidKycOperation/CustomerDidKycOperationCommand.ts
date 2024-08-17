import { IRequest } from '@Mediatr/index';
import { CreateAuthRequestResponse } from 'common/entities/CreateAuthRequest/CreateAuthRequestResponse';

export default class CustomerDidKycOperationCommand implements IRequest<CreateAuthRequestResponse> {
	token: string;

	constructor(input: CustomerDidKycOperationCommand) {
		this.token = input?.token;
	}
}
