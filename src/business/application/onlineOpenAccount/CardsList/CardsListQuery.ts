import { IRequest } from '@Mediatr/index';
import { CardsListResponse } from 'common/entities/CardsList/CardsListResponse';

export default class CardsListQuery implements IRequest<CardsListResponse> {
	accountCode: string;

	constructor(input: CardsListQuery) {
		this.accountCode = input?.accountCode;
	}
}
