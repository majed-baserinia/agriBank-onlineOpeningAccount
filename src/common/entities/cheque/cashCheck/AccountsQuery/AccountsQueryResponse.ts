export type AccountsQueryResponse = Account[];

export interface Account {
	accountNumber: number;
	accountTypeName: string;
	accountTypeCode: string;
	intCat: string;
	currencyType: string;
	accountStatus: string;
	accountStatusCode: string;
	isShared: boolean;
	owners: AccountOwnerDto[];
	iban: string;
	accountOwnershipType: OwnerTypeEnum;
	relationType: RelationTypeEnum;
}
export interface AccountOwner {
	firstName: string;
	lastName: string;
	ownerType: number;
}
export enum RelationTypeEnum {
	Owner = 1,
	Others = 2
}

interface AccountOwnerDto {
	firstName: string;
	lastName: string;
	customerNumber: number;
	nationalCode: string;
}

enum OwnerTypeEnum {
	Owner = 1,
	Join = 2
}
