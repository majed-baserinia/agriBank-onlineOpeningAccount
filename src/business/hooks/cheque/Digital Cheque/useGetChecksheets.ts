import { Mediator } from '@Mediatr/index';
import { useMutation } from '@tanstack/react-query';
import GetChecksheetsCommand from 'business/application/cheque/Digital Cheque/GetCheckSheets/GetCheckSheetsCommand';
import { ErrorType } from 'common/entities/ErrorType';
import { GetCheckSheetsRequest } from 'common/entities/cheque/Digital Cheque/GetChecksheets/GetChecksheetsRequest';
import { GetCheckSheetsResponse } from 'common/entities/cheque/Digital Cheque/GetChecksheets/GetChecksheetsResponse';

const mediator = new Mediator();

export default function useGetChecksheets() {
	return useMutation<GetCheckSheetsResponse, ErrorType<GetCheckSheetsRequest>, GetChecksheetsCommand>({
		mutationFn: (data: GetChecksheetsCommand) =>
			mediator.send<GetCheckSheetsResponse>(new GetChecksheetsCommand(data)),
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
