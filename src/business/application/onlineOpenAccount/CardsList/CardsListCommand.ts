import { IRequest } from '@Mediatr/index';
import { CardsListResponse } from 'common/entities/CardsList/CardsListResponse';

export default class CardsListCommand implements IRequest<CardsListResponse> {
	accountCode: string;

	constructor(input: CardsListCommand) {
		this.accountCode = input?.accountCode;
	}
}
