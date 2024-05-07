import { Mediator } from '@Mediatr/index';
import { useMutation } from '@tanstack/react-query';
import InqueryNationalIdCommand from 'business/application/cheque/Digital Cheque/InqueryNationalId/InqueryNationalIdCommand';
import { ErrorType } from 'common/entities/ErrorType';
import { GetCheckSheetsRequest } from 'common/entities/cheque/Digital Cheque/GetChecksheets/GetChecksheetsRequest';
import { GetCheckSheetsResponse } from 'common/entities/cheque/Digital Cheque/GetChecksheets/GetChecksheetsResponse';

const mediator = new Mediator();

export default function useInqueryNationalId() {
	return useMutation<GetCheckSheetsResponse, ErrorType<GetCheckSheetsRequest>, InqueryNationalIdCommand>({
		mutationFn: (data: InqueryNationalIdCommand) =>
			mediator.send<GetCheckSheetsResponse>(new InqueryNationalIdCommand(data)),
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
