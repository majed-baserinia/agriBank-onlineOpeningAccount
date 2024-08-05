export type CardsListResponse = CardType[];

export type CardType = {
	cardTypeTitle: string;
	cardPatternItems: CardPattern[];
};

type CardPattern = {
	cardPatternId: number;
	title: string;
	titleKey: string;
	color: string;
	picsAddress: string;
	issuanceAmount: number;
	hasIdentifier: boolean;
	identifierKey: string;
};
