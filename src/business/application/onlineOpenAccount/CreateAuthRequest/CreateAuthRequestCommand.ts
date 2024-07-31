import { IRequest } from '@Mediatr/index';
import { CreateAuthRequestResponse } from 'common/entities/CreateAuthRequest/CreateAuthRequestResponse';

export default class CreateAuthRequestCommand implements IRequest<CreateAuthRequestResponse> {
	nationalCode: string;
	mobile: string;
	nationalCodeSerial: string;
	birthDate: string;
	accountTypeId: number;
	oneTimeLinkCode?: string;
	identityIssueDate: string;

	constructor(input: CreateAuthRequestCommand) {
		this.nationalCode = input?.nationalCode;
		this.mobile = input?.mobile;
		this.nationalCodeSerial = input?.nationalCodeSerial;
		this.birthDate = input?.birthDate;
		this.accountTypeId = input?.accountTypeId;
		this.oneTimeLinkCode = input?.oneTimeLinkCode;
		this.identityIssueDate = input?.identityIssueDate;
	}
}
