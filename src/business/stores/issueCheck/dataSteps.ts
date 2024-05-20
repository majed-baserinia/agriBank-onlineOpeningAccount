import { CheckSheet } from 'common/entities/cheque/Digital Cheque/GetChecksheets/GetChecksheetsResponse';
import { Reciever } from 'common/entities/cheque/Digital Cheque/IssueChequeInitiate/IssueChequeInitiateRequest';
import { issueChequeOverView } from 'common/entities/cheque/Digital Cheque/IssueChequeVerifyInitiate/IssueChequeVerifyInitiateResponse';
import { create } from 'zustand';

interface DataSteps {
	steps: {
		selectdCheckSheet?: CheckSheet;
		issueCheckDetail?: {
			checkAmount: string;
			date: string;
			reason: { name: string; value: string };
			description: string;
		};

		receivers: Reciever[];
		signitureRequirementData?: { issueChequeKey: string; isSingleSignatureLegal: boolean };
		overviewData?: issueChequeOverView;
	};

	setStepData: (data: {}) => void;
}

export const useDataSteps = create<DataSteps>((set) => ({
	steps: { receivers: [] },
	setStepData: (data) =>
		set((store) => ({
			steps: { ...store.steps, ...data }
		}))
}));
