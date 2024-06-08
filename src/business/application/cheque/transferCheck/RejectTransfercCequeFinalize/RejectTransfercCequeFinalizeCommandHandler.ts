import { IRequestHandler, requestHandler } from '@Mediatr/index';
import APIClient from 'business/infrastructure/api-client';

import { RejectTransfercCequeFinalize } from 'business/infrastructure/end-points';
import { RejectTransfercCequeFinalizeRequest } from 'common/entities/cheque/transferCheck/RejectTransfercCequeFinalize/RejectTransfercCequeFinalizeRequest';
import { RejectTransfercCequeFinalizeResponse } from 'common/entities/cheque/transferCheck/RejectTransfercCequeFinalize/RejectTransfercCequeFinalizeResponse';
import RejectTransfercCequeFinalizeCommand from './RejectTransfercCequeFinalizeCommand';

@requestHandler(RejectTransfercCequeFinalizeCommand)
export class RejectTransfercCequeFinalizeCommandHandler
	implements IRequestHandler<RejectTransfercCequeFinalizeCommand, RejectTransfercCequeFinalizeResponse>
{
	handle(value: RejectTransfercCequeFinalizeCommand): Promise<RejectTransfercCequeFinalizeResponse> {
		const apiClient = new APIClient<RejectTransfercCequeFinalizeRequest, RejectTransfercCequeFinalizeResponse>(
			RejectTransfercCequeFinalize
		);
		return apiClient.post(<RejectTransfercCequeFinalizeRequest>{
			transferChequeKey: value.transferChequeKey
		});
	}
}
