import { IRequest } from '@Mediatr/index';
import { InquiryGNAFForCardResponse } from 'common/entities/InquiryGNAFForCard/InquiryGNAFForCardResponse';

export default class InquiryGNAFForCardCommand implements IRequest<InquiryGNAFForCardResponse> {
	postalCode: string;
	token: string;

	constructor(input: InquiryGNAFForCardCommand) {
		this.postalCode = input.postalCode;
		this.token = input.token;
	}
}
