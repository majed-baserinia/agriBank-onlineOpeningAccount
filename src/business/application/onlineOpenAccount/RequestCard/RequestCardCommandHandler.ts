import { IRequestHandler, requestHandler } from '@Mediatr/index';
import APIClient from 'business/infrastructure/api-client';
import { requestCard } from 'business/infrastructure/end-points';
import { RequestCardRequest } from 'common/entities/RequestCard/RequestCardRequest';
import { RequestCardResponse } from 'common/entities/RequestCard/RequestCardResponse';
import RequestCardCommand from './RequestCardCommand';

@requestHandler(RequestCardCommand)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class RequestCardCommandHandler implements IRequestHandler<RequestCardCommand, RequestCardResponse> {
	handle(value: RequestCardCommand): Promise<RequestCardResponse> {
		const apiClient = new APIClient<RequestCardRequest, RequestCardResponse>(requestCard);
		return apiClient.post(<RequestCardRequest>{
			cityId: value.cityId,
			token: value.token,
            cardAddress: value.cardAddress,
            cardPatternId: value.cardPatternId,
            cardPostalCode: value.cardPostalCode,
            identifierValue: value.identifierValue,
            requestCard: value.requestCard,
            sameHomeAddressForCard: value.sameHomeAddressForCard,
            
		});
	}
}
