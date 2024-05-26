export type GetAllRelatedCustomersResponse = RelatedCustomers[];

interface RelatedCustomers {
	customerNumber: number;
	fullName: string;
}
