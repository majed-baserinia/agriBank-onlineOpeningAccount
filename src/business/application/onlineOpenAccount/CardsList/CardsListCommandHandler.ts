import { IRequestHandler, requestHandler } from '@Mediatr/index';
import APIClient from 'business/infrastructure/api-client';
import { CardsListRequest } from 'common/entities/CardsList/CardsListRequest';
import { CardsListResponse } from 'common/entities/CardsList/CardsListResponse';
import CardsListCommand from './CardsListCommand';
import { CardsList } from 'business/infrastructure/end-points';

@requestHandler(CardsListCommand)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class CardsListCommandHandler implements IRequestHandler<CardsListCommand, CardsListResponse> {
	handle(value: CardsListCommand): Promise<CardsListResponse> {
		const apiClient = new APIClient<CardsListRequest, CardsListResponse>(CardsList);
		return apiClient.post(<CardsListRequest>{
			accountCode: value.accountCode
		});
	}
}
