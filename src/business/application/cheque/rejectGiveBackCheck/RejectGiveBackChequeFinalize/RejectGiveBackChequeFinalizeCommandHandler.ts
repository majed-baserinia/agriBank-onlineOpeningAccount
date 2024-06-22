import { IRequestHandler, requestHandler } from '@Mediatr/index';
import APIClient from 'business/infrastructure/api-client';

import { RejectGiveBackChequeFinalize } from 'business/infrastructure/end-points';
import { RejectGiveBackChequeFinalizeRequest } from 'common/entities/cheque/RejectGiveBackCheck/RejectGiveBackChequeFinalize/RejectGiveBackChequeFinalizeRequest';
import { RejectGiveBackChequeFinalizeResponse } from 'common/entities/cheque/RejectGiveBackCheck/RejectGiveBackChequeFinalize/RejectGiveBackChequeFinalizeResponse';
import RejectGiveBackChequeFinalizeCommand from './RejectGiveBackChequeFinalizeCommand';

@requestHandler(RejectGiveBackChequeFinalizeCommand)
export class RejectGiveBackChequeFinalizeCommandHandler
	implements IRequestHandler<RejectGiveBackChequeFinalizeCommand, RejectGiveBackChequeFinalizeResponse>
{
	handle(value: RejectGiveBackChequeFinalizeCommand): Promise<RejectGiveBackChequeFinalizeResponse> {
		const apiClient = new APIClient<RejectGiveBackChequeFinalizeRequest, RejectGiveBackChequeFinalizeResponse>(
			RejectGiveBackChequeFinalize
		);
		return apiClient.post(<RejectGiveBackChequeFinalizeRequest>{
			transferChequeKey: value.transferChequeKey
		});
	}
}
