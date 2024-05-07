import { CheckSheet } from 'common/entities/cheque/Digital Cheque/GetChecksheets/GetChecksheetsResponse';
import { Reciever } from 'common/entities/cheque/Digital Cheque/IssueChequeInitiate/IssueChequeInitiateRequest';
import { create } from 'zustand';

interface DataSteps {
	steps: {
		firstStep?: {
			selectdCheckSheet: CheckSheet;
		};
		secondStep?: {
			issueCheckDetail: {
				checkAmount: string;
				date: Date;
				reason: { name: string; value: string };
				description: string;
			};
		};
		receivers: Reciever[];
		signitureRequirementData?: { issueChequeKey: string; isSingleSignatureLegal: boolean };
	};
	addReceiver: (receiver: Reciever) => void;
	removeReceiver: (nationalNo: string) => void;
	setStepData: (data: {}) => void;
}

export const useDataSteps = create<DataSteps>((set) => ({
	steps: { receivers: [] },
	setStepData: (data) =>
		set((store) => ({
			steps: { ...store.steps, ...data }
		})),
	addReceiver: (receiver) =>
		set((store) => ({
			steps: { ...store.steps, receivers: [...store.steps.receivers, receiver] }
		})),
	removeReceiver: (nationalNo) =>
		set((store) => ({
			steps: {
				...store.steps,
				receivers: store.steps.receivers.filter((reciever) => reciever.nationalNo !== nationalNo)
			}
		}))
}));
