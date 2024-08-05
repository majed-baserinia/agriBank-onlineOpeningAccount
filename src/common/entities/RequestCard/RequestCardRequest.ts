export interface RequestCardRequest {
	requestCard: boolean;
	cardPatternId: number;
	sameHomeAddressForCard: boolean;
	cityId: number;
	cardAddress: string;
	cardPostalCode: string;
	identifierValue: string;
	token: string;
}
