import { IRequestHandler, requestHandler } from '@Mediatr/index';
import APIClient from 'business/infrastructure/api-client';
import { createAuthRequest } from 'business/infrastructure/end-points';
import { CreateAuthRequestRequest } from 'common/entities/CreateAuthRequest/CreateAuthRequestRequest';
import { CreateAuthRequestResponse } from 'common/entities/CreateAuthRequest/CreateAuthRequestResponse';
import CreateAuthRequestCommand from './CreateAuthRequestCommand';

@requestHandler(CreateAuthRequestCommand)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class CreateAuthRequestCommandHandler
	implements IRequestHandler<CreateAuthRequestCommand, CreateAuthRequestResponse>
{
	handle(value: CreateAuthRequestCommand): Promise<CreateAuthRequestResponse> {
		const apiClient = new APIClient<CreateAuthRequestRequest, CreateAuthRequestResponse>(createAuthRequest);
		return apiClient.post(<CreateAuthRequestRequest>{
			accountTypeId: value.accountTypeId,
			birthDate: value.birthDate,
			identityIssueDate: value.identityIssueDate,
			mobile: value.mobile,
			nationalCode: value.nationalCode,
			nationalCodeSerial: value.nationalCodeSerial,
			oneTimeLinkCode: value.oneTimeLinkCode
		});
	}
}
