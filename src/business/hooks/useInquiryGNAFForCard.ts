import { Mediator } from '@Mediatr/index';
import { useMutation } from '@tanstack/react-query';
import InquiryGNAFForCardCommand from 'business/application/onlineOpenAccount/InquiryGNAFForCard/InquiryGNAFForCardCommand';
import { ErrorType } from 'common/entities/ErrorType';
import { InquiryGNAFForCardRequest } from 'common/entities/InquiryGNAFForCard/InquiryGNAFForCardRequest';
import { InquiryGNAFForCardResponse } from 'common/entities/InquiryGNAFForCard/InquiryGNAFForCardResponse';

const mediator = new Mediator();

export default function useInquiryGNAFForCard() {
	return useMutation<InquiryGNAFForCardResponse, ErrorType<InquiryGNAFForCardRequest>, InquiryGNAFForCardCommand>({
		mutationFn: (data: InquiryGNAFForCardCommand) =>
			mediator.send<InquiryGNAFForCardResponse>(new InquiryGNAFForCardCommand(data)),
		onMutate: (variables) => {
			return () => variables;
		},
		onSuccess: (data) => {
			return () => data;
		},
		onError: (error, variables) => {
			return () => variables;
		}
	});
}
