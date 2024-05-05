import { IRequest } from '@Mediatr/index';
import { GetCheckbooksResponse } from 'common/entities/cheque/Digital Cheque/GetCheckbooks/GetCheckbooksResponse';

export default class GetCheckbooksQuery implements IRequest<GetCheckbooksResponse> {
	accountNumber: string;

	constructor(accountNumber: string) {
		this.accountNumber = accountNumber;
	}
}
