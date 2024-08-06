import { IRequest } from '@Mediatr/index';
import { SaveNationalCodeImageResponse } from 'common/entities/SaveNationalCodeImage/SaveNationalCodeImageResponse';

export default class SaveNationalCodeImageCommand implements IRequest<SaveNationalCodeImageResponse> {
	binaries: string;
	fileName: string;
	mimeType: string;
	token: string;

	constructor(input: SaveNationalCodeImageCommand) {
		this.binaries = input.binaries;
		this.fileName = input.fileName;
		this.mimeType = input.mimeType;
		this.token = input.token;
	}
}
