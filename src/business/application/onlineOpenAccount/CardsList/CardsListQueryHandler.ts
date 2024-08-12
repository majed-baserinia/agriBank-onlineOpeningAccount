import { IRequestHandler, requestHandler } from '@Mediatr/index';
import APIClient from 'business/infrastructure/api-client';
import { CardsList } from 'business/infrastructure/end-points';
import { CardsListRequest } from 'common/entities/CardsList/CardsListRequest';
import { CardsListResponse } from 'common/entities/CardsList/CardsListResponse';
import CardsListQuery from './CardsListQuery';

@requestHandler(CardsListQuery)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class CardsListQueryHandler implements IRequestHandler<CardsListQuery, CardsListResponse> {
	async handle(value: CardsListQuery): Promise<CardsListResponse> {
		const res = await fetch('/api-config-open-account.json');
		const config = await res.json();
		let apiClient = new APIClient<CardsListRequest, CardsListResponse>(CardsList, config.apiBaseUrlDigitalBanking);
		return apiClient.get(value.accountCode);
	}
}
