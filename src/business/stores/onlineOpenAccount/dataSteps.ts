import CreateAuthRequestCommand from 'business/application/onlineOpenAccount/CreateAuthRequest/CreateAuthRequestCommand';
import SaveAddressCommand from 'business/application/onlineOpenAccount/SaveAddress/SaveAddressCommand';
import { CardPattern, CardType } from 'common/entities/CardsList/CardsListResponse';
import { create } from 'zustand';

interface Functions {
	addNewData: <T extends keyof Data>(data: Record<T, Data[T]>) => void;
	reset: () => void;
}

type SelectedCardData = CardPattern;
interface Data {
	personalInfo?: CreateAuthRequestCommand & { accountCode: string };
	token?: string;
	locationInfo?: SaveAddressCommand;
	cards?: CardType;
	selectedCardData?: SelectedCardData;
	orderId?: string;
	otl?: string;
	isKycNeeded?: boolean;
}

export const useDataSteps = create<Functions & Data>((set) => ({
	addNewData: (data) => {
		set((store) => {
			const newDataStore = {
				...store,
				...data
			};
			localStorage.setItem('dataSteps', JSON.stringify(newDataStore));
			return newDataStore;
		});
	},
	reset: () => {
		localStorage.removeItem('dataSteps');
		set((store) => ({}));
	}
}));
