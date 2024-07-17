import { Mediator } from '@Mediatr/index';
import { useMutation } from '@tanstack/react-query';
import VerifyOtpCommand from 'business/application/Verify Otp/VerifyOtpCommand';
import { ErrorType } from 'common/entities/ErrorType';
import { VerifyOtpRequest } from 'common/entities/Verify Otp/VerifyOtpRequest';
import { VerifyOtpResponse } from 'common/entities/Verify Otp/VerifyOtpResponse';

const mediator = new Mediator();

export default function useVerifyOtp() {
	return useMutation<VerifyOtpResponse, ErrorType<VerifyOtpRequest>, VerifyOtpCommand>({
		mutationFn: (data: VerifyOtpCommand) => mediator.send<VerifyOtpResponse>(new VerifyOtpCommand(data)),
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
