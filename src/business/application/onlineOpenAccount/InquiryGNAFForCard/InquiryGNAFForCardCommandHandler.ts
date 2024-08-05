import { IRequestHandler, requestHandler } from '@Mediatr/index';
import APIClient from 'business/infrastructure/api-client';
import { InquiryGNAFForCardRequest } from 'common/entities/InquiryGNAFForCard/InquiryGNAFForCardRequest';
import { InquiryGNAFForCardResponse } from 'common/entities/InquiryGNAFForCard/InquiryGNAFForCardResponse';
import InquiryGNAFForCardCommand from './InquiryGNAFForCardCommand';
import { InquiryGNAFForCard } from 'business/infrastructure/end-points';

@requestHandler(InquiryGNAFForCardCommand)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class InquiryGNAFForCardCommandHandler
	implements IRequestHandler<InquiryGNAFForCardCommand, InquiryGNAFForCardResponse>
{
	handle(value: InquiryGNAFForCardCommand): Promise<InquiryGNAFForCardResponse> {
		const apiClient = new APIClient<InquiryGNAFForCardRequest, InquiryGNAFForCardResponse>(InquiryGNAFForCard);
		return apiClient.post(<InquiryGNAFForCardRequest>{
			postalCode: value.postalCode,
			token: value.token
		});
	}
}
