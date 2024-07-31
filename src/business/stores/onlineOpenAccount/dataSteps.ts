import CreateAuthRequestCommand from 'business/application/onlineOpenAccount/CreateAuthRequest/CreateAuthRequestCommand';
import SaveAddressCommand from 'business/application/onlineOpenAccount/SaveAddress/SaveAddressCommand';
import { create } from 'zustand';

interface Functions {
	addNewData: <T extends keyof Data>(data: Record<T, Data[T]>) => void;
	reset: () => void;
}

interface Data {
	personalInfo?: CreateAuthRequestCommand;
	token?: string;
	locationInfo?: SaveAddressCommand;
}

export const useDataSteps = create<Functions & Data>((set) => ({
	addNewData: (data) => {
		set((store) => ({
			...store,
			...data
		}));
	},
	reset: () => {
		set((store) => ({}));
	}
}));
