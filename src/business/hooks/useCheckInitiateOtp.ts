import { Mediator } from '@Mediatr/index';
import { useMutation } from '@tanstack/react-query';
import CheckInitiateOtpCommand from 'business/application/Send Otp/CheckInitiateOtpCommand';
import { ErrorType } from 'common/entities/ErrorType';
import { CheckInitiateOtpRequest } from 'common/entities/CheckInitiateOtp/CheckInitiateOtpRequest';
import { CheckInitiateOtpResponse } from 'common/entities/CheckInitiateOtp/CheckInitiateOtpResponse';

const mediator = new Mediator();

export default function useCheckInitiateOtp() {
	return useMutation<CheckInitiateOtpResponse, ErrorType<CheckInitiateOtpRequest>, CheckInitiateOtpCommand>({
		mutationFn: (data: CheckInitiateOtpCommand) =>
			mediator.send<CheckInitiateOtpResponse>(new CheckInitiateOtpCommand(data)),
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


