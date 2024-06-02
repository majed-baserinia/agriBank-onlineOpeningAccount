import RegisterChakadCustomerResponse from 'common/entities/cheque/activation/firstStep/FirstStepResponse';
import { create } from 'zustand';

interface RegisterChakadCustomer {
	ActivationKey: RegisterChakadCustomerResponse;
}

interface AccountChargeQueryStore {
	activationKeyStore: RegisterChakadCustomer;

	setChakad_FirstStep: (activationKey: string) => void;
}

export const useAccountChargeStore = create<AccountChargeQueryStore>((set) => ({
	activationKeyStore: <RegisterChakadCustomer>{},
	setChakad_FirstStep: (activationKey) =>
		set((store) => ({
			activationKeyStore: { ...store.activationKeyStore, activationKey }
		}))
}));
