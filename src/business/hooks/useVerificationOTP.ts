import { Mediator } from '@Mediatr/index';
import { useMutation } from '@tanstack/react-query';
import VerificationOTPCommand from 'business/application/onlineOpenAccount/VerificationOTP/VerificationOTPCommand';

import { ErrorType } from 'common/entities/ErrorType';
import { VerificationOTPRequest } from 'common/entities/VerificationOTP/VerificationOTPRequest';
import { VerificationOTPResponse } from 'common/entities/VerificationOTP/VerificationOTPResponse';

const mediator = new Mediator();

export default function useVerificationOTP() {
	return useMutation<VerificationOTPResponse, ErrorType<VerificationOTPRequest>, VerificationOTPCommand>({
		mutationFn: (data: VerificationOTPCommand) =>
			mediator.send<VerificationOTPResponse>(new VerificationOTPCommand(data)),
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
