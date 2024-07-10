import { IRequestHandler, requestHandler } from '@Mediatr/index';
import APIClient from 'business/infrastructure/api-client';

import { RejectTransferChequeFinalize } from 'business/infrastructure/end-points';
import RejectTransferChequeFinalizeCommand from './RejectTransferChequeFinalizeCommand';
import { RejectTransferChequeFinalizeResponse } from 'common/entities/cheque/transferCheck/RejectTransferChequeFinalize/RejectTransferChequeFinalizeResponse';
import { RejectTransferChequeFinalizeRequest } from 'common/entities/cheque/transferCheck/RejectTransferChequeFinalize/RejectTransferChequeFinalizeRequest';

@requestHandler(RejectTransferChequeFinalizeCommand)
export class RejectTransferChequeFinalizeCommandHandler
	implements IRequestHandler<RejectTransferChequeFinalizeCommand, RejectTransferChequeFinalizeResponse>
{
	handle(value: RejectTransferChequeFinalizeCommand): Promise<RejectTransferChequeFinalizeResponse> {
		const apiClient = new APIClient<RejectTransferChequeFinalizeRequest, RejectTransferChequeFinalizeResponse>(
			RejectTransferChequeFinalize
		);
		return apiClient.post(<RejectTransferChequeFinalizeRequest>{
			transferChequeKey: value.transferChequeKey
		});
	}
}
