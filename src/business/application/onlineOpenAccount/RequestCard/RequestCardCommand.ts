import { IRequest } from '@Mediatr/index';
import { RequestCardResponse } from 'common/entities/RequestCard/RequestCardResponse';

export default class RequestCardCommand implements IRequest<RequestCardResponse> {
	requestCard: boolean;
	cardPatternId: number;
	sameHomeAddressForCard: boolean;
	cityId: number;
	cardAddress: string;
	cardPostalCode: string;
	identifierValue: string;
	token: string;

	constructor(input: RequestCardCommand) {
		this.requestCard = input.requestCard;
		this.cardPatternId = input.cardPatternId;
		this.sameHomeAddressForCard = input.sameHomeAddressForCard;
		this.cityId = input.cityId;
		this.cardAddress = input.cardAddress;
		this.cardPostalCode = input.cardPostalCode;
		this.identifierValue = input.identifierValue;
		this.token = input.token;
	}
}
