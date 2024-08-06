import { IRequestHandler, requestHandler } from '@Mediatr/index';
import APIClient from 'business/infrastructure/api-client';
import { SaveNationalCodeImage } from 'business/infrastructure/end-points';
import { SaveNationalCodeImageRequest } from 'common/entities/SaveNationalCodeImage/SaveNationalCodeImageRequest';
import { SaveNationalCodeImageResponse } from 'common/entities/SaveNationalCodeImage/SaveNationalCodeImageResponse';
import SaveNationalCodeImageCommand from './SaveNationalCodeImageCommand';

@requestHandler(SaveNationalCodeImageCommand)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class SaveNationalCodeImageCommandHandler
	implements IRequestHandler<SaveNationalCodeImageCommand, SaveNationalCodeImageResponse>
{
	handle(value: SaveNationalCodeImageCommand): Promise<SaveNationalCodeImageResponse> {
		const apiClient = new APIClient<SaveNationalCodeImageRequest, SaveNationalCodeImageResponse>(
			SaveNationalCodeImage
		);
		return apiClient.post(<SaveNationalCodeImageRequest>{
			binaries: value.binaries,
			fileName: value.fileName,
			mimeType: value.mimeType,
			token: value.token
		});
	}
}
