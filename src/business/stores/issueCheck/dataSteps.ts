import { CheckSheet } from 'common/entities/cheque/Digital Cheque/GetChecksheets/GetChecksheetsResponse';
import { create } from 'zustand';

interface DataSteps {
	steps:
		| {
				firstStep: {
					selectdCheckSheet: CheckSheet;
				};
				secondStep: {
					issueCheckDetail: { checkAmount: string; date: string; reason: string; description: string };
				};
		  }
		| {};

	setStepData: (data: {}) => void;
}

export const useDataSteps = create<DataSteps>((set) => ({
	steps: {},
	setStepData: (data) =>
		set((store) => ({
			steps: { ...store.steps, ...data }
		}))
}));
